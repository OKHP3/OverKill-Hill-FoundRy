import { useState, useEffect } from "react";
import { TEST_CATEGORIES, RED_TEAM_PROMPTS } from "../data/knowledge";

const STORAGE_KEY = "cgpt-step-7";

interface TestCase {
  id: string;
  category: string;
  prompt: string;
  expectedBehavior: string;
  result: "" | "pass" | "fail" | "pending";
}

interface TestData { cases: TestCase[]; }

function load(): TestData {
  try { return { cases: [], ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") }; }
  catch { return { cases: [] }; }
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function TestMatrix({ onNext, onPrev, onComplete }: Props) {
  const [data, setData] = useState<TestData>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }, [data]);

  // Step is complete once the user has added at least one test case.
  const isComplete = data.cases.length > 0;
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);

  const addCase = (category = "happy") => {
    const tc: TestCase = { id: Date.now().toString(), category, prompt: "", expectedBehavior: "", result: "" };
    setData(prev => ({ ...prev, cases: [...prev.cases, tc] }));
  };

  const removeCase = (id: string) => setData(prev => ({ ...prev, cases: prev.cases.filter(c => c.id !== id) }));
  const updateCase = (id: string, k: keyof TestCase, v: string) =>
    setData(prev => ({ ...prev, cases: prev.cases.map(c => c.id === id ? { ...c, [k]: v } : c) }));

  const addRedTeamPrompts = () => {
    const newCases: TestCase[] = RED_TEAM_PROMPTS.map(rp => ({
      id: Date.now().toString() + Math.random(),
      category: rp.category,
      prompt: rp.prompt,
      expectedBehavior: "Gracefully refuse or handle; do not comply with extraction/jailbreak attempts",
      result: "",
    }));
    setData(prev => ({ ...prev, cases: [...prev.cases, ...newCases] }));
  };

  const totalCases = data.cases.length;
  const passing = data.cases.filter(c => c.result === "pass").length;
  const failing = data.cases.filter(c => c.result === "fail").length;
  const coverage = TEST_CATEGORIES.map(cat => ({
    ...cat,
    count: data.cases.filter(c => c.category === cat.id).length,
  }));

  const hasMissingCategory = coverage.some(c => c.count === 0);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 7 · Test Matrix
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Write 10–15 test prompts covering all 6 categories. OpenAI recommends: write the prompts, write expected answers, run them, and refine instructions.
        </p>
      </div>

      {/* Coverage overview */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {coverage.map(cat => (
          <div key={cat.id} style={{
            padding: "0.4rem 0.75rem", borderRadius: "var(--radius-md)", fontSize: "0.78rem",
            background: cat.count > 0 ? "rgba(196,106,44,0.15)" : "var(--color-forge-panel)",
            border: `1px solid ${cat.count > 0 ? "var(--color-forge-accent)" : "var(--color-forge-border)"}`,
            color: cat.count > 0 ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)",
          }}>
            {cat.label} ({cat.count})
          </div>
        ))}
        <div style={{
          padding: "0.4rem 0.75rem", borderRadius: "var(--radius-md)", fontSize: "0.78rem",
          background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)",
          color: "var(--color-forge-muted-fg)", marginLeft: "auto",
        }}>
          {passing} ✓ · {failing} ✗ · {totalCases - passing - failing} pending / {totalCases} total
        </div>
      </div>

      {hasMissingCategory && totalCases >= 5 && (
        <div style={{ padding: "0.6rem 1rem", background: "rgba(245,158,11,0.1)", border: "1px solid var(--color-forge-warn)", borderRadius: "var(--radius-md)", fontSize: "0.82rem", marginBottom: "1rem" }}>
          ⚠️ Missing coverage in: {coverage.filter(c => c.count === 0).map(c => c.label).join(", ")}
        </div>
      )}

      {/* Actions bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <button onClick={() => addCase("happy")} style={{ ...secondaryBtn, fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>+ Happy Path</button>
        <button onClick={() => addCase("edge")} style={{ ...secondaryBtn, fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>+ Edge Case</button>
        <button onClick={() => addCase("out_scope")} style={{ ...secondaryBtn, fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>+ Out of Scope</button>
        <button onClick={() => addCase("knowledge")} style={{ ...secondaryBtn, fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>+ Knowledge</button>
        <button onClick={() => addCase("adversarial")} style={{ ...secondaryBtn, fontSize: "0.82rem", padding: "0.4rem 0.75rem" }}>+ Adversarial</button>
        <button onClick={addRedTeamPrompts} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid var(--color-forge-danger)", borderRadius: "var(--radius-md)", padding: "0.4rem 0.75rem", color: "var(--color-forge-danger)", cursor: "pointer", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>
          🔴 Load Red-Team Pack
        </button>
      </div>

      {/* Test cases */}
      {data.cases.length === 0 && (
        <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--color-forge-muted-fg)", border: "1px dashed var(--color-forge-border)", borderRadius: "var(--radius-md)", fontSize: "0.88rem" }}>
          No test cases yet. Add prompts above or load the red-team pack for adversarial prompts.
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem" }}>
            Aim for: 3–4 happy path · 2–3 edge case · 2 out of scope · 2 knowledge · 2+ adversarial
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {data.cases.map((tc, idx) => {
          const catInfo = TEST_CATEGORIES.find(c => c.id === tc.category);
          return (
            <div key={tc.id} style={{
              padding: "0.875rem 1rem",
              background: "var(--color-forge-panel)",
              border: `1px solid ${tc.result === "pass" ? "var(--color-forge-success)" : tc.result === "fail" ? "var(--color-forge-danger)" : "var(--color-forge-border)"}`,
              borderRadius: "var(--radius-md)",
            }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-forge-muted-fg)", marginTop: "0.15rem" }}>T{idx + 1}</span>
                <select value={tc.category} onChange={e => updateCase(tc.id, "category", e.target.value)}
                  style={{ fontSize: "0.75rem", padding: "0.15rem 0.4rem", minWidth: "130px" }}>
                  {TEST_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <div style={{ display: "flex", gap: "0.35rem", marginLeft: "auto" }}>
                  {(["pass", "fail", "pending", ""] as const).map(r => (
                    r !== "" && (
                      <button key={r} onClick={() => updateCase(tc.id, "result", tc.result === r ? "" : r)}
                        style={{
                          background: tc.result === r
                            ? r === "pass" ? "rgba(34,197,94,0.2)" : r === "fail" ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)"
                            : "var(--color-forge-surface)",
                          border: `1px solid ${tc.result === r ? (r === "pass" ? "var(--color-forge-success)" : r === "fail" ? "var(--color-forge-danger)" : "var(--color-forge-warn)") : "var(--color-forge-border)"}`,
                          borderRadius: "4px", padding: "0.15rem 0.5rem",
                          color: r === "pass" ? "var(--color-forge-success)" : r === "fail" ? "var(--color-forge-danger)" : "var(--color-forge-warn)",
                          cursor: "pointer", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
                        }}>
                        {r === "pass" ? "✓" : r === "fail" ? "✗" : "⏳"}
                      </button>
                    )
                  ))}
                  <button onClick={() => removeCase(tc.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-forge-danger)", fontSize: "0.85rem", padding: "0.1rem 0.25rem" }}>✕</button>
                </div>
              </div>
              <div className="forge-cols-2" style={{ gap: "0.5rem" }}>
                <textarea value={tc.prompt} onChange={e => updateCase(tc.id, "prompt", e.target.value)} rows={2}
                  placeholder={catInfo?.description || "Test prompt..."}
                  style={{ fontSize: "0.82rem", resize: "none" }} />
                <textarea value={tc.expectedBehavior} onChange={e => updateCase(tc.id, "expectedBehavior", e.target.value)} rows={2}
                  placeholder="Expected behavior / output..."
                  style={{ fontSize: "0.82rem", resize: "none" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ship-readiness */}
      {totalCases > 0 && (
        <div className="forge-panel">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>
            Test readiness
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            {[
              { ok: totalCases >= 10, label: `At least 10 test cases (${totalCases})` },
              { ok: coverage.filter(c => c.count > 0).length >= 5, label: `Coverage across 5+ categories (${coverage.filter(c => c.count > 0).length}/6)` },
              { ok: data.cases.some(c => c.category === "adversarial"), label: "At least one adversarial/red-team case" },
              { ok: failing === 0 || data.cases.some(c => c.result === ""), label: "No unresolved failures (or still testing)" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", alignItems: "center" }}>
                <span style={{ color: item.ok ? "var(--color-forge-success)" : "var(--color-forge-muted-fg)" }}>{item.ok ? "✓" : "○"}</span>
                <span style={{ color: item.ok ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 8: Ship & Govern →" />
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
