import { BUILD_STEPS } from "../data/knowledge";

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