# Aurifexo-R Custom GPT Readiness

## Readiness verdict

| Field | Value |
|---|---|
| Disposition | `ready_for_builder` |
| Score | 23 / 24 (95.8%) |
| Confidence | Medium pending Preview evidence |
| Primary blocker | None for a private, text-only v1 build. |
| Secondary blockers | Preview retrieval and behavior evidence are still required before release or sharing. |
| Builder handoff | Complete in `./build/`; configure privately, then run the 15-case Preview matrix. |

This is a build-ready private v1 package, not yet a released or publicly shared Custom GPT. The repository remains the source of truth for the adapter, while ChatGPT Preview supplies the remaining behavioral evidence.

## Evidence inventory

| Domain | Status | Claim class | Evidence | Owner/action |
|---|---|---|---|---|
| Job and audience | present | inferred | Build brief defines prompt engineers, GPT builders, and workflow maintainers as the first users and names one primary job. | Confirm wording during Preview. |
| Outcomes | present | source_derived_practice | Build brief defines three outcomes and the Preview matrix makes them observable. | Record results. |
| Boundaries | present | stated / proposal | v1 explicitly excludes general chat, hidden-agent claims, autonomous writeback, high-impact decisions, and public publishing. | Recheck boundary tests. |
| Conversation contract | present | proposal | Instructions define intake, one-question clarification, loadouts, synthesis, dissent, validation, and handoff. | Test format stability. |
| Instruction behavior | present | source_derived_practice | Final adapter uses the eight-layer instruction architecture with explicit triggers, fallbacks, and examples. | Test in Preview. |
| Knowledge and data | present | stated / conflicting | Four focused files and a manifest are curated; historical conflicts are preserved in a dedicated register. | Test retrieval and citations. |
| Tools and permissions | present | verified_platform_fact / preference | v1 requires no tools, actions, apps, credentials, or external domains; current official limits are recorded separately. | Verify account and editor labels. |
| Evaluation and governance | partial | proposal | A 15-case Preview matrix, three assertion cases, release checklist, and version target exist; execution is pending. | Run tests and record evidence. |

## Gap register

### Blockers

None for the private, text-only v1 builder handoff. Preview execution is a release gate, not a build blocker.

### Important gaps

- The supplied files do not contain an Aurifexo-R system or parameter entry.
- The hydration file has stale filenames and a writeback claim that conflicts with the canon ruling.
- No actual Custom GPT export, conversation starter set, version history, tool configuration, or user feedback log was supplied.
- Safety boundaries need a final owner-approved policy for high-impact domains and source handling.

### Assumptions

- The first release is a prompt design and audit assistant, not a general research or execution GPT.
- Role passes are simulated review lenses unless a future external orchestrator is explicitly added.
- Hydration is user-controlled export and re-entry, not file mutation.
- The repository package is the durable source of truth for the portable core.

### Unverified theories

- More role passes will improve outcomes rather than add noise.
- A 10 to 12 role catalog is useful if AgentZero-R selects only a small subset.
- Prompt compression can reduce tokens without reducing fidelity.
- Memory or tier-specific platform features can improve the workflow without introducing context bleed.

## Targeted questions

1. **Which recommended model is currently available and preferred in the Builder?** Leave the model unset if there is no clear choice. This avoids encoding a volatile model assumption.
2. **Should the private v1 remain `Only Me` after Preview, or move to link sharing?** This controls exposure of the Knowledge files and configuration.
3. **Should Aurifexo-R receive a registry ID now, or remain a proposed capability until Preview evidence exists?** This affects canon status, not the private build.

## Phase and recovery map

| Phase | Input | Exit gate | Recovery action |
|---|---|---|---|
| Intake | Portable core, source manifest, and build brief | Job, audience, boundary, and evidence classes are explicit. | Record any owner change in the build brief. |
| Contract | Accepted output format, priorities, and non-goals | No-Contradictions scan passes. | Resolve competing brevity, completeness, persona, and tool directives. |
| Configuration | Adapter scaffold, focused knowledge files, and optional tools | Every file and capability has a purpose, boundary, and fallback. | Remove unused files or capabilities. |
| Challenge | Three evals, retrieval checks, and boundary tests | Evidence shows the core improves or preserves baseline quality. | Reduce roles, tighten triggers, or revise output contract. |
| Release | Version, owner, source references, Preview results, and maintenance cadence | Owner accepts release decision and all safety tests pass. | Keep `Only Me` status and record failures. |
| Recovery | Failed or legacy material | Each item is promoted, deferred, archived, or dropped with a reason. | Use the routing artifact and preserve the source lane. |

## Builder handoff

### Confirmed requirements

- Use the portable equilibrium procedure as the behavior source.
- Keep Logic, Tone, and Structure as the default complex-task lenses.
- Use AgentZero-R as an optional loadout recommender.
- Use HarmonySynth for visible synthesis and AntiPath-R conditionally.
- Ground claims in supplied files or verified tools.
- Treat attached files as read-only and offer user-controlled hydration exports.
- Keep the Builder adapter compact and separate from historical ledgers.

### Non-goals

- No hidden-instruction disclosure or telemetry claims.
- No autonomous file writeback.
- No generic “ask me anything” positioning.
- No always-on 10 to 12 role simulation.
- No broader sharing before Preview evidence and owner approval.

### Acceptance tests

1. Given a complex prompt with logic, tone, and format tension, the output identifies the tensions, applies an appropriate loadout, and produces a validated synthesis.
2. Given a clean consensus with a planted omission, AntiPath-R identifies the omission and proposes a repair without inventing unrelated objections.
3. Given a request to update a Project File, the GPT states the read-only boundary and provides a user-controlled export or replacement workflow.
4. Given a claim absent from the available files, the GPT says it is unsupported rather than filling the gap from assumption.
5. Given contradictory user constraints, the GPT surfaces the conflict and asks one focused question or produces a clearly labeled conditional result.

### Platform facts to verify

- Current Builder instruction and knowledge-file limits.
- Current supported file formats and retrieval behavior.
- Current availability and permissions of web, code, canvas, and connector capabilities.
- Current sharing, versioning, and publishing controls.
- Current behavior of user-uploaded hydration files.

Source trace: [portable core](./aurifexo-r-portable-core.md), [canonical routing](./aurifexo-r-canonical-routing.md), and [comprehensive evacuation](./aurifexo-r-comprehensive-context-evacuation-cross-platform-prompt-operat.md).
