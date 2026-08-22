import { useState, useEffect } from "react";
import { VISIBILITY_OPTIONS, VERSION_SCHEME } from "../data/knowledge";
import { EvidenceSelect, PhaseGate, type EvidenceStatus } from "../components/PhaseGate";

const STORAGE_KEY = "cgpt-step-8";

interface ShipData {
  visibility: string;
  currentVersion: string;
  changeLog: string;
  maintenanceCadence: string;
  ownerName: string;
  builderProfileVerified: boolean;
  scheduledReview: string;
  releaseDecision: "draft" | "validated" | "release-ready";
  releaseEvidence: string;
  evidenceStatus: EvidenceStatus;
}

const DEFAULT: ShipData = {
  visibility: "private", currentVersion: "v0.1",
  changeLog: "", maintenanceCadence: "", ownerName: "", builderProfileVerified: false, scheduledReview: "",
  releaseDecision: "draft", releaseEvidence: "", evidenceStatus: "unknown",
};

function load(): ShipData {
  try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return DEFAULT; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function ShipGovern({ onPrev, onComplete }: Props) {
  const [data, setData] = useState<ShipData>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // Step is complete once the owner name is filled in.
  const isComplete = data.ownerName.trim().length > 0 && data.releaseDecision !== "draft" && data.releaseEvidence.trim().length > 0 && data.evidenceStatus !== "unknown";
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);
  const set = (k: keyof ShipData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData(prev => ({ ...prev, [k]: e.target.value }));

  const shipReady =
    data.visibility !== "" &&
    data.currentVersion !== "" &&
    data.ownerName.trim() !== "" &&
    (data.visibility !== "store" || data.builderProfileVerified);

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 8 · Ship & Govern
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          GPTs are not set-and-forget. This step sets your visibility, version, and maintenance commitment.
        </p>
        <PhaseGate input="Validated evidence from all prior phases." output="A release decision and maintenance record." exitGate="Owner confirms draft, validated, or release-ready without claiming model quality." recovery="Stay draft or validated; schedule the missing evidence." evidence="Release decision, provenance, owner, and review date." />
      </div>

      {/* Visibility */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Visibility</label>
        <div className="forge-cols-3" style={{ gap: "0.75rem", marginTop: "0.35rem" }}>
          {VISIBILITY_OPTIONS.map(opt => (
            <button key={opt.value} onClick={() => setData(prev => ({ ...prev, visibility: opt.value }))}
              style={{
                padding: "1rem", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
                background: data.visibility === opt.value ? "rgba(196,106,44,0.15)" : "var(--color-forge-panel)",
                border: `2px solid ${data.visibility === opt.value ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
                fontFamily: "var(--font-body)", transition: "all 150ms",
              }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.35rem" }}>{opt.icon}</div>
              <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--color-forge-fg)", marginBottom: "0.2rem" }}>{opt.label}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.3rem" }}>{opt.useCase}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-forge-accent)" }}>Req: {opt.requirements}</div>
            </button>
          ))}
        </div>
        {data.visibility === "store" && (
          <div style={{ marginTop: "0.75rem" }}>
            <label style={{ display: "flex", gap: "0.75rem", alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={data.builderProfileVerified}
                onChange={e => setData(prev => ({ ...prev, builderProfileVerified: e.target.checked }))}
                style={{ width: "auto", accentColor: "var(--color-forge-accent)" }} />
              <span style={{ fontSize: "0.85rem" }}>Builder Profile verified (name or domain verification required for GPT Store)</span>
            </label>
          </div>
        )}
      </div>

      {/* Versioning */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Current Version</label>
        <div className="forge-cols-3" style={{ gap: "0.5rem", marginBottom: "0.75rem" }}>
          {VERSION_SCHEME.map(vs => (
            <button key={vs.version} onClick={() => setData(prev => ({ ...prev, currentVersion: vs.version }))}
              style={{
                padding: "0.6rem 0.75rem", borderRadius: "var(--radius-md)", cursor: "pointer", textAlign: "left",
                background: data.currentVersion === vs.version ? "rgba(196,106,44,0.15)" : "var(--color-forge-panel)",
                border: `1px solid ${data.currentVersion === vs.version ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
                fontFamily: "var(--font-body)",
              }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-forge-accent)" }}>{vs.version}</div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-forge-muted-fg)", marginTop: "0.15rem" }}>{vs.meaning}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Governance */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        <div>
          <label style={labelStyle}>Owner / Maintainer</label>
          <input value={data.ownerName} onChange={set("ownerName")} autoComplete="organization" placeholder="Team name, person, or org unit responsible for this GPT" />
        </div>
        <div>
          <label style={labelStyle}>Change log entry for this version</label>
          <textarea value={data.changeLog} onChange={set("changeLog")} rows={3}
            placeholder={"v0.1 — Initial build\n- Defined 8-layer instruction stack\n- Uploaded 3 knowledge files\n- Wrote 12 test cases"} />
        </div>
        <div>
          <label style={labelStyle}>Maintenance cadence</label>
          <textarea value={data.maintenanceCadence} onChange={set("maintenanceCadence")} rows={3}
            placeholder={"- Re-test after every OpenAI model update (models retire frequently — mid-2026 saw GPT-5.5 rollout)\n- Refresh knowledge files when source material updates\n- Monitor for behavior drift via user feedback\n- Quarterly rubric review"} />
        </div>
        <div>
          <label style={labelStyle}>Scheduled review date</label>
          <input value={data.scheduledReview} onChange={set("scheduledReview")} type="date"
            style={{ maxWidth: "200px" }} />
        </div>
      </div>
      <div className="forge-panel" style={{ marginBottom: "1.5rem", display: "grid", gap: "0.75rem" }}>
        <label style={labelStyle}>Release decision
          <select value={data.releaseDecision} onChange={e => setData(prev => ({ ...prev, releaseDecision: e.target.value as ShipData["releaseDecision"] }))}>
            <option value="draft">Draft - incomplete evidence</option>
            <option value="validated">Validated - checks recorded, runtime quality remains unknown</option>
            <option value="release-ready">Release-ready - owner approved this release scope</option>
          </select>
        </label>
        <label style={labelStyle}>Release evidence and owner decision<textarea value={data.releaseEvidence} onChange={e => setData(prev => ({ ...prev, releaseEvidence: e.target.value }))} rows={3} placeholder="Summarize evidence, unresolved unknowns, and why this decision is appropriate" /></label>
        <label style={labelStyle}>Evidence status <EvidenceSelect value={data.evidenceStatus} onChange={evidenceStatus => setData(prev => ({ ...prev, evidenceStatus }))} /></label>
      </div>

      {/* Ship gate */}
      <div style={{
        padding: "1.25rem",
        background: shipReady ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
        border: `2px solid ${shipReady ? "var(--color-forge-success)" : "var(--color-forge-warn)"}`,
        borderRadius: "var(--radius-md)",
      }}>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: shipReady ? "var(--color-forge-success)" : "var(--color-forge-warn)", marginBottom: "0.75rem" }}>
          {shipReady ? "✓ Administrative ship gate passed" : "⚠ Release evidence is incomplete"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[
            { ok: data.visibility !== "", label: "Visibility level selected" },
            { ok: data.currentVersion !== "", label: "Version assigned" },
            { ok: data.ownerName.trim() !== "", label: "Owner identified" },
            { ok: data.visibility !== "store" || data.builderProfileVerified, label: "Builder Profile verified (required for GPT Store)" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", alignItems: "center" }}>
              <span style={{ color: item.ok ? "var(--color-forge-success)" : "var(--color-forge-danger)" }}>{item.ok ? "✓" : "✗"}</span>
              <span style={{ color: item.ok ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)" }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--color-forge-muted-fg)" }}>
          A checklist does not prove model quality. Start at "Only Me"; promote only when observed evidence and owner review support the decision.
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginTop: "2rem", paddingTop: "1rem", borderTop: "1px solid var(--color-forge-border)" }}>
        <button onClick={onPrev} style={secondaryBtn}>← Back</button>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <span style={{ display: "flex", alignItems: "center", fontSize: "0.85rem", color: "var(--color-forge-success)", fontWeight: 600 }}>
            🎉 Build pipeline complete! Use Export to generate your spec package.
          </span>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem",
  color: "var(--color-forge-accent)", marginBottom: "0.25rem",
};
const secondaryBtn: React.CSSProperties = {
  background: "var(--color-forge-panel)", color: "var(--color-forge-fg)",
  border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.6rem 1.25rem",
  fontFamily: "var(--font-body)", fontSize: "0.9rem", cursor: "pointer",
};
