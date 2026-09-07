import { useMemo, useRef, useState } from "react";
import {
  assessCapability,
  buildCapabilityFiles,
  buildCapabilityZip,
  createCapabilityBackup,
  loadCapabilityWorkspace,
  MAX_CAPABILITY_BACKUP_BYTES,
  MAX_CAPABILITY_PROJECTS,
  newProject,
  parseCapabilityBackup,
  saveCapabilityWorkspace,
  type CapabilityKind,
  type CapabilityProject,
  type Workspace,
} from "../lib/capability-workbench";
import "../capability-workbench.css";

type Stage = "brief" | "contract" | "build" | "validate" | "package";

const STAGES: Array<{
  id: Stage;
  number: string;
  label: string;
  note: string;
}> = [
  { id: "brief", number: "01", label: "Brief", note: "Purpose and audience" },
  {
    id: "contract",
    number: "02",
    label: "Contract",
    note: "Inputs, outputs, boundaries",
  },
  { id: "build", number: "03", label: "Build", note: "Method and components" },
  {
    id: "validate",
    number: "04",
    label: "Validate",
    note: "Observed evidence",
  },
  { id: "package", number: "05", label: "Package", note: "Reviewable handoff" },
];

const KINDS: Array<{ value: CapabilityKind; label: string; detail: string }> = [
  { value: "prompt", label: "Prompt", detail: "A reusable instruction asset" },
  { value: "skill", label: "Skill", detail: "A portable SKILL.md capability" },
  {
    value: "workflow",
    label: "Workflow",
    detail: "A controlled operating sequence",
  },
  { value: "software", label: "Software", detail: "A local runnable starter" },
];

const PUBLIC_SURFACES = [
  ["OverKill Hill", "https://overkillhill.com", "public site"],
  ["AskJamie", "https://askjamie.bot", "public site"],
  ["Glee-fully", "https://glee-fully.tools", "public site"],
  ["Skillz", "https://okhp3.github.io/skillz", "shared public catalog"],
  [
    "OverKill Hill FoundRy",
    "https://github.com/OKHP3/OverKill-Hill-FoundRy",
    "OverKill workshop",
  ],
  [
    "AskJamie FoundRy",
    "https://github.com/OKHP3/AskJamie-FoundRy",
    "sibling repository",
  ],
  [
    "Glee-fullyTools FoundRy",
    "https://github.com/OKHP3/Glee-fullyTools-FoundRy",
    "sibling repository",
  ],
] as const;

function triggerDownload(name: string, data: BlobPart, type: string): void {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function downloadZip(name: string, bytes: Uint8Array): void {
  // Copy into a browser-owned ArrayBuffer so Blob accepts typed arrays produced by any runtime.
  const stable = new Uint8Array(bytes.byteLength);
  stable.set(bytes);
  triggerDownload(name, stable.buffer, "application/zip");
}

function titleFor(project: CapabilityProject): string {
  return project.name.trim() || "Untitled capability";
}

export default function CapabilityWorkbench({
  onOpenCreator,
}: {
  onOpenCreator: () => void;
}) {
  const initial = useMemo(() => loadCapabilityWorkspace(), []);
  const [workspace, setWorkspace] = useState<Workspace>(initial.workspace);
  const [storageState, setStorageState] = useState(
    initial.warning || "Local workspace · saves when you edit",
  );
  const [stage, setStage] = useState<Stage>("brief");
  const [pendingImport, setPendingImport] = useState<Workspace | null>(null);
  const [importError, setImportError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const importRevision = useRef(0);
  const project =
    workspace.projects.find((item) => item.id === workspace.activeId) ||
    workspace.projects[0];
  const canAddProject = workspace.projects.length < MAX_CAPABILITY_PROJECTS;

  if (!project) return null;

  const replaceWorkspace = (next: Workspace) => {
    try {
      // Keep every accepted edit within the same schema and size envelope as recovery.
      createCapabilityBackup(next);
    } catch (error) {
      setStorageState(
        error instanceof Error
          ? error.message
          : "This edit exceeds the workspace limits.",
      );
      return;
    }
    setWorkspace(next);
    setStorageState(
      saveCapabilityWorkspace(next)
        ? "Saved locally"
        : "Storage unavailable — changes remain in this tab only",
    );
  };

  const update = (field: keyof CapabilityProject, value: string | boolean) => {
    const next: Workspace = {
      ...workspace,
      projects: workspace.projects.map((item) =>
        item.id === project.id
          ? {
              ...item,
              [field]: value,
              reviewed: field === "reviewed" ? Boolean(value) : false,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    };
    replaceWorkspace(next);
  };
  const create = (kind: CapabilityKind = "skill") => {
    if (!canAddProject) {
      setStorageState(`Project limit reached (${MAX_CAPABILITY_PROJECTS})`);
      return;
    }
    const fresh = newProject(kind);
    replaceWorkspace({
      ...workspace,
      activeId: fresh.id,
      projects: [...workspace.projects, fresh],
    });
    setStage("brief");
  };
  const duplicate = () => {
    if (!canAddProject) {
      setStorageState(`Project limit reached (${MAX_CAPABILITY_PROJECTS})`);
      return;
    }
    const copy = {
      ...project,
      id: newProject(project.kind).id,
      name: `${titleFor(project)} copy`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviewed: false,
    };
    replaceWorkspace({
      ...workspace,
      activeId: copy.id,
      projects: [...workspace.projects, copy],
    });
  };
  const removeProject = () => {
    if (
      !window.confirm(
        `Delete ${titleFor(project)} from this browser workspace? Download a backup first if you need to keep it.`,
      )
    )
      return;
    const remaining = workspace.projects.filter(
      (item) => item.id !== project.id,
    );
    const projects = remaining.length ? remaining : [newProject()];
    replaceWorkspace({ version: 1, activeId: projects[0].id, projects });
    setStage("brief");
  };
  const files = buildCapabilityFiles(project);
  const assessment = assessCapability(project);
  const readinessLabel =
    assessment.state === "owner-reviewed-structural-draft"
      ? "Owner-reviewed draft"
      : assessment.state === "ready-for-owner-review-structural-draft"
        ? "Ready for owner review"
        : "Incomplete draft";
  const previewFile =
    files.find((file) => file.path === selectedFile) ?? files[0];
  const chooseImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    const revision = ++importRevision.current;
    setPendingImport(null);
    setImportError("");
    if (file.size > MAX_CAPABILITY_BACKUP_BYTES) {
      setImportError(
        `Backups must be ${Math.floor(MAX_CAPABILITY_BACKUP_BYTES / 1_000_000)} MB or smaller.`,
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (revision !== importRevision.current) return;
      try {
        setPendingImport(parseCapabilityBackup(String(reader.result)));
        setImportError("");
      } catch (error) {
        setImportError(
          error instanceof Error
            ? error.message
            : "This backup could not be read.",
        );
      }
    };
    reader.onerror = () => {
      if (revision !== importRevision.current) return;
      setImportError("This backup could not be read.");
    };
    reader.readAsText(file);
  };

  return (
    <main className="capability-workbench">
      <header className="cw-masthead">
        <div>
          <p className="cw-kicker">OverKill Hill P³ / FoundRy</p>
          <h1>Capability workbench</h1>
          <p className="cw-deck">
            Make a clear, portable starter for a real system. Your project stays
            in this browser. Author and export without a model account or usage
            fees.
          </p>
        </div>
        <div className="cw-header-actions">
          <span
            className={`cw-storage ${storageState.startsWith("Saved") ? "is-good" : "is-warning"}`}
          >
            {storageState}
          </span>
          <button
            className="cw-button cw-button--solid"
            type="button"
            disabled={!canAddProject}
            onClick={() => create()}
          >
            New capability
          </button>
        </div>
      </header>

      <section className="cw-universe" aria-labelledby="universe-title">
        <div className="cw-universe-copy">
          <p className="cw-kicker">Orientation</p>
          <h2 id="universe-title">Three workshops, one shared catalog</h2>
          <p>
            FoundRy is the OverKill Hill workshop and mentor pattern for the
            distinct AskJamie and Glee-fully FoundRys. All three can learn from
            each other. Skillz is their shared catalog.
          </p>
        </div>
        <svg
          className="cw-universe-diagram"
          viewBox="0 0 520 255"
          role="img"
          aria-labelledby="rings-title rings-description"
        >
          <title id="rings-title">
            Three overlapping regions of the OverKill Hill universe
          </title>
          <desc id="rings-description">
            AskJamie is left, OverKill connects the center, and Glee-fully is
            right. Skillz is shared across all three. This FoundRy stays inside
            the exclusive OverKill area.
          </desc>
          <circle cx="135" cy="130" r="108" className="cw-region" />
          <circle
            cx="260"
            cy="130"
            r="112"
            className="cw-region cw-region--center"
          />
          <circle cx="385" cy="130" r="108" className="cw-region" />
          <text x="93" y="108" textAnchor="middle">
            AskJamie
          </text>
          <text x="427" y="108" textAnchor="middle">
            Glee-fully
          </text>
          <text x="260" y="202" textAnchor="middle">
            OverKill
          </text>
          <rect
            x="219"
            y="44"
            width="82"
            height="30"
            rx="4"
            className="cw-diagram-label"
          />
          <text x="260" y="64" textAnchor="middle">
            FoundRy
          </text>
          <path d="M90 142 H430" className="cw-shared-line" />
          <rect
            x="175"
            y="126"
            width="170"
            height="32"
            rx="4"
            className="cw-diagram-label"
          />
          <text x="260" y="147" textAnchor="middle">
            Skillz · shared catalog
          </text>
        </svg>
        <div
          className="cw-siblings"
          aria-label="Entry surfaces and sibling repositories"
        >
          <span>Entry surfaces</span>
          {PUBLIC_SURFACES.map(([label, href, detail]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer">
              {label} <small>({detail})</small> ↗
            </a>
          ))}
        </div>
      </section>

      <section
        className="cw-projectbar"
        aria-label="Capability project controls"
      >
        <label>
          Project
          <select
            value={project.id}
            onChange={(event) =>
              replaceWorkspace({ ...workspace, activeId: event.target.value })
            }
          >
            {workspace.projects.map((item) => (
              <option key={item.id} value={item.id}>
                {titleFor(item)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="cw-button"
          disabled={!canAddProject}
          onClick={duplicate}
        >
          Duplicate
        </button>
        <button type="button" className="cw-button" onClick={removeProject}>
          Delete project
        </button>
        <button
          type="button"
          className="cw-button"
          onClick={() =>
            triggerDownload(
              "foundry-workspace-backup.json",
              createCapabilityBackup(workspace),
              "application/json",
            )
          }
        >
          Download backup
        </button>
        <button
          type="button"
          className="cw-button"
          onClick={() => inputRef.current?.click()}
        >
          Import backup
        </button>
        <input
          ref={inputRef}
          className="cw-visually-hidden"
          type="file"
          accept="application/json"
          onChange={chooseImport}
        />
        <button
          type="button"
          className="cw-creator-link"
          onClick={onOpenCreator}
        >
          Open Custom GPT studio →
        </button>
      </section>
      {importError && (
        <p className="cw-import-error" role="alert">
          Import stopped: {importError}
        </p>
      )}
      {pendingImport && (
        <section className="cw-confirm" role="alert">
          <div>
            <strong>Replace this workspace?</strong>
            <p>
              The imported backup has {pendingImport.projects.length} project
              {pendingImport.projects.length === 1 ? "" : "s"}. Replacing
              overwrites this browser’s current FoundRy workspace.
            </p>
          </div>
          <button
            className="cw-button"
            type="button"
            onClick={() => setPendingImport(null)}
          >
            Keep current
          </button>
          <button
            className="cw-button cw-button--danger"
            type="button"
            onClick={() => {
              replaceWorkspace(pendingImport);
              setPendingImport(null);
            }}
          >
            Replace workspace
          </button>
        </section>
      )}

      <nav className="cw-stages" aria-label="Workbench stages">
        {STAGES.map((item) => (
          <button
            aria-current={stage === item.id ? "step" : undefined}
            key={item.id}
            type="button"
            className={stage === item.id ? "is-active" : ""}
            onClick={() => setStage(item.id)}
          >
            <span>{item.number}</span>
            {item.label}
            <small>{item.note}</small>
          </button>
        ))}
      </nav>

      <section className="cw-workarea">
        <aside className="cw-rail">
          <p className="cw-kicker">Current build</p>
          <h2>{titleFor(project)}</h2>
          <p className="cw-kind-label">{project.kind}</p>
          <div className={`cw-state cw-state--${assessment.state}`}>
            {readinessLabel}
          </div>
          <p>
            {assessment.blockers.length
              ? `${assessment.blockers.length} thing${assessment.blockers.length === 1 ? "" : "s"} to resolve`
              : "No structural blockers"}
          </p>
        </aside>
        <div className="cw-editor">
          {stage === "brief" && (
            <>
              <div className="cw-section-heading">
                <p className="cw-kicker">01 / intent</p>
                <h2>Name the useful thing before choosing its wrapper.</h2>
              </div>
              <div className="cw-fields cw-fields--two">
                <label>
                  Capability name
                  <input
                    value={project.name}
                    onChange={(event) => update("name", event.target.value)}
                    placeholder="e.g. Source-backed interview planner"
                  />
                </label>
                <label>
                  Owner
                  <input
                    value={project.owner}
                    onChange={(event) => update("owner", event.target.value)}
                    placeholder="Who is accountable?"
                  />
                </label>
                <label>
                  Version
                  <input
                    value={project.version}
                    onChange={(event) => update("version", event.target.value)}
                    placeholder="v0.1"
                  />
                </label>
                <label>
                  Audience
                  <input
                    value={project.audience}
                    onChange={(event) => update("audience", event.target.value)}
                    placeholder="Who will use it?"
                  />
                </label>
              </div>
              <label>
                Purpose
                <textarea
                  aria-label="Purpose"
                  value={project.purpose}
                  onChange={(event) => update("purpose", event.target.value)}
                  placeholder="What outcome should this capability help create?"
                />
              </label>
              <fieldset>
                <legend>Target form</legend>
                <div className="cw-kinds">
                  {KINDS.map((kind) => (
                    <button
                      type="button"
                      key={kind.value}
                      aria-pressed={project.kind === kind.value}
                      className={
                        project.kind === kind.value ? "is-selected" : ""
                      }
                      onClick={() => update("kind", kind.value)}
                    >
                      <b>{kind.label}</b>
                      <span>{kind.detail}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          {stage === "contract" && (
            <>
              <div className="cw-section-heading">
                <p className="cw-kicker">02 / contract</p>
                <h2>State what comes in, what leaves, and where it stops.</h2>
              </div>
              <div className="cw-fields">
                <label>
                  Inputs
                  <textarea
                    aria-label="Inputs"
                    value={project.inputs}
                    onChange={(event) => update("inputs", event.target.value)}
                    placeholder="Sources, decisions, parameters…"
                  />
                </label>
                <label>
                  Outputs
                  <textarea
                    aria-label="Outputs"
                    value={project.outputs}
                    onChange={(event) => update("outputs", event.target.value)}
                    placeholder="Files, recommendations, structured records…"
                  />
                </label>
                <label>
                  Constraints
                  <textarea
                    aria-label="Constraints"
                    value={project.constraints}
                    onChange={(event) =>
                      update("constraints", event.target.value)
                    }
                    placeholder="Privacy, permissions, exclusions, escalation…"
                  />
                </label>
                <label>
                  Acceptance criteria
                  <textarea
                    aria-label="Acceptance criteria"
                    value={project.acceptance}
                    onChange={(event) =>
                      update("acceptance", event.target.value)
                    }
                    placeholder="Observable conditions that show the starter is useful"
                  />
                </label>
              </div>
            </>
          )}
          {stage === "build" && (
            <>
              <div className="cw-section-heading">
                <p className="cw-kicker">03 / method</p>
                <h2>
                  Capture the canonical method, then point to shared sources.
                </h2>
              </div>
              <label>
                Instructions
                <textarea
                  aria-label="Instructions"
                  value={project.instructions}
                  onChange={(event) =>
                    update("instructions", event.target.value)
                  }
                  placeholder="Sequence, decisions, and recovery behavior. Keep claims bounded to what you know."
                />
              </label>
              <div className="cw-fields cw-fields--two">
                <label>
                  Components
                  <textarea
                    aria-label="Components"
                    value={project.components}
                    onChange={(event) =>
                      update("components", event.target.value)
                    }
                    placeholder="Modules, templates, diagrams, scripts…"
                  />
                </label>
                <label>
                  Skillz and canonical references
                  <textarea
                    aria-label="Skillz and canonical references"
                    value={project.skillRefs}
                    onChange={(event) =>
                      update("skillRefs", event.target.value)
                    }
                    placeholder="Public Skillz URLs or names; one per line"
                  />
                </label>
              </div>
              <p className="cw-note">
                Method links:{" "}
                <a
                  href="https://github.com/OKHP3/OverKill-Hill-FoundRy/blob/main/phenomould-ry/README.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  PhenoMould construction ↗
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/OKHP3/skillz"
                  target="_blank"
                  rel="noreferrer"
                >
                  shared Skillz catalog ↗
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/OKHP3/OverKill-Hill-FoundRy/blob/main/telleprompt-ry/README.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  TellePrompt interpretation ↗
                </a>{" "}
                ·{" "}
                <a
                  href="https://github.com/OKHP3/OverKill-Hill-FoundRy/blob/main/structrefino-ry/README.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  StructRefino review ↗
                </a>
              </p>
            </>
          )}
          {stage === "validate" && (
            <>
              <div className="cw-section-heading">
                <p className="cw-kicker">04 / observed evidence</p>
                <h2>Record what was actually checked.</h2>
              </div>
              <label>
                Evidence and validation notes
                <textarea
                  aria-label="Evidence and validation notes"
                  value={project.evidence}
                  onChange={(event) => update("evidence", event.target.value)}
                  placeholder="Observed results, dates, limitations, and unresolved risks. A filled field is not proof of behavior."
                />
              </label>
              <label className="cw-review">
                <input
                  type="checkbox"
                  checked={project.reviewed}
                  onChange={(event) => update("reviewed", event.target.checked)}
                />{" "}
                I reviewed this starter against its stated contract.
              </label>
              <div className="cw-checks">
                {assessment.checks.map((check) => (
                  <div
                    key={check.label}
                    className={check.passed ? "is-passed" : ""}
                  >
                    <span aria-hidden="true">{check.passed ? "✓" : "·"}</span>
                    {check.label}
                  </div>
                ))}
              </div>
            </>
          )}
          {stage === "package" && (
            <>
              <div className="cw-section-heading">
                <p className="cw-kicker">05 / handoff</p>
                <h2>Inspect the source bundle before sharing it.</h2>
              </div>
              <p className="cw-note">
                Exports are local starter files. They do not publish, deploy,
                provision repositories, or establish production readiness.
              </p>
              <div className="cw-package">
                <div className="cw-file-list" aria-label="Generated files">
                  {files.map((file) => (
                    <button
                      key={file.path}
                      type="button"
                      className={
                        previewFile?.path === file.path ? "is-selected" : ""
                      }
                      onClick={() => setSelectedFile(file.path)}
                    >
                      {file.path}
                    </button>
                  ))}
                </div>
                <pre aria-label="Selected generated file">
                  {previewFile?.content ||
                    "No generated files are available for this starter yet."}
                </pre>
              </div>
              <div className="cw-package-actions">
                <button
                  className="cw-button"
                  type="button"
                  onClick={() =>
                    triggerDownload(
                      "foundry-workspace-backup.json",
                      createCapabilityBackup(workspace),
                      "application/json",
                    )
                  }
                >
                  Download workspace backup
                </button>
                <button
                  className="cw-button cw-button--solid"
                  type="button"
                  onClick={() =>
                    downloadZip(
                      `${
                        project.name
                          .trim()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-") || "capability"
                      }-starter.zip`,
                      buildCapabilityZip(project),
                    )
                  }
                >
                  Download starter ZIP
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
