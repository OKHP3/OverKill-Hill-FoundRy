/**
 * OKH Found·Ry — Forge Capabilities Grid
 * Three-column workshop-floor capability showcase
 *
 * Design concept: "The Workshop Stations"
 * Three forge stations, separated by hot-orange hairlines like station markers
 * on an active shop floor. Each station owns a phase of the GPT build protocol.
 * The dot grid runs across the full surface; amber sparks accent each station top.
 * Schematic measurement ticks run along the bottom edge — the language of
 * precision tooling, not generic SaaS cards.
 */

interface Station {
  id: string;
  phase: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
}

const STATIONS: Station[] = [
  {
    id: "craft",
    phase: "01",
    title: "Craft the Brief",
    body:
      "Define the GPT's purpose, audience, persona, and capability boundaries before a single instruction is written. Protocol-first prevents scope creep and vague outputs.",
    tags: ["BuildBrief", "Persona", "Capabilities", "ConversationContract"],
    icon: "◈",
  },
  {
    id: "forge",
    phase: "02",
    title: "Forge the Instructions",
    body:
      "Stack layered instructions, knowledge files, and conversation starters into a coherent, testable system. Every element earns its place or gets cut.",
    tags: ["InstructionStack", "KnowledgeFiles", "Actions", "Starters"],
    icon: "⬡",
  },
  {
    id: "ship",
    phase: "03",
    title: "Test & Ship",
    body:
      "Run the test matrix, audit mode, and platform comparison before export. Ship a complete package — not just a prompt pasted into a GPT builder.",
    tags: ["TestMatrix", "AuditMode", "PlatformCompare", "ExportPackage"],
    icon: "⬢",
  },
];

export function ForgeCapabilities() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(42,58,74,0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 0,
        }}
      />

      {/* Top orange accent bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent 0%, #c46a2c 30%, #e6a03c 60%, transparent 100%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "1.5rem 2rem 1.25rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(42,58,74,0.9)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              color: "#c46a2c",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}
          >
            OverKill Hill P³ · Found·Ry
          </div>
          <h2
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: "1.6rem",
              color: "#e5e7eb",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            The Build Protocol
          </h2>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#374151",
            letterSpacing: "0.1em",
            textAlign: "right",
            lineHeight: 1.8,
          }}
        >
          <div>3 PHASES</div>
          <div>12 STAGES</div>
          <div>1 EXPORT</div>
        </div>
      </div>

      {/* Three-column station grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          overflow: "hidden",
        }}
      >
        {STATIONS.map((station, idx) => (
          <div
            key={station.id}
            style={{
              borderRight:
                idx < 2 ? "1px solid rgba(42,58,74,0.9)" : "none",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem 1.5rem 1.25rem",
              gap: "0.85rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ember glow per station — unique tint */}
            <div
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "240px",
                height: "200px",
                borderRadius: "50%",
                background:
                  idx === 0
                    ? "radial-gradient(circle, rgba(196,106,44,0.12) 0%, transparent 70%)"
                    : idx === 1
                    ? "radial-gradient(circle, rgba(230,160,60,0.09) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(103,106,44,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Phase label + icon row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "#c46a2c",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Phase {station.phase}
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  color: idx === 2 ? "#676a2c" : "#c46a2c",
                  opacity: 0.7,
                  lineHeight: 1,
                }}
              >
                {station.icon}
              </div>
            </div>

            {/* Amber spark line */}
            <div
              style={{
                height: "1px",
                background:
                  idx === 0
                    ? "linear-gradient(90deg, #c46a2c, transparent)"
                    : idx === 1
                    ? "linear-gradient(90deg, #e6a03c, transparent)"
                    : "linear-gradient(90deg, #676a2c, transparent)",
                opacity: 0.6,
              }}
            />

            {/* Station title */}
            <h3
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: "1.1rem",
                color: "#e5e7eb",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {station.title}
            </h3>

            {/* Body */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.825rem",
                color: "#6b7280",
                margin: 0,
                lineHeight: 1.65,
                flex: 1,
              }}
            >
              {station.body}
            </p>

            {/* Stage tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {station.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.06em",
                    color: "#4b5563",
                    background: "#181f26",
                    border: "1px solid #2a3a4a",
                    borderRadius: "3px",
                    padding: "0.15rem 0.45rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom schematic measurement bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "28px",
          borderTop: "1px solid rgba(42,58,74,0.9)",
          background: "rgba(10,12,18,0.5)",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* Schematic tick marks */}
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: i % 5 === 0 ? "8px" : "4px",
              borderLeft: "1px solid rgba(42,58,74,0.7)",
              alignSelf: "center",
            }}
          />
        ))}
        {/* Overlay label */}
        <div
          style={{
            position: "absolute",
            right: "1.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            color: "#c46a2c",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          overkillhill.com
        </div>
      </div>
    </div>
  );
}
