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

## tsconfig.base.json
The root `tsconfig.base.json` must exist at `/home/runner/workspace/tsconfig.base.json`. It was not git-tracked in earlier commits; recover from commit `90c25805` if missing:
```
git show 90c25805:tsconfig.base.json > tsconfig.base.json
```
Its absence causes `Cannot find type definition file for 'node'` errors in tsc (but does NOT prevent Vite from serving — esbuild is used for transpilation).
