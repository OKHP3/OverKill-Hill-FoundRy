import { useState, useEffect, useCallback } from "react";
import { INSTRUCTION_LAYERS, INSTRUCTION_CHAR_LIMIT } from "../data/knowledge";
import { ChangeLedger, EMPTY_CHANGE_RECORD, PhaseGate, type ChangeRecord } from "../components/PhaseGate";

const STORAGE_KEY = "cgpt-step-2";

type LayerData = Record<number, string>;

function load(): LayerData {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}

function buildFull(layers: LayerData): string {
  return INSTRUCTION_LAYERS
    .map(l => layers[l.id] ? `## ${l.label}\n${layers[l.id]}` : "")
    .filter(Boolean)
    .join("\n\n");
}

interface Props { onNext: () => void; onPrev: () => void; page: number; onComplete: (complete: boolean) => void; }

export default function InstructionStack({ onNext, onPrev, onComplete }: Props) {
  const [layers, setLayers] = useState<LayerData>(load);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [change, setChange] = useState<ChangeRecord>(() => {
    try { return { ...EMPTY_CHANGE_RECORD, ...JSON.parse(localStorage.getItem(STORAGE_KEY + "-change") || "{}") }; } catch { return EMPTY_CHANGE_RECORD; }
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(layers)); }, [layers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + "-change", JSON.stringify(change)); }, [change]);

  const setLayer = (id: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setLayers(prev => ({ ...prev, [id]: e.target.value }));

  const full = buildFull(layers);
  const charCount = full.length;
  const wordCount = full.split(/\s+/).filter(Boolean).length;

  const charClass =
    charCount > INSTRUCTION_CHAR_LIMIT ? "char-over" :
    charCount > INSTRUCTION_CHAR_LIMIT * 0.85 ? "char-warn" : "char-ok";

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [full]);

  const layersFilled = INSTRUCTION_LAYERS.filter(l => (layers[l.id] || "").trim()).length;

  // Step is complete once the user has written content in at least one layer.
  const isComplete = layersFilled > 0;
  useEffect(() => { onComplete(isComplete); }, [isComplete, onComplete]);

  // Check for contradictions (simple heuristic)
  const hasConcise = full.toLowerCase().includes("concise");
  const hasComprehensive = full.toLowerCase().includes("comprehensive") || full.toLowerCase().includes("thorough") || full.toLowerCase().includes("exhaustive");
  const contradictionWarning = hasConcise && hasComprehensive;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          Step 2 · Instruction Stack
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          8-layer architecture. Keep under {INSTRUCTION_CHAR_LIMIT.toLocaleString()} characters (~2,000 words). Move bulk reference to knowledge files.
        </p>
        <PhaseGate input="Contract and boundary decisions." output="Layered instruction stack." exitGate="All required rules have an observable test and no unresolved contradiction." recovery="Reopen the affected layer and record a rollback decision." evidence="Change record plus contradiction review." />
      </div>

      <div className="forge-instruction-layout">
        {/* Layer nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {INSTRUCTION_LAYERS.map(layer => {
            const isFilled = !!(layers[layer.id] || "").trim();
            const isActive = activeLayer === layer.id;
            return (
              <button key={layer.id} onClick={() => setActiveLayer(layer.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)",
                  background: isActive ? "var(--color-forge-accent)" : "var(--color-forge-panel)",
                  color: isActive ? "var(--color-forge-paper)" : isFilled ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)",
                  border: `1px solid ${isActive ? "var(--color-forge-accent)" : isFilled ? "var(--color-forge-border)" : "var(--color-forge-border)"}`,
                  cursor: "pointer", textAlign: "left", fontSize: "0.8rem", fontFamily: "var(--font-body)",
                  transition: "background 150ms",
                }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", opacity: 0.6, minWidth: "1rem" }}>{layer.id}</span>
                <span style={{ lineHeight: 1.2 }}>{layer.label}</span>
                {isFilled && <span style={{ marginLeft: "auto", color: isActive ? "var(--color-forge-paper)" : "var(--color-forge-success)", fontSize: "0.7rem" }}>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Active layer editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {INSTRUCTION_LAYERS.filter(l => l.id === activeLayer).map(layer => (
            <div key={layer.id}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-accent)", marginBottom: "0.25rem" }}>
                Layer {layer.id}: {layer.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.5rem" }}>
                {layer.hint}
              </div>
              <textarea
                value={layers[layer.id] || ""}
                onChange={setLayer(layer.id)}
                autoComplete="off"
                rows={8}
                placeholder={layer.placeholder}
                style={{ resize: "vertical", minHeight: "140px" }}
              />
            </div>
          ))}

          {/* No-Contradictions check */}
          {contradictionWarning && (
            <div style={{ padding: "0.75rem", background: "rgba(245,158,11,0.1)", border: "1px solid var(--color-forge-warn)", borderRadius: "var(--radius-md)", fontSize: "0.82rem" }}>
              ⚠️ <strong>No-Contradictions Rule:</strong> You have both "concise" and "comprehensive/thorough" in your instructions. These create a fault line. Pick a priority order and encode it explicitly — e.g. "Be concise by default; expand only when the user asks for detail."
            </div>
          )}
          <ChangeLedger value={change} onChange={setChange} />

          {/* Layer nav buttons */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {activeLayer > 1 && (
              <button onClick={() => setActiveLayer(l => l - 1)}
                style={{ ...secondaryBtn, fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}>
                ← Layer {activeLayer - 1}
              </button>
            )}
            {activeLayer < INSTRUCTION_LAYERS.length && (
              <button onClick={() => setActiveLayer(l => l + 1)}
                style={{ ...primaryBtn, fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}>
                Layer {activeLayer + 1} →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Full preview */}
      <div style={{ marginTop: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)" }}>
            Assembled Instruction Block Preview
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <span className={`char-counter ${charClass}`}>
              {charCount.toLocaleString()} / {INSTRUCTION_CHAR_LIMIT.toLocaleString()} chars · {wordCount} words · {layersFilled}/{INSTRUCTION_LAYERS.length} layers
            </span>
            <button onClick={copy} style={{ ...secondaryBtn, fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}>
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>
        </div>
        <pre style={{
          background: "var(--color-forge-espresso)", border: "1px solid var(--color-forge-border)",
          borderRadius: "var(--radius-md)", padding: "1rem", overflowX: "auto",
          fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.6,
          color: "var(--color-forge-fg)", whiteSpace: "pre-wrap", maxHeight: "300px", overflowY: "auto",
          minHeight: "80px",
        }}>
          {full || <span style={{ color: "var(--color-forge-muted-fg)", fontStyle: "italic" }}>Instructions will appear here as you fill the layers above.</span>}
        </pre>
        {charCount > INSTRUCTION_CHAR_LIMIT && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-forge-danger)" }}>
            ⚠️ Over {INSTRUCTION_CHAR_LIMIT.toLocaleString()} character builder limit. Move detailed content to knowledge files.
          </div>
        )}
        {charCount > INSTRUCTION_CHAR_LIMIT * 0.85 && charCount <= INSTRUCTION_CHAR_LIMIT && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "var(--color-forge-warn)" }}>
            ⚡ Approaching limit. Consider moving bulk reference content to knowledge files.
          </div>
        )}
      </div>

      <NavButtons onNext={onNext} onPrev={onPrev} showPrev nextLabel="Step 3: Knowledge Files →" />
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
