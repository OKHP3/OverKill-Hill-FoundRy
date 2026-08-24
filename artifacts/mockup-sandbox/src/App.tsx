import { useCallback, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";

import { modules as discoveredModules } from "./.generated/mockup-components";
import { BUILD_STEPS, NAV_EXTRAS } from "./data/knowledge";
import ActionsApps from "./pages/ActionsApps";
import AuditMode from "./pages/AuditMode";
import BuildBrief from "./pages/BuildBrief";
import Capabilities from "./pages/Capabilities";
import ConversationContract from "./pages/ConversationContract";
import ConversationStarters from "./pages/ConversationStarters";
import ExportPackage from "./pages/ExportPackage";
import InstructionStack from "./pages/InstructionStack";
import KnowledgeFiles from "./pages/KnowledgeFiles";
import PlatformCompare from "./pages/PlatformCompare";
import ShipGovern from "./pages/ShipGovern";
import TestMatrix from "./pages/TestMatrix";
import {
  activeProject,
  exportWorkspace,
  getStorageHealth,
  importWorkspace,
  loadWorkspace,
  MAX_PROJECTS,
  persistWorkspace,
  updateActiveProject,
  type CreatorWorkspace,
} from "./lib/creatorStorage";
import { calculateReadiness } from "./lib/readiness";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;
type ThemePreference = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "forge-theme";

function readThemePreference(): ThemePreference {
  try {
    const preference = localStorage.getItem(THEME_STORAGE_KEY);
    return preference === "light" || preference === "dark" || preference === "system"
      ? preference
      : "system";
  } catch {
    return "system";
  }
}

function applyThemePreference(preference: ThemePreference): void {
  const theme = preference === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : preference;

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readThemePreference);

  useEffect(() => {
    applyThemePreference(preference);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, preference);
    } catch {
      // Theme selection remains available when storage is unavailable.
    }

    if (preference !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyThemePreference("system");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [preference]);

  return { preference, setPreference };
}

function ThemeToggle({
  preference,
  setPreference,
}: {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}) {
  const options: Array<{ id: ThemePreference; label: string; icon: string }> = [
    { id: "light", label: "Light", icon: "☀" },
    { id: "system", label: "System", icon: "◐" },
    { id: "dark", label: "Dark", icon: "☾" },
  ];

  return (
    <div className="creator-theme-toggle" role="group" aria-label="Color theme">
      {options.map((option) => (
        <button
          type="button"
          key={option.id}
          className={`creator-theme-option ${preference === option.id ? "is-active" : ""}`}
          onClick={() => setPreference(option.id)}
          aria-pressed={preference === option.id}
          title={`${option.label} mode`}
        >
          <span aria-hidden="true">{option.icon}</span>
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function Gallery() {
  return (
    <div className="mockup-gallery">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Component Preview Server
        </h1>
        <p className="text-gray-500 mb-4">
          This server renders individual components for the workspace canvas.
        </p>
        <p className="text-sm text-gray-400">
          Access component previews at{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            {getBasePath() || ""}/preview/ComponentName
          </code>
        </p>
      </div>
    </div>
  );
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

type ExtraPage = (typeof NAV_EXTRAS)[number]["id"];
type PageId = number | ExtraPage;

function isPageId(value: unknown): value is PageId {
  return (
    (typeof value === "number" && value >= 0 && value <= BUILD_STEPS.length - 1) ||
    value === "audit" ||
    value === "compare" ||
    value === "export"
  );
}

function CreatorShell() {
  const initialWorkspace = useMemo(loadWorkspace, []);
  const [workspace, setWorkspace] = useState<CreatorWorkspace>(initialWorkspace);
  const project = activeProject(workspace);
  const [currentPage, setCurrentPage] = useState<PageId>(isPageId(project.currentPage) ? project.currentPage : 0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set(project.completedSteps));
  const [sidebarOpen, setSidebarOpen] = useState(project.sidebarOpen);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  const [viewRevision, setViewRevision] = useState(0);
  const [storageMessage, setStorageMessage] = useState(getStorageHealth());
  const { preference: themePreference, setPreference: setThemePreference } = useTheme();

  useEffect(() => {
    const next = updateActiveProject(loadWorkspace(), {
      currentPage,
      completedSteps: Array.from(completedSteps),
      sidebarOpen,
    });
    if (persistWorkspace(next)) setWorkspace(next);
  }, [completedSteps, currentPage, sidebarOpen]);

  const switchProject = useCallback((id: string) => {
    const next = persistWorkspace({ ...workspace, activeProjectId: id }) ? { ...workspace, activeProjectId: id } : workspace;
    setWorkspace(next);
    const selected = activeProject(next);
    setCurrentPage(isPageId(selected.currentPage) ? selected.currentPage : 0);
    setCompletedSteps(new Set(selected.completedSteps));
    setSidebarOpen(selected.sidebarOpen);
    setViewRevision((revision) => revision + 1);
    setProjectMenuOpen(false);
  }, [workspace]);

  const createProject = useCallback(() => {
    if (workspace.projects.length >= MAX_PROJECTS) {
      window.alert(`You can keep up to ${MAX_PROJECTS} projects in this browser.`);
      return;
    }
    const name = window.prompt("Name this GPT project:", "Untitled GPT")?.trim();
    if (!name) return;
    const id = `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const timestamp = new Date().toISOString();
    const nextProject = { id, name: name.slice(0, 100), createdAt: timestamp, updatedAt: timestamp, archived: false, data: {}, completedSteps: [], currentPage: 0, sidebarOpen: true };
    const next = { ...workspace, activeProjectId: id, projects: [...workspace.projects, nextProject] };
    persistWorkspace(next);
    setWorkspace(next);
    setCurrentPage(0); setCompletedSteps(new Set()); setSidebarOpen(true); setProjectMenuOpen(false);
  }, [workspace]);

  const renameProject = useCallback(() => {
    const name = window.prompt("Rename this GPT project:", project.name)?.trim();
    if (!name) return;
    const next = { ...workspace, projects: workspace.projects.map((item) => item.id === project.id ? { ...item, name: name.slice(0, 100) } : item) };
    persistWorkspace(next); setWorkspace(next);
  }, [project.id, project.name, workspace]);

  const duplicateProject = useCallback(() => {
    if (workspace.projects.length >= MAX_PROJECTS) { window.alert(`You can keep up to ${MAX_PROJECTS} projects in this browser.`); return; }
    const copy = { ...project, id: `project-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`, name: `${project.name} (copy)`, createdAt: new Date().toISOString(), data: JSON.parse(JSON.stringify(project.data)) };
    const next = { ...workspace, activeProjectId: copy.id, projects: [...workspace.projects, copy] };
    persistWorkspace(next); setWorkspace(next); setCurrentPage(isPageId(copy.currentPage) ? copy.currentPage : 0); setCompletedSteps(new Set(copy.completedSteps)); setProjectMenuOpen(false); setViewRevision((revision) => revision + 1);
  }, [project, workspace]);

  const deleteProject = useCallback(() => {
    if (workspace.projects.length === 1) { window.alert("Keep at least one project. Create another project before deleting this one."); return; }
    if (!window.confirm(`Delete “${project.name}”? This permanently removes this project from this browser.`)) return;
    const remaining = workspace.projects.filter((item) => item.id !== project.id);
    const next = { ...workspace, activeProjectId: remaining[0].id, projects: remaining };
    persistWorkspace(next); setWorkspace(next);
    const selected = remaining[0]; setCurrentPage(isPageId(selected.currentPage) ? selected.currentPage : 0); setCompletedSteps(new Set(selected.completedSteps)); setProjectMenuOpen(false); setViewRevision((revision) => revision + 1);
  }, [project.name, project.id, workspace]);

  const archiveProject = useCallback(() => {
    const next = { ...workspace, projects: workspace.projects.map((item) => item.id === project.id ? { ...item, archived: !item.archived } : item) };
    persistWorkspace(next); setWorkspace(next);
  }, [project.id, workspace]);

  const backup = useCallback(() => {
    const blob = new Blob([exportWorkspace(workspace)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "custom-gpt-workspace.json"; anchor.click(); URL.revokeObjectURL(url);
  }, [workspace]);

  const restore = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importWorkspace(String(reader.result), workspace);
      if (result.error) { window.alert(result.error); return; }
      if (result.workspace && window.confirm(`Import ${result.workspace.projects.length - workspace.projects.length} project(s)? Existing projects will remain unchanged.`)) {
        persistWorkspace(result.workspace); setWorkspace(result.workspace);
        const selected = activeProject(result.workspace); setCurrentPage(isPageId(selected.currentPage) ? selected.currentPage : 0); setCompletedSteps(new Set(selected.completedSteps)); setSidebarOpen(selected.sidebarOpen);
        setViewRevision((revision) => revision + 1);
      }
    };
    reader.readAsText(file);
  }, [workspace]);

  const goTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetWorkspace = useCallback(() => {
    if (!window.confirm("Start over? This will erase all saved GPT builder progress from this browser.")) {
      return;
    }

    const nextProject = { ...project, data: {}, completedSteps: [], currentPage: 0, updatedAt: new Date().toISOString() };
    const next = { ...workspace, projects: workspace.projects.map((item) => item.id === project.id ? nextProject : item) };
    persistWorkspace(next); setWorkspace(next); setViewRevision((revision) => revision + 1);
    setCurrentPage(0);
    setCompletedSteps(new Set());
  }, [project, workspace]);

  const goNext = useCallback(() => {
    if (typeof currentPage !== "number") return;
    if (currentPage < BUILD_STEPS.length - 1) {
      goTo(currentPage + 1);
    }
  }, [currentPage, goTo]);

  // Stable per-step callbacks so pages can report their own completion status.
  // setCompletedSteps is guaranteed stable by React, so [] deps is safe.
  const stepCompleteCallbacks = useMemo(
    () =>
      BUILD_STEPS.map((step) => (complete: boolean) => {
        setCompletedSteps((prev) => {
          const next = new Set(prev);
          if (complete) next.add(step.id);
          else next.delete(step.id);
          return next;
        });
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const goPrev = useCallback(() => {
    if (typeof currentPage === "number" && currentPage > 0) {
      goTo(currentPage - 1);
    }
  }, [currentPage, goTo]);

  const currentLabel = typeof currentPage === "number"
    ? BUILD_STEPS[currentPage].label
    : NAV_EXTRAS.find((item) => item.id === currentPage)?.label ?? "Custom GPT Creator";

  const completedCount = completedSteps.size;
  const progress = Math.round((completedCount / BUILD_STEPS.length) * 100);
  const readiness = calculateReadiness(project.data, completedSteps);
  const readinessLabel = readiness.state === "ready-for-review"
    ? "Ready for review"
    : readiness.state === "confirmed"
      ? "Confirmed (owner-declared)"
      : readiness.state[0].toUpperCase() + readiness.state.slice(1);

  const renderPage = (): ReactNode => {
    const page = typeof currentPage === "number" ? currentPage : 0;
    const stepProps = (id: number) => ({
      onNext: goNext,
      onPrev: goPrev,
      page,
      onComplete: stepCompleteCallbacks[id],
    });
    switch (currentPage) {
      case 0: return <BuildBrief {...stepProps(0)} />;
      case 1: return <ConversationContract {...stepProps(1)} />;
      case 2: return <InstructionStack {...stepProps(2)} />;
      case 3: return <KnowledgeFiles {...stepProps(3)} />;
      case 4: return <Capabilities {...stepProps(4)} />;
      case 5: return <ActionsApps {...stepProps(5)} />;
      case 6: return <ConversationStarters {...stepProps(6)} />;
      case 7: return <TestMatrix {...stepProps(7)} />;
      case 8: return <ShipGovern {...stepProps(8)} />;
      case "audit": return <AuditMode />;
      case "compare": return <PlatformCompare />;
      case "export": return <ExportPackage completedSteps={completedSteps} />;
      default: return null;
    }
  };

  return (
    <div className={`creator-app ${sidebarOpen ? "" : "creator-app--collapsed"}`}>
       <aside className="creator-sidebar">
        <div className="creator-brand">
          <div className="creator-brand-mark">OKH</div>
          <div>
            <div className="creator-brand-name">Found·Ry</div>
            <div className="creator-brand-subtitle">Custom GPT Creator</div>
          </div>
        </div>

        <div className="creator-progress-card">
          <div className="creator-progress-heading">
            <span>Build progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="creator-progress-track">
            <div className="creator-progress-value" style={{ width: `${progress}%` }} />
          </div>
          <div className="creator-progress-meta">{completedCount} of {BUILD_STEPS.length} steps complete</div>
          <div aria-label="Project evidence summary" style={{ marginTop: "0.75rem", paddingTop: "0.65rem", borderTop: "1px solid var(--color-forge-border)", fontSize: "0.76rem" }}>
            <strong>Evidence: {readinessLabel}</strong>
            <div style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.2rem" }}>
              Confidence: {readiness.confidence} · {readiness.unresolvedItems.length} unresolved
            </div>
            <div style={{ color: "var(--color-forge-muted-fg)", marginTop: "0.2rem" }}>
              Human confirmation: {readiness.humanConfirmation.recorded ? "recorded" : "required"}
            </div>
          </div>
        </div>
        <div style={{ padding: "0 1rem 1rem" }}>
          <button type="button" onClick={() => setProjectMenuOpen((open) => !open)} aria-expanded={projectMenuOpen}
            style={{ width: "100%", textAlign: "left", padding: "0.7rem", background: "var(--color-forge-panel)", color: "var(--color-forge-fg)", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", cursor: "pointer" }}>
            <span style={{ display: "block", fontSize: "0.68rem", color: "var(--color-forge-muted-fg)", textTransform: "uppercase" }}>Current project</span>
            <strong>{project.name}</strong> <span aria-hidden="true">⌄</span>
          </button>
          {projectMenuOpen && <div role="region" aria-label="Project manager" style={{ marginTop: "0.5rem", padding: "0.65rem", border: "1px solid var(--color-forge-border)", borderRadius: "var(--radius-md)", background: "var(--color-forge-panel)" }}>
            <button type="button" onClick={createProject} style={managerBtn}>＋ New project</button>
            {workspace.projects.map((item) => <button type="button" key={item.id} onClick={() => switchProject(item.id)} style={{ ...managerBtn, fontWeight: item.id === project.id ? 700 : 400, opacity: item.archived ? 0.6 : 1 }}>{item.name}{item.archived ? " · archived" : ""}</button>)}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem", marginTop: "0.4rem" }}>
              <button type="button" onClick={renameProject} style={managerBtn}>Rename</button><button type="button" onClick={duplicateProject} style={managerBtn}>Duplicate</button>
              <button type="button" onClick={archiveProject} style={managerBtn}>{project.archived ? "Unarchive" : "Archive"}</button><button type="button" onClick={deleteProject} style={managerBtn}>Delete</button>
            </div>
            <button type="button" onClick={backup} style={managerBtn}>Export workspace backup</button>
            <label style={{ ...managerBtn, display: "block", cursor: "pointer" }}>Import backup<input type="file" accept="application/json,.json" onChange={restore} style={{ display: "none" }} /></label>
          </div>}
        </div>

        <nav className="creator-nav" aria-label="Creator workflow">
          <div className="creator-nav-label">Build pipeline</div>
          {BUILD_STEPS.map((step) => {
            const active = currentPage === step.id;
            const complete = completedSteps.has(step.id);
            return (
              <button
                type="button"
                key={step.id}
                className={`creator-nav-item ${active ? "is-active" : ""} ${complete ? "is-complete" : ""}`}
                onClick={() => goTo(step.id)}
              >
                <span className="creator-nav-icon">{complete ? "✓" : step.icon}</span>
                <span className="creator-nav-copy">
                  <span className="creator-nav-step">STEP {step.id}</span>
                  <span>{step.label}</span>
                </span>
                {active && <span className="creator-nav-active-dot" aria-hidden="true" />}
              </button>
            );
          })}
          <div className="creator-nav-label creator-nav-label--extras">Review & output</div>
          {NAV_EXTRAS.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`creator-nav-item creator-nav-item--extra ${currentPage === item.id ? "is-active" : ""}`}
              onClick={() => goTo(item.id)}
            >
              <span className="creator-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="creator-sidebar-footer">
          <a href="/__mockup/" className="creator-preview-link">↗ Open forge mockups</a>
          <button type="button" className="creator-reset-button" onClick={resetWorkspace}>
            ↻ Start over
          </button>
          <span className="creator-storage-note">Local-only workspace · autosaves in your browser</span>
        </div>
      </aside>

      <main className="creator-main">
        <header className="creator-topbar">
          <div className="creator-breadcrumb">
            <button type="button" className="creator-menu-button" onClick={() => setSidebarOpen((open) => !open)} aria-label="Toggle navigation">
              {sidebarOpen ? "←" : "→"}
            </button>
            <span className="creator-kicker">FORGE / BUILDER</span>
            <span className="creator-divider">/</span>
            <span>{currentLabel}</span>
          </div>
          <div className="creator-topbar-controls">
            <ThemeToggle preference={themePreference} setPreference={setThemePreference} />
            <div className="creator-topbar-status">
              <span className="creator-status-dot" />
              Autosaved locally
            </div>
          </div>
        </header>
        <div className="creator-page">
          <div className="creator-page-marker">
            {typeof currentPage === "number" ? `0${currentPage} / 0${BUILD_STEPS.length - 1}` : "BONUS"}
          </div>
          {storageMessage !== "persisted" && <div role="alert" style={{ marginBottom: "1rem", padding: "0.75rem 1rem", border: "1px solid var(--color-forge-warn)", color: "var(--color-forge-fg)", borderRadius: "var(--radius-md)" }}>
            {storageMessage === "unavailable" ? "Browser storage is unavailable. Your changes are only in memory and will be lost on refresh. Download a workspace backup now." : "Saved workspace data was malformed. A new recoverable project is open; import a backup if you have one."}
          </div>}
          <div key={`${project.id}-${viewRevision}`}>{renderPage()}</div>
        </div>
      </main>
    </div>
  );
}

const managerBtn: React.CSSProperties = { width: "100%", textAlign: "left", padding: "0.38rem", background: "transparent", color: "var(--color-forge-fg)", border: "0", borderRadius: "var(--radius-sm)", cursor: "pointer", fontSize: "0.75rem" };

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  // The Canvas artifact intentionally keeps its gallery at /__mockup. The
  // dedicated web artifact uses the same source with BASE_PATH=/custom-gpt-creator/.
  return getBasePath() === "/__mockup" ? <Gallery /> : <CreatorShell />;
}

export default App;
