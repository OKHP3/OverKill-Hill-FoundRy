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

export default function App() {
  const [page, setPage] = useState<PageId>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { stepsDone, markDone } = useAppState();

  // Close sidebar on narrow screens by default
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

  return (
    <div style={{ display: "flex", height: "100%", background: "var(--color-forge-bg)" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <aside style={{
          width: 220,
          minWidth: 220,
          background: "var(--color-forge-surface)",
          borderRight: "1px solid var(--color-forge-border)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: "1.25rem 1rem 0.75rem", borderBottom: "1px solid var(--color-forge-border)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "var(--color-forge-accent)", lineHeight: 1.2 }}>
              ⚙️ Custom GPT
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.85rem", color: "var(--color-forge-muted-fg)" }}>
              Creator · OKH P³
            </div>
            {/* Progress bar */}
            <div style={{ marginTop: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--color-forge-muted-fg)", marginBottom: "0.25rem" }}>
                <span>Progress</span><span>{progress}%</span>
              </div>
              <div style={{ height: 4, background: "var(--color-forge-border)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "var(--color-forge-accent)", borderRadius: 2, transition: "width 300ms" }} />
              </div>
            </div>
          </div>

          {/* Build steps */}
          <nav style={{ padding: "0.5rem 0", flex: 1 }}>
            <div style={{ padding: "0.5rem 1rem 0.25rem", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)" }}>
              Build Pipeline
            </div>
            {BUILD_STEPS.map(step => {
              const isActive = page === step.id;
              const isDone   = stepsDone.has(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => navigate(step.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    width: "100%", padding: "0.45rem 1rem",
                    background: isActive ? "var(--color-forge-accent)" : "transparent",
                    color: isActive ? "var(--color-forge-paper)" : isDone ? "var(--color-forge-accent-hi)" : "var(--color-forge-muted-fg)",
                    border: "none", cursor: "pointer",
                    fontSize: "0.82rem", textAlign: "left",
                    transition: "background 150ms, color 150ms",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-forge-muted)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "0.85rem", width: "1.1rem", textAlign: "center" }}>
                    {isDone && !isActive ? "✓" : step.icon}
                  </span>
                  <span>{step.short}</span>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: "0.65rem", opacity: 0.5 }}>
                    {step.id}
                  </span>
                </button>
              );
            })}

            <div style={{ padding: "0.5rem 1rem 0.25rem", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)", marginTop: "0.5rem", borderTop: "1px solid var(--color-forge-border)" }}>
              Tools
            </div>
            {NAV_EXTRAS.map(extra => {
              const isActive = page === extra.id;
              return (
                <button
                  key={extra.id}
                  onClick={() => navigate(extra.id as PageId)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    width: "100%", padding: "0.45rem 1rem",
                    background: isActive ? "var(--color-forge-teal)" : "transparent",
                    color: isActive ? "var(--color-forge-fg)" : "var(--color-forge-muted-fg)",
                    border: "none", cursor: "pointer",
                    fontSize: "0.82rem", textAlign: "left",
                    transition: "background 150ms, color 150ms",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-forge-muted)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "0.85rem", width: "1.1rem", textAlign: "center" }}>{extra.icon}</span>
                  <span>{extra.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--color-forge-border)", fontSize: "0.65rem", color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)" }}>
            OKH P³ · Apache-2.0<br />
            Skill v1.0.0 · 2026-06-03
          </div>
        </aside>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "0.6rem 1.25rem",
          background: "var(--color-forge-surface)",
          borderBottom: "1px solid var(--color-forge-border)",
          flexShrink: 0,
        }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-forge-muted-fg)", fontSize: "1.1rem", padding: "0.2rem 0.4rem", borderRadius: "4px" }}
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
          >
            ☰
          </button>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", color: "var(--color-forge-fg)" }}>
            {typeof page === "number"
              ? `Step ${page}: ${BUILD_STEPS[page]?.label}`
              : page === "audit" ? "🔍 Audit Mode"
              : page === "compare" ? "⚖️ Platform Comparison"
              : "📦 Export Package"}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => navigate("export")}
              style={{ background: "var(--color-forge-panel)", border: "1px solid var(--color-forge-border)", borderRadius: "6px", padding: "0.3rem 0.75rem", color: "var(--color-forge-fg)", cursor: "pointer", fontSize: "0.8rem", fontFamily: "var(--font-body)" }}
            >
              📦 Export
            </button>
          </div>
        </header>

        {/* Content — Suspense boundary keeps the shell interactive while a
            page chunk loads on first visit (vercel-react-best-practices:
            bundle-dynamic-imports). */}
        <main style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }} className="fade-in-up">
          <Suspense fallback={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-forge-muted-fg)", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
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
