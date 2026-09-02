---
name: Workspace typecheck peer variants
description: A dependency-resolution quirk that can make the broad workspace typecheck fail in mockup tooling.
---

The broad workspace typecheck can fail when a filtered pnpm install resolves the same Vite release into separate peer-context instances. Mockup tooling may then combine plugin types from one Vite instance with the direct Vite config type from another.

**Why:** TypeScript reports structurally identical Vite and Rollup types as unrelated when their import paths come from different pnpm peer-context directories, even though the runtime versions match.

**How to apply:** Treat this as an environment/dependency validation issue when the failure is isolated to a Vite config plugin array and the affected artifact's own focused checks pass; do not broaden unrelated feature work to change runtime behavior without an explicit dependency-maintenance task.