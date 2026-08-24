# OverKill Hill FoundRy

Private governance relay and capability forge for developing, validating, and
graduating OverKill Hill P³ artifacts. FoundRy is the primary private identity;
ReFolDec is a separately bounded capability and is not this repository's public
product surface.

## Run & Operate

- `pnpm run typecheck` — full TypeScript check across the workspace.
- `pnpm --filter @workspace/api-server run dev` — start the API server.
- `pnpm --filter @workspace/custom-gpt-creator run dev` — run the browser-only
  Custom GPT Creator.
- `pnpm --filter @workspace/okh-capabilities run dev` — run Forge Capabilities.
- `pnpm --filter @workspace/okh-foundry-landing run dev` — run the FoundRy
  landing artifact.
- `pnpm --filter @workspace/okh-identity-card run dev` — run the identity-card
  artifact.
- `pnpm --filter @workspace/mockup-sandbox run dev` — run isolated Canvas
  component previews.
- `pnpm run build` — run workspace typechecks and production builds when the
  root build script is available.

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

- FoundRy remains private; public capabilities graduate to separately approved
  publication surfaces.
- Durable capabilities are the source of truth; GPTs, skills, websites, agents,
  and wrappers are deployment targets.
- The Custom GPT Creator remains browser-only and localStorage-backed, without
  backend, authentication, database, or automatic repository publishing.
- Protected ReFolDec holdouts stay outside tracked development fixtures; result
  records retain hashes and bounded metadata without protected content.
- ReFolDec reference-runtime evidence does not support live-model, host,
  reliability, outcome, or production-readiness claims.

## Product

The workspace provides internal FoundRy landing, identity, capability, Canvas
preview, and Custom GPT Creator artifacts. These support evidence-backed GPT
and capability design, structured export, governance review, and controlled
public-graduation preparation.

## User preferences

Keep private FoundRy governance separate from any public ReFolDec artifact.
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
