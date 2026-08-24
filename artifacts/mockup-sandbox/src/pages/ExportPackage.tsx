import { useState, useCallback } from "react";
import { BUILD_STEPS, INSTRUCTION_LAYERS } from "../data/knowledge";
import { readProjectValue } from "../lib/creatorStorage";

function loadCompletedSteps(): Set<number> {
  try {
    const saved = (readProjectValue("creator-state") as { completedSteps?: unknown } | undefined) ?? {};
    return new Set(
      Array.isArray(saved.completedSteps)
        ? saved.completedSteps.filter(
            (step): step is number =>
              typeof step === "number" && Number.isInteger(step) && step >= 0 && step < BUILD_STEPS.length,
          )
        : [],
    );
  } catch {
    return new Set();
  }
}

function loadStep(key: string): any {
  try { return readProjectValue(key) ?? {}; } catch { return {}; }
}

type ReadinessState = "incomplete" | "blocked" | "ready-for-review" | "confirmed";

interface EvidencePackage {
  schemaVersion: "1.0";
  artifact: {
    type: "custom-gpt-specification";
    name: string;
    version: string;
    owner: string;
    visibility: string;
  };
  readiness: {
    state: ReadinessState;
    completedSteps: number;
    totalSteps: number;
    blockers: string[];
    unresolvedItems: string[];
    behavioralValidation: "not-claimed";
  };
  evidence: Array<{ source: string; status: string; notes: string }>;
  humanConfirmation: {
    required: true;
    recorded: boolean;
    owner: string;
    decision: string;
    rationale: string;
  };
  provenance: {
    generatedAt: string;
    source: "browser-local-project";
    projectName: string;
    changeLedger: Record<string, unknown>;
  };
  boundaries: Record<string, string>;
  failureBehavior: Record<string, string>;
  assumptions: { knowledgeRetrieval: string; unresolved: string[] };
  phases: Record<string, unknown>;
}

function buildEvidencePackage(completedSteps: Set<number>, generatedAt: string): EvidencePackage {
  const brief = loadStep("step-0");
  const contract = loadStep("step-1");
  const layerData = loadStep("step-2");
  const knowledge = loadStep("step-3");
  const caps = loadStep("step-4");
  const actions = loadStep("step-5");
  const starters = loadStep("step-6");
  const tests = loadStep("step-7");
  const ship = loadStep("step-8");
  const incompleteSteps = BUILD_STEPS.filter(({ id }) => !completedSteps.has(id));
  const failingTests = Array.isArray(tests.cases) ? tests.cases.filter((test: { result?: string }) => test.result === "fail") : [];
  const evidence = [
    { source: "Build Brief", status: brief.evidenceStatus || "unknown", notes: brief.evidenceRegister || "" },
    { source: "Knowledge Files", status: knowledge.evidenceStatus || "unknown", notes: [knowledge.retrievalNotes, knowledge.conflictHandling, knowledge.injectionBoundary].filter(Boolean).join("\n") },
    { source: "Test Matrix", status: tests.evidenceStatus || "unknown", notes: [tests.retrievalVerification, tests.toolFailureTest, tests.ownerReview].filter(Boolean).join("\n") },
    { source: "Ship & Govern", status: ship.evidenceStatus || "unknown", notes: ship.releaseEvidence || "" },
  ];
  const blockers = [
    ...failingTests.map((test: { id?: string }) => `Unresolved failing test${test.id ? ` ${test.id}` : ""}`),
    ...evidence.filter(item => item.status === "unknown").map(item => `${item.source} evidence is unknown`),
  ];
  const unresolvedItems = [
    ...incompleteSteps.map(({ label }) => `${label} is incomplete`),
    ...blockers,
    ...(ship.ownerName?.trim() ? [] : ["Owner confirmation is missing"]),
    ...(ship.releaseEvidence?.trim() ? [] : ["Release rationale is missing"]),
  ];
  const recorded = Boolean(ship.ownerName?.trim() && ship.releaseEvidence?.trim() && ship.releaseDecision !== "draft");
  const state: ReadinessState = failingTests.length > 0
    ? "blocked"
    : incompleteSteps.length > 0 || evidence.some(item => item.status === "unknown")
      ? "incomplete"
      : recorded ? "confirmed" : "ready-for-review";
  const changeLedger = Object.fromEntries(
    ["step-2-change", "step-3-change", "step-4-change", "step-5-change"].map(key => [key, loadStep(key)])
  );

  return {
    schemaVersion: "1.0",
    artifact: {
      type: "custom-gpt-specification",
      name: brief.gptName || "Untitled GPT",
      version: ship.currentVersion || "v0.1",
      owner: ship.ownerName || "",
      visibility: ship.visibility || "",
    },
    readiness: {
      state,
      completedSteps: completedSteps.size,
      totalSteps: BUILD_STEPS.length,
      blockers,
      unresolvedItems,
      behavioralValidation: "not-claimed",
    },
    evidence,
    humanConfirmation: {
      required: true,
      recorded,
      owner: ship.ownerName || "",
      decision: ship.releaseDecision || "draft",
      rationale: ship.releaseEvidence || "",
    },
    provenance: {
      generatedAt,
      source: "browser-local-project",
      projectName: brief.gptName || "Untitled GPT",
      changeLedger,
    },
    boundaries: {
      nonGoals: brief.nonGoals || "",
      allowedSources: brief.allowedSources || "",
      disallowedSources: brief.disallowedSources || "",
      compliance: brief.compliance || "",
      toolingAllowed: brief.toolingAllowed || "",
    },
    failureBehavior: {
      catastrophicMistakes: contract.catastrophicMistakes || "",
      toolFailureTest: tests.toolFailureTest || "",
      recovery: "Return to the smallest failing phase; keep unknown or failed evidence unresolved until reviewed.",
    },
    assumptions: {
      knowledgeRetrieval: knowledge.retrievalNotes || "",
      unresolved: unresolvedItems,
    },
    phases: {
      "step-0-build-brief": brief,
      "step-1-conversation-contract": contract,
      "step-2-instruction-stack": layerData,
      "step-3-knowledge-files": knowledge,
      "step-4-capabilities": caps,
      "step-5-actions-apps": actions,
      "step-6-conversation-starters": starters,
      "step-7-test-matrix": tests,
      "step-8-ship-govern": ship,
    },
  };
}

function buildMarkdown(evidencePackage: EvidencePackage): string {
  const brief = loadStep("step-0");
  const contract = loadStep("step-1");
  const layerData = loadStep("step-2");
  const knowledge = loadStep("step-3");
  const caps = loadStep("step-4");
  const capsRationale = loadStep("step-4-rationale");
  const actions = loadStep("step-5");
  const savedStarters = loadStep("step-6");
  const starters: string[] = Array.isArray(savedStarters) ? savedStarters : [];
  const tests = loadStep("step-7");
  const ship = loadStep("step-8");
  const evidenceSections = [
    ["Build Brief evidence", brief.evidenceStatus, brief.evidenceRegister],
    ["Knowledge evidence", knowledge.evidenceStatus, [knowledge.retrievalNotes, knowledge.conflictHandling, knowledge.injectionBoundary].filter(Boolean).join("\n")],
    ["Evaluation evidence", tests.evidenceStatus, [tests.retrievalVerification, tests.toolFailureTest, tests.ownerReview].filter(Boolean).join("\n")],
  ];

  const instructionBlock = INSTRUCTION_LAYERS
    .map(l => layerData[l.id] ? `### Layer ${l.id}: ${l.label}\n${layerData[l.id]}` : "")
    .filter(Boolean)
    .join("\n\n");

  return `# Custom GPT Specification Package
*Generated by The OverKill Hill Found-Ry · OKH P³ · ${new Date().toISOString().split("T")[0]}*

---

## 0. Build Brief

**GPT Name:** ${brief.gptName || "(not set)"}
**Primary Users:** ${brief.primaryUsers || "(not set)"}
**Version:** ${ship.currentVersion || "v0.1"}
**Owner:** ${ship.ownerName || "(not set)"}
**Visibility:** ${ship.visibility || "(not set)"}

### Primary Outcomes
${brief.outcomes || "(not defined)"}

### Non-Goals / Out of Scope
${brief.nonGoals || "(not defined)"}

### Done-When Acceptance Criteria
${brief.doneCriteria || "(not defined)"}

### Data Sources
- **Allowed:** ${brief.allowedSources || "(not set)"}
- **Disallowed:** ${brief.disallowedSources || "(not set)"}

### Tooling & Compliance
- **Tooling:** ${brief.toolingAllowed || "(not set)"}
- **Compliance:** ${brief.compliance || "(not set)"}

### Evidence Register
- **Status:** ${brief.evidenceStatus || "unknown"}
${brief.evidenceRegister || "(unknown - verification needed)"}

---

## 1. Conversation Contract

### Inputs
${contract.inputs || "(not defined)"}

### Outputs
${contract.outputs || "(not defined)"}

### Top Tasks (ranked)
${contract.topTasks || "(not defined)"}

### Catastrophic Mistakes
${contract.catastrophicMistakes || "(not defined)"}

---

## 2. Instructions

${instructionBlock || "(no instruction layers filled)"}

---

## 3. Knowledge Files

${knowledge.files && knowledge.files.length > 0
  ? knowledge.files.map((f: { filename: string; type: string; topic: string; notes: string }, i: number) =>
      `${i + 1}. \`${f.filename || "(unnamed)"}\` [${f.type}] — ${f.topic || "(no topic)"}${f.notes ? `\n   *Routing note: ${f.notes}*` : ""}`
    ).join("\n")
  : "(no files planned)"}

${knowledge.retrievalNotes ? `**Retrieval notes:**\n${knowledge.retrievalNotes}` : ""}

---

## 4. Capabilities

${Object.entries(caps || {}).filter(([, v]) => v).map(([k]) => `- ✓ ${k}`).join("\n") || "(no capabilities configured)"}

---

## 5. Actions / Apps

**Choice:** ${actions.choice || "none"}
${actions.choice === "actions" ? `**Auth type:** ${actions.authType || "none"}
**Privacy Policy URL:** ${actions.privacyPolicyUrl || "(not set)"}
${actions.errorHandling ? `**Error handling:** ${actions.errorHandling}` : ""}` : ""}
${actions.choice === "apps" ? `**Apps notes:** ${actions.appsNotes || "(none)"}` : ""}

---

## 6. Conversation Starters

${starters.filter((s: string) => s.trim()).map((s: string, i: number) => `${i + 1}. "${s}"`).join("\n") || "(no starters written)"}

---

## 7. Test Matrix

${tests.cases && tests.cases.length > 0
  ? tests.cases.map((c: { category: string; prompt: string; expectedBehavior: string; result: string }, i: number) =>
      `**T${i + 1}** [${c.category}] ${c.result === "pass" ? "✓" : c.result === "fail" ? "✗" : "○"}\n- Prompt: ${c.prompt || "(empty)"}\n- Expected: ${c.expectedBehavior || "(not set)"}`
    ).join("\n\n")
  : "(no test cases defined)"}

---

## 8. Governance

**Visibility:** ${ship.visibility || "(not set)"}
**Version:** ${ship.currentVersion || "(not set)"}
**Owner:** ${ship.ownerName || "(not set)"}
**Scheduled review:** ${ship.scheduledReview || "(not set)"}
**Release decision:** ${ship.releaseDecision || "draft"}
**Release evidence status:** ${ship.evidenceStatus || "unknown"}
${ship.releaseEvidence || "(no release decision recorded)"}

### Change Log
${ship.changeLog || "(no changelog entry)"}

### Maintenance Cadence
${ship.maintenanceCadence || "(not defined)"}

---

## Evidence and Provenance Record
${evidenceSections.map(([label, status, notes]) => `### ${label}\n**Status:** ${status || "unknown"}\n${notes || "(unknown - verification needed)"}`).join("\n\n")}

### Change Ledger
  ${["step-2-change", "step-3-change", "step-4-change", "step-5-change"].map((key) => {
    const change = loadStep(key);
    return `- **${key}:** ${change.reason || "(no change reason recorded)"} | Expected: ${change.expectedEffect || "unknown"} | Tests: ${change.affectedTests || "unknown"} | Observed: ${change.observedResult || "unknown"} | Rollback: ${change.rollbackDecision || "unknown"}`;
  }).join("\n")}

---

*This spec was built using the okhp3-custom-gpt-builder Agent Skill v1.0.0 · Apache-2.0*
*Source: https://github.com/OKHP3/OverKill-Hill-FoundRy*
`;
}

export default function ExportPackage({ completedSteps: liveCompletedSteps }: { completedSteps?: Set<number> }) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"markdown" | "instructions" | "json">("markdown");
  const [storedCompletedSteps] = useState(loadCompletedSteps);
  const [generatedAt] = useState(() => new Date().toISOString());
  const completedSteps = liveCompletedSteps ?? storedCompletedSteps;
  const incompleteSteps = BUILD_STEPS.filter(({ id }) => !completedSteps.has(id));
  const evidencePackage = buildEvidencePackage(completedSteps, generatedAt);
  const fullMarkdown = buildMarkdown(evidencePackage);
  const structuredJson = JSON.stringify(evidencePackage, null, 2);

  const instructionsOnly = (() => {
    const layerData = loadStep("step-2");
    return INSTRUCTION_LAYERS
      .map(l => layerData[l.id] ? `## ${l.label}\n${layerData[l.id]}` : "")
      .filter(Boolean)
      .join("\n\n");
  })();

  const content = format === "markdown" ? fullMarkdown : format === "json" ? structuredJson : instructionsOnly;
  const ship = loadStep("step-8");
  const tests = loadStep("step-7");
  const maturity = evidencePackage.readiness.state === "blocked"
    ? "Blocked"
    : evidencePackage.readiness.state === "confirmed"
      ? "Confirmed (owner-declared)"
      : evidencePackage.readiness.state === "ready-for-review"
        ? "Ready for review"
        : "Incomplete";

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const download = () => {
    const brief = loadStep("step-0");
    const name = (brief.gptName || "custom-gpt").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const isJson = format === "json";
    const blob = new Blob([content], { type: isJson ? "application/json;charset=utf-8" : "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${name}-spec.${isJson ? "json" : "md"}`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          📦 Export Package
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Copy or download your complete GPT specification package. This is your source-of-truth artifact.
        </p>
        <div role="status" style={{ marginBottom: "1rem", padding: "0.85rem 1rem", background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", fontSize: "0.82rem" }}>
          <strong>Package readiness: {maturity}</strong><br />
          <span style={{ color: "var(--color-forge-muted-fg)" }}>
            {evidencePackage.readiness.completedSteps}/{evidencePackage.readiness.totalSteps} build steps complete. This summarizes recorded evidence and owner decisions; it does not validate runtime model behavior.
          </span>
          {evidencePackage.readiness.unresolvedItems.length > 0 && (
            <details style={{ marginTop: "0.55rem" }}>
              <summary style={{ cursor: "pointer", color: "var(--color-forge-fg)" }}>
                {evidencePackage.readiness.unresolvedItems.length} unresolved item{evidencePackage.readiness.unresolvedItems.length === 1 ? "" : "s"}
              </summary>
              <ul style={{ margin: "0.45rem 0 0", paddingLeft: "1.2rem", color: "var(--color-forge-muted-fg)" }}>
                {evidencePackage.readiness.unresolvedItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>
          )}
        </div>
      </div>

      {incompleteSteps.length > 0 && (
        <div
          role="alert"
          style={{
            marginBottom: "1rem",
            padding: "1rem 1.1rem",
            background: "color-mix(in srgb, var(--color-forge-accent) 10%, var(--color-forge-panel))",
            border: "1px solid var(--color-forge-accent)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-forge-fg)",
          }}
        >
          <strong style={{ display: "block", color: "var(--color-forge-accent)", marginBottom: "0.35rem" }}>
            ⚠️ This package is not complete yet
          </strong>
          <span style={{ display: "block", color: "var(--color-forge-muted-fg)", fontSize: "0.85rem", marginBottom: "0.65rem" }}>
            You can still export, but these required build steps are incomplete:
          </span>
          <ul style={{ display: "grid", gap: "0.3rem", margin: 0, paddingLeft: "1.25rem", fontSize: "0.85rem" }}>
            {incompleteSteps.map(({ id, label }) => (
              <li key={id}>{label}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {(["markdown", "instructions", "json"] as const).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              style={{
                padding: "0.4rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer",
                background: format === f ? "var(--color-forge-accent)" : "var(--color-forge-panel)",
                color: format === f ? "var(--color-forge-paper)" : "var(--color-forge-fg)",
                border: "1px solid var(--color-forge-border)", fontFamily: "var(--font-body)", fontSize: "0.82rem",
              }}>
               {f === "markdown" ? "Full Spec (Markdown)" : f === "json" ? "Evidence (JSON)" : "Instructions Only"}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <button onClick={copy} style={primaryBtn}>{copied ? "✓ Copied!" : "📋 Copy"}</button>
          <button onClick={download} style={secondaryBtn}>⬇ Download .{format === "json" ? "json" : "md"}</button>
        </div>
      </div>

      <pre style={{
        background: "var(--color-forge-espresso)", border: "1px solid var(--color-forge-border)",
        borderRadius: "var(--radius-md)", padding: "1.25rem",
        fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7,
        color: "var(--color-forge-fg)", whiteSpace: "pre-wrap",
        maxHeight: "calc(100vh - 280px)", overflowY: "auto",
      }}>
        {content}
      </pre>

      <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", fontSize: "0.8rem", color: "var(--color-forge-muted-fg)" }}>
         💡 <strong>Usage:</strong> The "Full Spec" is your version-controlled source of truth. The "Evidence (JSON)" export preserves readiness, provenance, boundaries, failure behavior, and phase records for machine review. The "Instructions Only" view is ready to paste directly into the ChatGPT builder's Instructions field.
      </div>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  background: "var(--color-forge-accent)", color: "var(--color-forge-paper)",
  border: "none", borderRadius: "var(--radius-md)", padding: "0.5rem 1rem",
  fontFamily: "var(--font-body)", fontSize: "0.85rem", cursor: "pointer", fontWeight: 600,
};
const secondaryBtn: React.CSSProperties = {
  background: "var(--color-forge-panel)", color: "var(--color-forge-fg)",
  border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.5rem 1rem",
  fontFamily: "var(--font-body)", fontSize: "0.85rem", cursor: "pointer",
};
