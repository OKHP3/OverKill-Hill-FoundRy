# OverKill Hill FoundRy

Intentionally public governance relay and capability forge for developing,
validating, and graduating OverKill Hill P³ artifacts. FoundRy is the primary identity;
ReFolDec is a separately bounded capability and is not this repository's public
product surface.

## Agent coordination — 2026-09-07

Read `AGENTS.md` and `docs/agent-collaboration.md` before continuing work. The
owner reports six website/FoundRy synchronization tasks already underway; Skillz
is context only. Finish or checkpoint this Repl's current task before accepting
overlapping work, and provide the protocol's compact handoff with actual Git and
runtime evidence. Receipt of these instructions by other hosts has not been verified.
Locate the current assignment in `docs/handoffs/README.md`; record this session's
checkpoint and acknowledgement there through its linked task record before a
coordinator assigns overlapping work elsewhere.

Conserve Replit tokens: route portable implementation, analysis, and documentation
to the owner's larger ChatGPT/Codex allocation when access permits; use Claude
for bounded second opinions and Copilot for small tasks. Replit owns its local Git
reconciliation and platform-specific verification. Confirm each assignment and
handoff; do not assume chats, quotas, or permissions are shared between hosts.

## Run & Operate

- `pnpm run typecheck` — full TypeScript check across the workspace.
- `pnpm --filter @workspace/api-server run dev` — start the API server.
- `pnpm --filter @workspace/custom-gpt-creator run dev` — run the browser-local
  capability workbench and existing Custom GPT studio; see
  `docs/capability-workbench.md` for the port/base-path setup and validation.
- `pnpm --filter @workspace/okh-capabilities run dev` — run Forge Capabilities.
- `pnpm --filter @workspace/okh-foundry-landing run dev` — run the FoundRy
  landing artifact.
- `pnpm --filter @workspace/okh-identity-card run dev` — run the identity-card
  artifact.
- `pnpm --filter @workspace/mockup-sandbox run dev` — run isolated Canvas
  component previews.
- `pnpm run build` — run workspace typechecks and production builds from a clean
  shell. Each Vite artifact derives `PORT` and `BASE_PATH` from its registered
  service contract when those variables are omitted; explicit values still
  override the defaults for deployment builds.

### Artifact build contract ownership

The typed, dependency-free source of truth for Vite artifact defaults is
`scripts/src/artifact-contract.ts`. It owns each artifact's fallback port and
base path, and every artifact Vite config must resolve its `PORT` and
`BASE_PATH` through that module.

Each `.replit-artifact/artifact.toml` remains the managed-service registration
for the same artifact. Its `localPort`, service `PORT`, and service
`BASE_PATH` must mirror the corresponding contract entry so Replit routing and
local fallback behavior agree. When adding an artifact, add one typed contract
entry, wire its Vite config to that entry, and register the same port and path
in its manifest. Deployment-specific overrides, such as the GitHub Pages
`BASE_PATH`, stay explicit in the deployment workflow and must not change the
shared defaults.

The ReFolDec validation path is dependency-free:

- `python3 tests/test-refoldec-holdout-evaluate.py`
- `python3 tests/test-refoldec-skill-package.py`
- `python3 tests/test-refoldec-validator.py`
- `python3 scripts/public-graduation-audit.py`

Protected holdout content must be supplied through the maintainer-only
`--holdout-file` argument. Never commit that file or copy its prompt and
expectations into public evaluation records.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React and Vite web artifacts
- Express API server
- PostgreSQL and Drizzle ORM where the API requires persistence
- TypeScript validation with workspace project references

## Where things live

- `artifacts/` — registered runnable web, API, and Canvas-preview artifacts.
- `examples/release-candidates/` — public-safe ReFolDec specification, package,
  validator, provenance, evaluation, and release records.
- `scripts/` — dependency-free packaging, validation, audit, and holdout tools.
- `tests/` — regression checks for governance and release tooling.
- `docs/` — process, packaging, and graduation guidance.
- `.agents/skills/` — repository-local governance and capability workflows.

## Architecture decisions

- All three regional FoundRy repositories are intentionally public. Separate
  capability releases still require their approved publication surfaces and
  graduation checks; private source material is not approved for publication.
- Durable capabilities are the source of truth; GPTs, skills, websites, agents,
  and wrappers are deployment targets.
- The Custom GPT Creator remains browser-only and localStorage-backed, without
  backend, authentication, database, or automatic repository publishing.
- Protected ReFolDec holdouts stay outside tracked development fixtures; result
  records retain hashes and bounded metadata without protected content.
- ReFolDec reference-runtime evidence does not support live-model, host,
  reliability, outcome, or production-readiness claims.

## Product

The workspace provides the OverKill capability workbench, the existing Custom GPT
studio, and FoundRy landing, identity, capability, and Canvas-preview artifacts.
The workbench is implemented in `artifacts/mockup-sandbox/src` and deployed through
`artifacts/custom-gpt-creator`. Preserve its separate capability store and the
studio's `cgpt-workspace` projects. These support evidence-backed GPT
and capability design, structured export, governance review, and controlled
public-graduation preparation.

## User preferences

Preserve FoundRy identity and the separate ReFolDec release boundary.
Preserve evidence status and uncertainty instead of inflating release claims.

## Gotchas

- Do not expose GitHub credentials in source, browser bundles, or `.git/config`.
- Use normal fetch/merge/push synchronization; never force-push without explicit
  approval.
- Run `git diff --check` and the relevant validator suite before release work.
- A missing or malformed ReFolDec runtime adapter must remain inconclusive.
- Do not treat the deterministic reference runtime as a live model evaluation.

## Pointers

- See `docs/refoldec-skill-packaging.md` for package creation and evidence
  boundaries.
- See `examples/release-candidates/skill/tests/README.md` for protected holdout
  rotation.
- See the `pnpm-workspace` skill for workspace structure and package details.
