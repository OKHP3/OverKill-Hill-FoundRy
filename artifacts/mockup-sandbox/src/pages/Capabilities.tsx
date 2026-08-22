import { useState, useEffect } from "react";
import { CAPABILITIES } from "../data/knowledge";
import { readProjectValue, writeProjectValue } from "../lib/creatorStorage";
import { ChangeLedger, EMPTY_CHANGE_RECORD, PhaseGate, type ChangeRecord } from "../components/PhaseGate";

const STORAGE_KEY = "step-4";
type CapabilityRisk = "low" | "medium" | "high";

function load(): Record<string, boolean> {
  try { return (readProjectValue(STORAGE_KEY) as Record<string, boolean> | undefined) ?? {}; }
  catch { return {}; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function Capabilities({ onNext, onPrev, onComplete }: Props) {
  const [caps, setCaps] = useState<Record<string, boolean>>(() => {
    const saved = load();
    const initial: Record<string, boolean> = {};
    CAPABILITIES.forEach(c => { initial[c.id] = c.id in saved ? saved[c.id] : c.default; });
    return initial;
  });
  const [rationale, setRationale] = useState<Record<string, string>>(() => {
    try { return (readProjectValue(STORAGE_KEY + "-rationale") as Record<string, string> | undefined) ?? {}; }
    catch { return {}; }
  });
  const [change, setChange] = useState<ChangeRecord>(() => { try { return { ...EMPTY_CHANGE_RECORD, ...(readProjectValue(STORAGE_KEY + "-change") as Partial<ChangeRecord> | undefined) }; } catch { return EMPTY_CHANGE_RECORD; } });

  useEffect(() => {
    writeProjectValue(STORAGE_KEY, caps);
    writeProjectValue(STORAGE_KEY + "-rationale", rationale);
    writeProjectValue(STORAGE_KEY + "-change", change);
  }, [caps, rationale, change]);

  // Step is complete once the user has reviewed the capabilities page (caps are initialized on mount).
  const isComplete = Object.keys(caps).length > 0;
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);

  const enabledCount = Object.values(caps).filter(Boolean).length;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 4 · Capabilities
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Enable only what the job requires. More tools = more failure paths.
        </p>
        <PhaseGate input="Job requirements and contract." output="Smallest justified capability set." exitGate="Every enabled tool has purpose, boundary, fallback, and owner." recovery="Disable the capability and return to tool policy." evidence="Capability rationale and failure test reference." />
      </div>

      <div className="callout" style={{ marginBottom: "1.5rem" }}>
        <strong>Rule of minimum tool surface:</strong> A code-review GPT with Image Generation enabled is a distraction at best and a token sink at worst. Disable every capability the GPT doesn't explicitly need. For each enabled capability, add a Tool Policy rule in Layer 4 of your instructions specifying exactly when and how to use it.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        {CAPABILITIES.map(cap => {
          const enabled = caps[cap.id] ?? cap.default;
          const risk = cap.risk as CapabilityRisk;
          return (
            <div key={cap.id} style={{
              padding: "1rem 1.25rem",
              background: enabled ? "var(--color-forge-panel)" : "var(--color-forge-surface)",
              border: `1px solid ${enabled ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
              borderRadius: "var(--radius-md)",
              transition: "all 150ms",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem", color: enabled ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)" }}>
                      {cap.label}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem", padding: "0.15rem 0.4rem",
                      borderRadius: "4px", border: "1px solid var(--color-forge-border)",
                      color: cap.default ? "var(--color-forge-warn)" : "var(--color-forge-muted-fg)",
                    }}>
                      Default {cap.default ? "ON" : "OFF"}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.65rem", padding: "0.15rem 0.4rem",
                      borderRadius: "4px",
                      background: risk === "high" ? "rgba(239,68,68,0.15)" : risk === "medium" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.1)",
                      color: risk === "high" ? "var(--color-forge-danger)" : risk === "medium" ? "var(--color-forge-warn)" : "var(--color-forge-success)",
                    }}>
                      risk: {risk}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--color-forge-muted-fg)", margin: 0 }}>
                    {cap.description}
                  </p>
                </div>
                {/* Toggle */}
                <div
                  onClick={() => setCaps(prev => ({ ...prev, [cap.id]: !prev[cap.id] }))}
                  style={{
                    width: 48, height: 26, borderRadius: 13, cursor: "pointer",
                    background: enabled ? "var(--color-forge-accent)" : "var(--color-forge-muted)",
                    position: "relative", flexShrink: 0, marginLeft: "1rem", transition: "background 200ms",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%", background: "white",
                    position: "absolute", top: 3, left: enabled ? 25 : 3, transition: "left 200ms",
                  }} />
                </div>
              </div>

              {enabled && (
                <div style={{ marginTop: "0.75rem" }}>
                  <input
                    value={rationale[cap.id] || ""}
                    onChange={e => setRationale(prev => ({ ...prev, [cap.id]: e.target.value }))}
                    placeholder={`Why is ${cap.label} needed? When exactly should it trigger?`}
                    style={{ fontSize: "0.82rem" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div style={{ padding: "1rem 1.25rem", background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>
          Capabilities summary — {enabledCount} of {CAPABILITIES.length} enabled
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CAPABILITIES.map(cap => (
            <span key={cap.id} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.72rem", padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              background: caps[cap.id] ? "rgba(196,106,44,0.2)" : "var(--color-forge-muted)",
              color: caps[cap.id] ? "var(--color-forge-accent)" : "var(--color-forge-muted-fg)",
              textDecoration: caps[cap.id] ? "none" : "line-through",
            }}>
              {cap.label.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
      <ChangeLedger value={change} onChange={setChange} />

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 5: Actions / Apps →" />
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
