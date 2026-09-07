# Seven elements, three regions, one universe

**Research date:** September 7, 2026. **Audience:** Jamie Hill and FoundRy implementers. **Decision:** how to evolve OverKill Hill FoundRy into a working system-building application without absorbing its sibling FoundRys or duplicating Skillz.

## The answer

The owner-defined model is three overlapping rings: AskJamie on the left, OverKill at the connective center, and Glee-fully on the right. Skillz resides in OverKill and is shared across all three. Each region has its own FoundRy. This repository's application builds OverKill capabilities; it is not the common application for the other two regions.

There are three different relationships to preserve: **brand and product ownership**, **governance inheritance**, and **distribution of reusable skills**. They are related but are not interchangeable. Universal governance originates in OverKill-Hill. Sharing a skill does not transfer ownership of a sibling's projects or authorize disclosure of its private source material. This interpretation follows the owner's September 7 instruction; the public [universe page](https://overkillhill.com/universe/) supports distinct site roles but is a navigation map rather than an authoritative access-control diagram.

## The seven elements

| Element | Purpose and confirmed functionality | Boundary and implication |
|---|---|---|
| [OverKill Hill](https://overkillhill.com/) / [source](https://github.com/OKHP3/OverKill-Hill) | Public systems-design, projects and writing site; golden governance source. Static HTML generation, browser JavaScript, shared styles and validation scripts. | The connective region and source of universal rules. A published project page is not evidence that its described agent or system is running. |
| [Skillz](https://okhp3.github.io/skillz/) / [source](https://github.com/OKHP3/skillz) | Working React/Vite catalog: search, families, contract inspection, comparisons, local stacks and guided discovery. Public generated catalog data. | Shared discovery and distribution across the universe. FoundRy should reference its canonical packages and provenance rather than fork a second catalog. |
| [OverKill Hill FoundRy](https://okhp3.github.io/OverKill-Hill-FoundRy/) / [source](https://github.com/OKHP3/OverKill-Hill-FoundRy) | Working browser-local Custom GPT creator; nine build stations, named projects, backups, audit, platform comparison, structured and Markdown exports. Also historical methods, capability folders, scaffolds, registry, schemas and validation. | OverKill's system-building workshop. Extend beyond GPT wrappers while keeping the capability and its source record durable. |
| [AskJamie](https://askjamie.bot/) / [source](https://github.com/OKHP3/AskJamie) | Static professional/helpdesk site, Lens System and routing to external GPT destinations. Calm explanations, tradeoffs and next-step guidance are its positioning. | Its website is not a conversational agent server. The AskJamie region retains its own identity and professional context. |
| [AskJamie FoundRy](https://github.com/OKHP3/AskJamie-FoundRy) | Private governance/capability source, scaffolds, registry, local skills and Python validators. At the researched baseline no application/frontend/backend implementation was present. | Separate AskJamie workshop. Private source and client overlays are excluded from this app's public assets and exports. |
| [Glee-fully Tools](https://glee-fully.tools/) / [source](https://github.com/OKHP3/Glee-fullyTools) | Public static toolbox and arcade discovery site. Its homepage distinguishes 42 Tool-ette entries across seven branches: 1 live, 24 beta, 17 unavailable. | Warm personalizable life/work tools. Catalog pages and external GPT availability are separate facts. |
| [Glee-fully Tools FoundRy](https://github.com/OKHP3/Glee-fullyTools-FoundRy) | Private fabrication source with canon ledgers, creation promptchains, templates, persona/voice guidance, evaluations and historical snapshots. No application runtime at the researched baseline. | Separate Glee-fully workshop. Considerable source material exists even though it had not become a functioning app. Preserve that material and its voice. |

Repository runtime conclusions come from current default-branch metadata and the primary source paths in the [source ledger](research/source-ledger.md). Sibling implementation tasks were active concurrently; these are baseline observations, not promises that their state will remain unchanged.

## Current FoundRy: preserve the working parts

The runnable creator is `artifacts/custom-gpt-creator/`. Its entrypoint reuses the implementation in `artifacts/mockup-sandbox/`. That naming is historical: it does not make every page a mockup. The dedicated creator is operational and has Playwright journeys for persistence, exports, reset and themes. Its `cgpt-workspace` data is local to the browser origin. The API artifact exposes a health route; it is not a builder backend. The [creator transfer record](custom-gpt-creator-transfer.md) explicitly chose a browser-only application.

The separate root Replit preview is a design surface showing a staged dialogue and emerging GPT specification. Observing it does not establish a running AI conversation. The live GitHub Pages creator was independently rendered in Browser and showed the nine stations and evidence summary. Existing design previews and creator workflows should remain reachable.

Historical method folders such as PhenoMould, TellePrompt, StructRefino and Canonsweep contain reusable construction, interpretation, refinement and audit material. Their README labels describe the source concepts; they are not proof of installed executable services. The application can give users those methods as references without pretending to run them.

## Contradictions and their resolution

| Finding | Evidence | Implementation decision |
|---|---|---|
| Current repository is public; root README, AGENTS and manifest describe private posture. | Live GitHub metadata on September 7; local governance files; public Pages creator. | Record actual visibility separately from intended workshop/data privacy. This task does not change repository visibility or relax private-source graduation rules. |
| Some older lineage fields call this FoundRy a parent of sibling FoundRys. | Sibling manifests and governance guidance; OverKill-Hill's Tier 0 / Tier 1 model. | Historical relay lineage stays recorded. The owner's current product scope overrides an interpretation that the application owns all brands. Do not silently rewrite universal rules. |
| Some public positioning describes non-overlapping sites. | AskJamie homepage language; owner now specifies overlapping rings. | Use the owner's explicit ring model in this app. Leave sibling copy changes to their own tasks. |
| Skillz counts differ among older README/project summaries. | Live generated summary versus older documentation. | Avoid hardcoded counts in the new workbench. The research snapshot is 342 skills / 20 families, generated September 7, from [public summary data](https://okhp3.github.io/skillz/data/project-summary.json). |
| Catalog maturity and evidence differ. | Same public Skillz summary: 263 draftable, 74 skeleton, 5 usable; separate evidence categories. | A source selection or scaffold export does not create a behavioral validation claim. |
| Replit and GitHub are not necessarily identical. | FoundRy agent history reports an earlier SHA; GitHub has newer dependency commits. Two initial route failures were later resolved after startup. | Build from verified GitHub main in an isolated branch. Do not overwrite or synchronize Replit blindly. |

## Replit surface verification

All seven exact URLs were attempted through the connector; the connection requires reauthentication. An authenticated Browser supplied these additional read-only observations. No Replit code, branches, workflows, pending task changes or publication settings were changed.

| Requested project URL | Observation |
|---|---|
| [OverKill-Hill](https://replit.com/t/overkill-hill/repls/OverKill-Hill) | Workspace loaded; homepage rendered in preview. Previous agent history reports synchronization at `9c186345`, which agrees with GitHub metadata, but current local Git commands were not run. |
| [skillz](https://replit.com/t/overkill-hill/repls/skillz) | Workspace loaded; Skillz catalog rendered in preview. No current commit parity claim from UI alone. |
| [OverKill-Hill-FoundRy](https://replit.com/t/overkill-hill/repls/OverKill-Hill-FoundRy) | Workspace loaded; Git UI showed `main` and no changes to commit. Root preview displayed staged Custom GPT studio content. Past agent status named `452cea7`; current GitHub baseline is `312256a`. |
| [Glee-fullyTools](https://replit.com/t/glee-fullytools/repls/Glee-fullyTools) | Workspace loaded; homepage rendered. History mentions protected-branch PR work; current branch/hash not independently established. |
| [Glee-fullyTools-FoundRy](https://replit.com/t/glee-fullytools/repls/Glee-fullyTools-FoundRy) | Initial route failure resolved after startup. Signed-in workspace loaded with Git main and no changes; no runtime preview was tested. |
| [AskJamie](https://replit.com/t/askjamie/repls/AskJamie) | Initial coordinator attempt returned Page not found. The concurrent AskJamie task and coordinator subsequently loaded the exact route and observed a running homepage preview with no Git changes. Treat the initial response as transient; current commit parity remains unverified. |
| [AskJamie-FoundRy](https://replit.com/t/askjamie/repls/AskJamie-FoundRy) | Workspace loaded; Git showed `main`, remote matching the requested repo, and no changes to commit. Preview said the app was not running. No runtime was started. |

## The application design

Use a durable capability project as the organizing unit. A target is a packaging choice: prompt system, portable Agent Skill, workflow, software starter, or the existing Custom GPT studio. The shared flow is intent → input/output contract → build instructions and components → evidence → inspectable export. A software starter must be runnable, but it must not be represented as a completed bespoke product merely because files were generated.

Keep the current browser-local architecture. It already supports Pages/Replit path prefixes and has no credential or service-cost requirement. Separate new capability storage from existing GPT project data. Provide explicit backup/import, readable save failures, bounded validation of imported data, and files that can be inspected before download. Untrusted text must remain text in the application and in generated starter markup.

Use Skillz through explicit source references and its existing public catalog. Do not ingest private sibling registries or copy the full shared catalog. A user can record the package source and revision needed for their project, then include that provenance in a handoff. The app does not claim to execute a selected skill or install it remotely.

Readiness must distinguish missing required fields, structural completeness, recorded evidence, and owner review. Acceptance criteria are proposed checks until someone runs them. Generation, test templates and form completion do not prove a system's behavior. Review and publication remain separate from local export.

## Research completeness and remaining uncertainty

Primary evidence is sufficient for these application boundaries and the implementation plan. Research stopped after the source/runtime distinctions and consequential contradictions were reconciled; further generic searches would not establish current Replit filesystem hashes. The seven project URLs, five public websites, default-branch metadata and relevant implementation source were covered. Live external Custom GPT behavior, private third-party integrations, current Replit filesystem hashes remain unverified.

The [implementation plan](foundry-implementation-plan.md) tracks the build and acceptance work. A locally verified application and an open pull request are distinct from a merged or deployed release.
