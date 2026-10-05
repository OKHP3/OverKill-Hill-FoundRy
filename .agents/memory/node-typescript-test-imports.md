---
name: Node TypeScript test imports
description: Direct Node strip-types tests need explicit TypeScript file extensions in transitive imports.
---

When a test imports a source `.ts` module through `node --experimental-strip-types --test`, Node v24 does not resolve that module's extensionless relative TypeScript imports. The import can work under Vite or TypeScript's bundler resolution while failing in the direct Node test runner.

**Why:** The workspace test command executes TypeScript test files directly in Node, so an extensionless dependency import prevents the test from reaching the behavior under test.

**How to apply:** For a source module directly exercised by the Node test runner, use explicit `.ts` extensions on its relative TypeScript imports. Verify both the existing workspace test command and the workspace typecheck.