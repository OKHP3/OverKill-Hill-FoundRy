import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--app-font-sans, 'DM Sans', sans-serif)",
      }}
    >
      {/* Forge dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(42,58,74,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 0,
        }}
      />

      {/* Ember glow — bottom left */}
      <motion.div
        animate={{
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-80px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,106,44,1) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Ember glow — top right */}
      <motion.div
        animate={{
          opacity: [0.10, 0.16, 0.10],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1, // Offset phase
        }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-60px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(230,160,60,1) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Schematic corner marks — top left */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.0, duration: 1 }}
        style={{ position: "absolute", top: 24, left: 24, zIndex: 1 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M0 20 L0 0 L20 0" stroke="#c46a2c" strokeWidth="1.5" opacity="0.55" />
        <circle cx="0" cy="0" r="3" fill="#c46a2c" opacity="0.7" />
      </motion.svg>

      {/* Schematic corner marks — top right */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.0, duration: 1 }}
        style={{ position: "absolute", top: 24, right: 24, zIndex: 1 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M40 20 L40 0 L20 0" stroke="#c46a2c" strokeWidth="1.5" opacity="0.55" />
        <circle cx="40" cy="0" r="3" fill="#c46a2c" opacity="0.7" />
      </motion.svg>

      {/* Schematic corner marks — bottom right */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.0, duration: 1 }}
        style={{ position: "absolute", bottom: 24, right: 24, zIndex: 1 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M40 20 L40 40 L20 40" stroke="#c46a2c" strokeWidth="1.5" opacity="0.55" />
        <circle cx="40" cy="40" r="3" fill="#c46a2c" opacity="0.7" />
      </motion.svg>

      {/* Schematic corner marks — bottom left */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.0, duration: 1 }}
        style={{ position: "absolute", bottom: 24, left: 24, zIndex: 1 }}
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M0 20 L0 40 L20 40" stroke="#c46a2c" strokeWidth="1.5" opacity="0.55" />
        <circle cx="0" cy="40" r="3" fill="#c46a2c" opacity="0.7" />
      </motion.svg>

      {/* Blueprint horizontal rule — top third */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,106,44,0.15) 20%, rgba(196,106,44,0.25) 50%, rgba(196,106,44,0.15) 80%, transparent 95%)",
          zIndex: 0,
        }}
      />

      {/* Blueprint horizontal rule — bottom third */}
      <div
        style={{
          position: "absolute",
          top: "72%",
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 5%, rgba(196,106,44,0.15) 20%, rgba(196,106,44,0.25) 50%, rgba(196,106,44,0.15) 80%, transparent 95%)",
          zIndex: 0,
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          textAlign: "center",
          padding: "0 2rem",
          maxWidth: "900px",
        }}
      >
        {/* Forge hammer mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", borderRadius: "18px" }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 32px rgba(196,106,44,0.2), 0 18px 40px rgba(0,0,0,0.5)",
                "0 0 48px rgba(196,106,44,0.3), 0 18px 40px rgba(0,0,0,0.5)",
                "0 0 32px rgba(196,106,44,0.2), 0 18px 40px rgba(0,0,0,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              zIndex: -1,
            }}
          />
          <div
            style={{
              width: "88px",
              height: "88px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #1e2936 0%, #111827 100%)",
              border: "1px solid rgba(196,106,44,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/forge-icon.png"
              alt="OKH Found·Ry forge mark"
              style={{ width: "68px", height: "68px", objectFit: "contain" }}
            />
          </div>
        </motion.div>

        {/* Protocol badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--app-font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "#c46a2c",
            background: "rgba(196,106,44,0.08)",
            border: "1px solid rgba(196,106,44,0.25)",
            borderRadius: "4px",
            padding: "0.2rem 0.75rem",
            textTransform: "uppercase",
          }}
        >
          OverKill Hill P³ · Custom GPT Creator
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--app-font-serif, 'Alfa Slab One', serif)",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            fontWeight: 400,
            color: "#e5e7eb",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          OKH{" "}
          <span style={{ color: "#c46a2c", textShadow: "0 0 30px rgba(196,106,44,0.4)" }}>
            Found
          </span>
          <span
            style={{
              color: "#e6a03c",
              fontFamily: "var(--app-font-mono, 'JetBrains Mono', monospace)",
              fontSize: "0.6em",
              verticalAlign: "super",
              textShadow: "0 0 20px rgba(230,160,60,0.5)",
            }}
          >
            ·Ry
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{
            fontFamily: "var(--app-font-sans, 'DM Sans', sans-serif)",
            fontSize: "1.1rem",
            color: "#9ca3af",
            margin: 0,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Precision&nbsp;·&nbsp;Protocol&nbsp;·&nbsp;Promptcraft
        </motion.p>

        {/* Orange forge rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            width: "100%",
            maxWidth: "480px",
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #c46a2c)",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "#c46a2c",
              transform: "rotate(45deg)",
              boxShadow: "0 0 8px #c46a2c",
            }}
          />
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, #c46a2c, transparent)",
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          style={{
            fontFamily: "var(--app-font-sans, 'DM Sans', sans-serif)",
            fontSize: "1rem",
            color: "#6b7280",
            margin: 0,
            maxWidth: "560px",
            lineHeight: 1.65,
          }}
        >
          A structured GPT builder that turns practitioner intent into
          production-ready Custom GPT packages — without losing precision in the translation.
        </motion.p>
      </div>

      {/* Bottom attribution bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(42,58,74,0.8)",
          background: "rgba(10,12,18,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--app-font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.6rem",
            color: "#374151",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          overkillhill.com
        </span>
        <span
          style={{
            fontFamily: "var(--app-font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.6rem",
            color: "#374151",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          v&thinsp;2026 · forge-mark · MIT
        </span>
        <span
          style={{
            fontFamily: "var(--app-font-mono, 'JetBrains Mono', monospace)",
            fontSize: "0.6rem",
            color: "#374151",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          github.com/OKHP3
        </span>
      </motion.div>
    </div>
  );
}
