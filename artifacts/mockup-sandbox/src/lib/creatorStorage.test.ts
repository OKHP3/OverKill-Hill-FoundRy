import assert from "node:assert/strict";
import test from "node:test";
import {
  AUDIT_ITEMS,
  AUDIT_RUBRIC_VERSION,
  AUDIT_SHIP_GATE_THRESHOLDS,
} from "../data/knowledge.ts";
import {
  importAuditEvidence,
  type CreatorWorkspace,
} from "./creatorStorage.ts";

const thresholdError = "This evidence package contains invalid ship-gate thresholds.";

function evidencePackage({
  thresholds = AUDIT_SHIP_GATE_THRESHOLDS,
  includeThresholds = true,
}: {
  thresholds?: unknown;
  includeThresholds?: boolean;
} = {}): Record<string, unknown> {
  const scores = Object.fromEntries(AUDIT_ITEMS.map(({ id }) => [String(id), 4]));
  const notes = { "1": "Evidence note." };
  const audit: Record<string, unknown> = {
    gptName: "Reviewer target",
    rubricVersion: AUDIT_RUBRIC_VERSION,
    scores,
    notes,
    items: AUDIT_ITEMS.map(({ id, question }) => ({
      id,
      question,
      score: 4,
      notes: id === 1 ? notes["1"] : "",
    })),
    averageScore: 4,
    safetyScore: 4,
    shipGateDecision: "failed",
    shipGateDecisionExplanation: "Untrusted legacy explanation.",
  };
  if (includeThresholds) audit.shipGateThresholds = thresholds;

  return {
    schemaVersion: "1.0",
    artifact: {
      type: "custom-gpt-specification",
      name: "Threshold Fixture GPT",
      version: "v1.0",
      owner: "Fixture owner",
      visibility: "private",
    },
    readiness: {
      state: "ready-for-review",
      confidence: "high",
      completedSteps: 9,
      totalSteps: 9,
      blockers: [],
      unresolvedItems: [],
      behavioralValidation: "not-claimed",
    },
    evidence: [],
    audit,
    humanConfirmation: {
      required: true,
      recorded: false,
      owner: "",
      decision: "draft",
      rationale: "",
    },
    provenance: {
      generatedAt: "2026-09-26T00:00:00.000Z",
      source: "browser-local-project",
      projectName: "Threshold Fixture GPT",
      changeLedger: {},
    },
    boundaries: {},
    failureBehavior: {},
    assumptions: { knowledgeRetrieval: "", unresolved: [] },
    phases: {},
  };
}

function existingWorkspace(): CreatorWorkspace {
  return {
    version: 1,
    activeProjectId: "project-current",
    projects: [{
      id: "project-current",
      name: "Threshold Fixture GPT",
      createdAt: "2026-09-26T00:00:00.000Z",
      updatedAt: "2026-09-26T00:00:00.000Z",
      archived: false,
      data: {
        "step-0": { gptName: "Threshold Fixture GPT" },
        "audit-mode": {
          gptName: "Existing reviewer",
          scores: { 1: 1 },
          notes: { 1: "Keep this finding." },
          shipGateDecision: "incomplete",
        },
      },
      completedSteps: [],
      currentPage: "audit",
      sidebarOpen: true,
    }],
  };
}

function assertRejectedWithoutMutation(packageValue: Record<string, unknown>) {
  const existing = existingWorkspace();
  const before = structuredClone(existing);
  const result = importAuditEvidence(JSON.stringify(packageValue), existing);

  assert.equal(result.workspace, undefined);
  assert.equal(result.error, thresholdError);
  assert.deepEqual(existing, before);
}

test("imports valid fractional and inclusive-boundary ship-gate thresholds", () => {
  const cases = [
    {
      thresholds: { averageMinimum: 3.5, safetyMinimum: 3.75 },
      decision: "passed",
    },
    {
      thresholds: { averageMinimum: 0, safetyMinimum: 5 },
      decision: "failed",
    },
  ] as const;

  for (const { thresholds, decision } of cases) {
    const existing = existingWorkspace();
    const before = structuredClone(existing);
    const result = importAuditEvidence(JSON.stringify(evidencePackage({ thresholds })), existing);

    assert.equal(result.error, undefined);
    assert.ok(result.workspace);
    assert.deepEqual(result.preview?.audit.shipGateThresholds, thresholds);
    assert.equal(result.preview?.audit.shipGateDecision, decision);
    assert.deepEqual(result.workspace.projects[0].data["audit-mode"], result.preview?.audit);
    assert.deepEqual(existing, before);
  }
});

test("defaults legacy packages without ship-gate thresholds", () => {
  const result = importAuditEvidence(
    JSON.stringify(evidencePackage({ includeThresholds: false })),
    existingWorkspace(),
  );

  assert.equal(result.error, undefined);
  assert.ok(result.workspace);
  assert.deepEqual(result.preview?.audit.shipGateThresholds, AUDIT_SHIP_GATE_THRESHOLDS);
  assert.equal(result.preview?.audit.shipGateDecision, "passed");
});

test("rejects non-numeric ship-gate thresholds without mutating the workspace", () => {
  assertRejectedWithoutMutation(evidencePackage({
    thresholds: { averageMinimum: "4", safetyMinimum: 4 },
  }));
});

test("rejects ship-gate thresholds below zero or above five without mutating the workspace", () => {
  assertRejectedWithoutMutation(evidencePackage({
    thresholds: { averageMinimum: -0.1, safetyMinimum: 4 },
  }));
  assertRejectedWithoutMutation(evidencePackage({
    thresholds: { averageMinimum: 4, safetyMinimum: 5.1 },
  }));
});

test("rejects partial ship-gate thresholds without mutating the workspace", () => {
  assertRejectedWithoutMutation(evidencePackage({
    thresholds: { averageMinimum: 4 },
  }));
});