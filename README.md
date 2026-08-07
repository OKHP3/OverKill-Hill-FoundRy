# OverKill Hill FoundRy

**OKHP3 / OverKill-Hill-FoundRy**

A Replit workspace and GitHub repository for the OverKill Hill P3 family. The primary artifact is **The OverKill Hill Found-Ry** — a browser-only, 9-step tool for designing, documenting, auditing, and exporting production-grade OpenAI Custom GPTs (and Gemini Gems / Copilot Declarative Agents). It is also the living home for 41+ OKHP3 Agent Skills, the brand-style registry, and the ReFolDec process framework.

---

## The OverKill Hill Found-Ry

The SPA lives at `artifacts/mockup-sandbox/` and runs at `localhost:5000` in the Replit workspace. No backend. No database. No auth. All state is `localStorage`.

### Build pipeline

| Step | Name | What you define |
|---|---|---|
| 0 | Build Brief | Job, users, outcomes, non-goals, acceptance criteria, compliance |
| 1 | Conversation Contract | Inputs, outputs, top tasks, catastrophic failure modes |
| 2 | Instruction Stack | 8-layer architecture up to 8,000 chars |
| 3 | Knowledge Files | Manifest up to 20 files x 512 MB, retrieval routing notes |
| 4 | Capabilities | Toggle each capability on or off with explicit rationale |
| 5 | Actions / Apps | OpenAPI schema authoring or MCP app selection (mutually exclusive) |
| 6 | Conversation Starters | 3-4 workflow-launch prompts, not slogans |
| 7 | Test Matrix | 10-15 test cases across 6 categories, red-team pack included |
| 8 | Ship & Govern | Visibility, versioning, owner, change log, scheduled review |

Additional tools: Audit Mode (10-item rubric scorer), Platform Comparison, and Export Package.

### Tech stack

| Layer | Choice |
|---|---|
| Bundler | Vite 7 |
| Framework | React 19 |
| Styling | Tailwind CSS v4 (`@theme` block in `src/index.css`) |
| Language | TypeScript |
| Package manager | pnpm workspace |
| State | `localStorage` only (`cgpt-step-0` through `cgpt-step-8`) |

### Visual identity

The Forge Protocol theme: dot-grid content area, step-badge sidebar pipeline, forge-mark logo lockup. Light / dark / system-mode toggle (sun / circle / moon) using `data-theme` on `<html>`. No-flash inline script in `index.html` resolves the preference before first paint.

| Token | Dark | Light |
|---|---|---|
| Background | `#111827` | `#eff2f5` |
| Surface | `#181f26` | `#f6f2ee` |
| Foreground | `#e5e7eb` | `#0f172a` |
| Accent (orange) | `#c46a2c` | `#c46a2c` |
| Display font | Alfa Slab One | Alfa Slab One |
| Body font | DM Sans | DM Sans |
| Mono font | JetBrains Mono | JetBrains Mono |

---

## Running the workspace

```bash
# Install (pnpm workspace)
pnpm install --filter @workspace/mockup-sandbox

# Start the SPA (port 5000)
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/mockup-sandbox run dev

# Run the FoundRy sync audit
python3 scripts/foundry-sync.py
```

The Replit workflow named **Custom GPT Creator SPA** handles startup automatically.

---

## Repository layout

```text
.
├── artifacts/mockup-sandbox/     The OverKill Hill Found-Ry (React/Vite)
│   ├── src/
│   │   ├── App.tsx               Shell, routing, theme toggle
│   │   ├── index.css             Brand tokens, light/dark theme, component CSS
│   │   ├── pages/                9 build steps + 3 tool pages
│   │   └── data/knowledge.ts     Reference data (limits, auth types, audit rubric)
│   └── index.html                Entry point with no-flash theme script
├── .agents/skills/               41+ OKHP3 Agent Skills (SKILL.md format)
├── brand-styles/                 Brand registry and profile YAML files
├── custom-gpts/                  Proto-GPT capability archives and distillations
├── docs/                         ReFolDec specification, roadmap, operating model
├── schemas/                      ReFolDec artifact schema and registry schemas
├── scripts/                      Python audit utilities (sync, manifest, registry)
├── registry/                     FoundRy repository index
├── _template/                    Scaffold for governed child repositories
├── AGENTS.md                     Canonical guide for human and agent contributors
├── CONTRIBUTING.md               Workflow guidance for contributors
├── CODE_OF_CONDUCT.md            Contributor Covenant 2.1
├── SECURITY.md                   Vulnerability reporting process
├── LICENSE                       Apache-2.0
└── manifest.yaml                 FoundRy governance metadata
```

---

## Agent Skills

The `.agents/skills/` directory contains 41+ reusable OKHP3 Agent Skills. Each skill follows the SKILL.md format with trigger conditions, inputs, outputs, and a step-by-step procedure.

Skills cover: process capture, brand style registry, Custom GPT authoring, equilibrium review, session handoff, skill foundry, thread extraction, Notion routing, repository organization, and more.

---

## ReFolDec

The conceptual framework underpinning this workspace. ReFolDec (Recursively Folding Codec) is a bidirectional process-capture model:

- **Fold** raw material upward into structured artifacts.
- **Unfold** mature artifacts downward into primitives, patterns, and reusable instructions.
- **Refold** the improved primitives into stronger processes, diagrams, and skills.

Full specification: `docs/specification.md`.

---

## Validation

```bash
python3 scripts/foundry-sync.py --strict
python3 scripts/manifest-audit.py
python3 scripts/registry-audit.py
python3 scripts/sync-report.py
python3 -m json.tool refoldec.manifest.json >/dev/null
bash -n scripts/post-merge.sh
python3 scripts/normalize_filenames.py . --recursive
```

---

## Contributing

See `CONTRIBUTING.md` for branch conventions, commit style, and validation steps.
See `CODE_OF_CONDUCT.md` for community standards.

Do not add a backend, router, database, or auth flow to the SPA. Do not add `npm install` guards bypasses. Keep the SPA client-only.

---

## License

Apache-2.0. See [LICENSE](LICENSE).
