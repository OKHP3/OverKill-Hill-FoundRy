import { useEffect, useState } from "react";
import {
  AUDIT_ITEMS,
  AUDIT_RUBRIC_VERSION,
  AUDIT_SHIP_GATE_THRESHOLDS,
  SAFETY_AUDIT_ID,
  QUALITY_TIERS,
} from "../data/knowledge";
import { readProjectValue, writeProjectValue } from "../lib/creatorStorage";

type Scores = Record<number, number>;
type ShipGateDecision = "incomplete" | "passed" | "failed";
type AuditShipGateThresholds = {
  averageMinimum: number;
  safetyMinimum: number;
};

interface AuditData {
  scores: Scores;
  gptName: string;
  notes: Record<number, string>;
  shipGateDecision: ShipGateDecision;
  rubricVersion: string;
  shipGateThresholds: AuditShipGateThresholds;
}

const STORAGE_KEY = "audit-mode";
const DEFAULT_AUDIT_DATA: AuditData = {
  scores: {},
  gptName: "",
  notes: {},
  shipGateDecision: "incomplete",
  rubricVersion: AUDIT_RUBRIC_VERSION,
  shipGateThresholds: AUDIT_SHIP_GATE_THRESHOLDS,
};

function isShipGateDecision(value: unknown): value is ShipGateDecision {
  return value === "incomplete" || value === "passed" || value === "failed";
}

function isThreshold(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 5;
}

function loadAuditData(): AuditData {
  try {
    const saved = readProjectValue(STORAGE_KEY) as Partial<AuditData> | undefined;
    const savedThresholds = saved?.shipGateThresholds;
    return {
      scores: saved?.scores && typeof saved.scores === "object" ? saved.scores : {},
      gptName: typeof saved?.gptName === "string" ? saved.gptName : "",
      notes: saved?.notes && typeof saved.notes === "object" ? saved.notes : {},
      shipGateDecision: isShipGateDecision(saved?.shipGateDecision) ? saved.shipGateDecision : "incomplete",
      rubricVersion: typeof saved?.rubricVersion === "string" && saved.rubricVersion.trim()
        ? saved.rubricVersion
        : AUDIT_RUBRIC_VERSION,
      shipGateThresholds: savedThresholds &&
        typeof savedThresholds === "object" &&
        isThreshold(savedThresholds.averageMinimum) &&
        isThreshold(savedThresholds.safetyMinimum)
        ? savedThresholds
        : AUDIT_SHIP_GATE_THRESHOLDS,
    };
  } catch {
    return DEFAULT_AUDIT_DATA;
  }
}

export default function AuditMode() {
  const [data, setData] = useState<AuditData>(loadAuditData);
  const { scores, gptName, notes, rubricVersion, shipGateThresholds } = data;

  const setScore = (id: number, score: number) =>
    setData(prev => ({ ...prev, scores: { ...prev.scores, [id]: score } }));

  const scoredCount = Object.keys(scores).length;
  const safetyScore = scores[SAFETY_AUDIT_ID];
  const avgOfAll = AUDIT_ITEMS.length > 0
    ? AUDIT_ITEMS.map(i => scores[i.id] ?? 0).reduce((a, b) => a + b, 0) / AUDIT_ITEMS.length
    : 0;

  const shipGateDecision: ShipGateDecision =
    scoredCount < AUDIT_ITEMS.length
      ? "incomplete"
      : avgOfAll >= shipGateThresholds.averageMinimum &&
          (safetyScore === undefined || safetyScore >= shipGateThresholds.safetyMinimum)
        ? "passed"
        : "failed";
  const shipGatePassed = shipGateDecision === "passed";

  useEffect(() => {
    writeProjectValue(STORAGE_KEY, { ...data, shipGateDecision });
  }, [data, shipGateDecision]);

  const currentTier =
    avgOfAll >= 4.5 ? "Exemplary" :
    avgOfAll >= 3.5 ? "Good" :
    avgOfAll >= 2   ? "Acceptable" : "Poor";

  const tierColor = {
    "Exemplary": "var(--color-forge-accent)",
    "Good":      "var(--color-forge-success)",
    "Acceptable":"var(--color-forge-warn)",
    "Poor":      "var(--color-forge-danger)",
  }[currentTier];

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-forge-accent)", margin: 0 }}>
          🔍 Audit Mode
        </h1>
        <p style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.35rem", fontSize: "0.9rem" }}>
          Score an existing Custom GPT against the 10-item rubric (version {rubricVersion}). Ship gate: average ≥ {shipGateThresholds.averageMinimum}, safety score ≥ {shipGateThresholds.safetyMinimum}. Score each 0–5.
        </p>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>GPT name / URL being audited</label>
        <input aria-label="GPT name / URL being audited" value={gptName} onChange={e => setData(prev => ({ ...prev, gptName: e.target.value }))}
          autoComplete="off" placeholder="e.g. Margin Guard v1.2 · chatgpt.com/g/g-abc123" />
      </div>

      {/* Score cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {AUDIT_ITEMS.map(item => {
          const score = scores[item.id];
          const isSet = score !== undefined;
          const isSafety = item.id === SAFETY_AUDIT_ID;
          return (
            <div key={item.id} style={{
              padding: "1rem 1.25rem",
              background: "var(--color-forge-panel)",
              border: `1px solid ${isSafety && isSet && score < shipGateThresholds.safetyMinimum ? "var(--color-forge-danger)" : "var(--color-forge-border)"}`,
              borderRadius: "var(--radius-md)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", marginRight: "0.5rem" }}>#{item.id}</span>
                  <span style={{ fontSize: "0.88rem" }}>{item.question}</span>
                  {isSafety && <span style={{ marginLeft: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", background: "rgba(239,68,68,0.15)", color: "var(--color-forge-danger)", padding: "0.1rem 0.35rem", borderRadius: "3px" }}>min {shipGateThresholds.safetyMinimum}</span>}
                </div>
                <div style={{ display: "flex", gap: "0.35rem", flexShrink: 0 }}>
                  {[0, 1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" aria-label={`Score ${n} for audit item ${item.id}`} aria-pressed={score === n} onClick={() => setScore(item.id, n)}
                      style={{
                        width: 32, height: 32, borderRadius: "6px", cursor: "pointer",
                        background: score === n
                          ? n <= 1 ? "var(--color-forge-danger)"
                          : n <= 2 ? "var(--color-forge-warn)"
                          : n <= 3 ? "rgba(34,197,94,0.3)"
                          : "var(--color-forge-success)"
                          : "var(--color-forge-surface)",
                        border: `1px solid ${score === n ? "transparent" : "var(--color-forge-border)"}`,
                        color: score === n ? "white" : "var(--color-forge-muted-fg)",
                        fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 600,
                        transition: "all 120ms",
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "0.5rem", paddingLeft: "1.75rem" }}>
                <input aria-label={`Notes for audit item ${item.id}`} value={notes[item.id] || ""} onChange={e => setData(prev => ({ ...prev, notes: { ...prev.notes, [item.id]: e.target.value } }))}
                  autoComplete="off" placeholder="Notes / evidence..."
                  style={{ fontSize: "0.78rem" }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Score summary */}
      <div style={{
        padding: "1.25rem",
        background: shipGatePassed ? "rgba(34,197,94,0.08)" : scoredCount === AUDIT_ITEMS.length ? "rgba(239,68,68,0.08)" : "var(--color-forge-panel)",
        border: `2px solid ${shipGatePassed ? "var(--color-forge-success)" : scoredCount === AUDIT_ITEMS.length ? "var(--color-forge-danger)" : "var(--color-forge-border)"}`,
        borderRadius: "var(--radius-md)",
        marginBottom: "1.5rem",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: tierColor }}>{avgOfAll.toFixed(1)}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginLeft: "0.35rem" }}>/ 5.0 avg · {scoredCount}/{AUDIT_ITEMS.length} scored</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: tierColor, fontWeight: 700 }}>{currentTier}</div>
            {safetyScore !== undefined && safetyScore < shipGateThresholds.safetyMinimum && (
              <div style={{ fontSize: "0.75rem", color: "var(--color-forge-danger)", marginTop: "0.25rem" }}>
                ⚠️ Safety score {safetyScore} &lt; required {shipGateThresholds.safetyMinimum}
              </div>
            )}
          </div>
        </div>

        {/* Bar */}
        <div style={{ height: 8, background: "var(--color-forge-border)", borderRadius: 4, overflow: "hidden", marginBottom: "0.75rem" }}>
          <div style={{ height: "100%", width: `${(avgOfAll / 5) * 100}%`, background: tierColor, borderRadius: 4, transition: "width 300ms" }} />
        </div>

        <div data-testid="audit-ship-gate-decision" data-decision={shipGateDecision} style={{ fontSize: "0.82rem" }}>
          {scoredCount < AUDIT_ITEMS.length && <span style={{ color: "var(--color-forge-muted-fg)" }}>Score all {AUDIT_ITEMS.length} items to see ship gate result.</span>}
          {scoredCount === AUDIT_ITEMS.length && (
            shipGatePassed
              ? <span style={{ color: "var(--color-forge-success" }}>✓ Ship gate passed — average {avgOfAll.toFixed(2)} ≥ {shipGateThresholds.averageMinimum}, safety ≥ {shipGateThresholds.safetyMinimum}</span>
              : <span style={{ color: "var(--color-forge-danger)" }}>✗ Ship gate failed — {avgOfAll < shipGateThresholds.averageMinimum ? `average ${avgOfAll.toFixed(2)} < required ${shipGateThresholds.averageMinimum}` : `safety ${safetyScore} < required ${shipGateThresholds.safetyMinimum}`}</span>
          )}
        </div>
      </div>

      {/* Quality tier reference */}
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.75rem" }}>Quality tier reference</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {QUALITY_TIERS.map(tier => (
            <div key={tier.tier} className={`forge-panel tier-${tier.tier.toLowerCase()}`}
              style={{ opacity: currentTier === tier.tier ? 1 : 0.5, transition: "opacity 200ms" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", marginBottom: "0.25rem",
                color: tier.color === "danger" ? "var(--color-forge-danger)" : tier.color === "warn" ? "var(--color-forge-warn)" : tier.color === "success" ? "var(--color-forge-success)" : "var(--color-forge-accent)" }}>
                {currentTier === tier.tier ? "→ " : ""}{tier.tier}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-forge-muted-fg)" }}>{tier.outcome}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: "0.8rem",
  color: "var(--color-forge-accent)", marginBottom: "0.25rem",
};
