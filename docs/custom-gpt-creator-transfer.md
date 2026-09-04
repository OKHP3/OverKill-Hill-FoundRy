# Custom GPT Creator SPA — FoundRy Transfer Document

**Repository:** `OKHP3/OverKill-Hill-FoundRy`
**Receiving Replit:** `https://replit.com/t/overkill-hill/repls/OverKill-Hill-FoundRy`
**Transfer date:** 2026-08-06
**Status:** Active browser-only SPA, dedicated Replit web artifact and GitHub Pages workflow present, receiving Replit is go-forward authority.

---

## 1. Project goal

Build and maintain an interactive, browser-only Single-Page Application (SPA) that operationalizes the `okhp3-custom-gpt-builder` Agent Skill. The app walks a builder through every step required to design, document, audit, and export a production-grade OpenAI Custom GPT — and secondarily a Gemini Gem or Microsoft Copilot Declarative Agent.

The runnable app is served by the dedicated `artifacts/custom-gpt-creator/` web artifact at `/custom-gpt-creator/`. Its thin entrypoint reuses the canonical creator pages and data from `artifacts/mockup-sandbox/`, where the separate Canvas artifact continues to provide isolated forge component previews at `/__mockup/`. It has no backend, no database, and no authentication. All state is localStorage only.

---

## 2. Tech stack — locked decisions

| Layer | Choice | Notes |
|---|---|---|
| Bundler | Vite 7 | `pnpm --filter @workspace/custom-gpt-creator run build` |
| Framework | React 19 | Pinned at `19.1.0` in pnpm-workspace catalog |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | v4 `@theme` block in `src/index.css`; no `tailwind.config.js` |
| Language | TypeScript | `tsconfig.json` extends `../../tsconfig.base.json` |
| Component library | shadcn/Radix UI | 20 components in `src/components/ui/` |
| Icons | lucide-react | From catalog |
| Animation | framer-motion | From catalog |
| Package manager | pnpm (workspace) | `npm install` is blocked by a preinstall guard |
| Navigation | `useState` in the canonical creator App.tsx | No react-router; no hash routing needed |
| State persistence | localStorage | Versioned `cgpt-workspace` containing bounded named projects; legacy step keys are migrated on first load |

**Do not** add react-router, a backend server, a database, or any OAuth flow. The SPA is intentionally client-only.

---

## 3. Visual identity — OverKill Hill P3 forge theme

The brand tokens are declared as Tailwind v4 `@theme` custom properties in `artifacts/mockup-sandbox/src/index.css`. Do not override or re-declare them.

| Token role | Value |
|---|---|
| Background (deep) | `#111827` |
| Background (surface) | `#181f26` |
| Primary accent (orange) | `#c46a2c` |
| Secondary highlight (amber) | `#e6a03c` |
| Display font | Alfa Slab One (Google Fonts) |
| Body font | DM Sans (Google Fonts) |
| Mono font | JetBrains Mono (Google Fonts) |

Fonts are loaded via `<link>` tags in `artifacts/custom-gpt-creator/index.html`. The `<title>` is "Custom GPT Creator | OverKill Hill P3".

---

## 4. SPA architecture

### Entry points

| File | Role |
|---|---|
| `artifacts/custom-gpt-creator/index.html` | Runnable app HTML shell, metadata, and Google Fonts |
| `artifacts/custom-gpt-creator/src/main.tsx` | Dedicated web artifact React root; imports shared forge styles |
| `artifacts/custom-gpt-creator/src/App.tsx` | Thin bridge to the canonical creator implementation |
| `artifacts/mockup-sandbox/src/App.tsx` | Canonical creator navigation, layout, and page routing; preserves `/__mockup/preview/*` rendering |
| `artifacts/mockup-sandbox/src/index.css` | Global styles + Tailwind v4 `@theme` tokens |

### Navigation model

`App.tsx` holds the active project and `currentPage` (number 0-8 for build steps, or string `"audit"` / `"compare"` / `"export"`). Completion is hydrated from the active project. There is no URL-based routing. `goNext()` marks the current step complete and advances. `goPrev()` goes back without marking complete. A collapsible sidebar lists steps, extras, and named project lifecycle actions. A top progress bar shows step completion percentage.

### Page registry

| Page ID | Component | Step | Purpose |
|---|---|---|---|
| 0 | `BuildBrief.tsx` | Step 0 | 9-field build brief with completeness meter |
| 1 | `ConversationContract.tsx` | Step 1 | Inputs, outputs, top tasks, catastrophic mistakes |
| 2 | `InstructionStack.tsx` | Step 2 | 8-layer instruction editor, 8k char limit, copy button |
| 3 | `KnowledgeFiles.tsx` | Step 3 | File manifest builder, auto-generates Layer 5 routing snippet |
| 4 | `Capabilities.tsx` | Step 4 | Capability toggles with rationale fields |
| 5 | `ActionsApps.tsx` | Step 5 | Actions/Apps config, mutual exclusion, OpenAPI template loader |
| 6 | `ConversationStarters.tsx` | Step 6 | Good/bad starter examples, quality checklist |
| 7 | `TestMatrix.tsx` | Step 7 | 6-category tracker, red-team prompts, pass/fail scoring |
| 8 | `ShipGovern.tsx` | Step 8 | Visibility, versioning, governance, ship-gate checker |
| "audit" | `AuditMode.tsx` | Bonus | 10-item rubric, 0-5 scoring, avg >= 4.0 + safety >= 4 gate |
| "compare" | `PlatformCompare.tsx` | Bonus | Decision tree, feature matrix, taxonomy, evolution timeline |
| "export" | `ExportPackage.tsx` | Bonus | Full Markdown spec with raw/rendered views, instructions-only export, or structured evidence JSON; copy or download |

### Data layer

All reference constants live in `artifacts/mockup-sandbox/src/data/knowledge.ts`. This single file contains:

`BUILD_STEPS`, `NAV_EXTRAS`, `CAPABILITIES`, `QUALITY_TIERS`, `INSTRUCTION_LAYERS`, `INSTRUCTION_CHAR_LIMIT`, `INSTRUCTION_RECOMMENDED_MAX_WORDS`, `VISIBILITY_OPTIONS`, `VERSION_SCHEME`, `AUDIT_ITEMS`, `SHIP_GATE_AVG`, `SHIP_GATE_SAFETY_MIN`, `SAFETY_AUDIT_ID`, `PLATFORMS`, `STARTER_EXAMPLES_BAD`, `STARTER_EXAMPLES_GOOD`, `TEST_CATEGORIES`, `RED_TEAM_PROMPTS`, `ACTIONS_LIMITS`, `ACTION_AUTH_OPTIONS`, `ACTION_FAILURES`, `OPENAPI_TEMPLATE`, `TAXONOMY`, `GPT_EXAMPLES`, `EVOLUTION_TIMELINE`.

When adding new reference data, extend `knowledge.ts`. Do not scatter constants into individual page components.

### Utility layer

- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `src/hooks/use-toast.ts` — shadcn toast hook.
- `src/.generated/mockup-components.ts` — auto-generated by `mockupPreviewPlugin` at build time; do not edit manually.

---

## 5. Build and dev workflow

### Workspace install

```bash
# From repo root — resolves catalog: references in pnpm-workspace.yaml
pnpm install --frozen-lockfile
```

**Never run `npm install`** — a preinstall guard in the root `package.json` blocks it.

### Dev server (Replit only)

```bash
pnpm --filter @workspace/custom-gpt-creator run dev
```

The managed Replit workflow named **`artifacts/custom-gpt-creator: web`** runs this command. The artifact service injects its assigned `PORT` and `BASE_PATH=/custom-gpt-creator/`; do not replace it with a manually configured workflow.

`PORT` and `BASE_PATH` are required by the Vite configuration and supplied by the artifact service in Replit. The runtime error overlay is always configured; the Cartographer plugin is gated on `REPL_ID` and skipped automatically in CI.

### Production build

```bash
PORT=5000 BASE_PATH=<see section 6> NODE_ENV=production pnpm --filter @workspace/custom-gpt-creator run build
```

Output: `artifacts/custom-gpt-creator/dist/public/` — `index.html` + hashed JS/CSS bundles.

### TypeScript check

```bash
pnpm --filter @workspace/custom-gpt-creator run typecheck
```

Workspace-wide strict TypeScript currently passes for the canonical source and the dedicated artifact. Keep this check in the normal validation sequence before committing creator changes.

### GitHub Markdown rendering check

The deterministic Playwright suite validates the export bytes and compares
CommonMark and GitHub-style local parsers. A separate, network-dependent check
uses GitHub's documented `POST /markdown` endpoint in `gfm` mode against the
versioned fixture
`artifacts/custom-gpt-creator/tests/fixtures/github-markdown-fixture.v1.md`:

```bash
pnpm --filter @workspace/custom-gpt-creator run test:github-markdown
```

This check is intentionally not part of `test:e2e`: GitHub availability and
rate limits must not make the deterministic browser suite flaky. The fixture is
read-only and the check confirms its bytes are unchanged after rendering.

---

## 6. GitHub Pages deployment

**Workflow:** `.github/workflows/pages.yml`
**Trigger:** Push to `main` or manual dispatch.
**Default deployed URL:** `https://okhp3.github.io/OverKill-Hill-FoundRy/`

### Base path

`OKHP3/OverKill-Hill-FoundRy` is a project repository. Without a custom domain, GitHub Pages serves it at the subpath `/OverKill-Hill-FoundRy/`. All asset URLs in the built `dist/index.html` must carry that prefix or they will resolve to the wrong path and the SPA will not load.

The committed workflow uses `BASE_PATH=/OverKill-Hill-FoundRy/`, which is correct for the default project site URL. If a custom domain is later configured at the repository level, change `BASE_PATH` in the workflow's build step to `/` and trigger a new deployment.

**Required one-time GitHub configuration:** In `OKHP3/OverKill-Hill-FoundRy` repository Settings > Pages > Source, set to **GitHub Actions** (not a branch/folder). Once done, the first push to `main` deploys automatically.

**No SPA 404 fallback is needed** because the app uses `useState` navigation, not URL-based routing. All page transitions happen in JS without changing the browser URL.

The workflow:

1. Checks out the repo.
2. Sets up pnpm 9 and Node 22 with pnpm cache.
3. Runs `pnpm install --frozen-lockfile` at the repo root.
4. Builds `artifacts/custom-gpt-creator/` with `BASE_PATH=/OverKill-Hill-FoundRy/ NODE_ENV=production`.
5. Uploads `artifacts/custom-gpt-creator/dist/public` as the Pages artifact.
6. Deploys using the standard `actions/deploy-pages@v4` with built-in `GITHUB_TOKEN` — no PAT required.

---

## 7. Vite config constraints

`artifacts/custom-gpt-creator/vite.config.ts` has these intentional behaviors:

- `base` is set from the required `process.env.BASE_PATH` value.
- `PORT` is required and validated before Vite starts.
- It allows the sibling `artifacts/mockup-sandbox/` source directory so the dedicated artifact can render the canonical creator pages without duplicating them.
- `runtimeErrorOverlay` is always configured. `@replit/vite-plugin-cartographer` is skipped when `REPL_ID` is not set, preventing CI-only plugin loading.
- `build.outDir` is explicitly set to `artifacts/custom-gpt-creator/dist/public` (absolute path).

`artifacts/mockup-sandbox/vite.config.ts` remains the Canvas preview configuration. Its `mockupPreviewPlugin()` generates `src/.generated/mockup-components.ts` for `/__mockup/preview/*` and must not be removed.

---

## 8. pnpm workspace constraints

`pnpm-workspace.yaml` at repo root:

- Declares catalog versions for all shared dependencies including React, Vite, Tailwind, TypeScript types, and Radix/Lucide/Framer.
- Contains a `minimumReleaseAge: 1440` setting (Replit-specific supply-chain defense). Standard pnpm on GitHub Actions ignores this unknown key — this is expected and safe.
- Excludes all non-linux-x64 esbuild platform binaries. GitHub Actions ubuntu runners are linux-x64, so CI builds work correctly.
- `packages:` lists `artifacts/*`, `lib/*`, `lib/integrations/*`, `scripts`.

`tsconfig.base.json` at repo root is required. It must exist for the sandbox tsconfig (`artifacts/mockup-sandbox/tsconfig.json`) to resolve. If it is ever lost, recover it from git history — it contains strict compiler options with `"types": []`.

---

## 9. Agent Skill relationship

The SPA operationalizes the `okhp3-custom-gpt-builder` Agent Skill located at `.agents/skills/okhp3-custom-gpt-builder/SKILL.md` (386 lines, v1.0.0). The skill defines the canonical methodology; the SPA provides a UI wrapper for that methodology. They should stay in conceptual sync. When the skill's build phases, audit criteria, or platform comparison data change, update `src/data/knowledge.ts` accordingly.

Do not confuse the skill file with the SPA. The skill runs in agent environments. The SPA runs in a browser.

---

## 10. Confirmed open work (backlog)

These items describe remaining or intentionally deferred work:

### A. Push to Forge from Export page (deferred)

An automatic "Push to Forge" button is intentionally deferred. The browser-only architecture must not embed a GitHub PAT or other write credential in the SPA bundle.

**Safe architecture required.** Do not put a GitHub PAT in the SPA bundle — Vite embeds all `VITE_`-prefixed env vars into the client-side JavaScript, which is publicly readable. A write credential exposed this way would give anyone with the deployed URL full write access to the repository.

Viable approaches:
- A small server-side proxy (e.g., a Cloudflare Worker or Replit-hosted Express endpoint) that holds the PAT and accepts an authenticated request from the SPA.
- A GitHub App with narrow installation permissions (write to `custom-gpts/proto/` only) and short-lived tokens issued server-side.
- Skip the push and generate a downloadable file that the user commits manually.

### B. Named project slots (completed)

The versioned `cgpt-workspace` localStorage model supports bounded named projects, project switching, reload persistence, reset, and per-project exports. Keep the browser regression coverage in `artifacts/custom-gpt-creator/tests/` aligned with this contract.

### C. Live Markdown preview in Export page (low)

Add a toggleable rendered Markdown preview alongside the raw text in `ExportPackage.tsx`. A lightweight renderer (e.g., `marked` or `react-markdown`) would display the exported spec formatted.

---

## 11. Repository context

This SPA exists within the private FoundRy relay repository (`OKHP3/OverKill-Hill-FoundRy`), whose primary purpose is governance and hosted capability development. **ReFolDec** (Recursively Folding Codec) is one FoundRy-hosted capability; the SPA is another additive artifact surface, not the repository's core purpose.

Key governance rules from `AGENTS.md` that apply to SPA work:

- Generated content must not use em dashes.
- Keep private workshop context out of public files. Do not add private Notion URLs.
- Do not add secrets, credentials, or client-specific material to source files or the client bundle.
- Use small, named commits. No force-push or destructive git operations.
- The FoundRy relay is private. Treat any public SPA deployment and any future public ReFolDec release as separate approved artifact surfaces; keep private workshop and relay material out of them.

The `artifacts/api-server/` directory contains a separate Express backend artifact. It is unrelated to the SPA and was not touched during SPA development. Do not modify it during SPA work.

---

## 12. Cold-start checklist for the receiving Replit

When picking up this SPA in the FoundRy Replit for the first time:

1. Pull `main` — the workflow and all SPA source are committed.
2. Run `pnpm install` from the repo root (not from inside `artifacts/mockup-sandbox/`).
3. Confirm `tsconfig.base.json` exists at the repo root. If missing, recover from git.
4. Start the managed **`artifacts/custom-gpt-creator: web`** workflow; it serves the creator at `/custom-gpt-creator/`.
5. Use the separate managed **`artifacts/mockup-sandbox: Component Preview Server`** workflow for forge preview routes at `/__mockup/`.
6. Confirm the GitHub Pages base path (section 6) before the first deployment. Update `BASE_PATH` in `.github/workflows/pages.yml` if no custom domain is configured.
7. In GitHub repository Settings > Pages, set Source to **GitHub Actions** if not already done.
8. Push any commit to `main` to trigger the first Pages deployment and verify asset URLs load correctly at the deployed URL.

The dev server and Pages deployment are independent. The dev server runs locally in Replit; Pages deployment runs in GitHub Actions on every `main` push.

---

*End of transfer document.*
