# FoundRy feature-page parity review

Reviewed 2026-09-07 before the capability workbench release. This is a historical review snapshot; the subsequent merge and deployment are recorded by PR #23 and GitHub Actions. Scope: https://overkillhill.com/projects/found-ry/ and its own application. No parent-site or sibling-site files changed.

Sources:
- Feature page: https://overkillhill.com/projects/found-ry/
- Authoring source: https://github.com/OKHP3/OverKill-Hill/blob/main/site-src/pages/projects/found-ry/index.main.html
- Published app: https://okhp3.github.io/OverKill-Hill-FoundRy/
- Deployed revision source: https://github.com/OKHP3/OverKill-Hill-FoundRy/tree/452cea7bf81d54c3e9c2ae450bd8603d470d6818
- Latest observed Pages run: https://github.com/OKHP3/OverKill-Hill-FoundRy/actions/runs/33875425012
- Unmerged capability workbench: https://github.com/OKHP3/OverKill-Hill-FoundRy/pull/23 at f2ec776718055ab164ddbc406160c1e98fccaa7e

## Claim ledger

| Claim | Tier | Evidence | Consequence if false or left unresolved | Next check / proposed action |
|---|---|---|---|---|
| Named projects already exist in the published app while the page's roadmap, FAQ and sidebar still place slots in the future | Confirmed | Fresh headless Chromium direct-app session exposed New project, Rename, Duplicate, Archive and Delete; deployed App.tsx implements those operations | Visitors misunderstand present capability and recovery options | Update those three page surfaces; check project creation and switching after release |
| Rendered specification preview already exists while the page lists it as planned | Confirmed | Direct-app Export Package > Rendered Preview produced a visible rendered article | Roadmap understates shipped behavior | Mark preview shipped; refresh export screenshot and description |
| Current exports include evidence JSON and workspace backups beyond the page's Markdown-centered account | Confirmed | Direct UI has Full Spec, Instructions Only, Evidence JSON, audit evidence import and workspace backup/import | Visitors omit recoverable machine-readable data | Explain specification export, audit evidence import and full-workspace backup as distinct operations |
| Current creator workspace uses cgpt-workspace, rather than the FAQ's one storage key per station | Confirmed | Deployed creatorStorage.ts declares WORKSPACE_KEY and legacy migration; live bundle includes cgpt-workspace | Recovery guidance describes the obsolete storage model | Rewrite FAQ around named projects, local origin, backups and clearing site data, without exposing unnecessary storage keys in product copy |
| Embedded project creation is blocked by iframe sandbox permissions; embedded backup download did not complete | Confirmed for observed Chromium session | Frame has allow-scripts allow-same-origin allow-forms; browser warned prompt() was ignored because allow-modals was absent; no download event followed backup click | A visitor cannot complete the advertised embedded workflow | Prefer direct app for working; label embed as limited preview, or review narrowly scoped embed support and retest actual dialogs, downloads and clipboard |
| New capability workbench is committed but not established as deployed | Confirmed | GitHub PR23 is open/unmerged; last observed successful Pages revision is 452cea7; live app opens Custom GPT Creator | Publishing new capabilities as live would send visitors to a different experience | Coordinate broad page rewrite with successful app release and post-deployment checks |
| Owner's regional mentoring clarification is not described on the feature page | Confirmed | Page ecosystem describes Prompt Forge, FoundRy, Skillz and GitHub; owner and current application governance define distinct regional FoundRys with reciprocal mentoring | Readers miss its role as mentor pattern and may infer centralized application ownership | Add a concise regional relationship paragraph or diagram; preserve existing four-surface flow as a different relationship |
| Existing parent-site CSS is in use and sampled mobile layout has no horizontal overflow | Confirmed, bounded sample | Live stylesheet is /assets/css/theme.css; h1 uses Alfa Slab One; 1440px desktop screenshot inspected; 390px viewport/document widths both 390 | A redesign could create unnecessary brand drift; this sample does not prove full accessibility | Reuse parent stylesheet and classes; check light/dark, keyboard and mobile when copy/screenshots change |
| License FAQ's blanket attribution statement should be replaced by a link to actual license terms | Proposal based on source mismatch | Page says attribution is not required; repository LICENSE section 4 includes notice-retention conditions | Readers may treat casual page copy as the complete reuse conditions | Keep Apache-2.0 label, link LICENSE and describe reuse as subject to its terms |

## Release-aligned page revision

Corrections to already shipped projects, preview, backup/export guidance, embedded workflow and license wording can be made independently of PR23.

When the broader workbench is deployed, update hero, description/social metadata, scope, quick start, roadmap, sidebar, screenshots and iframe title together. Explain the brief/contract/build/validate/package flow, prompt/skill/workflow/software targets, and the separate nine-station Custom GPT studio. Preserve the original owner-written origin story and label studio screenshots accurately. Software output remains a runnable starter; structural completeness and recorded review do not establish behavioral validation. Skillz references do not perform automatic publishing.

No CSS replacement is justified by this review. Keep the OverKill typography, colors, shell and reusable page classes. Edit the canonical site-src fragment and metadata configuration, then regenerate published HTML through the parent site's existing build process. The legacy found-ry/index.html is a redirect, not the feature-page source.

## Remaining unknowns

The review did not perform a complete accessibility audit, all-browser embedded download test, or full regression of the deployed studio. The next decisive check is a browser acceptance pass of the revised page and exact deployed app revision: primary launch, named project lifecycle, preview, backup download/restore, and mobile layout. New capability-workbench copy must wait for its release or be explicitly marked upcoming.
