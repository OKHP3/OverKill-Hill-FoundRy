# FoundRy application implementation plan

Date: 2026-09-07. Owner request: research the seven OKHP3 elements, preserve their distinct regions, then build this repository into an application for building systems and tooling. Baseline: `312256a` from current GitHub main; work in `agent/foundry-system-workbench` isolated checkout.

## Scope and evidence

OverKill FoundRy is the OverKill region's capability workshop. AskJamie and Glee-fully each own a separate FoundRy. Skillz remains the shared catalog across all three. Universal governance originates in OverKill-Hill, the baseline reference for the sibling sites. This FoundRy supplies the initial mentor pattern for both sibling FoundRys; improvements can flow back to it or across to either sibling. The owner confirmed intentional public visibility on September 7; see [the mentoring model](foundry-mentoring-model.md). Public repository visibility is separate from application audience and permission to publish user-authored material.

Primary sources: owner instructions, seven current GitHub repositories, five live websites, seven named Replit project URLs, local runtime and governance source. Read-only research distinguishes authored documentation, running browser features, and unavailable evidence. The runtime is intentionally browser-local; preserve the GPT creator and Canvas previews.

## Execution sequence

1. Complete discovery and targeted follow-up; reconcile product ownership, governance lineage, source maturity, and deployment discrepancies. **Complete** (Replit verification is bounded by accessible UI; see research report).
2. Synthesize seven-element research, acceptance contract, and implementation design. **Complete.**
3. Implement a persistent capability workbench: named projects; prompt, skill, workflow and software targets; intent/contracts; components; Skillz references; evidence gates; portable source bundle exports and recovery backups. **Complete.**
4. Integrate the existing Custom GPT creator as a dedicated studio; preserve old storage, nine stations, audit and exports. Add a clear three-ring universe view and source method references. **Complete.**
5. Verify unit/domain behavior, generated artifacts, existing and new browser journeys, mobile/keyboard behavior, typecheck/build, filenames and complete governance sequence. Resolve consequential defects. **Complete locally.**
6. Commit reviewable slices and open a pull request with evidence and limitations. Keep deployment status distinct from local acceptance and merge status. **Complete: [pull request #23](https://github.com/OKHP3/OverKill-Hill-FoundRy/pull/23) tracks integration; GitHub Actions records deployment and its exact revision.**

## Delegation and cost control

- Coordinator: primary-source reconciliation, architecture contract, integration, governance, PR and verification.
- Research subagent: bounded sibling source lane; completed. No further research fan-out.
- Separate Codex task requested: runtime/acceptance audit, Luna medium, read-only isolated worktree. Task setup returned a pending client identifier without an accessible completed audit; its result is not counted as evidence. A bounded Luna medium review subagent completed the actual implementation review.
- Implementation subagents: core generation/storage used Sol medium; interface used Terra medium. Independent review used Luna medium. The coordinator integrated the results and fixed review findings. Research inherited the coordinator model for consequential source reconciliation; implementation and review used lower-cost models. No recursive agent fan-out was needed.
- Prefer deterministic local generation and existing libraries. No model calls, credentials, metered services, backend or database required by the application.

## Acceptance boundary

A user can create and recover a capability project, edit its contract, select a target, reference Skillz sources, record actual validation results, inspect all generated files, download a portable bundle, and reopen the project. A software starter can run using documented local commands. Existing GPT projects and workflows continue to function. No form completion or generated test case is represented as observed behavioral validation or publication. Other regions' private source material is not bundled.

## Future work requiring a distinct decision

Authenticated collaboration, server-side agent execution, secrets, metered model providers, remote repository provisioning and automatic deployment are separate capabilities. This release builds and packages systems locally, with reviewable handoff to their execution environment.

## Plan tooling

The Deep Research skill's `update_plan` tool is unavailable in this session's tool catalog. This versioned document records the plan and phase transitions instead.

## Local acceptance record — September 7, 2026

- 9 core tests passed: storage recovery, strict backup contracts, bounded fields,
  target generation, safe markup and independent ZIP structure/CRC checks.
- 26 browser tests passed, covering both the original GPT studio and new
  workbench. Coverage includes backup/import, denied storage, project lifecycle,
  missing UUID support, target switching, generated software behavior, theme and
  a 390-pixel mobile viewport without horizontal overflow.
- Workspace typecheck and production build passed with the GitHub Pages base
  path `/OverKill-Hill-FoundRy/`.
- Complete governance sequence, filename dry run and `git diff --check` passed.
- Desktop light/dark views were inspected in the browser. Review findings about
  UUID fallback, stale file selection and storage recovery were resolved.

These results were obtained in an isolated worktree based on `312256a`. The
owner's existing checkout was not changed. The macOS native build dependencies
are now retained alongside Linux dependencies, and pnpm is pinned to 10.34.5.
GitHub checks, merge and deployed behavior are separate evidence stages. There
is no claim of general-purpose AI execution, automatic implementation of an
arbitrary system, remote provisioning or deployment from this release.
