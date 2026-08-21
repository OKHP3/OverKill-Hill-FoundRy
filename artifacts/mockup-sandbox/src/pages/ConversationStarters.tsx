import { useState, useEffect } from "react";
import { STARTER_EXAMPLES_GOOD, STARTER_EXAMPLES_BAD } from "../data/knowledge";

const STORAGE_KEY = "cgpt-step-6";

function load(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function ConversationStarters({ onNext, onPrev, onComplete }: Props) {
  const [starters, setStarters] = useState<string[]>(() => {
    const s = load();
    return s.length ? s : ["", "", "", ""];
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(starters)); }, [starters]);

  // Step is complete once at least one starter has content.
  const isComplete = starters.some(s => s.trim().length > 0);
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);

  const update = (idx: number, val: string) =>
    setStarters(prev => prev.map((s, i) => i === idx ? val : s));

  const useExample = (text: string) => {
    const empty = starters.findIndex(s => !s.trim());
    if (empty >= 0) update(empty, text);
    else setStarters(prev => [...prev.slice(0, 3), text]);
  };

  const filledCount = starters.filter(s => s.trim()).length;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 6 · Conversation Starters
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Write 3–4 starters. These are <strong>workflow launch buttons</strong>, not slogans. They solve the cold-start problem and demonstrate what your GPT actually does.
        </p>
      </div>

      {/* Bad/Good examples */}
      <div className="forge-cols-2" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="forge-panel" style={{ borderLeft: "3px solid var(--color-forge-danger)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-danger)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ✗ Bad starters
          </div>
          {STARTER_EXAMPLES_BAD.map((s, i) => (
            <div key={i} style={{ fontSize: "0.82rem", color: "var(--color-forge-muted-fg)", padding: "0.3rem 0", borderBottom: i < STARTER_EXAMPLES_BAD.length - 1 ? "1px solid var(--color-forge-border)" : "none" }}>
              "{s}"
            </div>
          ))}
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)" }}>
            These are vague, generic, or slogans — they don't demonstrate real capability.
          </div>
        </div>
        <div className="forge-panel" style={{ borderLeft: "3px solid var(--color-forge-success)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-success)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ✓ Good starters
          </div>
          {STARTER_EXAMPLES_GOOD.slice(0, 3).map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", padding: "0.3rem 0", borderBottom: i < 2 ? "1px solid var(--color-forge-border)" : "none" }}>
              <span style={{ fontSize: "0.82rem", flex: 1 }}>"{s}"</span>
              <button onClick={() => useExample(s)}
                style={{ background: "var(--color-forge-teal)", border: "none", borderRadius: "4px", padding: "0.15rem 0.4rem", color: "var(--color-forge-fg)", cursor: "pointer", fontSize: "0.7rem", whiteSpace: "nowrap" }}>
                Use ↑
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Starter inputs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {starters.map((starter, idx) => (
          <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", marginTop: "0.6rem", minWidth: "1.5rem" }}>#{idx + 1}</span>
            <div style={{ flex: 1 }}>
              <input
                value={starter}
                onChange={e => update(idx, e.target.value)}
                autoComplete="off"
                placeholder={STARTER_EXAMPLES_GOOD[idx] || "Write a specific task the user can launch..."}
                style={{ fontSize: "0.88rem" }}
              />
              {starter.length > 0 && starter.length < 20 && (
                <div style={{ fontSize: "0.72rem", color: "var(--color-forge-warn)", marginTop: "0.2rem" }}>
                  Too short — be more specific about the task.
                </div>
              )}
              {starter.toLowerCase().includes("anything") || starter.toLowerCase().includes("help you") ? (
                <div style={{ fontSize: "0.72rem", color: "var(--color-forge-danger)", marginTop: "0.2rem" }}>
                  ✗ Sounds like a generic ChatGPT starter. Make it specific to a task your GPT actually does.
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* More examples to use */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>
          More example starters (click to use)
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {STARTER_EXAMPLES_GOOD.map((ex, i) => (
            <button key={i} onClick={() => useExample(ex)}
              style={{ background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", padding: "0.4rem 0.75rem", color: "var(--color-forge-muted-fg)", cursor: "pointer", fontSize: "0.78rem", textAlign: "left", fontFamily: "var(--font-body)" }}>
              "{ex.length > 55 ? ex.slice(0, 52) + "…" : ex}"
            </button>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="forge-panel">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>Starter quality checklist</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[
            { check: filledCount >= 3, label: `At least 3 starters written (${filledCount}/3)` },
            { check: !starters.some(s => s.toLowerCase().includes("anything")), label: 'None say "anything" or "how can I help"' },
            { check: starters.filter(s => s.trim()).every(s => s.length > 25), label: "Each starter is specific enough to copy-paste as a real prompt" },
            { check: starters.filter(s => s.trim()).length >= 2 && new Set(starters.filter(s => s.trim()).map(s => s.split(" ").slice(0, 2).join(" "))).size > 1, label: "Starters cover different use cases, not the same task repeated" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem" }}>
              <span style={{ color: item.check ? "var(--color-forge-success)" : "var(--color-forge-muted-fg)", minWidth: "1rem" }}>
                {item.check ? "✓" : "○"}
              </span>
              <span style={{ color: item.check ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 7: Test Matrix →" />
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
