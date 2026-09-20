# Portfolio maintenance review

Status: ready for hosted validation.
Owner and integration owner: Codex foundry_review, delegated by the portfolio coordinator.
Accepted at (UTC): 2026-09-20T15:16:42Z.
Claim: https://github.com/OKHP3/OverKill-Hill-FoundRy/pull/35#issuecomment-5750676426
Base: `ac47451b80e6ee8588d8058628cf3dff9520deea`.
Branch: `codex/okh-foundry-convergence`.

## Result

The candidate consolidates dependency PRs 35 and 37-40 and repairs the retained
review findings from PRs 16, 25-29, 34, and 36. Other historical comments were
checked against current source: catalog links already use forward slashes, the
current compiler filename is `tsconfig.base.json`, the GitHub renderer response
is read once, and the canonical package fingerprint passes governance.

Instruction edits preserve untouched CR/CRLF bytes after ordinary typing,
replacement, or deletion. Handoff fields and allowed file names start valid
Markdown fences. Pure Skillz references require complete commit SHAs rather than
misidentifying slash-containing branch names. Equal project imports ignore key
insertion order. Historical delivery evidence remains intact; missing ownership
acceptance timestamps are labeled unestablished rather than invented.

Pages builds honor the supplied base path and launch their package manager
portably. The byte-exact GitHub Markdown fixture has an LF checkout contract.
Governance runs its regression checks in CI. Release validation recursively
finds artifacts and separately routes process captures. Attribution naming and
references follow the repository contract. Network audits write a provisional
inventory before lookups so interrupted runs retain an explicitly incomplete
report. SHA-conditional deletion guidance, helper, and tests match the reviewed
AskJamie FoundRy maintenance repair.

## Dependencies and security

Recharts 3.10.1 uses its content-prop types in the five shared wrappers and an
explicit React 19 peer. Resolvers 5.9.1, thread-stream 4.2.0, and Node type
26.6.1 declarations pass typechecking and the complete workspace build. Type
declarations do not change the host's installed Node runtime. CI retains its
Node 22 line and Replit retains its separately declared runtime.

The audit initially reported ten advisories. Targeted overrides now select
patched esbuild 0.28.2, PostCSS 8.5.23, nanoid 3.3.18, Browserslist 4.28.7,
qs 6.16.0, and baseline-browser-mapping 2.11.0. The final pnpm audit reports
zero advisories. Retire these compatibility overrides when upstream ranges
resolve patched versions without them. Package minimum-release-age protection
and its existing exclusions remain unchanged. Windows x64 native packages are
retained alongside the existing Linux/macOS build targets.

Primary advisory records:
- https://github.com/advisories/GHSA-g7r4-m6w7-qqqr
- https://github.com/advisories/GHSA-fxqj-rqcc-2cmp
- https://github.com/advisories/GHSA-2v37-7h3g-55p8
- https://github.com/advisories/GHSA-c83g-rgw3-j3cx
- https://github.com/advisories/GHSA-4mjr-xmp4-gh2g
- https://github.com/advisories/GHSA-w5vr-8v7q-w6rv

## Local validation and limits

- pnpm 10.34.5 frozen installation and complete workspace typecheck/build pass.
- 61 capability/helper tests, 16 technology-audit tests, 7 janitor tests, 8 branch
  cleanup tests, 2 Markdown diagnostics, governance, artifact contracts, and
  ReFolDec fixture checks pass.
- Pages base-path tests pass both `/` and `/OverKill-Hill-FoundRy/`.
- The browser suite passed 42 tests with three opt-in fixture-refresh tests
  skipped. Its one failing case identified Windows checkout newline conversion;
  after the explicit LF rule, that exact fixture case passed separately.
- The ordinary-typing mixed-line-ending regression passed in Chromium, including
  persisted state, navigation, and export. No browser projects were reused.
- Hosted CI and deployment remain separate evidence, to be verified on the
  reviewed and merged SHAs. No Replit host synchronization or database deployment
  is claimed. The broader compiler/Vite/runtime migrations remain documented
  review candidates in the technology update plan.

Canonical local work and other hosts were not overwritten. The isolated candidate
is the only implementation workspace owned by this maintenance task.
