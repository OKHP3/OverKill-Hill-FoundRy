import type { ReactNode } from "react";

export type EvidenceStatus = "unknown" | "inferred" | "confirmed" | "observed";

export const EVIDENCE_OPTIONS: Array<{ value: EvidenceStatus; label: string }> = [
  { value: "unknown", label: "Unknown - needs verification" },
  { value: "inferred", label: "Inferred - based on a design assumption" },
  { value: "confirmed", label: "Confirmed - owner or source confirmed" },
  { value: "observed", label: "Observed - recorded from a test or review" },
];

export interface ChangeRecord {
  reason: string;
  expectedEffect: string;
  affectedTests: string;
  observedResult: string;
  rollbackDecision: string;
}

export const EMPTY_CHANGE_RECORD: ChangeRecord = {
  reason: "",
  expectedEffect: "",
  affectedTests: "",
  observedResult: "",
  rollbackDecision: "",
};

export function PhaseGate({
  input,
  output,
  exitGate,
  recovery,
  evidence,
  children,
}: {
  input: string;
  output: string;
  exitGate: string;
  recovery: string;
  evidence: string;
  children?: ReactNode;
}) {
  return (
    <section className="forge-panel" aria-label="Phase gate" style={{ marginBottom: "1.25rem", borderLeft: "3px solid var(--color-forge-accent)" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-accent)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.65rem" }}>
        Phase gate · reviewable, not irreversible
      </div>
      <div className="forge-cols-2" style={{ gap: "0.65rem", fontSize: "0.78rem" }}>
        <div><strong>Input</strong><div style={{ color: "var(--color-forge-muted-fg)" }}>{input}</div></div>
        <div><strong>Output</strong><div style={{ color: "var(--color-forge-muted-fg)" }}>{output}</div></div>
        <div><strong>Exit gate</strong><div style={{ color: "var(--color-forge-muted-fg)" }}>{exitGate}</div></div>
        <div><strong>Recovery route</strong><div style={{ color: "var(--color-forge-muted-fg)" }}>{recovery}</div></div>
      </div>
      <div style={{ marginTop: "0.65rem", paddingTop: "0.55rem", borderTop: "1px solid var(--color-forge-border)", fontSize: "0.78rem" }}>
        <strong>Evidence required:</strong> <span style={{ color: "var(--color-forge-muted-fg)" }}>{evidence}</span>
      </div>
      {children}
    </section>
  );
}

export function EvidenceSelect({ value, onChange }: { value: EvidenceStatus; onChange: (value: EvidenceStatus) => void }) {
  return (
    <select aria-label="Evidence status" value={value} onChange={(event) => onChange(event.target.value as EvidenceStatus)} style={{ fontSize: "0.8rem" }}>
      {EVIDENCE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  );
}

export function ChangeLedger({ value, onChange }: { value: ChangeRecord; onChange: (value: ChangeRecord) => void }) {
  const fields: Array<[keyof ChangeRecord, string, string]> = [
    ["reason", "Why this changed", "Failure or opportunity that prompted the change"],
    ["expectedEffect", "Expected effect", "What should improve, and how will you know?"],
    ["affectedTests", "Affected tests", "Test IDs or acceptance checks to rerun"],
    ["observedResult", "Observed result", "Leave Unknown until a review or test is run"],
    ["rollbackDecision", "Rollback decision", "Keep, revise, revert, or defer, with rationale"],
  ];
  return (
    <details style={{ marginTop: "1rem" }}>
      <summary style={{ cursor: "pointer", color: "var(--color-forge-accent)", fontFamily: "var(--font-mono)", fontSize: "0.78rem" }}>Record change evidence</summary>
      <div style={{ display: "grid", gap: "0.65rem", marginTop: "0.75rem" }}>
        {fields.map(([key, label, placeholder]) => (
          <label key={key} style={{ fontSize: "0.78rem" }}>
            <span style={{ display: "block", marginBottom: "0.25rem" }}>{label}</span>
            <textarea rows={2} value={value[key]} onChange={(event) => onChange({ ...value, [key]: event.target.value })} placeholder={placeholder} />
          </label>
        ))}
      </div>
    </details>
  );
}