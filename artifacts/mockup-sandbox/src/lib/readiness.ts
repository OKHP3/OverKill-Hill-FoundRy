import { BUILD_STEPS } from "../data/knowledge";

export type ReadinessState = "incomplete" | "blocked" | "ready-for-review" | "confirmed";
export type EvidenceStatus = "unknown" | "inferred" | "confirmed" | "observed";
export type Confidence = "low" | "medium" | "high";

type SavedData = Record<string, any>;

export interface ReadinessReport {
  state: ReadinessState;
  confidence: Confidence;
  completedSteps: number;
  totalSteps: number;
  blockers: string[];
  unresolvedItems: string[];
  evidence: Array<{ source: string; status: EvidenceStatus; notes: string }>;
  humanConfirmation: {
    required: true;
    recorded: boolean;
    owner: string;
    decision: string;
  };
  behavioralValidation: "not-claimed";
}

const text = (value: unknown): string => typeof value === "string" ? value.trim() : "";
const status = (value: unknown): EvidenceStatus =>
  value === "inferred" || value === "confirmed" || value === "observed" ? value : "unknown";

export function calculateReadiness(
  data: Record<string, unknown>,
  completedSteps: Iterable<number>,
): ReadinessReport {
  const saved = data as SavedData;
  const completed = new Set(completedSteps);
  const brief = saved["step-0"] ?? {};
  const knowledge = saved["step-3"] ?? {};
  const tests = saved["step-7"] ?? {};
  const ship = saved["step-8"] ?? {};
  const evidence = [
    { source: "Build Brief", status: status(brief.evidenceStatus), notes: text(brief.evidenceRegister) },
    { source: "Knowledge Files", status: status(knowledge.evidenceStatus), notes: [knowledge.retrievalNotes, knowledge.conflictHandling, knowledge.injectionBoundary].filter(Boolean).join("\n") },
    { source: "Test Matrix", status: status(tests.evidenceStatus), notes: [tests.retrievalVerification, tests.toolFailureTest, tests.ownerReview].filter(Boolean).join("\n") },
    { source: "Ship & Govern", status: status(ship.evidenceStatus), notes: text(ship.releaseEvidence) },
  ];
  const incompleteSteps = BUILD_STEPS.filter(({ id }) => !completed.has(id));
  const failingTests = Array.isArray(tests.cases)
    ? tests.cases.filter((test: { result?: string }) => test.result === "fail")
    : [];
  const blockers = [
    ...failingTests.map((test: { id?: string }) => `Unresolved failing test${test.id ? ` ${test.id}` : ""}`),
    ...evidence.filter(item => item.status === "unknown").map(item => `${item.source} evidence is unknown`),
  ];
  const unresolvedItems = [
    ...incompleteSteps.map(({ label }) => `${label} is incomplete`),
    ...blockers,
    ...(text(ship.ownerName) ? [] : ["Owner confirmation is missing"]),
    ...(text(ship.releaseEvidence) ? [] : ["Release rationale is missing"]),
  ];
  const recorded = Boolean(text(ship.ownerName) && text(ship.releaseEvidence) && ship.releaseDecision !== "draft");
  const state: ReadinessState = failingTests.length > 0
    ? "blocked"
    : incompleteSteps.length > 0 || evidence.some(item => item.status === "unknown")
      ? "incomplete"
      : recorded ? "confirmed" : "ready-for-review";
  const confirmedEvidence = evidence.filter(item => item.status === "confirmed" || item.status === "observed").length;
  const confidence: Confidence = state === "blocked" || confirmedEvidence <= 1
    ? "low"
    : state === "confirmed" && confirmedEvidence === evidence.length
      ? "high"
      : "medium";

  return {
    state,
    confidence,
    completedSteps: completed.size,
    totalSteps: BUILD_STEPS.length,
    blockers,
    unresolvedItems,
    evidence,
    humanConfirmation: {
      required: true,
      recorded,
      owner: text(ship.ownerName),
      decision: text(ship.releaseDecision) || "draft",
    },
    behavioralValidation: "not-claimed",
  };
}