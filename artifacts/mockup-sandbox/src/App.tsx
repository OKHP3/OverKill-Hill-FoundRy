import { useState, useEffect, lazy, Suspense } from "react";
import { BUILD_STEPS, NAV_EXTRAS } from "./data/knowledge";

// Skill 7 (vercel-react-best-practices): lazy-load all page chunks so the
// initial bundle only ships the shell; pages load on first navigation.
const BuildBrief           = lazy(() => import("./pages/BuildBrief"));
const ConversationContract = lazy(() => import("./pages/ConversationContract"));
const InstructionStack     = lazy(() => import("./pages/InstructionStack"));
const KnowledgeFiles       = lazy(() => import("./pages/KnowledgeFiles"));
const Capabilities         = lazy(() => import("./pages/Capabilities"));
const ActionsApps          = lazy(() => import("./pages/ActionsApps"));
const ConversationStarters = lazy(() => import("./pages/ConversationStarters"));
const TestMatrix           = lazy(() => import("./pages/TestMatrix"));
const ShipGovern           = lazy(() => import("./pages/ShipGovern"));
const AuditMode            = lazy(() => import("./pages/AuditMode"));
const PlatformCompare      = lazy(() => import("./pages/PlatformCompare"));
const ExportPackage        = lazy(() => import("./pages/ExportPackage"));

export type PageId = number | "audit" | "compare" | "export";

const STORAGE_KEY = "cgpt-creator-state";

export interface AppState {
  stepsDone: Set<number>;
}

function useAppState() {
  const [stepsDone, setStepsDone] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { stepsDone?: number[] };
        return new Set(parsed.stepsDone ?? []);
      }
    } catch { /* ignore */ }
    return new Set<number>();
  });

  const markDone = (step: number) => {
    setStepsDone(prev => {
      const next = new Set(prev);
      next.add(step);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ stepsDone: [...next] }));
      return next;
    });
  };

  return { stepsDone, markDone };
}

/* ── Small reusable primitives ────────────────────────────── */

/** OKH P³ forge mark — orange square icon with ⚙ glyph */
function ForgeMark({ size = 36 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      background: "linear-gradient(135deg, var(--color-forge-accent) 0%, #a8521e 100%)",
      borderRadius: Math.round(size * 0.22),
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.5, flexShrink: 0,
      boxShadow: "0 2px 8px rgba(196,106,44,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
    }}>
      ⚙
    </div>
  );
}

/** Circular step badge — todo / active / done */
function StepBadge({ num, active, done }: { num: number; active: boolean; done: boolean }) {
  return (
    <div style={{
      width: 24, height: 24, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, position: "relative", zIndex: 1,
      fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 700,
      background: active ? "var(--color-forge-accent)"
                : done   ? "transparent"
                : "var(--color-forge-bg)",
      borderWidth: 2, borderStyle: "solid",
      borderColor: active ? "var(--color-forge-accent)"
                 : done   ? "var(--color-forge-accent)"
                 : "var(--color-forge-border)",
      color: active ? "var(--color-forge-paper)"
           : done   ? "var(--color-forge-accent)"
           : "var(--color-forge-muted-fg)",
      boxShadow: active ? "0 0 10px rgba(196,106,44,0.5)" : "none",
      transition: "all 200ms",
    }}>
      {done && !active ? "✓" : num}
    </div>
  );
}

/* ── Main app ─────────────────────────────────────────────── */

export default function App() {
  const [page, setPage] = useState<PageId>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { stepsDone, markDone } = useAppState();

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  const navigate = (id: PageId) => setPage(id);
  const goNext = () => {
    if (typeof page === "number") {
      markDone(page);
      if (page < BUILD_STEPS.length - 1) setPage(page + 1);
    }
  };
  const goPrev = () => {
    if (typeof page === "number" && page > 0) setPage(page - 1);
  };

  function renderPage() {
    const props = { onNext: goNext, onPrev: goPrev, page: page as number };
    if (page === "audit")   return <AuditMode />;
    if (page === "compare") return <PlatformCompare />;
    if (page === "export")  return <ExportPackage />;
    switch (page) {
      case 0: return <BuildBrief {...props} />;
      case 1: return <ConversationContract {...props} />;
      case 2: return <InstructionStack {...props} />;
      case 3: return <KnowledgeFiles {...props} />;
      case 4: return <Capabilities {...props} />;
      case 5: return <ActionsApps {...props} />;
      case 6: return <ConversationStarters {...props} />;
      case 7: return <TestMatrix {...props} />;
      case 8: return <ShipGovern {...props} />;
      default: return null;
    }
  }

  const progress = Math.round((stepsDone.size / BUILD_STEPS.length) * 100);

  /* ── Sidebar ──────────────────────────────────────────────── */
  const sidebar = (
    <aside className="forge-sidebar" style={{
      width: 252,
      minWidth: 252,
      background: "var(--color-forge-surface)",
      borderRight: "1px solid var(--color-forge-border)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      flexShrink: 0,
    }}>

      {/* ── Logo lockup ── */}
      <div style={{
        padding: "1.25rem 1rem 1rem",
        borderBottom: "1px solid var(--color-forge-border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.85rem" }}>
          <ForgeMark size={36} />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--color-forge-fg)", lineHeight: 1.15 }}>
              Custom GPT
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", color: "var(--color-forge-accent)", lineHeight: 1.15 }}>
              Creator
            </div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              color: "var(--color-forge-muted-fg)", letterSpacing: "0.08em",
              marginTop: "0.15rem",
            }}>
              OKH P³ · THE FORGE
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.3rem", fontFamily: "var(--font-mono)" }}>
          <span>FORGE PROGRESS</span>
          <span style={{ color: progress === 100 ? "var(--color-forge-success)" : "var(--color-forge-accent)" }}>
            {progress}%
          </span>
        </div>
        <div style={{ height: 5, background: "var(--color-forge-border)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: progress === 100
              ? "var(--color-forge-success)"
              : "linear-gradient(to right, var(--color-forge-accent), var(--color-forge-accent-hi))",
            borderRadius: 3,
            transition: "width 400ms cubic-bezier(0.4,0,0.2,1)",
            boxShadow: progress > 0 ? "0 0 6px rgba(196,106,44,0.5)" : "none",
          }} />
        </div>
      </div>

      {/* ── Build Pipeline nav ── */}
      <nav style={{ padding: "0.75rem 0", flex: 1 }}>
        {/* Section label */}
        <div style={{
          padding: "0 1rem 0.4rem",
          fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em",
          color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)",
        }}>
          Build Pipeline
        </div>

        {/* Steps with vertical pipeline connector */}
        <div style={{ position: "relative" }}>
          {/* Connector line runs down the center of the badges */}
          <div style={{
            position: "absolute",
            left: "calc(1rem + 11px)",
            top: 8, bottom: 8,
            width: 1,
            background: `linear-gradient(to bottom, var(--color-forge-border) 0%, var(--color-forge-border) 85%, transparent 100%)`,
            pointerEvents: "none",
          }} />

          {BUILD_STEPS.map(step => {
            const isActive = page === step.id;
            const isDone   = stepsDone.has(step.id);
            return (
              <button
                key={step.id}
                onClick={() => navigate(step.id)}
                aria-current={isActive ? "page" : undefined}
                className="sidebar-item"
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  width: "100%", padding: "0.38rem 1rem",
                  background: isActive ? "rgba(196,106,44,0.1)" : "transparent",
                  borderWidth: "0 0 0 3px", borderStyle: "solid",
                  borderColor: isActive ? "var(--color-forge-accent)" : "transparent",
                  color: isActive ? "var(--color-forge-fg)"
                       : isDone   ? "var(--color-forge-accent-hi)"
                       : "var(--color-forge-muted-fg)",
                  cursor: "pointer", textAlign: "left",
                  fontFamily: "var(--font-body)", fontSize: "0.82rem",
                  transition: "all 150ms",
                }}
              >
                <StepBadge num={step.id} active={isActive} done={isDone} />
                <span style={{ flex: 1 }}>{step.short}</span>
                {isActive && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.55rem",
                    color: "var(--color-forge-accent)", opacity: 0.7,
                    letterSpacing: "0.05em",
                  }}>
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tools section */}
        <div style={{
          padding: "0.75rem 1rem 0.4rem",
          fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em",
          color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)",
          marginTop: "0.25rem", borderTop: "1px solid var(--color-forge-border)",
        }}>
          Tools
        </div>
        {NAV_EXTRAS.map(extra => {
          const isActive = page === extra.id;
          return (
            <button
              key={extra.id}
              onClick={() => navigate(extra.id as PageId)}
              aria-current={isActive ? "page" : undefined}
              className="sidebar-item"
              style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                width: "100%", padding: "0.38rem 1rem",
                background: isActive ? "rgba(28,58,52,0.6)" : "transparent",
                borderWidth: "0 0 0 3px", borderStyle: "solid",
                borderColor: isActive ? "var(--color-forge-teal-hi)" : "transparent",
                color: isActive ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)",
                cursor: "pointer", textAlign: "left",
                fontFamily: "var(--font-body)", fontSize: "0.82rem",
                transition: "all 150ms",
              }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", flexShrink: 0,
                background: "var(--color-forge-bg)",
                border: "1px solid var(--color-forge-border)",
              }}>
                {extra.icon}
              </span>
              <span>{extra.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div style={{
        padding: "0.65rem 1rem",
        borderTop: "1px solid var(--color-forge-border)",
        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
        color: "var(--color-forge-muted-fg)",
      }}>
        OKH P³ · Apache-2.0<br />
        Skill v1.0.0 · 2026-06-03
      </div>
    </aside>
  );

  /* ── Top bar ──────────────────────────────────────────────── */
  const stepLabel = typeof page === "number"
    ? BUILD_STEPS[page]?.label
    : page === "audit"   ? "Audit Mode"
    : page === "compare" ? "Platform Comparison"
    : "Export Package";

  const stepMeta = typeof page === "number"
    ? `STEP ${String(page).padStart(2, "0")} · ${BUILD_STEPS.length} STEPS`
    : "TOOL";

  const topbar = (
    <header style={{
      display: "flex", alignItems: "center", gap: "0.75rem",
      padding: "0 1.25rem",
      height: 48,
      background: "var(--color-forge-surface)",
      borderBottom: "1px solid var(--color-forge-border)",
      flexShrink: 0,
    }}>
      {/* Hamburger */}
      <button
        onClick={() => setSidebarOpen(v => !v)}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-forge-muted-fg)", fontSize: "1rem",
          padding: "0.25rem 0.35rem", borderRadius: 5,
          display: "flex", alignItems: "center",
          transition: "color 150ms",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--color-forge-fg)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--color-forge-muted-fg)")}
      >
        ☰
      </button>

      {/* Step meta pill */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
        color: "var(--color-forge-accent)",
        background: "var(--color-forge-panel)",
        border: "1px solid var(--color-forge-border)",
        borderRadius: 5, padding: "0.15rem 0.5rem",
        letterSpacing: "0.06em", flexShrink: 0,
      }}>
        {stepMeta}
      </div>

      {/* Step label */}
      <span style={{
        fontFamily: "var(--font-heading)", fontSize: "0.92rem",
        color: "var(--color-forge-fg)",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {stepLabel}
      </span>

      {/* Right — Export */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button
          onClick={() => navigate("export")}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "var(--color-forge-panel)",
            border: "1px solid var(--color-forge-border)",
            borderRadius: "var(--radius-md)",
            padding: "0.28rem 0.85rem",
            color: "var(--color-forge-fg)", cursor: "pointer",
            fontSize: "0.78rem", fontFamily: "var(--font-body)",
            transition: "border-color 150ms, color 150ms",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-forge-accent)";
            (e.currentTarget as HTMLElement).style.color = "var(--color-forge-accent)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-forge-border)";
            (e.currentTarget as HTMLElement).style.color = "var(--color-forge-fg)";
          }}
        >
          <span>📦</span>
          <span>Export</span>
        </button>
      </div>
    </header>
  );

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <div style={{ display: "flex", height: "100%", background: "var(--color-forge-bg)" }}>
      {sidebarOpen && sidebar}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {topbar}

        {/* Content — forge grid texture + Suspense boundary */}
        <main
          className="forge-grid fade-in-up"
          style={{ flex: 1, overflowY: "auto", padding: "1.75rem" }}
        >
          <Suspense fallback={
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", color: "var(--color-forge-muted-fg)",
              fontFamily: "var(--font-mono)", fontSize: "0.85rem",
            }}>
              Loading…
            </div>
          }>
            {renderPage()}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
