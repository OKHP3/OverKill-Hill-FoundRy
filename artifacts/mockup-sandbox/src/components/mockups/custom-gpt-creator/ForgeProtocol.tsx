/**
 * Forge Protocol — Intent-First GPT Assembly
 *
 * Design hypothesis: Users know what they want their GPT to do, not what
 * fields to fill in. A conversation extracts the spec from their intent —
 * the right panel assembles itself in real-time from the dialogue.
 *
 * Contrast with the existing wizard SPA:
 * - Current: 12 sequential form steps, user fills in each section
 * - This:    Open conversation, spec emerges from intent, no field awareness needed
 *
 * Information architecture: dual-panel split
 *   Left  — forge dialogue (chat)
 *   Right — live spec preview (assembling from conversation)
 */

import { useState, useEffect } from "react";

// OKH forge palette
const C = {
  void: "#0a0f1a",
  bg: "#0f172a",
  panel: "#111827",
  panelAlt: "#131e2e",
  card: "#1a2436",
  teal: "#1c3a34",
  tealDim: "#0f2620",
  border: "#1e2d42",
  borderBright: "#2a3a4a",
  orange: "#c46a2c",
  amber: "#e6a03c",
  rust: "#5b3a27",
  paper: "#f6f2ee",
  fg: "#e5e7eb",
  fgMuted: "#9ca3af",
  fgDim: "#6b7280",
  fgGhost: "#374151",
};

// ── CONVERSATION DATA ──────────────────────────────────────────────────────────

const messages = [
  {
    role: "forge" as const,
    text: "Describe the practitioner this GPT serves. What is their core task — and what breaks down without precision?",
    ts: "09:14",
  },
  {
    role: "user" as const,
    text: "Employment lawyers who need to redline contracts fast. They miss risky clauses under pressure when documents are dense.",
    ts: "09:15",
  },
  {
    role: "forge" as const,
    text: "Extraction mode. What output format matters most — marked clauses, summary memo, or tracked-changes overlay?",
    ts: "09:15",
    extracted: { field: "Domain", value: "Employment law — contract review" },
  },
  {
    role: "user" as const,
    text: "Marked clauses. Risk level and a plain-English explanation for each one. No legalese in the output.",
    ts: "09:16",
  },
  {
    role: "forge" as const,
    text: "Risk taxonomy confirmed: Critical · Review · Flag. Tone: plain English, no hedging. Package name: Contract Redliner v1.",
    ts: "09:16",
    extracted: { field: "Output", value: "Clause-level risk annotation · 3-tier taxonomy" },
  },
  {
    role: "user" as const,
    text: "Also needs to handle NDAs and non-competes specifically — those are the highest-risk clauses for our clients.",
    ts: "09:17",
  },
  {
    role: "forge" as const,
    text: "Priority clause types locked: NDAs, non-competes, IP assignment, termination. Generating conversation starters…",
    ts: "09:17",
    extracted: { field: "Priority Clauses", value: "NDA · Non-compete · IP · Termination" },
  },
];

// ── SPEC STATE ──────────────────────────────────────────────────────────────────

const specSections = [
  {
    id: "name",
    label: "Package Name",
    status: "done" as const,
    value: "Contract Redliner v1",
    progress: 100,
  },
  {
    id: "domain",
    label: "Domain & Practitioner",
    status: "done" as const,
    value: "Employment lawyers · contract review under time pressure",
    progress: 100,
  },
  {
    id: "instructions",
    label: "Core Instructions",
    status: "building" as const,
    value: "Scan for high-risk clauses. Annotate with tier (Critical / Review / Flag)…",
    progress: 72,
  },
  {
    id: "starters",
    label: "Conversation Starters",
    status: "building" as const,
    value: "2 of 4 generated",
    progress: 50,
  },
  {
    id: "capabilities",
    label: "Capabilities",
    status: "done" as const,
    value: "Code interpreter · No browsing · No image gen",
    progress: 100,
  },
  {
    id: "knowledge",
    label: "Knowledge Files",
    status: "pending" as const,
    value: "Awaiting upload or URL",
    progress: 0,
  },
];

const overallProgress = Math.round(
  specSections.reduce((acc, s) => acc + s.progress, 0) / specSections.length
);

// ── STATUS COLORS ───────────────────────────────────────────────────────────────

function statusDot(status: "done" | "building" | "pending") {
  if (status === "done") return { color: "#4ade80", label: "✓" };
  if (status === "building") return { color: C.amber, label: "…" };
  return { color: C.fgGhost, label: "○" };
}

// ── ANIMATED TYPING CURSOR ──────────────────────────────────────────────────────

function TypingCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        width: 2,
        height: "1em",
        background: C.orange,
        marginLeft: 2,
        verticalAlign: "text-bottom",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.08s",
      }}
    />
  );
}

// ── ANIMATED PROGRESS BAR ──────────────────────────────────────────────────────

function ProgressBar({ pct, color = C.orange }: { pct: number; color?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: 3,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: 2,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

// ── SPEC CARD ──────────────────────────────────────────────────────────────────

function SpecCard({ section }: { section: (typeof specSections)[0] }) {
  const dot = statusDot(section.status);
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${section.status === "building" ? "rgba(230,160,60,0.2)" : C.border}`,
        borderRadius: 8,
        padding: "0.65rem 0.85rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {section.status === "building" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${C.amber}, transparent)`,
          }}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            color: C.fgGhost,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {section.label}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: dot.color,
          }}
        >
          {dot.label}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.72rem",
          color: section.status === "pending" ? C.fgGhost : C.fgMuted,
          lineHeight: 1.5,
          fontStyle: section.status === "pending" ? "italic" : "normal",
        }}
      >
        {section.value}
        {section.status === "building" && <TypingCursor />}
      </div>
      {section.progress > 0 && section.status !== "done" && (
        <ProgressBar pct={section.progress} color={C.amber} />
      )}
    </div>
  );
}

// ── MESSAGE BUBBLE ──────────────────────────────────────────────────────────────

function Message({ msg, index }: { msg: (typeof messages)[0]; index: number }) {
  const isForge = msg.role === "forge";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isForge ? "flex-start" : "flex-end",
        gap: "0.25rem",
        animation: `fadeUp 0.4s ease both`,
        animationDelay: `${index * 0.06}s`,
      }}
    >
      {isForge && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: C.teal,
              border: `1px solid rgba(196,106,44,0.3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src="/__mockup/assets/replit-icon.png"
              style={{ width: 14, height: 14, objectFit: "contain" }}
              alt=""
            />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.55rem",
              color: C.orange,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Forge · {msg.ts}
          </span>
        </div>
      )}
      <div
        style={{
          maxWidth: "88%",
          background: isForge ? C.panelAlt : C.teal,
          border: `1px solid ${isForge ? C.borderBright : "rgba(28,90,80,0.6)"}`,
          borderRadius: isForge ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
          padding: "0.55rem 0.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: isForge ? C.fgMuted : "#a7f3d0",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {msg.text}
        </p>
      </div>
      {msg.extracted && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            marginTop: "0.1rem",
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              background: C.amber,
              borderRadius: "50%",
              boxShadow: `0 0 4px ${C.amber}`,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.52rem",
              color: C.amber,
              letterSpacing: "0.08em",
            }}
          >
            EXTRACTED → {msg.extracted.field}: {msg.extracted.value}
          </span>
        </div>
      )}
      {!isForge && (
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.52rem",
            color: C.fgGhost,
          }}
        >
          {msg.ts}
        </span>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────────

export function ForgeProtocol() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseAmber {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <div
        style={{
          height: 44,
          background: C.panel,
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          flexShrink: 0,
        }}
      >
        {/* Left: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: C.teal,
              border: `1px solid rgba(196,106,44,0.35)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/__mockup/assets/replit-icon.png"
              style={{ width: 16, height: 16, objectFit: "contain" }}
              alt=""
            />
          </div>
          <span
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: "0.85rem",
              color: C.fg,
              letterSpacing: "0.02em",
            }}
          >
            OKH <span style={{ color: C.orange }}>Found</span>
            <sup
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.45em",
                color: C.amber,
              }}
            >
              ·Ry
            </sup>
          </span>
          <div
            style={{
              width: 1,
              height: 16,
              background: C.borderBright,
              margin: "0 0.25rem",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: C.fgGhost,
              letterSpacing: "0.1em",
            }}
          >
            FORGE PROTOCOL · v2026
          </span>
        </div>

        {/* Right: session + progress ring */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
                animation: "pulseAmber 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: "#4ade80",
                letterSpacing: "0.1em",
              }}
            >
              SESSION ACTIVE
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: "0.2rem 0.6rem",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: C.amber,
                letterSpacing: "0.08em",
              }}
            >
              {overallProgress}% ASSEMBLED
            </span>
          </div>
        </div>
      </div>

      {/* Orange accent rule */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${C.orange} 0%, ${C.amber} 40%, transparent 100%)`,
          flexShrink: 0,
        }}
      />

      {/* ── Body: two panels ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ══ LEFT: Conversation panel ══ */}
        <div
          style={{
            width: 500,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            borderRight: `1px solid ${C.border}`,
            background: C.panel,
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "0.75rem 1.1rem 0.6rem",
              borderBottom: `1px solid ${C.border}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: C.fgGhost,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Forge Dialogue
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: C.fgDim,
                marginTop: "0.1rem",
              }}
            >
              Describe your practitioner and their task — the spec assembles itself.
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
            }}
          >
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} index={i} />
            ))}

            {/* Live "forge is thinking" indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: C.teal,
                  border: `1px solid rgba(196,106,44,0.3)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/__mockup/assets/replit-icon.png"
                  style={{ width: 14, height: 14, objectFit: "contain" }}
                  alt=""
                />
              </div>
              <div
                style={{
                  background: C.panelAlt,
                  border: `1px solid ${C.borderBright}`,
                  borderRadius: "4px 12px 12px 12px",
                  padding: "0.45rem 0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.fgGhost,
                      animation: `pulseAmber 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderTop: `1px solid ${C.border}`,
              flexShrink: 0,
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                flex: 1,
                background: C.card,
                border: `1px solid ${C.borderBright}`,
                borderRadius: 8,
                padding: "0.55rem 0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  color: C.fgGhost,
                  flex: 1,
                }}
              >
                What else should this GPT know or do…
              </span>
              <TypingCursor />
            </div>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 7,
                background: C.orange,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══ RIGHT: Live spec panel ══ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: C.panelAlt,
            overflow: "hidden",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "0.75rem 1.25rem 0.6rem",
              borderBottom: `1px solid ${C.border}`,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: C.fgGhost,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Emerging Specification
              </div>
              <div
                style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: "1.05rem",
                  color: C.fg,
                  marginTop: "0.1rem",
                }}
              >
                Contract Redliner{" "}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.5em",
                    color: C.orange,
                  }}
                >
                  v1
                </span>
              </div>
            </div>
            {/* Export action */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  background: "transparent",
                  border: `1px solid ${C.borderBright}`,
                  borderRadius: 6,
                  padding: "0.3rem 0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: C.fgDim,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                }}
              >
                PREVIEW
              </div>
              <div
                style={{
                  background: C.orange,
                  border: "none",
                  borderRadius: 6,
                  padding: "0.3rem 0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "#fff",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  opacity: 0.55,
                }}
              >
                EXPORT PACKAGE
              </div>
            </div>
          </div>

          {/* Assembly progress bar */}
          <div
            style={{
              padding: "0.6rem 1.25rem",
              borderBottom: `1px solid ${C.border}`,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
            }}
          >
            <ProgressBar pct={overallProgress} color={C.orange} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: C.amber,
                whiteSpace: "nowrap",
                letterSpacing: "0.08em",
              }}
            >
              {overallProgress}%
            </span>
          </div>

          {/* Spec sections */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.9rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {specSections.map((s) => (
              <SpecCard key={s.id} section={s} />
            ))}
          </div>

          {/* Bottom: extraction trace */}
          <div
            style={{
              borderTop: `1px solid ${C.border}`,
              padding: "0.6rem 1.25rem",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.52rem",
                color: C.fgGhost,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.1rem",
              }}
            >
              Extraction Trace
            </div>
            {[
              { turn: 2, field: "Domain", val: "Employment law · contract review" },
              { turn: 4, field: "Output", val: "Clause-level risk annotation · 3-tier taxonomy" },
              { turn: 6, field: "Priority Clauses", val: "NDA · Non-compete · IP · Termination" },
            ].map((e) => (
              <div
                key={e.field}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "baseline",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                }}
              >
                <span style={{ color: C.fgGhost }}>T{e.turn}</span>
                <span style={{ color: C.orange, minWidth: 110 }}>{e.field}</span>
                <span style={{ color: C.fgDim }}>{e.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FAR RIGHT: thin phase rail ══ */}
        <div
          style={{
            width: 72,
            flexShrink: 0,
            background: C.panel,
            borderLeft: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem 0",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.45rem",
              color: C.fgGhost,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              marginBottom: "auto",
            }}
          >
            Forge Phase
          </div>
          {[
            { label: "Intent", active: true },
            { label: "Scope", active: true },
            { label: "Draft", active: true },
            { label: "Review", active: false },
            { label: "Export", active: false },
          ].map((phase, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: phase.active ? C.teal : C.card,
                  border: `1px solid ${phase.active ? "rgba(196,106,44,0.3)" : C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {phase.active ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke={C.amber} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: C.fgGhost,
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.45rem",
                  color: phase.active ? C.fgDim : C.fgGhost,
                  letterSpacing: "0.06em",
                }}
              >
                {phase.label}
              </span>
            </div>
          ))}
          <div style={{ marginTop: "auto" }} />
        </div>
      </div>
    </div>
  );
}
