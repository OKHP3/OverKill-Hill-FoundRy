import { useState, useCallback, type ReactNode } from "react";
import { BUILD_STEPS, INSTRUCTION_LAYERS } from "../data/knowledge";
import { readProjectValue } from "../lib/creatorStorage";
import { calculateReadiness, type ReadinessState } from "../lib/readiness";

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
    confidence: "low" | "medium" | "high";
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
  const readiness = calculateReadiness({
    "step-0": brief, "step-1": contract, "step-2": layerData, "step-3": knowledge,
    "step-4": caps, "step-5": actions, "step-6": starters, "step-7": tests, "step-8": ship,
  }, completedSteps);
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
      state: readiness.state,
      confidence: readiness.confidence,
      completedSteps: readiness.completedSteps,
      totalSteps: readiness.totalSteps,
      blockers: readiness.blockers,
      unresolvedItems: readiness.unresolvedItems,
      behavioralValidation: readiness.behavioralValidation,
    },
    evidence: readiness.evidence,
    humanConfirmation: {
      required: true,
      recorded: readiness.humanConfirmation.recorded,
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
      unresolved: readiness.unresolvedItems,
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
**Package readiness:** ${evidencePackage.readiness.state}
**Confidence:** ${evidencePackage.readiness.confidence}
**Behavioral validation:** not claimed by this export; a passing protected holdout is required before making a behavioral claim.
**Human confirmation:** ${evidencePackage.humanConfirmation.recorded ? `recorded by ${evidencePackage.humanConfirmation.owner || "owner"}` : "required before release"}
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

function renderInlineMarkdown(value: string): ReactNode[] {
  return value.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|~~[^~]+~~|\*[^*]+\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} style={{ color: "var(--color-forge-highlight)", background: "var(--color-forge-panel)", padding: "0.08rem 0.25rem", borderRadius: "0.2rem" }}>{part.slice(1, -1)}</code>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link && /^(https?:\/\/|mailto:)/i.test(link[2])) {
      return <a key={index} href={link[2]} target="_blank" rel="noreferrer" style={{ color: "var(--color-forge-highlight)" }}>{link[1]}</a>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <del key={index}>{part.slice(2, -2)}</del>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <span key={index}>{part}</span>;
  });
}

function renderMarkdownPreview(markdown: string): ReactNode[] {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let orderedList: string[] = [];
  let quote: string[] = [];
  let code: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push(<p key={`paragraph-${blocks.length}`} style={{ margin: "0 0 0.85rem", lineHeight: 1.65 }}>{renderInlineMarkdown(paragraph.join(" "))}</p>);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} style={{ margin: "0 0 0.85rem", paddingLeft: "1.35rem", lineHeight: 1.65 }}>
        {list.map((item, index) => <li key={index}>{renderInlineMarkdown(item)}</li>)}
      </ul>,
    );
    list = [];
  };
  const flushOrderedList = () => {
    if (orderedList.length === 0) return;
    blocks.push(
      <ol key={`ordered-list-${blocks.length}`} style={{ margin: "0 0 0.85rem", paddingLeft: "1.55rem", lineHeight: 1.65 }}>
        {orderedList.map((item, index) => <li key={index}>{renderInlineMarkdown(item)}</li>)}
      </ol>,
    );
    orderedList = [];
  };
  const flushQuote = () => {
    if (quote.length === 0) return;
    blocks.push(
      <blockquote key={`quote-${blocks.length}`} style={{ margin: "0 0 0.85rem", paddingLeft: "0.9rem", borderLeft: "3px solid var(--color-forge-highlight)", color: "var(--color-forge-muted)", lineHeight: 1.65 }}>
        {renderInlineMarkdown(quote.join(" "))}
      </blockquote>,
    );
    quote = [];
  };

  lines.forEach((line, index) => {
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushQuote();
      if (code === null) {
        code = [];
      } else {
        blocks.push(<pre key={`code-${index}`} style={{ margin: "0 0 0.85rem", padding: "0.8rem", overflowX: "auto", background: "var(--color-forge-panel)", borderRadius: "0.3rem" }}><code>{code.join("\n")}</code></pre>);
        code = null;
      }
      return;
    }
    if (code !== null) {
      code.push(line);
      return;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    const bullet = line.match(/^- (.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    const quoteLine = line.match(/^>\s?(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushQuote();
      const level = Math.min(heading[1].length, 4);
      const Heading = ({ 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const)[level as 1 | 2 | 3 | 4];
      blocks.push(<Heading key={`heading-${index}`} style={{ margin: "1.2rem 0 0.55rem", color: level === 1 ? "var(--color-forge-accent)" : "var(--color-forge-fg)", fontFamily: "var(--font-heading)", fontSize: level === 1 ? "1.4rem" : level === 2 ? "1.1rem" : "0.95rem" }}>{renderInlineMarkdown(heading[2])}</Heading>);
      return;
    }
    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushQuote();
      blocks.push(<hr key={`rule-${index}`} style={{ border: 0, borderTop: "1px solid var(--color-forge-border)", margin: "1rem 0" }} />);
      return;
    }
    if (bullet) {
      flushParagraph();
      flushOrderedList();
      flushQuote();
      list.push(bullet[1]);
      return;
    }
    if (numbered) {
      flushParagraph();
      flushList();
      flushQuote();
      orderedList.push(numbered[1]);
      return;
    }
    if (quoteLine) {
      flushParagraph();
      flushList();
      flushOrderedList();
      quote.push(quoteLine[1]);
      return;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushOrderedList();
      flushQuote();
      return;
    }
    flushList();
    flushOrderedList();
    flushQuote();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();
  flushOrderedList();
  flushQuote();
  const remainingCode = code;
  if (remainingCode !== null) {
    blocks.push(<pre key={`code-final-${blocks.length}`} style={{ margin: "0 0 0.85rem", padding: "0.8rem", overflowX: "auto", background: "var(--color-forge-panel)", borderRadius: "0.3rem" }}><code>{remainingCode.join("\n")}</code></pre>);
  }
  return blocks;
}

export default function ExportPackage({ completedSteps: liveCompletedSteps }: { completedSteps?: Set<number> }) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"markdown" | "instructions" | "json">("markdown");
  const [markdownView, setMarkdownView] = useState<"raw" | "preview">("raw");
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
        {format === "markdown" && (
          <div style={{ display: "flex", gap: "0.4rem", marginLeft: "0.25rem" }} aria-label="Markdown view">
            {(["raw", "preview"] as const).map(view => (
              <button key={view} onClick={() => setMarkdownView(view)}
                style={{
                  padding: "0.35rem 0.6rem", borderRadius: "var(--radius-md)", cursor: "pointer",
                  background: markdownView === view ? "var(--color-forge-highlight)" : "transparent",
                  color: markdownView === view ? "var(--color-forge-espresso)" : "var(--color-forge-muted-fg)",
                  border: "1px solid var(--color-forge-border)", fontFamily: "var(--font-body)", fontSize: "0.78rem",
                }}>
                {view === "raw" ? "Raw Markdown" : "Rendered Preview"}
              </button>
            ))}
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <button onClick={copy} style={primaryBtn}>{copied ? "✓ Copied!" : "📋 Copy"}</button>
          <button onClick={download} style={secondaryBtn}>⬇ Download .{format === "json" ? "json" : "md"}</button>
        </div>
      </div>

      {format === "markdown" && markdownView === "preview" ? (
        <article data-testid="markdown-preview" aria-label="Rendered Markdown preview" style={{
          background: "var(--color-forge-espresso)", border: "1px solid var(--color-forge-border)",
          borderRadius: "var(--radius-md)", padding: "1.25rem",
          color: "var(--color-forge-fg)", maxHeight: "calc(100vh - 280px)", overflowY: "auto",
        }}>
          {renderMarkdownPreview(content)}
        </article>
      ) : (
        <pre style={{
          background: "var(--color-forge-espresso)", border: "1px solid var(--color-forge-border)",
          borderRadius: "var(--radius-md)", padding: "1.25rem",
          fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7,
          color: "var(--color-forge-fg)", whiteSpace: "pre-wrap",
          maxHeight: "calc(100vh - 280px)", overflowY: "auto",
        }}>
          {content}
        </pre>
      )}

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
