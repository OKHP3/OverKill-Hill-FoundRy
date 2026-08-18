import { useState, useEffect } from "react";
import { CAPABILITIES } from "../data/knowledge";

const STORAGE_KEY = "cgpt-step-4";

function load(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; }

export default function Capabilities({ onNext, onPrev }: Props) {
  const [caps, setCaps] = useState<Record<string, boolean>>(() => {
    const saved = load();
    const initial: Record<string, boolean> = {};
    CAPABILITIES.forEach(c => { initial[c.id] = c.id in saved ? saved[c.id] : c.default; });
    return initial;
  });
  const [rationale, setRationale] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY + "-rationale") || "{}"); }
    catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(caps));
    localStorage.setItem(STORAGE_KEY + "-rationale", JSON.stringify(rationale));
  }, [caps, rationale]);

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
      </div>

      <div className="callout" style={{ marginBottom: "1.5rem" }}>
        <strong>Rule of minimum tool surface:</strong> A code-review GPT with Image Generation enabled is a distraction at best and a token sink at worst. Disable every capability the GPT doesn't explicitly need. For each enabled capability, add a Tool Policy rule in Layer 4 of your instructions specifying exactly when and how to use it.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
        {CAPABILITIES.map(cap => {
          const enabled = caps[cap.id] ?? cap.default;
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
                      background: cap.risk === "high" ? "rgba(239,68,68,0.15)" : cap.risk === "medium" ? "rgba(245,158,11,0.15)" : "rgba(34,197,94,0.1)",
                      color: cap.risk === "high" ? "var(--color-forge-danger)" : cap.risk === "medium" ? "var(--color-forge-warn)" : "var(--color-forge-success)",
                    }}>
                      risk: {cap.risk}
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
