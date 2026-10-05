# FoundRy production reconciliation

Task owner and integration owner: Codex. Date: 2026-10-04.
Scope: OverKill Hill FoundRy only. The owner's release instruction authorizes
integration and production delivery; sibling applications retain separate owners.

## Preserved source and resulting behavior

The integration starts at main `23b961f456324d7281ea8912eec983341882b3d0`.
It merges the ten Replit commits ending at
`20faf005a175f131e6d195480efaec488a4d7dee` and the existing portable skill branch
`add635b`. Both histories are retained. Recovery branch
`recovery/replit-20261004` preserves the Replit head. Its verified Git bundle has
SHA-256 `430b03b5e4e5f316250d10273abe60f2eea20791c2859f34de3c68fc12ad9322`.
No force push, reset, source deletion, or sibling synchronization was used.

The workbench now defaults to portable skills, records supplied GPT assets,
behavior mappings, semantic losses, tools and permissions, and host compatibility
plans. Plugins and connectors remain plans until implemented and tested. Existing
capability backups and the separate legacy GPT workspace remain supported.
Recovered GPT export changes preserve instruction bytes, malformed-storage
recovery, copy-format state, international filenames, and review evidence.
The main branch's portfolio metadata, social imagery, and icons are retained.

ReFolDec gains a main-only manual review-package workflow that obtains protected
holdouts from a maintainer secret, evaluates them outside the checkout, scans the
artifact for protected material, and removes temporary files. This does not
publish a ReFolDec release or establish a passing protected evaluation. Synthetic
regressions test the evaluator's boundaries. Diagnostic paths now use portable
forward slashes. Those regressions run in governance CI.

## Validation and evidence boundaries

Local validation includes the complete governance runner, filename conformance,
75 capability/helper tests, migration and governance-runner regressions, protected
holdout evaluator regressions, frozen pnpm 10.34.5 installation, and the full
workspace typecheck/build. The browser suite passed 51 cases; its title-mismatch
case passed after correction, for 52 passing cases and three opt-in refresh cases
skipped. Ten Markdown diagnostic tests and the Pages base-path build test pass.
Browser checks cover retained GPT exports, capability
backup/recovery, mobile layouts, and portable conversion planning. Hosted checks
must be attached to the final PR head before merge; Pages deployment and Replit
parity must be recorded separately after merge.

Replit's external connector session is expired and its topic-branch push credentials
were rejected. The browser workspace remained accessible; the verified bundle
transferred its complete history through the authenticated Windows GitHub route.
Git parity does not prove connector authentication. Replit remains the runtime
preview; GitHub Pages is the production application surface. No paid publishing
operation or worker task was started.

## Review baseline

The post-delivery review should compare this release with
`2026-09-20-portfolio-maintenance-codex.md`, the retained September coop-pertition
closeouts, `docs/foundry-implementation-plan.md`, and
`docs/portable-skill-foundry.md`. The implementation plan supplies acceptance
criteria; there is no separately named current workbench PRD. Do not substitute
the ReFolDec specification or MurderBird PRD. Prior completed task batches are
historical evidence, while actual host installation, source rights, protected
evaluation, and publication require their own proof.
