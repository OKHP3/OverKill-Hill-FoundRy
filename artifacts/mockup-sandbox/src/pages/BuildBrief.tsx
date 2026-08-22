import { useState, useEffect } from "react";
import { EvidenceSelect, PhaseGate, type EvidenceStatus } from "../components/PhaseGate";

const STORAGE_KEY = "cgpt-step-0";

interface BriefData {
  gptName: string;
  primaryUsers: string;
  outcomes: string;
  nonGoals: string;
  doneCriteria: string;
  allowedSources: string;
  disallowedSources: string;
  toolingAllowed: string;
  compliance: string;
  evidenceStatus: EvidenceStatus;
  evidenceRegister: string;
}

const DEFAULT: BriefData = {
  gptName: "", primaryUsers: "", outcomes: "", nonGoals: "",
  doneCriteria: "", allowedSources: "", disallowedSources: "",
  toolingAllowed: "", compliance: "",
  evidenceStatus: "unknown", evidenceRegister: "",
};

function load(): BriefData {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function BuildBrief({ onNext, onComplete }: Props) {
  const [data, setData] = useState<BriefData>(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Step is complete once the user has named their GPT.
  const isComplete = data.gptName.trim().length > 0;
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);

  const set = (k: keyof BriefData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData(prev => ({ ...prev, [k]: e.target.value }));

  const filled = Object.values(data).filter(v => v.trim()).length;
  const total = Object.keys(DEFAULT).length;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 0 · Build Brief
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Fill this before writing a single instruction line. A GPT for "everyone" becomes generic sludge — define the job tightly.
        </p>
         <div className="callout" style={{ marginTop: "0.75rem" }}>
          <strong>Core principle:</strong> If a Custom GPT cannot outperform a well-written one-off prompt, it does not deserve to exist as a GPT.
        </div>
        <PhaseGate input="A named job, audience, boundaries, and acceptance checks." output="A scoped Build Brief." exitGate="Primary user, job, boundary, and measurable checks are confirmed." recovery="Return to the brief; mark assumptions unknown instead of filling gaps." evidence="Owner confirmation and source register for platform or policy claims." />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <Field label="GPT Name" hint="Short, descriptive, specific to the job — not 'AI Assistant'">
          <input value={data.gptName} onChange={set("gptName")} autoComplete="off" placeholder="e.g. Margin Guard, Invoice Follow-Up Drafter, Brand Voice Editor" />
        </Field>

        <Field label="Primary User(s)" hint="Role, expertise level, context">
          <input value={data.primaryUsers} onChange={set("primaryUsers")} autoComplete="off" placeholder="e.g. Sales reps reviewing enterprise quotes before submission" />
        </Field>

        <Field label="Primary Outcomes (list 3)" hint="What success looks like for the user — be specific">
          <textarea value={data.outcomes} onChange={set("outcomes")} autoComplete="off" rows={4}
            placeholder={"1. Draft a compliant follow-up email for overdue invoices in <2 min\n2. Flag policy exceptions before they reach the deal desk\n3. Surface the exact policy clause being violated"} />
        </Field>

        <Field label="Non-Goals / Out of Scope (list 5)" hint="What this GPT will NOT do — explicit scope bounds prevent drift">
          <textarea value={data.nonGoals} onChange={set("nonGoals")} autoComplete="off" rows={4}
            placeholder={"1. Not a general customer service bot\n2. Does not provide legal advice\n3. Does not approve discounts\n4. Does not access live CRM data\n5. Does not handle pricing for international markets"} />
        </Field>

        <Field label='"Done When" Acceptance Criteria (5 measurable checks)' hint="Objective tests that prove the GPT works">
          <textarea value={data.doneCriteria} onChange={set("doneCriteria")} autoComplete="off" rows={4}
            placeholder={"1. Correctly identifies policy violations in 10/10 test quotes\n2. Refuses to invent discount approvals\n3. Cites the correct policy clause in outputs\n4. Gracefully handles missing inputs by asking targeted questions\n5. Produces output in the specified 3-section format consistently"} />
        </Field>

        <div className="forge-cols-2" style={{ gap: "1rem" }}>
          <Field label="Allowed Data Sources" hint="What the GPT can reference">
            <textarea value={data.allowedSources} onChange={set("allowedSources")} autoComplete="off" rows={3}
              placeholder="Uploaded policy files, current conversation context, web search for public data" />
          </Field>
          <Field label="Disallowed Data Sources" hint="What to refuse or ignore">
            <textarea value={data.disallowedSources} onChange={set("disallowedSources")} autoComplete="off" rows={3}
              placeholder="Live CRM, financial systems, internal employee data, competitor pricing" />
          </Field>
        </div>

        <Field label="Tooling Allowed" hint="Which capabilities and integrations can be enabled">
          <input value={data.toolingAllowed} onChange={set("toolingAllowed")} autoComplete="off"
            placeholder="e.g. Web Search (off), Code Interpreter (off), Knowledge files (on), Actions (future)" />
        </Field>

        <Field label="Safety / Compliance Constraints" hint="PII, PHI, financial advice, legal advice, regulated content">
          <textarea value={data.compliance} onChange={set("compliance")} autoComplete="off" rows={3}
            placeholder={"Never output PII beyond what the user provides\nNo financial/legal advice — route to human\nNo confidential pricing outside this GPT"} />
        </Field>
        <div className="forge-cols-2" style={{ gap: "1rem" }}>
          <Field label="Evidence status" hint="Do not treat an assumption as a confirmed fact">
            <EvidenceSelect value={data.evidenceStatus} onChange={(evidenceStatus) => setData(prev => ({ ...prev, evidenceStatus }))} />
          </Field>
          <Field label="Evidence and verification register" hint="What is confirmed, inferred, theoretical, preference, or unknown?">
            <textarea value={data.evidenceRegister} onChange={set("evidenceRegister")} rows={3} placeholder="Requirement: source or owner; status; verification needed" />
          </Field>
        </div>
      </div>

      {/* Progress indicator */}
      <div style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--color-forge-panel)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-forge-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--color-forge-muted-fg)" }}>Fields completed</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: filled === total ? "var(--color-forge-success)" : "var(--color-forge-warn)" }}>
            {filled} / {total}
          </span>
        </div>
        <div style={{ height: 4, background: "var(--color-forge-border)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(filled / total) * 100}%`, background: filled === total ? "var(--color-forge-success)" : "var(--color-forge-accent)", borderRadius: 2, transition: "width 300ms" }} />
        </div>
      </div>

      <NavButtons onNext={onNext} nextLabel="Step 1: Conversation Contract →" />
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-forge-accent)", marginBottom: "0.25rem", letterSpacing: "0.02em" }}>
        {label}
      </label>
      {hint && <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.35rem" }}>{hint}</div>}
      {children}
    </div>
  );
}

function NavButtons({ onNext, onPrev, nextLabel = "Next →", showPrev = false }:
  { onNext: () => void; onPrev?: () => void; nextLabel?: string; showPrev?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--color-forge-border)" }}>
      {showPrev && onPrev && (
        <button onClick={onPrev} style={secondaryBtn}>← Back</button>
      )}
      <button onClick={onNext} style={primaryBtn}>{nextLabel}</button>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  background: "var(--color-forge-accent)", color: "var(--color-forge-paper)",
  border: "none", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer", fontWeight: 600,
  transition: "opacity 150ms",
};
const secondaryBtn: React.CSSProperties = {
  background: "var(--color-forge-panel)", color: "var(--color-forge-fg)",
  border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer",
};
