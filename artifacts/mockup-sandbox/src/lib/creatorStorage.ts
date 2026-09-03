import {
  AUDIT_ITEMS,
  BUILD_STEPS,
  SAFETY_AUDIT_ID,
  SHIP_GATE_AVG,
  SHIP_GATE_SAFETY_MIN,
} from "../data/knowledge";

export const WORKSPACE_KEY = "cgpt-workspace";
export const WORKSPACE_VERSION = 1;
export const MAX_PROJECTS = 20;
export const MAX_BACKUP_BYTES = 2_000_000;

export type StorageHealth = "persisted" | "unavailable" | "malformed";

export interface CreatorProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  data: Record<string, unknown>;
  completedSteps: number[];
  currentPage: number | string;
  sidebarOpen: boolean;
}

export interface CreatorWorkspace {
  version: 1;
  activeProjectId: string;
  projects: CreatorProject[];
}

type ShipGateDecision = "incomplete" | "passed" | "failed";

interface AuditEvidenceItem {
  id: number;
  question: string;
  score: number | null;
  notes: string;
}

interface AuditEvidence {
  gptName: string;
  scores: Record<string, number>;
  notes: Record<string, string>;
  items: AuditEvidenceItem[];
  averageScore: number | null;
  safetyScore: number | null;
  shipGateDecision: ShipGateDecision;
  shipGateDecisionExplanation: string;
}

let memoryWorkspace: CreatorWorkspace | null = null;
let lastHealth: StorageHealth = "persisted";

function now(): string {
  return new Date().toISOString();
}

function createId(): string {
  return `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function isProject(value: unknown): value is CreatorProject {
  if (!value || typeof value !== "object") return false;
  const project = value as Partial<CreatorProject>;
  return typeof project.id === "string" && typeof project.name === "string" &&
    typeof project.data === "object" && project.data !== null &&
    Array.isArray(project.completedSteps);
}

function normalizeProject(project: CreatorProject): CreatorProject {
  return {
    ...project,
    name: project.name.trim().slice(0, 100) || "Untitled GPT",
    completedSteps: project.completedSteps.filter((step) => Number.isInteger(step) && step >= 0 && step < BUILD_STEPS.length),
    data: project.data ?? {},
    archived: Boolean(project.archived),
    currentPage: project.currentPage ?? 0,
    sidebarOpen: project.sidebarOpen !== false,
  };
}

function newProject(name = "Untitled GPT"): CreatorProject {
  const timestamp = now();
  return {
    id: createId(),
    name,
    createdAt: timestamp,
    updatedAt: timestamp,
    archived: false,
    data: {},
    completedSteps: [],
    currentPage: 0,
    sidebarOpen: true,
  };
}

function migrateLegacy(): CreatorWorkspace {
  const project = newProject();
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith("cgpt-")) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      if (key === "cgpt-creator-state") {
        const state = JSON.parse(raw) as Partial<CreatorProject>;
        project.currentPage = state.currentPage ?? 0;
        project.completedSteps = Array.isArray(state.completedSteps) ? state.completedSteps as number[] : [];
        project.sidebarOpen = state.sidebarOpen !== false;
      } else {
        project.data[key.slice(5)] = JSON.parse(raw);
      }
    }
    const brief = project.data["step-0"] as { gptName?: string } | undefined;
    if (brief?.gptName) project.name = brief.gptName.slice(0, 100);
  } catch {
    lastHealth = "malformed";
  }
  return { version: WORKSPACE_VERSION, activeProjectId: project.id, projects: [project] };
}

function validWorkspace(value: unknown): value is CreatorWorkspace {
  if (!value || typeof value !== "object") return false;
  const workspace = value as Partial<CreatorWorkspace>;
  return workspace.version === WORKSPACE_VERSION && typeof workspace.activeProjectId === "string" &&
    Array.isArray(workspace.projects) && workspace.projects.length > 0 &&
    workspace.projects.length <= MAX_PROJECTS && workspace.projects.every(isProject);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isAuditScore(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 5;
}

function isShipGateDecision(value: unknown): value is ShipGateDecision {
  return value === "incomplete" || value === "passed" || value === "failed";
}

function auditDecisionExplanation(decision: ShipGateDecision): string {
  switch (decision) {
    case "passed":
      return "All audit items are scored and the average and safety thresholds are met.";
    case "failed":
      return "All audit items are scored, but one or more ship-gate thresholds are not met.";
    case "incomplete":
      return "Not all audit items have scores, so the ship gate cannot be evaluated.";
  }
}

function normalizeAuditDecision(scores: Record<string, number>): ShipGateDecision {
  const scoredItems = AUDIT_ITEMS.map((item) => scores[String(item.id)]);
  if (scoredItems.some((score) => score === undefined)) return "incomplete";

  const average = scoredItems.reduce((total, score) => total + score, 0) / AUDIT_ITEMS.length;
  return average >= SHIP_GATE_AVG && scores[String(SAFETY_AUDIT_ID)] >= SHIP_GATE_SAFETY_MIN
    ? "passed"
    : "failed";
}

function validateAuditEvidencePackage(value: unknown): { audit?: AuditEvidence; artifactName?: string; error?: string } {
  if (!isRecord(value) || value.schemaVersion !== "1.0") {
    return { error: "This file is not a compatible evidence package." };
  }

  const artifact = value.artifact;
  const readiness = value.readiness;
  const evidence = value.evidence;
  const humanConfirmation = value.humanConfirmation;
  const provenance = value.provenance;
  if (
    !isRecord(artifact) ||
    artifact.type !== "custom-gpt-specification" ||
    typeof artifact.name !== "string" ||
    !artifact.name.trim() ||
    typeof artifact.version !== "string" ||
    typeof artifact.owner !== "string" ||
    typeof artifact.visibility !== "string" ||
    !isRecord(readiness) ||
    !["incomplete", "blocked", "ready-for-review", "confirmed"].includes(String(readiness.state)) ||
    !["low", "medium", "high"].includes(String(readiness.confidence)) ||
    !Number.isInteger(readiness.completedSteps) ||
    !Number.isInteger(readiness.totalSteps) ||
    !Array.isArray(readiness.blockers) ||
    !readiness.blockers.every((item) => typeof item === "string") ||
    !Array.isArray(readiness.unresolvedItems) ||
    !readiness.unresolvedItems.every((item) => typeof item === "string") ||
    readiness.behavioralValidation !== "not-claimed" ||
    !Array.isArray(evidence) ||
    !evidence.every((item) =>
      isRecord(item) &&
      typeof item.source === "string" &&
      typeof item.status === "string" &&
      typeof item.notes === "string"
    ) ||
    !isRecord(humanConfirmation) ||
    humanConfirmation.required !== true ||
    typeof humanConfirmation.recorded !== "boolean" ||
    typeof humanConfirmation.owner !== "string" ||
    typeof humanConfirmation.decision !== "string" ||
    typeof humanConfirmation.rationale !== "string" ||
    !isRecord(provenance) ||
    typeof provenance.generatedAt !== "string" ||
    provenance.source !== "browser-local-project" ||
    typeof provenance.projectName !== "string" ||
    provenance.projectName.trim() !== artifact.name.trim() ||
    !isRecord(provenance.changeLedger) ||
    !isRecord(value.boundaries) ||
    !isRecord(value.failureBehavior) ||
    !isRecord(value.assumptions) ||
    typeof value.assumptions.knowledgeRetrieval !== "string" ||
    !Array.isArray(value.assumptions.unresolved) ||
    !value.assumptions.unresolved.every((item) => typeof item === "string") ||
    !isRecord(value.phases)
  ) {
    return { error: "This evidence package has an invalid or incomplete project identity." };
  }

  const rawAudit = value.audit;
  if (
    !isRecord(rawAudit) ||
    typeof rawAudit.gptName !== "string" ||
    !isRecord(rawAudit.scores) ||
    !isRecord(rawAudit.notes) ||
    !Array.isArray(rawAudit.items) ||
    rawAudit.items.length !== AUDIT_ITEMS.length ||
    (rawAudit.averageScore !== null && typeof rawAudit.averageScore !== "number") ||
    (rawAudit.safetyScore !== null && !isAuditScore(rawAudit.safetyScore)) ||
    !isShipGateDecision(rawAudit.shipGateDecision) ||
    typeof rawAudit.shipGateDecisionExplanation !== "string"
  ) {
    return { error: "This evidence package does not contain a complete audit record." };
  }

  const scores: Record<string, number> = {};
  const notes: Record<string, string> = {};
  for (const item of AUDIT_ITEMS) {
    const key = String(item.id);
    const score = rawAudit.scores[key];
    const note = rawAudit.notes[key];
    const exportedItem = rawAudit.items.find((candidate) => isRecord(candidate) && candidate.id === item.id);

    if (
      !exportedItem ||
      exportedItem.question !== item.question ||
      (exportedItem.score !== null && !isAuditScore(exportedItem.score)) ||
      typeof exportedItem.notes !== "string" ||
      (score !== undefined && !isAuditScore(score)) ||
      (note !== undefined && typeof note !== "string") ||
      (exportedItem.score === null ? score !== undefined : score !== exportedItem.score) ||
      (exportedItem.notes === "" ? (note !== undefined && note !== "") : note !== exportedItem.notes)
    ) {
      return { error: "This evidence package contains invalid or incomplete audit findings." };
    }

    if (score !== undefined) scores[key] = score;
    if (typeof note === "string" && note) notes[key] = note;
  }

  const allowedKeys = new Set(AUDIT_ITEMS.map((item) => String(item.id)));
  if (
    Object.keys(rawAudit.scores).some((key) => !allowedKeys.has(key)) ||
    Object.keys(rawAudit.notes).some((key) => !allowedKeys.has(key))
  ) {
    return { error: "This evidence package contains audit findings for an unknown rubric item." };
  }

  const normalizedDecision = normalizeAuditDecision(scores);
  const items = AUDIT_ITEMS.map((item) => ({
    id: item.id,
    question: item.question,
    score: scores[String(item.id)] ?? null,
    notes: notes[String(item.id)] ?? "",
  }));
  const allItemsScored = normalizedDecision !== "incomplete";
  const averageScore = allItemsScored
    ? items.reduce((total, item) => total + (item.score ?? 0), 0) / items.length
    : null;

  return {
    artifactName: artifact.name.trim(),
    audit: {
      gptName: rawAudit.gptName,
      scores,
      notes,
      items,
      averageScore,
      safetyScore: scores[String(SAFETY_AUDIT_ID)] ?? null,
      shipGateDecision: normalizedDecision,
      shipGateDecisionExplanation: auditDecisionExplanation(normalizedDecision),
    },
  };
}

export function loadWorkspace(): CreatorWorkspace {
  if (memoryWorkspace) return memoryWorkspace;
  try {
    const raw = localStorage.getItem(WORKSPACE_KEY);
    if (!raw) {
      const migrated = migrateLegacy();
      memoryWorkspace = migrated;
      persistWorkspace(migrated);
      return migrated;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!validWorkspace(parsed)) {
      lastHealth = "malformed";
      const recovered = { version: 1 as const, activeProjectId: "", projects: [newProject("Recovered GPT")] };
      recovered.activeProjectId = recovered.projects[0].id;
      memoryWorkspace = recovered;
      return recovered;
    }
    lastHealth = "persisted";
    memoryWorkspace = { ...parsed, projects: parsed.projects.map(normalizeProject) };
    return memoryWorkspace;
  } catch {
    lastHealth = "unavailable";
    const fallback = memoryWorkspace ?? { version: 1 as const, activeProjectId: "", projects: [newProject()] };
    fallback.activeProjectId ||= fallback.projects[0].id;
    memoryWorkspace = fallback;
    return fallback;
  }
}

export function persistWorkspace(workspace: CreatorWorkspace): boolean {
  memoryWorkspace = workspace;
  try {
    localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
    lastHealth = "persisted";
    return true;
  } catch {
    lastHealth = "unavailable";
    return false;
  }
}

export function getStorageHealth(): StorageHealth {
  return lastHealth;
}

export function activeProject(workspace: CreatorWorkspace): CreatorProject {
  return workspace.projects.find((project) => project.id === workspace.activeProjectId) ?? workspace.projects[0];
}

export function updateActiveProject(workspace: CreatorWorkspace, patch: Partial<CreatorProject>): CreatorWorkspace {
  const current = activeProject(workspace);
  return { ...workspace, projects: workspace.projects.map((project) => project.id === current.id ? { ...project, ...patch, updatedAt: now() } : project) };
}

export function readProjectValue(key: string): unknown {
  return activeProject(loadWorkspace()).data[key];
}

export function writeProjectValue(key: string, value: unknown): boolean {
  const workspace = loadWorkspace();
  const project = activeProject(workspace);
  const updated = { ...project, data: { ...project.data, [key]: value }, updatedAt: now() };
  return persistWorkspace({ ...workspace, projects: workspace.projects.map((item) => item.id === project.id ? updated : item) });
}

export function exportWorkspace(workspace: CreatorWorkspace): string {
  return JSON.stringify({ format: "okh-custom-gpt-workspace", version: WORKSPACE_VERSION, exportedAt: now(), workspace }, null, 2);
}

export function importWorkspace(raw: string, existing: CreatorWorkspace): { workspace?: CreatorWorkspace; error?: string } {
  if (raw.length > MAX_BACKUP_BYTES) return { error: "This backup is larger than the 2 MB safety limit." };
  try {
    const parsed = JSON.parse(raw) as { format?: string; version?: number; workspace?: unknown };
    if (parsed.format !== "okh-custom-gpt-workspace" || parsed.version !== WORKSPACE_VERSION || !validWorkspace(parsed.workspace)) {
      return { error: "This file is not a valid Custom GPT Creator backup." };
    }
    const incoming = parsed.workspace;
    const available = MAX_PROJECTS - existing.projects.length;
    if (incoming.projects.length > available) return { error: `Import would exceed the ${MAX_PROJECTS}-project limit.` };
    const projects = incoming.projects.map((project) => {
      const copy = normalizeProject({ ...project, id: createId(), name: `${project.name} (imported)` });
      return copy;
    });
    return { workspace: { ...existing, projects: [...existing.projects, ...projects], activeProjectId: projects[0]?.id ?? existing.activeProjectId } };
  } catch {
    return { error: "The backup could not be read. It may be corrupt or incomplete." };
  }
}

export function importAuditEvidence(raw: string, existing: CreatorWorkspace): { workspace?: CreatorWorkspace; error?: string } {
  if (raw.length > MAX_BACKUP_BYTES) return { error: "This evidence package is larger than the 2 MB safety limit." };

  try {
    const parsed: unknown = JSON.parse(raw);
    const validation = validateAuditEvidencePackage(parsed);
    if (validation.error || !validation.audit || !validation.artifactName) return { error: validation.error };

    const project = activeProject(existing);
    const brief = isRecord(project.data["step-0"]) ? project.data["step-0"] : undefined;
    const activeIdentity = typeof brief?.gptName === "string" && brief.gptName.trim()
      ? brief.gptName.trim()
      : project.name.trim() === "Untitled GPT" ? "" : project.name.trim();
    if (activeIdentity && activeIdentity !== validation.artifactName) {
      return { error: `This evidence package is for "${validation.artifactName}", not the active project "${activeIdentity}".` };
    }

    const updatedProject: CreatorProject = {
      ...project,
      data: { ...project.data, "audit-mode": validation.audit },
      updatedAt: now(),
    };
    return {
      workspace: {
        ...existing,
        projects: existing.projects.map((item) => item.id === project.id ? updatedProject : item),
      },
    };
  } catch {
    return { error: "The evidence package could not be read. It may be corrupt or incomplete." };
  }
}