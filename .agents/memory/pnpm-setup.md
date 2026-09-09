---
name: Workspace pnpm setup
description: Prerequisites for running the mockup-sandbox SPA dev server in this workspace.
---

## Rule
Before `pnpm --filter @workspace/mockup-sandbox run dev` will work in a fresh environment, run:
```
pnpm install --filter @workspace/mockup-sandbox
```

**Why:** The `artifacts/mockup-sandbox/node_modules` may be empty after a clone or merge; Vite's binary won't be present. The workspace `preinstall` guard blocks `npm install` — always use `pnpm`.

**How to apply:** If the workflow fails with `Cannot find module '.../vite/bin/vite.js'`, run the install command above, then restart the workflow.


## Validation fallback
When the workspace `packageManager` pin cannot bootstrap because concurrent workflows exhaust process or thread capacity, validate with the package-local `tsc`, Vite, and Playwright binaries instead of changing the pin.

**Why:** The source and installed dependencies can remain healthy even while Corepack's pnpm bootstrap fails before the project command starts.

**How to apply:** Keep the repository configuration unchanged, run the equivalent package-local checks directly, and report the workflow bootstrap failure separately from source validation.

## tsconfig.base.json
The root `tsconfig.base.json` must exist at `/home/runner/workspace/tsconfig.base.json`. It was not git-tracked in earlier commits; recover from commit `90c25805` if missing:
```
git show 90c25805:tsconfig.base.json > tsconfig.base.json
```
Its absence causes `Cannot find type definition file for 'node'` errors in tsc (but does NOT prevent Vite from serving — esbuild is used for transpilation).

## Local pnpm pin mismatch
The repository pins a newer pnpm version than the Repl's installed pnpm in some sessions. Without an explicit local opt-out, ordinary workflow commands can recursively self-bootstrap pnpm until thread resources are exhausted.

**Why:** Managed artifact workflows all invoke plain `pnpm`, so one failed bootstrap can multiply across every running service.

**How to apply:** Keep the repository's `packageManager` pin for CI, but retain the workspace `.npmrc` opt-out and use bounded, non-interactive flags in `scripts/post-merge.sh` for local Repl setup.
