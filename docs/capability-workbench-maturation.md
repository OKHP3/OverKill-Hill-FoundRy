# Capability workbench: current state and maturation

Assessment date: September 7, 2026.
Implementation assessed: `29148edbc724b951ae1291a2da4b1103547ef398`.
Delivery: [PR #23](https://github.com/OKHP3/OverKill-Hill-FoundRy/pull/23), branch `agent/foundry-system-workbench`.
This is a dated assessment. Later changes and deployment must be checked independently.

## Current maturity

Assessment: a functional browser-local authoring and packaging application,
ready for owner acceptance and release review. It is an early workbench, not
yet a general system implementation or agent execution platform. This is an
engineering assessment, not a completed user acceptance study or formal
production certification.

The durable unit is the capability project: purpose, audience, owner, version,
inputs, outputs, constraints, instructions, components, acceptance criteria,
source references and recorded evidence. Target-specific files are generated
from that project. A target changes packaging; it does not establish that the
authored capability works.

## Position in the universe

OverKill-Hill is the centroid and common baseline for distinct OverKill,
AskJamie and Glee-fully sites. OverKill FoundRy serves its own region and is
the initial mentor pattern for the sibling FoundRys. Either sibling can improve
the mentor or each other. Universal rule changes are reconciled at
OverKill-Hill; implementation patterns can be adopted through receiving-repo
review. Skillz remains the shared catalog.

This FoundRy repository is intentionally public. Its root manifest and current
governance now match that owner decision. Dated private-posture reviews remain
historical records. Public repository visibility does not grant publication
rights over private inputs or complete a separate capability release.

See [the mentoring model](foundry-mentoring-model.md) and
[seven-element research](universe-research.md).

## What works

| Area | Implemented behavior | Present boundary |
|---|---|---|
| Projects | Create, name, select, duplicate, delete and locally persist projects | Single-browser workspace; no accounts or cross-device synchronization |
| Authoring | Brief, contract, build instructions/components, acceptance and evidence fields | Components and contracts are authored text, not executable composition graphs |
| Prompt packages | Portable prompt instructions and supporting capability documentation | Model behavior must be tested in a chosen execution environment |
| Agent Skill packages | Generated SKILL.md and supporting source/validation documentation | No installation, runtime execution or distribution certification |
| Workflow packages | Portable workflow plan and handoff material | No workflow scheduler or execution engine |
| Software packages | Runnable, dependency-free JSON contract inspector starter | Inspects JSON syntax and field types; it does not implement or validate arbitrary business requirements |
| Custom GPT studio | Original nine stations, saved projects, audits and export flows retained at #creator | User still configures and evaluates the target GPT in its destination |
| Evidence | Structural completeness checks and recorded owner review | Nonempty evidence text is not independently verified behavior; review is a human assertion |
| Export | Inspectable files, source ZIP, workspace JSON backup/import | Import replaces the capability workspace after validation and confirmation; no merge-based import |
| Skillz | Canonical catalog links and user-entered source/revision references | No integrated catalog search, automatic dependency resolution, installation or publication |
| Interface | Three-ring orientation, regional mentor wording, light/dark themes and mobile layout | No comprehensive accessibility audit or broad cross-browser certification yet |

Common source exports include capability.json, README.md, AGENTS.md,
docs/build-plan.md, docs/validation.md and docs/skillz-references.md, plus
target-specific files. The actual source generator is
[capability-workbench.ts](../artifacts/mockup-sandbox/src/lib/capability-workbench.ts).

## Architecture and operating limits

The UI uses the existing React/TypeScript/Vite application. The deployment
artifact remains artifacts/custom-gpt-creator; its canonical implementation
currently lives in artifacts/mockup-sandbox/src. That layout is inherited,
works, and should be clarified before further large feature growth.

Capability projects use a versioned browser store separate from cgpt-workspace.
The current limits are 20 projects, 2,000,000 bytes per backup/import and 40,000
UTF-8 bytes per text field. Browser storage capacity is a separate limit.
Backups are the portable recovery path between localhost, Pages and Replit,
whose origins do not share local storage.

Malformed stored data is preserved for recovery. Failed storage writes keep
newer edits in memory and expose a warning; those edits require an export before
refresh or closure. Imports validate version, regional envelope, field types,
identities and bounds. Software generation escapes user text and uses text
output for inspection results.

The authoring path uses no API server, database, login, provider credentials or
paid model calls. Existing workspace API/DB packages are not an operational
builder backend. The app still loads external fonts; it is not claimed to be
completely offline. Browser-local storage is not an access-control system.

## Verification and delivery evidence

At the assessed implementation revision:

- GitHub PR workflows for E2E, typecheck, governance and filenames passed.
- The recorded suite has 26 passing browser tests and 9 passing core tests.
- Coverage includes original GPT journeys, project lifecycle, restore/recovery,
  missing UUID support, oversized inputs, generated ZIP integrity and generated
  software behavior with hostile text.
- A 390-pixel mobile journey passed after the mentoring copy changed.
- Local frozen-lockfile installation, production build with the Pages path,
  complete governance sequence and diff whitespace checks passed.
- Desktop light/dark views were inspected in the browser.

These tests establish bounded application behavior. They do not validate every
possible user-authored capability, establish long-term data durability, or
replace user acceptance and broader accessibility/browser testing.

The implementation changes were already committed and pushed when this report
was prepared. PR #23 was open and mergeable, with main at 312256a.
The latest successful Pages run observed was
[33875425012](https://github.com/OKHP3/OverKill-Hill-FoundRy/actions/runs/33875425012),
for 452cea7 on September 4. Thus the new workbench is not established as deployed.
The Pages workflow runs on main pushes or explicit dispatch; a feature-branch
commit does not publish this application. Replit was not updated by this work.
The owner's original checkout remained unchanged.

## Recommended maturation sequence

The stages below are proposals, in priority order. Passing a stage means its
exit evidence exists, not merely that its documentation or UI has been written.

| Order | Work | Exit evidence |
|---|---|---|
| 1. Accept and release the workbench | Owner walks the complete create-to-export journey; review/merge PR; let Pages checks/deployment finish; verify the deployed base path, existing GPT studio and backup recovery; record release and rollback revision | Successful exact-release deployment plus observed live journeys and recoverable pre-release project backups |
| 2. Prove useful outcomes | Build one real prompt package, Agent Skill, workflow and small software tool through FoundRy; run each in its intended environment; record completion friction and manual work | Four versioned examples with expected outcomes, observed results and limitations; use results to prioritize product gaps |
| 3. Strengthen authoring and recovery | Add structured contracts, reusable components, actionable target-specific guidance, version history/diff, explicit migrations and recovery UX; address accessibility and additional browsers | Older backup migration and conflict fixtures pass; representative users finish the journey; agreed keyboard/screen-reader/browser checks pass |
| 4. Connect Skillz more deeply | Read the canonical catalog into a searchable selector; pin selected sources/revisions, carry attribution and compatibility notes, preserve references when a package changes or disappears | Reproducible export from pinned references, bounded handling of unavailable/stale catalog data, no duplicate catalog source of truth |
| 5. Make evidence executable | Separate proposed checks from executed results; introduce structured result records tied to package revision, environment and logs; run target-appropriate tests | A failed capability check cannot appear validated; altered packages invalidate prior evidence; results can be reproduced |
| 6. Add bounded implementation assistance | Start with a user-run local or external-agent handoff from the package; then consider one narrow execution adapter with explicit action/cost limits, isolated work, cancellation and inspectable outputs | One real capability implemented and verified reproducibly, with recorded cost, contained failures and recoverable changes |
| 7. Productize only demonstrated shared needs | Selectively adopt sibling improvements; consider shared package contracts, optional sync/auth and collaboration after usage demonstrates a need | Cross-repo adoption records and compatibility checks; any remote storage has tested isolation, recovery and operating ownership |

Do not make a new backend or paid agent orchestration a prerequisite for proving
the existing authoring loop. The highest-value next evidence is a real capability
taken from intent to a useful, tested outcome.

## Cost-conscious execution

Use deterministic generation and validators wherever possible. Keep work in
small reviewable PRs with one acceptance boundary. Delegate independent,
well-specified implementation lanes to lower-cost models and use stronger
reasoning for architecture, source ambiguity and consequential defects. Review
outputs before integration; agent completion alone is not acceptance evidence.

Avoid building a universal platform before four real examples expose common
needs. Start any future model execution with a bounded task and recorded cost;
promote it only when usefulness and failure handling justify the additional
operational surface. Different regional stacks can share contracts and patterns
without sharing all implementation code.

## Suggested next deliverable

After release acceptance, use FoundRy to build one small OverKill tool with a
measurable input/output behavior, export it, implement the missing behavior,
run its checks, and return the observed evidence to its capability project.
That closes the currently manual implementation/evaluation loop and provides
a concrete basis for choosing the next feature.

Related records: [usage guide](capability-workbench.md),
[implementation plan](foundry-implementation-plan.md), and
[research source ledger](research/source-ledger.md).
