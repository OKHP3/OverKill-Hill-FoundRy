# Coop-pertition dispatch — 2026-09-07

Owner-authorized: 20 FoundRy tasks and six OverKill website delegates, performed by ChatGPT/Codex agents alongside existing Replit work. Skillz is read-only context. This dispatch does not supersede website A03-A21/T01-T06/W13 ownership.

FoundRy baseline: `29d3e1abbb833034c083a82922bbe23a8191eb2f`. Website baseline: `9c186345333a2cbb965805c65f43d294aadfc0ae`. Refresh before integration. Replit checkpoint and overlapping source ownership remain unverified.

## Execution contract

Each task owns a distinct new path and an isolated branch/worktree. Workers may inspect shared source but may not edit it, push, merge, deploy, change dependencies/hosting, or mutate the owner checkout. Additional unit tests may be adjacent to the named standalone module. Each worker owns one `docs/handoffs/coop-pertition-2026-09-07/<task-id>.md` handoff in its own worktree. Pure modules are experimental candidates until wired in and integration-tested; tests/examples are not released features.

Acceptance is evidence-based: behavioral correctness and usefulness first; change size, dependency cost, token/retry count when exposed, and clarity second. Independent challenger tasks critique evidence and visitor outcomes; do not pay multiple agents to implement the same feature speculatively. Stop after two failed repair attempts and return the reproduction for escalation. No token quota is assumed transferable.

The coordinator for this batch is the FoundRy parent thread `01a07c67-1e97-7453-9609-2b5e05cd5e26`. Existing website A21 retains shared website integration ownership. Any website source integration must be coordinated with A21 and the Replit checkpoint. No missing checkpoint is treated as approval. New isolated test/example/prototype paths can proceed without touching their work.

## Task catalog

| ID | Task | Exclusive output | Acceptance |
| --- | --- | --- | --- |
| F01 | Prompt package example | `examples/workbench/prompt-example/` | Backup parses, export matches generator, cases distinguish authored expectations from executed checks. |
| F02 | Agent Skill package example | `examples/workbench/skill-example/` | Backup roundtrip and generated SKILL.md verified; no claim of model execution. |
| F03 | Workflow package example | `examples/workbench/workflow-example/` | Backup/generator checks pass; worked example is labeled synthetic; no execution-engine claim. |
| F04 | Software starter example | `examples/workbench/software-example/` | Actual starter behavior checked with available runtime; manual browser checks reported separately. |
| F05 | ZIP portability regression | `artifacts/mockup-sandbox/src/lib/coop-zip.test.ts` | Boundary tests reproduce expected archive behavior; actual defects documented with minimal reproduction. |
| F06 | Backup byte-boundary regression | `artifacts/mockup-sandbox/src/lib/coop-backup-bounds.test.ts` | Boundary failures and accepted edge cases are explicit and assertions do not mirror implementation. |
| F07 | Storage recovery regression | `artifacts/mockup-sandbox/src/lib/coop-storage.test.ts` | Tests verify preservation under failure; no cross-test state leak. |
| F08 | Evidence wording regression | `artifacts/mockup-sandbox/src/lib/coop-evidence.test.ts` | Tests cover meaningful missing branches; report discovered defects instead of weakening assertions. |
| F09 | Keyboard and dialog acceptance | `artifacts/custom-gpt-creator/tests/coop-keyboard.e2e.ts` | Runnable test with focused pass/fail evidence and keyboard limitations. |
| F10 | Narrow viewport acceptance | `artifacts/custom-gpt-creator/tests/coop-responsive.e2e.ts` | Reproducible viewport assertions; defects include selectors and screenshots when possible. |
| F11 | Studio coexistence acceptance | `artifacts/custom-gpt-creator/tests/coop-coexistence.e2e.ts` | Both stores retain seeded data; route history tested without resetting unrelated browser state. |
| F12 | Structured contract parser prototype | `artifacts/mockup-sandbox/src/lib/coop-contract.ts` | Positive/negative tests; documented experimental API; no claim existing projects migrated. |
| F13 | Executable evidence record prototype | `artifacts/mockup-sandbox/src/lib/coop-result.ts` | Invalid or missing evidence cannot yield a verified result; caller trust boundary documented. |
| F14 | Package fingerprint prototype | `artifacts/mockup-sandbox/src/lib/coop-fingerprint.ts` | Order invariant; bytes/path changes alter digest; Unicode and delimiters covered; no UI integration. |
| F15 | Project revision diff prototype | `artifacts/mockup-sandbox/src/lib/coop-project-diff.ts` | Empty and edited diffs, Unicode and malicious text safely returned as data; no store or UI changes. |
| F16 | Safe import merge planner | `artifacts/mockup-sandbox/src/lib/coop-import-plan.ts` | Deterministic plan covers identity collisions and bounds; conflict resolution remains explicit. |
| F17 | Backup migration design | `docs/workbench-backup-migration-design.md` | Exact current fields cited; proposed future changes labeled; acceptance fixture matrix included. |
| F18 | Skillz reference parser prototype | `artifacts/mockup-sandbox/src/lib/coop-skill-reference.ts` | Pinned and unpinned cases, malformed URLs and userinfo covered; original text preserved. |
| F19 | External agent handoff generator | `artifacts/mockup-sandbox/src/lib/coop-agent-handoff.ts` | Stable output with unsafe text treated as data, missing required metadata rejected, no publication authority invented. |
| F20 | Current release evidence addendum | `docs/research/workbench-release-addendum-2026-09-07.md` | Exact evidence links and retrieval time; Replit state unknown unless directly verified; no production-readiness inflation. |
| W01 | FoundRy feature-page contract tests | `tests/test-foundry-feature-contract.py` | Passing current invariants plus explicit opt-in expected-future checks for real parity defects; default CI remains unchanged. |
| W02 | FoundRy embed acceptance harness | `tests/foundry-embed-acceptance.test.mjs` | Actual current behavior recorded with bounded assertions; no silent sandbox broadening; invocation documented. |
| W03 | Feature-page metadata parity audit | `assets/docs/foundry-metadata-parity-2026-09-07.md` | Every proposed claim grounded in current FoundRy source; current/future distinctions explicit. |
| W04 | FoundRy recovery and export FAQ candidate | `assets/docs/foundry-recovery-faq-2026-09-07.md` | Ready-to-apply content candidate; no false runtime or blanket licensing claims; no page edits. |
| W05 | FoundRy redirect and launch regression | `tests/test-foundry-launch-routes.py` | Route-specific assertions and fixtures; current defects reproduced, not hidden by changing expected URLs. |
| W06 | Feature journey challenger review | `assets/docs/foundry-journey-review-2026-09-07.md` | Evaluate clarity, claim accuracy, parent CSS reuse and keyboard/mobile implications; no speculative redesign or shared runtime edits. |

## Task briefs

### F01 — Prompt package example

Build one public-safe capability project and importable backup for a useful prompt: extract action items with source references. Generate its package with the real generator, add representative input/expected-output cases and explain that model behavior is not yet evaluated.

### F02 — Agent Skill package example

Build one public-safe capability project and backup for a repository handoff skill. Generate package via existing generator and add trigger/non-trigger examples, provenance and a manual evaluation recipe. Do not install or publish a skill.

### F03 — Workflow package example

Build a capability project and backup for a local release evidence checklist. Generate the workflow package and provide a worked synthetic pass/fail walkthrough with explicit human steps.

### F04 — Software starter example

Build a JSON contract-inspector capability example using the existing software generator. Include importable backup, generated source, valid/invalid/hostile input cases and a repeatable smoke checker.

### F05 — ZIP portability regression

Add nonredundant tests against buildCapabilityZip for Unicode names/content, CRC and entry bytes, empty files and unsafe paths. Use an independent standard reader if practical. Do not change generator.

### F06 — Backup byte-boundary regression

Add table-driven parser/export tests at UTF-8 field and project count boundaries, unknown envelopes and mutation isolation, covering gaps beyond existing nine tests. Do not change parser.

### F07 — Storage recovery regression

Add isolated tests for unavailable storage, quota failures, recovery backup preservation and capability/GPT namespace separation. Restore globals and module state between scenarios. Do not change storage.

### F08 — Evidence wording regression

Verify all generated package types keep authored evidence separate from behavioral proof and publication permission, including reviewed=true and empty/whitespace evidence. Do not change generator.

### F09 — Keyboard and dialog acceptance

Add focused keyboard navigation and dialog focus tests for capability import/delete and project selection. Use existing Playwright infrastructure and own PORT. No application changes.

### F10 — Narrow viewport acceptance

Add bounded responsive checks at 320 and 390px with long project names and package filenames; test light/dark overflow and usable controls. No CSS or runtime edits.

### F11 — Studio coexistence acceptance

Add nonredundant coverage for workbench/studio browser Back/Forward navigation and independent project persistence across reload. Do not modify source or existing tests.

### F12 — Structured contract parser prototype

Implement a pure standalone versioned JSON contract parser with field names, primitive type, required flag and helpful path errors. Reject duplicate fields and unknown versions. Add adjacent coop-contract.test.ts. Do not wire into UI or replace free-text inputs.

### F13 — Executable evidence record prototype

Implement a pure standalone result-record validator with package digest, environment, command, result(pass/fail/inconclusive/not-run), timestamp and evidence reference. Add coop-result.test.ts. Do not execute commands or interpret prose as proof.

### F14 — Package fingerprint prototype

Implement a standalone async SHA-256 fingerprint for generated file path/content pairs with canonical ordering, unambiguous framing, duplicate-path rejection and no network. Add coop-fingerprint.test.ts.

### F15 — Project revision diff prototype

Implement a pure diff of two CapabilityProject values, separating authored-field changes from id/timestamp metadata, with deterministic ordering and no HTML rendering. Add coop-project-diff.test.ts.

### F16 — Safe import merge planner

Implement pure dry-run plan for merging two valid CapabilityWorkspace values. Identify identical, conflicting and new project IDs; never overwrite or mutate inputs and flag project-count overflow. Add coop-import-plan.test.ts. No actual writes.

### F17 — Backup migration design

Write an implementation-ready migration contract around the actual version1 backup schema: dispatch by version, preserve original bytes, dry-run preview, unknown-version failure, recovery fixtures and rollback. Do not invent historical supported schemas.

### F18 — Skillz reference parser prototype

Implement standalone parsing for explicit canonical OKHP3/skillz GitHub blob references with optional immutable commit revision; distinguish pinned from mutable references, reject other hosts/repos and credential-bearing URLs. Add coop-skill-reference.test.ts. No fetch/catalog copying.

### F19 — External agent handoff generator

Implement a standalone text handoff generator from CapabilityProject plus explicit baseSHA, allowed files, acceptance and budget fields. Mark project text as source data, leave authorization with caller, and include evidence-return fields. Add coop-agent-handoff.test.ts. No agent dispatch or execution.

### F20 — Current release evidence addendum

Create a dated source-and-GitHub-backed addendum to maturation report verifying PR23/24, exact main and checks. Preserve historic assessment; map shipped state versus remaining roadmap. Only current repo reads and this new document.

### W01 — FoundRy feature-page contract tests

Create focused standard-library Python checks for canonical FoundRy source versus the current application contract: primary app link, separate GPT studio, local storage/recovery, target kinds and honest evidence language. Read old dispatch; avoid general project-status framework changes.

### W02 — FoundRy embed acceptance harness

Add an isolated read-only browser acceptance script for the FoundRy embed and direct-app fallback: sandbox affordances, open-app link, keyboard access and downloadable-backup limits. Use existing dependencies; no sandbox permission or runtime edits.

### W03 — Feature-page metadata parity audit

Audit only FoundRy page title, description, social metadata, iframe title and alt text against released workbench. Provide exact before/after copy and owning source locations as a reviewable candidate. Preserve owner voice; do not edit shared config/generated HTML.

### W04 — FoundRy recovery and export FAQ candidate

Draft exact replacement FAQ copy for named projects, backup/import, source ZIP versus GPT exports, origin-specific storage and capability release boundary. Map each paragraph to source evidence and destination block. Preserve origin story.

### W05 — FoundRy redirect and launch regression

Add focused tests for legacy /found-ry/ redirect, canonical /projects/found-ry/ route, app launch URLs and no confusing redirect to legacy studio. Use existing source/generated distinction; no generated edits.

### W06 — Feature journey challenger review

Act as independent challenger of the current feature page: can a first-time visitor choose workbench versus GPT studio, understand actual output, recover work and find the correct app? Identify five-or-fewer prioritized evidence-backed improvements with exact copy/markup candidates. Do not repeat whole-site A20 audit.

## Dispatch evidence

The machine-readable dispatch state is maintained beside this document in `dispatch.json`. Planned, dispatched, accepted, completed, integrated and verified are distinct states. IDs and worktree paths must be observed, not invented. A completed worker result is a candidate pending integration, not a claim of production delivery.
