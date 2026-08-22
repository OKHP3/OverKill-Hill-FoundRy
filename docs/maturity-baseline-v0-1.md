# FoundRy / ReFolDec / Custom GPT Creator Maturity Baseline

**Review record:** `maturity-baseline-v0.1`  
**Review date:** 2026-08-22  
**Repository:** `OKHP3/OverKill-Hill-FoundRy`  
**Frozen repository revision:** `6d3588a7adff89b72418ef6034127aa99f4aa17a`  
**Review protocol:** Equilibrium Review `equilibrium-v1`, five-way analytical mode  
**Decision owner:** FoundRy steward / capability owner

## Decision question

What maturity and release decision is justified by the current repository evidence
for (a) the FoundRy relay, (b) the ReFolDec capability, and (c) the private
Custom GPT Creator, without treating documentation, smoke tests, or reviewer
agreement as proof of user outcome?

## Scope and frozen evidence

The review covers the repository governance contract, ReFolDec specification and
schema, roadmap and publication boundary, the Custom GPT Creator's canonical
pages and export behavior, and the `okhp3-custom-gpt-builder` and
`okhp3-equilibrium-review` skill contracts. The frozen implementation evidence is
the repository revision above. The review was performed against these sources on
2026-08-22:

- `AGENTS.md`, `README.md`, `manifest.yaml`, and `registry/index.yaml`
- `docs/specification.md`, `docs/roadmap.md`, `docs/governance-model.md`,
  `docs/publication-boundary.md`, and `docs/custom-gpt-creator-transfer.md`
- `schemas/refoldec-artifact-schema.json`
- `artifacts/custom-gpt-creator/src/App.tsx`
- `artifacts/mockup-sandbox/src/App.tsx`
- `artifacts/mockup-sandbox/src/pages/ExportPackage.tsx`
- `.agents/skills/okhp3-custom-gpt-builder/SKILL.md`
- `.agents/skills/okhp3-equilibrium-review/SKILL.md` and
  `references/review-protocol.md`

Repository validation run during the review:

- `pnpm run typecheck` — **pass**
- `pnpm --filter @workspace/mockup-sandbox run test:platform-comparison` —
  **pass (6 tests)**

These checks establish build and selected data-validation behavior only. They do
not establish task success, repeatable user outcomes, public safety, or platform
compatibility.

## Acceptance criteria

| Criterion | Baseline judgment |
|---|---|
| Identity and scope are unambiguous | **Supported** for the private FoundRy relay and hosted ReFolDec relationship |
| Material claims distinguish fact, interpretation, design choice, hypothesis, preference, and unknown | **Supported by this record; not yet machine-enforced across all artifacts** |
| The creator can support a private builder workflow | **Approve with limits**: usable for one browser-local project and manual export |
| ReFolDec has a demonstrated capture/transform pipeline | **Blocked**: specification and schema exist, but executable capture, validation, and outcome evidence are missing |
| Public release boundary is safe and explicit | **Supported as policy; public graduation deferred** because implementation and evidence are incomplete |
| Platform-sensitive claims are maintained as current facts | **Partial**: comparison smoke tests exist, but this review has no live official-platform source retrieval |
| Release decisions are reproducible and independently evidenced | **Not met**: all role passes use one repository context and no unseen behavioral holdout |

## Claim and evidence ledger

Statuses use `supported`, `provisional`, `disputed`, or `blocked`. Evidence
classes use `confirmed`, `inferred`, `proposal`, or `unknown`.

| ID | Material claim | Type / evidence class | Evidence | Status | Consequence if false | Smallest decisive next test |
|---|---|---|---|---|---|---|
| CLM-01 | FoundRy is the private governance relay and ReFolDec is hosted capability, not repository identity. | Fact / confirmed | `AGENTS.md` §0, §7; `README.md` §§1, 3; `manifest.yaml` | supported | Public readers or child repos may inherit the wrong identity or visibility. | Review a generated/public-facing package for identity and visibility leakage. |
| CLM-02 | FoundRy has a documented relay hierarchy, child-repo responsibilities, naming rules, and required files. | Fact / confirmed | `AGENTS.md` §§1–6, 9–10; `docs/governance-model.md` | supported | Child repositories may drift from the intended governance relay. | Run a machine-checkable audit against representative child repositories. |
| CLM-03 | ReFolDec's fold/unfold/refold model and maturity vocabulary are defined. | Design choice / confirmed documentation | `docs/specification.md` §§1–6; `docs/roadmap.md` | supported as specification | Contributors may use incompatible meanings or claim maturity without shared terms. | Process one raw fixture through each operation and compare expected fields. |
| CLM-04 | The ReFolDec artifact schema can constrain the minimum artifact envelope. | Fact about schema / confirmed | `schemas/refoldec-artifact-schema.json` | provisional | Invalid or incomplete artifacts can be treated as mature or publishable. | Add validator fixtures for required fields, enums, provenance, and public-boundary cases. |
| CLM-05 | ReFolDec currently has an executable capture, validation, and transformation pipeline. | Capability claim / unknown | Roadmap v0.3–v0.4 are future work; no pipeline evidence in frozen scope | blocked | Public graduation could be based on a concept rather than a usable capability. | Execute a fixture from raw capture through validated refolded output with recorded results. |
| CLM-06 | The creator exposes the builder methodology as a browser-only, localStorage-backed workflow with manual Markdown export. | Implementation fact / confirmed | `docs/custom-gpt-creator-transfer.md`; creator source; typecheck and export-related history | supported | Users may expect server persistence, collaboration, or automatic repository writes. | Complete a fresh-browser walkthrough covering all steps, reload, export, and download. |
| CLM-07 | The private creator is usable for a single in-progress project when the user accepts local-browser limits. | Outcome hypothesis / inferred | UI flow and export warning; no unseen user study or holdout | provisional | Users may lose work, misunderstand completion, or produce incomplete specs. | Run an external/fresh-browser task script with representative builders and grade acceptance criteria. |
| CLM-08 | The dedicated creator artifact and Canvas previews reuse canonical creator pages, but the SPA runtime contract is not fully proven by repository inspection alone. | Implementation/integration claim / confirmed plus unknown | `artifacts/custom-gpt-creator/src/App.tsx`; `docs/custom-gpt-creator-transfer.md`; memory pointer `spa-runtime-contract.md` | provisional | The visible artifact may diverge from documented route expectations or fail under proxy routing. | Start the dedicated workflow and exercise every documented route through the proxied preview. |
| CLM-09 | Governance controls include explicit private/public separation and prohibit automatic graduation of sensitive material. | Policy fact / confirmed | `AGENTS.md` §7; `docs/publication-boundary.md`; `docs/specification.md` §7 | supported as policy | Private Notion, employer, client, or FoundRy content could leak into a public package. | Run a redacted fixture through a publication-readiness review with a deliberate private-source trap. |
| CLM-10 | The current platform-comparison checks can identify stale, malformed, undated, or unsafe fact entries. | Implementation fact / confirmed | `platform-comparison.smoke.test.ts`; six passing tests | supported for tested helper behavior | Stale platform assumptions may enter creator guidance unnoticed. | Add a live official-source retrieval record and verify one current Builder claim end-to-end. |
| CLM-11 | Current OpenAI Builder limits, capabilities, and publication requirements are verified for this baseline. | Platform fact / unknown | Builder skill requires current verification; no live official source set in review | blocked | Creator outputs may encode obsolete or unsupported platform behavior. | Capture dated official documentation citations for every platform-sensitive claim used by the creator. |
| CLM-12 | Repository checks and reviewer agreement demonstrate reliable user outcomes. | Outcome claim / false boundary | Typecheck and smoke tests only; no holdout | disputed/rejected as evidence | Cosmetic or implementation confidence could be mistaken for product maturity. | Run an unseen behavioral holdout with predefined outcome scoring; publish results separately. |

## Five review passes

All passes are **analytical**, not live external-agent judgments. They use one
repository context, the same frozen source set, and no unseen behavioral holdout.
The role labels below are therefore useful structured reasoning, not independent
proof. No credentials, integrations, external writes, or publication actions were
used.

### 1. Evidence reviewer — analytical

Confirmed the repository identity, documented governance boundary, schema
envelope, creator implementation shape, and passing local checks. Classified the
executable ReFolDec pipeline, current platform facts, and user outcomes as
missing evidence rather than inferred from prose. Strongest finding:
documentation and schema support a scaffold, not a demonstrated capability.

### 2. Outcome reviewer — analytical

The creator has a coherent staged workflow and a usable manual export for a
single private builder. Its outcome claim is limited by localStorage-only state,
single-project behavior, incomplete phase-gate evidence, and lack of a fresh
behavioral holdout. ReFolDec does not yet show a user-facing capture-to-output
journey that can be graded.

### 3. Safety and portability reviewer — analytical

The private/public boundary is clear and the absence of backend credentials
reduces server-side exposure. Risks remain around browser-local loss, route/proxy
verification, private-source contamination, unverified platform facts, and
manual handling of exported files. Public release must remain deferred until
provenance, redaction, portability, and failure behavior are tested.

### 4. Disruptor — analytical, triggered by initial concordance

Counterexamples and decisive tests:

1. **Fresh-browser loss:** a user completes half the creator flow, closes the
   browser, or changes project context and cannot recover or distinguish state.
   Decisive test: fresh-browser reload and loss/recovery walkthrough.
2. **False completion:** an export looks polished while required phases or
   acceptance criteria are incomplete. Decisive test: fixture with deliberately
   missing phases, graded against the exported package.
3. **Public-boundary leak:** a package includes a private-source note, URL, or
   instruction-like content that survives into a public export. Decisive test:
   adversarial redaction/public-readiness fixture.
4. **Platform drift:** a dated comparison row remains readable but its official
   source has changed or is unavailable. Decisive test: current official-source
   citation and freshness check.
5. **Scaffold overclaim:** a schema-valid ReFolDec object is mistaken for a
   validated transformation. Decisive test: executable fold/unfold/refold fixture
   with expected output and failure assertions.

None of these tests was run as a live holdout in this baseline. They remain
surviving objections, not failed falsifications.

### 5. Negotiator — analytical

The decisive distinction is between what the repository can show now and what it
claims about outcomes or public readiness. The relay identity and boundary are
approved within private scope. The creator is approved **with limits** for
private, single-project, browser-local use and manual export. ReFolDec public
graduation is **deferred-for-evidence**. No reviewer vote was averaged; the
decision follows the highest-consequence unresolved claims and the missing
holdout.

## Material gaps, owners, dependencies, and release gates

| Gap | Owner role | Priority | Smallest decisive test | Dependency | Release consequence |
|---|---|---:|---|---|---|
| Artifact maturity and provenance are not machine-checkable beyond a permissive schema. | Schema/validation maintainer | P0 | Validate positive, invalid, stale, private-source, and public-safe fixtures. | Baseline claim ledger; no public fixture can be trusted before provenance rules exist. | ReFolDec cannot claim validated or canonical maturity; public graduation blocked. |
| ReFolDec capture and transformation behavior is not executable evidence. | ReFolDec capability maintainer | P0 | Run one representative raw-to-structured-to-refolded fixture with expected outputs and failure cases. | Machine-checkable artifact model. | Public ReFolDec graduation blocked; private concept work may continue. |
| Creator phase completion is not tied to evidence-bearing gates. | Creator workflow maintainer | P1 | Submit incomplete and complete fixtures and verify deterministic gate outcomes. | Creator acceptance criteria and artifact validation. | Private use remains limited; no stable/release claim. |
| FoundRy governance controls are documented but not consistently enforced at artifact boundaries. | Governance steward | P1 | Audit a representative package for identity, visibility, provenance, and filename/public-boundary violations. | Machine-checkable maturity and publication fixtures. | Public packages require manual review; automatic graduation prohibited. |
| Creator is single-project and browser-local. | Creator workflow maintainer | P1 | Fresh-browser/reload/manual-export walkthrough with loss and recovery cases. | Phase-gate behavior must be defined first. | Usable only with explicit localStorage and one-project limits. |
| Current platform facts lack a dated official-source maintenance record in this review. | Platform-facts maintainer | P1 | Verify each volatile claim against current official documentation and record retrieval dates. | Creator claim inventory. | Platform-sensitive guidance cannot be treated as current or public-ready. |
| No unseen behavioral holdout or external user outcome evidence exists. | Evaluation owner | P0 | Run a protected task set not used to design the workflow and score outcomes against predeclared criteria. | Stable acceptance criteria and test fixtures. | No uplift, reliability, or outcome claim; public graduation deferred. |

These gaps correspond to the already planned downstream mitigation work:
machine-checkable maturity, evidence-driven creator gates, stronger governance
controls, ReFolDec capture, multi-project support, tested Agent Skill packaging,
and public graduation preparation. This baseline does not implement those items.

## Release decision

### FoundRy relay

**Approve within private relay scope.** The repository identity, hierarchy, and
publication boundary are sufficiently documented for continued controlled
development. This is not approval to publish the relay or its private sources.

### Custom GPT Creator

**Approve-with-limits.** The current private creator is usable for one builder,
one browser-local project, and manual Markdown export. Users must treat
localStorage as convenience state rather than durable backup, review incomplete
step warnings, and verify platform-sensitive guidance independently. This
decision does not claim reliable user outcomes, multi-project safety, public
readiness, or current platform completeness.

### ReFolDec

**Defer-for-evidence for public graduation.** The specification, vocabulary,
schema, roadmap, and boundary are a credible private scaffold. Missing
executable pipeline evidence, machine-checkable maturity/provenance, current
platform/source maintenance where relevant, and an unseen behavioral holdout
prevent a public release decision. ReFolDec may continue private development
inside FoundRy, but no public artifact should imply that this baseline is a
graduation approval.

## Limitations and refresh triggers

- This is one repository context, not independent multi-agent or human review.
- The role passes are analytical; the record must not be represented as live
  behavioral evidence.
- There is no unseen or protected holdout, external user study, production
  telemetry, or public-reader test.
- Local checks cover compilation and selected platform-comparison data behavior,
  not semantic quality, security, accessibility, or outcome success.
- No current official OpenAI Builder documentation was retrieved for this
  baseline; platform-sensitive claims remain unknown until verified.
- The frozen revision and source list must be refreshed whenever a mitigation
  changes a maturity claim, a release boundary, a schema, a creator phase gate,
  or a platform-fact assertion.

**Review expiry:** refresh on the next material mitigation change, platform
change affecting creator claims, new public artifact proposal, or no later than
2026-11-22.