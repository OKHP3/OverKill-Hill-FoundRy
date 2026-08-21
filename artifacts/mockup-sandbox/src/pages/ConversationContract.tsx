import { useState, useEffect } from "react";

const STORAGE_KEY = "cgpt-step-1";

interface ContractData {
  inputs: string;
  outputs: string;
  topTasks: string;
  catastrophicMistakes: string;
}

const DEFAULT: ContractData = { inputs: "", outputs: "", topTasks: "", catastrophicMistakes: "" };

function load(): ContractData {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function ConversationContract({ onNext, onPrev, onComplete }: Props) {
  const [data, setData] = useState<ContractData>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // Step is complete once at least one field has content.
  const isComplete = Object.values(data).some(v => v.trim().length > 0);
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);
  const set = (k: keyof ContractData) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setData(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 1 · Conversation Contract
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Define what goes in, what comes out, and what a catastrophic failure looks like — before you write a single instruction.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <SField label="What inputs do users provide?" hint="Be specific: paste text, upload file, fill a form, provide an ID, select from options?">
          <textarea value={data.inputs} onChange={set("inputs")} autoComplete="off" rows={4}
            placeholder={"Example inputs:\n- Paste an invoice number and amount\n- Upload a quote PDF\n- Describe a customer situation in natural language\n- Provide a competitor name and product category"} />
        </SField>

        <SField label="What outputs must the GPT produce?" hint="Format, structure, length, tone, and any required fields">
          <textarea value={data.outputs} onChange={set("outputs")} autoComplete="off" rows={4}
            placeholder={"Example outputs:\n- A 3-section response: Executive Summary (2 sentences) / Risk Analysis (bullets) / Recommended Action (1 sentence)\n- Always include the policy clause number being referenced\n- End with a confidence rating: High / Medium / Low"} />
        </SField>

        <SField label="Top 10 tasks (ranked by priority)" hint="Most important first — this shapes what gets optimized in instructions">
          <textarea value={data.topTasks} onChange={set("topTasks")} autoComplete="off" rows={8}
            placeholder={"1. Identify discount policy violations in submitted quotes\n2. Flag missing approval chain signatures\n3. Calculate margin impact of proposed discounts\n4. Cite the exact policy clause being violated\n5. Draft a response for the deal desk\n6. Escalate multi-million dollar exceptions to legal\n7. Explain the approval path for non-standard terms\n8. Summarize anomalies for weekly leadership review\n9. Generate a quote comparison report\n10. Archive the decision rationale"} />
        </SField>

        <SField label="What mistakes are catastrophic?" hint="The failure modes you cannot tolerate — these become hard guardrails in instructions">
          <textarea value={data.catastrophicMistakes} onChange={set("catastrophicMistakes")} autoComplete="off" rows={4}
            placeholder={"- Approving a discount that violates policy (must never invent approval authority)\n- Presenting hallucinated data as fact from files that don't contain it\n- Leaking confidential pricing from uploaded files in response to external-facing output\n- Missing a PHI/PII data restriction and exposing sensitive info"} />
        </SField>
      </div>

      <div className="callout" style={{ marginTop: "1.5rem" }}>
        <strong>💡 Design tip:</strong> After filling this in, compare your outputs list against your catastrophic mistakes list. If any output could become a catastrophe if wrong, that output needs explicit guardrails in Step 2 (Instructions).
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 2: Instruction Stack →" />
    </div>
  );
}

function SField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-forge-accent)", marginBottom: "0.25rem" }}>{label}</label>
      {hint && <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.35rem" }}>{hint}</div>}
      {children}
    </div>
  );
}

function NavButtons({ onNext, onPrev, nextLabel = "Next →", showPrev = false }:
  { onNext: () => void; onPrev?: () => void; nextLabel?: string; showPrev?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--color-forge-border)" }}>
      {showPrev && onPrev && <button onClick={onPrev} style={secondaryBtn}>← Back</button>}
      <button onClick={onNext} style={primaryBtn}>{nextLabel}</button>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  background: "var(--color-forge-accent)", color: "var(--color-forge-paper)",
  border: "none", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer", fontWeight: 600,
};
const secondaryBtn: React.CSSProperties = {
  background: "var(--color-forge-panel)", color: "var(--color-forge-fg)",
  border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer",
};
