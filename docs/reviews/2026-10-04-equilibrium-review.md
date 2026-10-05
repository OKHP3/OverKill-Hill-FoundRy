# FoundRy five-pass equilibrium review and next-series backlog

Review date: October 4, 2026 (Chicago); execution receipts extend into October 5 UTC.

Frozen application source: `aa14c3af07903171c4594294076af19b5ccc4463`. [Production PR #52](https://github.com/OKHP3/overkill-hill-foundry/pull/52) merged before review. [Pages deployment](https://github.com/OKHP3/overkill-hill-foundry/actions/runs/37248266854) succeeded at that revision. [Live workbench](https://okhp3.github.io/overkill-hill-foundry/) showed conversion controls and the retained GPT studio. Windows and Replit main were clean at the same revision with zero ahead/behind; Replit governance/evaluator passed and its preview was current. Notion received the release receipt with verified readback.

**Result:** the delivered browser-local authoring/planning scope is supported with limits. This review produces **48 traceable backlog entries**, including **two reproduced defects**. It does not certify complete conversions, installed plugins/connectors, broad accessibility, or a protected ReFolDec release. Those claims defer for evidence. A failure-safe concurrent-editing claim is rejected because saved edits can be lost across tabs.

The current workbench has no separately named PRD in the supplied records. The requirements baseline is [the implementation plan](../foundry-implementation-plan.md), [portable-skill direction](../portable-skill-foundry.md), [dated maturation proposals](../capability-workbench-maturation.md), [September maintenance handoff](../handoffs/2026-09-20-portfolio-maintenance-codex.md), and [completed coop-pertition closeout](../handoffs/coop-pertition-2026-09-07/remaining-closeout-2026-09-09.md). The ReFolDec specification and MurderBird PRD are not substituted. F01–F20 remain complete within their original contracts; standalone prototypes are not product integration.

## Evidence and review method

Five successive passes ran after delivery. Each used separate live evidence, outcome and safety reviewer agents, followed by conditional analytical disruption and root adjudication. The three roles converged on material facts after distinguishing the scope of their decisions. Root did not average approval labels. Every pass record, prompt identifier, source set, finding and adjudication is retained in the [machine-readable record](2026-10-04-equilibrium-review.json).

The agents share a model family and source packet. Later passes consumed prior adjudications. Root implemented the release and also acted as disruptor/negotiator; this is a correlation and independence limit. Review conclusions are **analytical**, supported by historical records and separate live development/deployment evidence. No real representative user/host or optimizer-unseen product holdout was executed. Hosted CI is external execution evidence, not a protected outcome holdout.

Local frozen pnpm installation and full workspace typecheck/build passed, along with governance, filename conformance, 75 capability/helper tests, migration/governance/evaluator regressions, ten Markdown diagnostics and the Pages base-path test. Hosted production CI passed 52 Chromium cases with three opt-in refresh cases skipped. Existing test success is bounded coverage, not certification of every user-authored capability.

**Reproduced after release in disposable local Chromium contexts:** (1) tab A changes the capability name; tab B saves a purpose from its older snapshot; reloading shows the original name and no conflict warning. (2) rejected clipboard write raises a page error and provides no visible failure message. The delayed/stale-copy probe timed out and establishes no defect. Both successful probes and their exact observations are in the JSON record.

**Operational limit:** Replit source/preview are synchronized, while its external connector session is expired and its topic-branch push credentials failed. Authentication is a separate owner-visible gate. Replit remains a development preview, with no paid publish operation. Notion is editorial; private page material is excluded from Git.

**ReFolDec correction:** the main-only workflow materializes a maintainer fixture outside the checkout, scans for protected material, creates a review archive and removes the temporary fixture. It does **not** perform behavioral holdout evaluation or authorize publication. The earlier handoff wording “evaluates them outside the checkout” is clarified by the dated addendum.

## The five passes

| Pass | Focus | Decision and strongest objection |
|---|---|---|
| 1 | Requirements and historical completion | Bounded scope supported; broader maturity deferred. Prototype files and a completed batch do not prove product adoption. |
| 2 | Useful outcomes and conversion | Actual conversion deferred. A dossier is not observed source-method preservation or a useful host outcome. |
| 3 | Storage, export and failure boundaries | Unrestricted failure-safe claim rejected. Two-tab lost edits and unhandled clipboard rejection are reproduced; other races remain hypotheses. |
| 4 | Portability and operations | Broader portability deferred. Source parity does not authenticate connectors or transfer projects; review packaging is not behavioral evaluation. |
| 5 | Priority, dependencies and falsification | Backlog approved with limits after conditional source/adapter gates, shared receipts, citation fixes and independent holdout custody corrections. |

## Recommended next goals

1. **Protect existing work and repair the two defects.** Preserve available compatible backups first; implement FND-02/03 with bounded regression evidence, adding FND-43 and relevant replacement recovery acceptance when those paths change. This is one small repair series, not a platform redesign.
2. **Prove one useful capability.** Establish FND-01 scope, then use FND-04 as an outcome epic with FND-11/13/32/46 acceptance slices. One canonical repository-handoff method and one result receipt can satisfy these criteria; count it as one useful capability. An independent custodian freezes FND-05 before implementation optimization, then evaluates the frozen candidate.
3. **Close only the conversion or adapter gates the exemplar requires.** Newly authored cleared material can bypass external import. Existing source requires applicable FND-06–10 review/parity. Tools require FND-14–16 before corresponding runtime cases. Necessary references elevate FND-17 to a prerequisite.
4. **Strengthen evidence and recovery from real friction.** Consider FND-18/19 as one optional integration slice, then version history, import merge, broader browser/AT and catalog work only when selected. Do not implement every existing prototype simply because it exists.
5. **Keep separate lanes separate.** Replit authentication, dependency review and ReFolDec protected evaluation/publication have their own owners and receipts. Additional modalities/hosts and sibling adoption are later owner-selected work; this review grants no sibling mutation or secret/publication authority.

No task is dispatched or completed by appearing here. A future dispatch needs one task owner, integration owner, exact base revision, exclusive file/action scope, validation and receiver acknowledgement. Prior completed batches and current production delivery remain completed; next work is selected explicitly.

## Detailed unfinished-work and maturation list

**Priority:** P1 covers reproduced defects, immediate preservation and gates needed for the selected first outcome. P2 covers bounded follow-up evidence and conditional adoption. P3 covers later proposals. An evidence/release gate is mandatory only for the claim or lane it governs. Optional feature candidates are not omitted original deliverables. Dependencies are conditional workflow aids, not a mandate to execute every branch. FND-36 is an ongoing receipt-maintenance practice: this review records current delivery, while future changed releases need fresh receipts.

### FND-01 — Freeze a current FoundRy requirements ledger

**P1 · requirements · requirements-ledger · not-started**

**Current gap or boundary:** The acceptance contract is spread across the September 7 implementation plan, September 27 portable-skill direction, and dated handoffs. No separately named current workbench PRD was supplied.

**Next action:** Create one versioned ledger mapping each requirement to its authority, current behavior, evidence, limitation and acceptance owner. Preserve completed historical scope; label later maturation proposals explicitly.

**Done when:** Each mandatory requirement has a source and observable closure check; proposed features have an explicit adoption decision. The owner can select a next series without using another product's PRD.

**Source:** [docs/foundry-implementation-plan.md:28](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/foundry-implementation-plan.md#L28); [docs/portable-skill-foundry.md:3](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L3).

**Prerequisites:** none.

### FND-02 — Prevent silent capability edits being lost across tabs

**P1 · reproduced-defect · recovery · not-started**

**Current gap or boundary:** A local Chromium two-tab probe reproduced tab A's saved name being replaced when tab B saved a purpose from its older workspace snapshot. No conflict warning appeared.

**Next action:** Add revision-aware save/conflict handling or an explicit single-writer guard. Preserve both versions and offer inspectable recovery; avoid silent last-writer replacement.

**Done when:** A two-tab regression changes different fields and the same field; stale writes cannot silently discard either saved edit. Recovery export preserves both snapshots and identifies the authoritative revision.

**Source:** [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:111](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L111); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:313](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L313).

**Prerequisites:** none.

### FND-03 — Show and recover from rejected clipboard writes

**P1 · reproduced-defect · recovery · not-started**

**Current gap or boundary:** A mocked clipboard permission rejection produced an unhandled page error and no visible copy failure. Copy remains available, but the user receives no useful explanation.

**Next action:** Catch clipboard failure, clear any stale success state, provide an accessible failure message and retain the download/manual-copy route. Avoid exposing copied content in diagnostics.

**Done when:** Denied permission and unavailable clipboard cases show actionable feedback without unhandled errors; retry succeeds and exact download bytes remain unchanged.

**Source:** [artifacts/mockup-sandbox/src/pages/ExportPackage.tsx:677](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/ExportPackage.tsx#L677).

**Prerequisites:** none.

### FND-04 — Complete one real intent-to-use exemplar

**P1 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** The four example folders prove bounded packaging/starter behavior, while the later maturation plan asks for real useful outcomes.

**Next action:** Choose one measurable repository-handoff task and newly authored owner-cleared source, or complete FND-06â€“08 first when reusing/importing existing material. Build through FoundRy, export permitted bytes, run one intended environment only after its necessary contract/adapter boundaries are checked, and record assistance and manual work.

**Done when:** A versioned project, exported source, expected rubric, observed output, host/version and friction record demonstrate one useful result. Report limitations; one case does not establish universal usefulness.

**Source:** [docs/capability-workbench-maturation.md:119](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L119); [examples/workbench/skill-example/README.md:5](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/skill-example/README.md#L5).

**Prerequisites:** 01.

**Conditional sequencing:** Choose source and freeze task first; complete discovery/read-order/evidence-return acceptance subtasks before closing this epic. Existing-source reuse requires FND-06â€“08 as applicable; tools require FND-14â€“16. One run closes multiple criteria, never multiple capability counts.

**Reuse evidence with:** FND-11, FND-13, FND-32, FND-46; do not duplicate implementation or outcome counts.

### FND-05 — Run representative user acceptance with an unseen task

**P1 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** Engineering browser fixtures and the coordinator's live navigation do not establish representative user success or optimizer-unseen outcome evidence.

**Next action:** Freeze an external task/rubric with a named custodian before execution, obtain appropriate tester consent and use a rights-cleared task. Retain raw private task/output privately where needed, publish only permitted redacted/hash receipts, and record all help, failure and recovery.

**Done when:** A private/raw or public-safe receipt preserves task identity, frozen rubric, expected/observed outputs and assistance. Mark any used/disclosed holdout consumed. Failures stay visible; broad outcome approval remains deferred until decisive evidence exists.

**Source:** [docs/capability-workbench-maturation.md:12](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L12); [docs/foundry-implementation-plan.md:30](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/foundry-implementation-plan.md#L30).

**Prerequisites:** 04.

**Conditional sequencing:** Independent custodian freezes the task/rubric before implementation optimization; execution follows the frozen candidate from FND-04.

### FND-06 — Select an exact OverKill-owned source and destination

**P1 · owner-decision · conversion · not-started**

**Current gap or boundary:** The migration registry is intentionally empty. The 16 legacy source folders are a catalog, not a verified external migration list.

**Next action:** Name one exact source repository/export, regional owner, pinned revision, destination slug and import method. Enter a planned record before moving bytes.

**Done when:** The record resolves an actual source and destination without guessing. Sibling FoundRys, MurderBird and unrelated children remain under their own ownership.

**Source:** [registry/capability-migrations.json:5](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/registry/capability-migrations.json#L5); [docs/portable-skill-foundry.md:90](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L90).

**Prerequisites:** 01.

### FND-07 — Review source rights, privacy and complete history

**P1 · required-gate · conversion · not-started**

**Current gap or boundary:** Public FoundRy visibility does not authorize publishing private instructions, employer/client material or unsafe old commits.

**Next action:** Review the chosen source's license, attribution, privacy/conflict constraints and complete history before a public subtree import. Preserve restricted originals privately and select a reviewed snapshot when history is unsuitable.

**Done when:** Signed, dated source dispositions explain permitted files and withheld material. The chosen method does not expose private historical bytes and does not invent publication permission.

**Source:** [docs/portable-skill-foundry.md:96](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L96); [AGENTS.md:126](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/AGENTS.md#L126).

**Prerequisites:** 06.

### FND-08 — Prove imported-source parity and recovery

**P1 · required-gate · conversion · not-started**

**Current gap or boundary:** Browser source.json remains an authored plan with sourceRevision null and imported false. No actual imported capability subtree is established.

**Next action:** Preserve recoverable originals, generate file/hash inventories and exclusions, execute the selected import on one branch and compare destination bytes with the pinned source.

**Done when:** Each included asset resolves to exact source bytes; exclusions are explained, licenses retained and links repaired. Recovery works before marking imported or considering source archival.

**Source:** [docs/portable-skill-foundry.md:102](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L102); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:587](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L587).

**Prerequisites:** 07.

### FND-09 — Map every material source behavior and semantic loss

**P1 · required-gate · conversion · not-started**

**Current gap or boundary:** The planner tests whether behavior-map/loss text exists; it cannot establish complete behavior preservation.

**Next action:** Assign behavior IDs and source locations, then map each to procedure, reference, script, adapter, explicit drop or blocker. Record retrieval, memory, auth and escalation changes with impact and mitigation.

**Done when:** Every material behavior has a disposition and observable case. Owner acceptance of remaining losses is explicit; omitted or blocked behavior is never labeled preserved.

**Source:** [docs/portable-skill-foundry.md:70](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L70); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:432](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L432).

**Prerequisites:** 06.

**Conditional sequencing:** Rights/provenance review FND-07 applies to reused source; FND-08 only to actual import. Newly authored cleared material may establish its direct source baseline without a repository migration.

### FND-10 — Execute preservation, adapter/loss and boundary cases

**P1 · evidence-gap · conversion · not-started**

**Current gap or boundary:** The conversion browser test authors fields and exports a skill; it does not compare source and target runtime behavior.

**Next action:** Freeze matched inputs and expected outcomes. Execute at least a semantic-preservation case, a platform-loss/tool case and a boundary case against the source and converted method where available.

**Done when:** Source and target observations, revisions, host versions and results are retained. Unavailable source baselines stay unverified; failures produce specific work rather than a parity claim.

**Source:** [docs/portable-skill-foundry.md:73](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L73); [artifacts/custom-gpt-creator/tests/capability-workbench.e2e.ts:12](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/custom-gpt-creator/tests/capability-workbench.e2e.ts#L12).

**Prerequisites:** 09.

**Conditional sequencing:** If tools are required, run FND-14â€“16 before corresponding behavioral cases. If references are necessary, FND-17 becomes a P1 prerequisite. Manual fallback is narrower evidence, never adapter equivalence.

### FND-11 — Test installed skill discovery of the complete contract

**P1 · evidence-gap · conversion · not-started**

**Current gap or boundary:** The complete source bundle carries inputs/outputs in root files; generated SKILL.md does not contain dedicated I/O sections. Whether an actual skill-only host sees required root constraints is untested.

**Next action:** Install the exemplar in the chosen host's supported layout and give it a task requiring an I/O rule recorded only in the contract. If it fails, embed necessary fields or add discoverable portable references.

**Done when:** The actual installed package preserves and discovers required I/O and boundaries without reviewer assistance. Record the exact layout and host revision; this remains a hypothesis until tested.

**Source:** [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:567](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L567); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:643](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L643).

**Prerequisites:** 09.

**Conditional sequencing:** Use the exemplar selected in FND-04; it need not have passed its final runtime acceptance yet.

### FND-12 — Test source instructions as data at the runtime boundary

**P1 · required-gate · conversion · not-started**

**Current gap or boundary:** Authored instructions become host-executed skill guidance. A safe browser rendering test does not prove the installed agent handles hostile knowledge or conflicting source instructions safely.

**Next action:** Review the exemplar's authority chain and escalation/cancellation rules. Run a fixture with conflicting instructions in source material and verify they remain data.

**Done when:** The host follows the approved method, ignores unauthorized source instructions, stops at the action boundary and records an honest refusal or escalation. No browser injection defect is inferred from this missing host evidence.

**Source:** [docs/portable-skill-foundry.md:70](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L70); [.agents/skills/okhp3-gpt-skill-conversion-plan/SKILL.md:40](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/.agents/skills/okhp3-gpt-skill-conversion-plan/SKILL.md#L40).

**Prerequisites:** 09.

**Conditional sequencing:** Run before broad preservation approval; host/tool execution follows FND-14â€“15 controls when applicable.

### FND-13 — Return observed results to the saved capability revision

**P1 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** External implementation changes and host results do not automatically reconcile into the browser draft, which continues to generate unverified planning metadata.

**Next action:** Complete a manual return loop: record the tested canonical source revision, changed instructions, expected/actual results, environment and public-safe evidence references in the saved project; reopen and export it.

**Done when:** The saved project, tested repository method and reported results refer to the same revision. Differences between authored draft and verified external package are explicit; recurring friction may justify later automation.

**Source:** [docs/capability-workbench-maturation.md:148](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L148); [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:795](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L795).

**Prerequisites:** 10.

**Conditional sequencing:** May consume the actual newly authored FND-04 trial instead of a GPT-conversion case. This is an acceptance subtask before closing FND-04, with the same canonical result IDs.

**Reuse evidence with:** FND-04, FND-32; do not duplicate implementation or outcome counts.

### FND-14 — Implement one real host adapter only when needed

**P1 · required-gate · adapters · not-started**

**Current gap or boundary:** Plugin/connector exports are packaging plans: verifiedHosts is empty and installable is false.

**Next action:** Choose one host/version after defining the exemplar's required tools. Design its auth, least permissions and side-effect boundary before installation; build a reproducible isolated wrapper around the canonical skill with source digest, wrapper revision and dependencies.

**Done when:** An implemented installable candidate has an inspectable tool contract and reproducible wrapper. Useful side-effect execution and verified-support labels remain gated by FND-15â€“16; unsupported hosts remain unverified.

**Source:** [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:609](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L609); [docs/portable-skill-foundry.md:76](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L76).

**Prerequisites:** 09.

### FND-15 — Verify permissions and denied/unavailable-tool recovery

**P1 · required-gate · adapters · not-started**

**Current gap or boundary:** Tool and permission fields are authored requirements; no implemented connector demonstrates auth scope or contained failure.

**Next action:** Document auth method, minimum scopes, read/write effects, confirmation and cancellation boundaries. Test absent tool and denied auth before a permitted side-effect case; retain public-safe logs.

**Done when:** The adapter requests only necessary permission, does not fabricate success, does not retry unauthorized writes and offers a bounded fallback. Credentials stay out of source and reports.

**Source:** [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:619](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L619); [docs/portable-skill-foundry.md:76](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L76).

**Prerequisites:** 14.

**Conditional sequencing:** The permission contract is designed before installation; complete denial/absence tests before any useful side effect.

### FND-16 — Record installation, behavior and clean removal

**P1 · required-gate · adapters · not-started**

**Current gap or boundary:** No host/version installation or removal receipt is supplied for the planned plugin/connector outputs.

**Next action:** Exercise one actual install, useful behavior, failure recovery and removal at a pinned source revision. Check for residual configuration or credentials and record only non-sensitive results.

**Done when:** The compatibility record contains host/version/date/source/wrapper, fixtures and observed results. Removal is reproducible; installable/support labels change only for the verified scope.

**Source:** [docs/portable-skill-foundry.md:78](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L78); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:621](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L621).

**Prerequisites:** 15.

### FND-17 — Handle pinned reference dependencies and unavailable sources

**P2 · evidence-gap · adapters · not-started**

**Current gap or boundary:** Skillz links and knowledge pointers do not fetch or preserve the content on which a method depends; the handoff example uses a mutable catalog pointer.

**Next action:** Pin one necessary reference and review reuse rights. Choose an allowed source snapshot or an explicit retrieval contract, preserving attribution. Run normal and stale/unavailable reference cases.

**Done when:** The method uses the correct revision when available and reports a bounded gap when unavailable. It never invents missing knowledge; catalog search is not required to close this case.

**Source:** [examples/workbench/skill-example/provenance.md:8](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/skill-example/provenance.md#L8); [docs/portable-skill-foundry.md:57](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L57).

**Prerequisites:** 09.

**Conditional sequencing:** Elevate to P1 and complete before any dependent preservation/outcome test when the selected method requires the reference.

### FND-18 — Adopt revision-bound result records if the exemplar needs them

**P2 · proposed-feature · evidence · not-started**

**Current gap or boundary:** Evidence is currently authored text and owner review. The coop-result and fingerprint helpers are completed standalone prototypes.

**Next action:** Define trusted result producers and an evidence schema tied to package digest, environment, expected/observed result and log reference. Integrate only the necessary prototype with UI, storage and export.

**Done when:** Failed/absent results cannot produce validated status; changed behavior makes prior results stale. External caller assertions remain assertions unless execution evidence is authenticated.

**Source:** [docs/capability-workbench-maturation.md:122](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L122); [artifacts/mockup-sandbox/src/lib/coop-result.ts:22](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-result.ts#L22).

**Prerequisites:** 13,19.

**Reuse evidence with:** FND-19; do not duplicate implementation or outcome counts.

### FND-19 — Bind fingerprints and invalidate stale evidence

**P2 · proposed-feature · evidence · not-started**

**Current gap or boundary:** A canonical fingerprint helper exists, but the production workbench does not use it to bind recorded observations.

**Next action:** Select behavior-relevant package files, calculate a reproducible fingerprint and explain metadata-only changes. Apply it to result records and display stale evidence after source edits.

**Done when:** Byte/path changes affecting behavior invalidate the previous result; harmless ordering changes do not. Backup/export/reopen preserve the binding and the UI cannot imply fresh verification.

**Source:** [artifacts/mockup-sandbox/src/lib/coop-fingerprint.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-fingerprint.ts#L1); [docs/capability-workbench-maturation.md:122](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L122).

**Prerequisites:** 13.

**Reuse evidence with:** FND-18; do not duplicate implementation or outcome counts.

### FND-20 — Evaluate revision history and a recoverable diff

**P2 · proposed-feature · recovery · not-started**

**Current gap or boundary:** The coop-project-diff module is delivered and tested as a prototype; no product revision history UI/store is established.

**Next action:** Use the real exemplar's editing/recovery friction to decide whether a bounded revision history is useful. If adopted, preserve inspectable prior versions and safely display differences.

**Done when:** A user can identify and recover the correct previous method; Unicode/hostile text stays data. Storage/backup limits and migration behavior are tested rather than assumed.

**Source:** [artifacts/mockup-sandbox/src/lib/coop-project-diff.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-project-diff.ts#L1); [docs/capability-workbench-maturation.md:120](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L120).

**Prerequisites:** 02,04.

### FND-21 — Probe delayed and overlapping copy requests

**P2 · hypothesis-to-test · recovery · not-started**

**Current gap or boundary:** The current copy guard compares the selected format. The completed suite checks format changes after a resolved copy, not every pending request, project change or concurrent request.

**Next action:** Create controlled delayed clipboard cases for format changes, repeated formats, project switches, content changes and overlapping requests. Keep the failed root stale-project probe labeled inconclusive.

**Done when:** Only the latest successful copy of the relevant project/revision can show confirmation. Rejections and old timers cannot mislabel a new export. Implement a request/revision guard only if the cases expose a failure.

**Source:** [artifacts/mockup-sandbox/src/pages/ExportPackage.tsx:613](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/ExportPackage.tsx#L613); [artifacts/custom-gpt-creator/tests/export-package.e2e.ts:242](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/custom-gpt-creator/tests/export-package.e2e.ts#L242).

**Prerequisites:** 03.

### FND-22 — Verify whole-workspace import under a stale confirmation

**P2 · evidence-gap · recovery · not-started**

**Current gap or boundary:** Capability imports validate and confirm replacement, while the prototype merge planner is separate. A pending confirmation can span intervening local edits or another tab.

**Next action:** Freeze an import prompt, make an intervening edit in the same tab and in another tab, then confirm. Verify whether the replacement guard detects changed authoritative state and preserves recovery bytes.

**Done when:** The user sees the real overwrite scope, can cancel, and cannot unknowingly replace intervening work. Both prior and imported states remain recoverable if conflict occurs.

**Source:** [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:437](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L437); [docs/workbench-backup-migration-design.md:36](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/workbench-backup-migration-design.md#L36).

**Prerequisites:** 02.

### FND-23 — Adopt conflict-aware merge import only if justified

**P2 · proposed-feature · recovery · not-started**

**Current gap or boundary:** The current import contract is confirmed whole-workspace replacement. coop-import-plan does not establish a merge feature in production.

**Next action:** If real transfer use requires merging, define identity-collision choices, capacity limits and explicit preview/cancel/commit behavior. Integrate the planner without silently changing the replacement contract.

**Done when:** Conflicting IDs, renamed projects and capacity overflow yield deterministic reviewable plans. Commit is atomic, cancellations leave state untouched and backups retain original data.

**Source:** [artifacts/mockup-sandbox/src/lib/coop-import-plan.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-import-plan.ts#L1); [docs/capability-workbench-maturation.md:120](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L120).

**Prerequisites:** 22.

### FND-24 — Keep a precise backup evolution and migration contract

**P2 · required-on-schema-change · recovery · not-started**

**Current gap or boundary:** The old migration-design document lists the earlier v1 fields, while the portable foundation adds defaults under the supported envelope. Future incompatible schemas have not been implemented.

**Next action:** Record current fields/defaulting and compatibility behavior in a dated addendum. Before introducing an incompatible format, define adapter dispatch, exact source retention, dry-run and rollback.

**Done when:** Historical backups preserve all supplied fields; unknown schemas fail without writes. Simulated write/readback failure retains recoverable originals. Do not build speculative adapters before a real format requires them.

**Source:** [docs/workbench-backup-migration-design.md:9](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/workbench-backup-migration-design.md#L9); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:99](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L99).

**Prerequisites:** 01.

### FND-25 — Prove backup transfer across real origins

**P2 · evidence-gap · portability · not-started**

**Current gap or boundary:** Pages, Replit and local development have separate browser stores. Existing suite roundtrips do not establish a real cross-origin receipt.

**Next action:** Transfer a disposable public-safe capability backup from Pages to a clean Replit/local context, then back. Include old-format fields and new portability fields; preserve unrelated legacy GPT projects.

**Done when:** Field-level/hash comparisons match allowed originals, recovery is inspectable and the separate cgpt-workspace is unchanged. Document origin separation and how to recover without account sync.

**Source:** [docs/capability-workbench.md:64](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench.md#L64); [docs/capability-workbench-maturation.md:78](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L78).

**Prerequisites:** 24.

### FND-26 — Run bounded non-Chromium acceptance

**P2 · evidence-gap · portability · not-started**

**Current gap or boundary:** The current browser evidence is Chromium. It does not establish Firefox/WebKit/Safari compatibility for storage, file import/download or the new conversion stage.

**Next action:** Choose one meaningful create-to-export/recovery journey in each intended supported browser, starting with the audience's next required browser. Record exact browser/device and source revision.

**Done when:** Persistence, imports, Unicode export/download, navigation and recovery behave as specified; failures are reproduced and fixed. Do not claim all-browser support from one run.

**Source:** [artifacts/custom-gpt-creator/playwright.config.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/custom-gpt-creator/playwright.config.ts#L1); [docs/capability-workbench-maturation.md:53](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L53).

**Prerequisites:** 02,25.

### FND-27 — Complete real assistive-technology acceptance for FoundRy

**P2 · evidence-gap · accessibility · not-started**

**Current gap or boundary:** Keyboard/mobile automated cases exist, but no comprehensive FoundRy screen-reader or real zoom acceptance is supplied.

**Next action:** Define a bounded FoundRy journey with real assistive technology, keyboard navigation, focus recovery, announcements and 200%/400% zoom. Keep unrelated website acceptance under its owner.

**Done when:** An actual tester records interaction, focus and announcements for import errors, replacement prompts, stage changes, selected files and clipboard failure. Repair reproduced failures; trees alone do not certify spoken behavior.

**Source:** [docs/capability-workbench-maturation.md:53](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L53); [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:428](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L428).

**Prerequisites:** 03.

### FND-28 — Adopt structured contracts only after outcome need

**P2 · proposed-feature · authoring · not-started**

**Current gap or boundary:** Inputs, outputs, components and acceptance are authored text. The structured contract parser is a completed experimental API.

**Next action:** Choose a concrete constraint the exemplar needs to validate, preserve free-text compatibility and define structured fields that serve that constraint. Integrate UI/storage/export only within that scope.

**Done when:** Older projects roundtrip, invalid structured inputs produce actionable errors and the intended outcome uses the constraints. Structure alone never becomes behavioral validation.

**Source:** [artifacts/mockup-sandbox/src/lib/coop-contract.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-contract.ts#L1); [docs/capability-workbench-maturation.md:120](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L120).

**Prerequisites:** 04,24.

### FND-29 — Add canonical Skillz selection if real usage warrants it

**P3 · proposed-feature · catalog · not-started**

**Current gap or boundary:** Skillz is linked and user references are recorded. Search, dependency resolution and installation remain maturation proposals.

**Next action:** Measure selection/pinning friction from the exemplar. If justified, read the canonical catalog with a pinned source and bounded stale/unavailable handling, preserving attribution.

**Done when:** Exports can be reproduced from the selected revision; removal or change of a catalog entry preserves the recorded reference. FoundRy does not become a second catalog source of truth.

**Source:** [docs/capability-workbench-maturation.md:121](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L121); [artifacts/mockup-sandbox/src/lib/coop-skill-reference.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-skill-reference.ts#L1).

**Prerequisites:** 17.

### FND-30 — Trial a bounded external-agent handoff

**P3 · proposed-feature · execution · not-started**

**Current gap or boundary:** The agent-handoff generator is standalone; FoundRy does not execute arbitrary agents or systems.

**Next action:** Start with a user-run handoff from the chosen package. Name one task owner, file scope, canonical revision, action/cost limits and evidence-return contract. Only consider an execution adapter after a useful manual trial.

**Done when:** One task is implemented and checked reproducibly, with cancellation, inspectable changes, recovery and recorded costs. No credentials or generic backend are required merely to trial the handoff.

**Source:** [artifacts/mockup-sandbox/src/lib/coop-agent-handoff.ts:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/coop-agent-handoff.ts#L1); [docs/capability-workbench-maturation.md:123](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L123).

**Prerequisites:** 04,13.

### FND-31 — Demonstrate a real prompt outcome

**P2 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** The action-extraction prompt example has expected cases, not a recorded named-model execution outcome.

**Next action:** Use a public-safe real source document and a fixed rubric to evaluate action items, owners, evidence references, unsupported assumptions and boundary handling in a named environment.

**Done when:** Observed output and deviations are retained with model/date/source/package revision. The result is distinguished from its authored expectation and does not imply universal model reliability.

**Source:** [examples/workbench/prompt-example/README.md:13](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/prompt-example/README.md#L13).

**Prerequisites:** 04.

### FND-32 — Demonstrate a real Agent Skill outcome

**P2 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** The existing handoff skill is a packaging example with a manual evaluation recipe; no install/run receipt establishes its host utility.

**Next action:** Run trigger/non-trigger and repository-handoff cases on a named actual host using its supported skill discovery layout, with public-safe source.

**Done when:** The host discovers the skill, produces the required handoff and respects scope on a non-trigger. Versioned evidence explains assistance and failure; installation is separate from performance.

**Source:** [examples/workbench/skill-example/README.md:17](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/skill-example/README.md#L17).

**Prerequisites:** 11.

**Reuse evidence with:** FND-04, FND-11, FND-13, FND-46; do not duplicate implementation or outcome counts.

### FND-33 — Demonstrate a real controlled workflow

**P2 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** The release-evidence walkthrough is explicitly synthetic. It does not prove a scheduler or real release process outcome.

**Next action:** Execute one useful human-controlled workflow with actual receipts, including a failing gate and recovery. Name the owner of each action and retain explicit approvals where required.

**Done when:** Observed steps and outputs demonstrate the workflow's intended result and stop correctly on failure. A human-run workflow is labeled as such; no execution engine is inferred.

**Source:** [examples/workbench/workflow-example/docs/synthetic-walkthrough.md:3](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/workflow-example/docs/synthetic-walkthrough.md#L3).

**Prerequisites:** 04.

### FND-34 — Demonstrate the software starter's useful bounded behavior

**P2 · evidence-gap · outcomes · not-started**

**Current gap or boundary:** The generated software inspector parses JSON and reports top-level types; it does not implement arbitrary authored business rules.

**Next action:** Choose that exact inspector outcome or implement one separately specified missing requirement. Run documented local/browser commands with valid, malformed and hostile text cases.

**Done when:** A real intended user can use the tool and its result matches the chosen acceptance. VM smoke checks remain scoped evidence, while business logic and browser usability have their own observations.

**Source:** [examples/workbench/software-example/smoke-check.mjs:9](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/workbench/software-example/smoke-check.mjs#L9); [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:650](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L650).

**Prerequisites:** 04.

### FND-35 — Restore Replit connector and push authentication

**P2 · operational-gap · operations · not-started**

**Current gap or boundary:** Source parity and the preview are verified. The external Replit connector session is expired, and Replit's topic-branch push credentials were rejected.

**Next action:** Have the owner complete the visible existing-account authentication flow, then verify connector read access and the separate Source Control connection. Preserve current scopes; do not bypass passkeys or repeatedly reconcile clean Git history.

**Done when:** A bounded connector read succeeds and Source Control reports the intended GitHub account. A sanctioned topic-branch write can be verified when needed; clean 0/0 is not used as an auth receipt.

**Source:** [docs/handoffs/2026-10-04-production-reconciliation.md:45](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/handoffs/2026-10-04-production-reconciliation.md#L45).

**Prerequisites:** none.

### FND-36 — Keep release receipts distinct from dated pending reports

**P2 · documentation-gap · operations · not-started**

**Current gap or boundary:** The original maturation and maintenance reports deliberately preserve old pending deployment statements. The new October handoff also separates validation from post-merge delivery.

**Next action:** Append dated exact-SHA receipts and a clear index to current evidence without rewriting historical conclusions. Use deployment, local, Replit, connector and Notion status separately.

**Done when:** A reader can find the current deployed revision and tests without treating an old pending paragraph as current. Future source changes invalidate only affected receipts.

**Source:** [docs/capability-workbench-maturation.md:105](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench-maturation.md#L105); [docs/handoffs/2026-09-20-portfolio-maintenance-codex.md:69](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/handoffs/2026-09-20-portfolio-maintenance-codex.md#L69).

**Prerequisites:** none.

### FND-37 — Review open dependency updates separately

**P2 · operational-review · operations · not-started**

**Current gap or boundary:** Five open Dependabot PRs propose package updates, including major marked, react-day-picker and Vite-plugin changes. They are proposals rather than made improvements omitted from this release.

**Next action:** Review PRs 42 and 48â€“51 against current compatibility and advisories. Integrate only tested useful changes through the existing protections; retain minimum-age and lockfile policy.

**Done when:** Each accepted update has migration notes and meaningful build/browser/governance evidence; rejected or deferred changes have a reason. No blanket latest-version upgrade is treated as completion.

**Source:** [.github/dependabot.yml:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/.github/dependabot.yml#L1); [docs/technology-update-plan.md:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/technology-update-plan.md#L1).

**Prerequisites:** none.

### FND-38 — Rerun the real protected evaluation at the current package hash

**P2 · required-gate · refoldec · not-started**

**Current gap or boundary:** The release checklist explicitly leaves current protected evaluation unchecked because the historical package hash differs. Synthetic regressions test the evaluator, not capability performance.

**Next action:** Name the maintainer fixture custodian and separate evaluation owner; freeze candidate hash and rubric. Use a genuinely optimizer/developer-unseen external fixture and record exposure history. Keep fixture contents private, execute the approved runtime and return only public-safe result receipts.

**Done when:** The result records candidate/runtime hashes, evaluator, custody/exposure status, rubric and pass/fail without leaking fixture content. Used/disclosed cases are consumed; historical evidence does not become current protected approval.

**Source:** [examples/release-candidates/release-checklist.md:59](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/release-candidates/release-checklist.md#L59).

**Prerequisites:** none.

### FND-39 — Verify the manual review-package workflow operationally

**P2 · required-gate · refoldec · not-started**

**Current gap or boundary:** The main-only secret materialization, leakage scan, archive and cleanup workflow is committed. No real secret-backed workflow receipt was executed in this release.

**Next action:** Once the maintainer fixture is available, run the workflow from main, verify failure behavior and cleanup, then inspect the actual uploaded archive against its source inventory.

**Done when:** The archive contains only allowed skill files, the temporary fixture is removed on success/failure and protected content is absent. Packaging success is not runtime evaluation or public release approval.

**Source:** [.github/workflows/refoldec-review-package.yml:24](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/.github/workflows/refoldec-review-package.yml#L24).

**Prerequisites:** none.

**Conditional sequencing:** Requires maintainer fixture availability/custody and frozen candidate; leak-scan packaging is independent of FND-38 behavioral evaluation.

### FND-40 — Obtain a current ReFolDec release decision and publication receipt

**P2 · required-gate · refoldec · not-started**

**Current gap or boundary:** The checklist still defers equilibrium approval and separately authorized deployment. FoundRy being public does not substitute for these capability gates.

**Next action:** After current protected evaluation and source/license/privacy checks, update the capability decision record and confirm its approved publication surface. Publish only within that explicit scope and verify the served artifact.

**Done when:** The exact candidate has an owner-approved decision, approved destination and independent published-byte/version receipt. No public performance or graduation claim precedes the gates.

**Source:** [examples/release-candidates/release-checklist.md:63](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/examples/release-candidates/release-checklist.md#L63); [AGENTS.md:137](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/AGENTS.md#L137).

**Prerequisites:** 38,39.

### FND-41 — Evaluate additional hosts individually

**P3 · proposed-feature · adapters · not-started**

**Current gap or boundary:** Claude, ChatGPT/Codex, OpenClaw and Perplexity are potential targets, with support explicitly unverified. Success on one does not establish all.

**Next action:** Select the next host only after the first exemplar/adapter works. Verify its current official package format, method/tool support and manual fallback, then rerun relevant outcome and removal cases.

**Done when:** The matrix lists verified, partial, unsupported and untested hosts with dated receipts. Shared source portability does not imply equivalent runtime behavior.

**Source:** [docs/portable-skill-foundry.md:29](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L29).

**Prerequisites:** 16.

### FND-42 — Adopt demonstrated sibling improvements through review

**P3 · owner-decision · collaboration · not-started**

**Current gap or boundary:** This release intentionally changes FoundRy only. Separate sibling application ownership and the OverKill universal-governance authority remain in force.

**Next action:** When a shared need is demonstrated, prepare a compact pinned-source handoff with explicit file scope and validation for the receiving owner; reconcile universal rules upstream.

**Done when:** The receiving host acknowledges the handoff and its own tests pass. Source parity is verified per repository; no private sibling material is imported and no silent rule fork is created.

**Source:** [docs/foundry-mentoring-model.md:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/foundry-mentoring-model.md#L1); [docs/agent-collaboration.md:1](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/agent-collaboration.md#L1).

**Prerequisites:** 04.

### FND-43 — Make unsaved-memory recovery immediately actionable

**P1 · recovery-improvement · recovery · not-started**

**Current gap or boundary:** Storage denial retains edits and backup works, but the immediate warning lacks an adjacent recovery action and live-announcement semantics.

**Next action:** Display a persistent accessible unsaved message with a download-newest-backup action and the consequence of refresh/closure. Announce state changes without repeated typing spam.

**Done when:** Quota/write denial exposes a backup with the latest edits; status clears only after persistence succeeds. Assistive-technology observation confirms the change is discoverable.

**Source:** [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:145](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L145); [artifacts/custom-gpt-creator/tests/capability-workbench.e2e.ts:206](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/custom-gpt-creator/tests/capability-workbench.e2e.ts#L206).

**Prerequisites:** 02.

### FND-44 — Expose exact raw malformed-source recovery separately

**P2 · recovery-improvement · recovery · not-started**

**Current gap or boundary:** Malformed bytes are retained in recovery storage, while ordinary workspace backup exports the temporary valid workspace. A visible exact raw-source retrieval path is not established.

**Next action:** Provide a distinct raw recovery export labeled unparsed/unvalidated, separate from the current workspace backup. Keep raw material as data and preserve it across an intentional edit.

**Done when:** Seed malformed text, export exact original bytes before and after an edit, and confirm ordinary backup still contains validated current project data. If recovery-key writes fail, retain download access without pretending durable recovery exists.

**Source:** [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:289](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L289); [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:398](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L398).

**Prerequisites:** 43.

### FND-45 — Offer a current backup inside replacement confirmation

**P2 · proposed-usability · recovery · not-started**

**Current gap or boundary:** Whole-workspace replacement is explicitly confirmed, but the dialog does not provide an in-context current-backup action. This is a usability proposal, not an unauthorized-overwrite finding.

**Next action:** Add an accessible Download current backup action and inspectable project counts/names if useful. Preserve the current replacement contract; defer automatic merge/undo machinery until demonstrated need.

**Done when:** The user can preserve current valid projects before replacement, cancel without changes and restore the exported prior workspace. Legacy GPT data remains isolated.

**Source:** [artifacts/mockup-sandbox/src/pages/capability-workbench.tsx:435](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L435); [docs/capability-workbench.md:54](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench.md#L54).

**Prerequisites:** 22.

### FND-46 — Provide an executable manual-use and recipient handoff

**P1 · evidence-gap · adapters · not-started**

**Current gap or boundary:** Unsupported hosts need a manual fallback, but non-software package README files do not establish a complete run/read-order recipe for the recipient.

**Next action:** For the first exemplar, give a short read order for root contract and skill files, supported installation layout, input example, manual-use alternative, unavailable-reference handling and result-return instructions. Have a receiver follow it without inherited chat context.

**Done when:** The receiver identifies the source revision, necessary constraints and fallback limitations, performs the task, returns observed evidence and removes temporary packaging. Manual mode is not labeled native host support.

**Source:** [artifacts/mockup-sandbox/src/lib/capability-workbench.ts:561](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L561); [docs/portable-skill-foundry.md:31](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/portable-skill-foundry.md#L31).

**Prerequisites:** 01.

**Conditional sequencing:** Draft after selecting the FND-04 source/task, before the recipient run. Manual fallback may precede native host discovery; reuse the exemplar receipt.

**Reuse evidence with:** FND-04, FND-11, FND-32; do not duplicate implementation or outcome counts.

### FND-47 — Document tested PowerShell launch commands

**P2 · documentation-gap · operations · not-started**

**Current gap or boundary:** Local usage documentation uses POSIX inline environment assignments, which PowerShell cannot execute as written. This release translated those commands manually.

**Next action:** Add clearly labeled PowerShell environment setup beside POSIX commands or document a tested existing portable launcher. Record OS/shell/runtime/base path and a receiving host acknowledgement in the compact handoff.

**Done when:** A clean Windows/PowerShell receiver launches the exact preview/base path and build from the documented commands, verifies export/recovery and acknowledges the exact source and scope.

**Source:** [docs/capability-workbench.md:15](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench.md#L15); [docs/agent-collaboration.md:54](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/agent-collaboration.md#L54).

**Prerequisites:** none.

### FND-48 — Pair source rollback with an older-compatible project backup

**P1 · compatibility-boundary · recovery · not-started**

**Current gap or boundary:** The current app reads older v1 backups by supplying new portability defaults. Older builds reject backups containing new fields; source rollback alone is not project-data rollback.

**Next action:** Immediately preserve available pre-upgrade originals and current exports before recovery/schema edits. Record which originals exist and which are unavailable. Then record a version matrix and exercise current acceptance of old backups plus explicit older-build rejection of new fields without mutation.

**Done when:** Rollback can recover the original project using its compatible original backup. New conversion fields remain preserved in the current export; unsupported backward imports fail visibly and never mutate the stored workspace.

**Source:** [docs/capability-workbench.md:49](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/capability-workbench.md#L49); [docs/workbench-backup-migration-design.md:3](https://github.com/OKHP3/overkill-hill-foundry/blob/aa14c3af07903171c4594294076af19b5ccc4463/docs/workbench-backup-migration-design.md#L3).

**Prerequisites:** none.

**Conditional sequencing:** Immediately preserve and identify any existing pre-upgrade originals before recovery/schema changes; do not invent missing old backups. FND-24â€“25 supply later matrix/transfer evidence before broader rollback claims.

## Completion and expiry boundary

The strongest surviving defect is silent concurrent-tab data loss. The strongest missing outcome evidence is one real method taken through the intended environment and returned to its canonical saved revision. No number of reviewer agreements substitutes for those tests.

Review validity expires on changes to source, supported host/tool contracts, selected requirement scope, evidence producer trust or publication surface. Re-run affected checks and the relevant review decision; reuse unchanged historical evidence within its scope. Private fixtures remain private and consumed holdouts are never relabeled unseen.
