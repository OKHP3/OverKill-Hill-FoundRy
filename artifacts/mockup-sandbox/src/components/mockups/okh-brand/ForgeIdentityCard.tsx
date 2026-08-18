/**
 * OKH Found·Ry — Forge Identity Card
 * Brand identity card for OverKill Hill P³
 *
 * Design concept: "The Maker's Mark"
 * A compact, horizontal card that reads like a manufacturer's data plate —
 * the kind stamped into steel on precision equipment. Left panel anchors
 * the forge hammer mark; right panel runs the brand's typographic hierarchy
 * from slab display down to JetBrains Mono technical detail.
 *
 * Palette borrowed from declared OKH tokens — not recycled from theme.css as-is.
 */

export function ForgeIdentityCard() {
  const swatches = [
    { color: "#0f172a", label: "Forge BG" },
    { color: "#1c3a34", label: "Teal" },
    { color: "#c46a2c", label: "Accent" },
    { color: "#e6a03c", label: "Amber" },
    { color: "#676a2c", label: "Olive" },
    { color: "#a06e28", label: "Ochre" },
    { color: "#5b3a27", label: "Rust" },
    { color: "#f6f2ee", label: "Paper" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          background: "#181f26",
          border: "1px solid #2a3a4a",
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 18px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,106,44,0.08)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Orange accent bar — top */}
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #c46a2c 0%, #e6a03c 60%, transparent 100%)",
          }}
        />

        {/* Card body — horizontal split */}
        <div style={{ display: "flex", minHeight: "260px" }}>
          {/* Left — forge mark panel */}
          <div
            style={{
              width: "200px",
              flexShrink: 0,
              background: "linear-gradient(160deg, #1c3a34 0%, #0f2620 100%)",
              borderRight: "1px solid #2a3a4a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              padding: "1.5rem 1rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Teal dot grid */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle, rgba(28,90,80,0.45) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* Forge hammer */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "80px",
                height: "80px",
                borderRadius: "14px",
                background: "#111827",
                border: "1px solid rgba(196,106,44,0.35)",
                boxShadow: "0 0 24px rgba(196,106,44,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/__mockup/assets/replit-icon.png"
                alt="Forge mark"
                style={{ width: "62px", height: "62px", objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.textContent = "⚙";
                  (e.target as HTMLImageElement).parentElement!.style.fontSize = "2.2rem";
                }}
              />
            </div>

            {/* Brand name */}
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: "1.05rem",
                  color: "#e5e7eb",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                }}
              >
                OverKill Hill
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#c46a2c",
                  letterSpacing: "0.12em",
                  marginTop: "2px",
                }}
              >
                P³ · Found·Ry
              </div>
            </div>

            {/* Bottom teal accent line */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "20%",
                right: "20%",
                height: "1px",
                background: "rgba(28,90,80,0.6)",
              }}
            />
          </div>

          {/* Right — content panel */}
          <div
            style={{
              flex: 1,
              padding: "1.5rem 1.5rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            {/* Category label */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                color: "#4b5563",
                textTransform: "uppercase",
              }}
            >
              Custom GPT Creator · v2026
            </div>

            {/* Product headline */}
            <div>
              <div
                style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: "1.35rem",
                  color: "#e5e7eb",
                  lineHeight: 1.15,
                }}
              >
                Build GPTs With{" "}
                <span style={{ color: "#c46a2c" }}>Protocol</span>
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "#6b7280",
                  marginTop: "0.35rem",
                  lineHeight: 1.55,
                }}
              >
                Structured practitioner workflow from brief to
                ship — no generic prompt gymnastics.
              </div>
            </div>

            {/* Forge attributes — monospace data plate style */}
            <div
              style={{
                background: "#111827",
                border: "1px solid #2a3a4a",
                borderRadius: "8px",
                padding: "0.65rem 0.85rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              {[
                ["ORIGIN", "overkillhill.com"],
                ["STACK", "React · Vite · TypeScript"],
                ["LICENSE", "MIT · Free to fork"],
              ].map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                  }}
                >
                  <span style={{ color: "#c46a2c", minWidth: "56px", letterSpacing: "0.08em" }}>
                    {key}
                  </span>
                  <span style={{ color: "#9ca3af" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Palette swatches */}
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  color: "#374151",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Forge Palette
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {swatches.map((s) => (
                  <div
                    key={s.color}
                    title={s.label}
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "4px",
                      background: s.color,
                      border: "1px solid rgba(255,255,255,0.06)",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "0.6rem 1.25rem",
            borderTop: "1px solid #1e2936",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#111827",
          }}
        >
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["Precision", "Protocol", "Promptcraft"].map((word, i) => (
              <span
                key={word}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: i === 0 ? "#c46a2c" : "#374151",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "#c46a2c",
              borderRadius: "50%",
              boxShadow: "0 0 6px #c46a2c",
            }}
          />
        </div>
      </div>
    </div>
  );
}
