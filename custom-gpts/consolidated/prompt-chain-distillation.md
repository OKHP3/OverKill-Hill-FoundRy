# Prompt-Chain Distillation

This document preserves the reusable method recovered from the temporary `misc-prompts/` corpus. It deliberately does not preserve the prompt text, private ledger names, branding overlays, URLs, or claims about product capabilities.

## Evidence boundary

| Claim | Classification | Basis |
| --- | --- | --- |
| The corpus contained 177 process artifacts: 129 Markdown files, 47 text files, and one spreadsheet. | Verified corpus fact | Controlled extraction run, 2026-07-20. |
| It organized a Custom GPT workflow into initiation, intake, refinement, export, recovery, and closeout. | Verified corpus fact | Master index, spreadsheet sequence, and three generation directories. |
| The three generations are revisions of the same numbered workflow, not three independent methods. | Inference | Each contains the same numbered prompt families, with varying wording and token similarity. |
| Explicit phase gates reduce missed prerequisites and make recovery more reliable. | Source-derived practice | Repeated readiness, audit, missing-step, recovery, and closeout patterns. |
| A rigid linear chain improves GPT quality. | Theory | The corpus asserts linear progression, but contains no comparative evaluation. |

## Distilled method

Use a prompt chain as a **modular operating procedure**, not as an instruction block that must be pasted into a Custom GPT. Every module needs an input, an observable exit gate, and a recovery route.

| Module | Required input | Exit gate | Recovery route |
| --- | --- | --- | --- |
| 1. Intake | Concept, existing configuration, source artifacts, constraints | Product brief has a user, primary job, boundaries, and acceptance tests | Return to targeted evidence recovery. |
| 2. Contract | Ranked tasks, decision rules, output requirements | Conversation and behavior contracts have no unresolved contradiction | Resolve the conflict with the owner. |
| 3. Configuration | Instructions, knowledge plan, tool policy, user-facing metadata | Each enabled capability has a purpose, trigger, boundary, and failure response | Disable, replace, or test the capability. |
| 4. Challenge | Eval cases, retrieval checks, ambiguity, safety, and tool-failure cases | Results meet named acceptance criteria and regressions are recorded | Make the smallest evidence-backed revision, then retest. |
| 5. Release | Final configuration, provenance, sharing decision, maintenance owner | Release checklist is complete and platform-dependent claims are currently verified | Hold release or record a bounded exception. |
| 6. Recovery | Rejected ideas, old instructions, feedback, and failures | Each candidate is preserved, promoted, deferred, or dropped with a reason | Return it to the evidence ledger, never merge it automatically. |

## What survives the transformation

- **Structured intake and comparison:** preserve the evidence inventory, source status, and explicit conflict handling.
- **Readiness and completion gates:** preserve them as observable checks, not magic status labels.
- **Prompt-chain audit:** preserve the ability to detect duplicate, contradictory, missing, and obsolete steps.
- **Resilience logic:** preserve a clear user-facing fallback, a safe alternative, and a way to resume work.
- **Release bundle:** preserve a configuration record, knowledge manifest, capability policy, test record, and ownership note.
- **Ideation recovery:** preserve a separate queue for ideas and old artifacts so that only reviewed material enters the active configuration.

## What does not survive

| Source pattern | Decision | Reason |
| --- | --- | --- |
| Commands that prohibit reduction, summarization, confirmation, or staged review | Drop | They conflict with evidence review, smallest-change iteration, and user authority. |
| Permanent or irreversible "ready" seals | Replace | A release decision must remain revisable when tests, inputs, or platform behavior change. |
| Visit-count logic, hidden variables, and symbolic templating | Exclude unless independently implemented and tested | They are not established Custom GPT configuration capabilities. |
| Tier, tool, memory, download, URL, and feature claims | Mark unverified | Platform behavior is volatile and must be checked against current official documentation. |
| Private ledger paths, personal URLs, project names, and tone overlays | Exclude | They are private or local preferences, not portable method. |
| Styling and icon prompts | Treat as optional product-design assets | They do not establish behavioral quality and should be separated from the operating procedure. |

## Operating rules for all four skills

1. Inventory the artifacts before asking for information or drafting instructions.
2. Convert each useful chain step into a named procedure with input, output, exit gate, and recovery path.
3. Permit compression, deletion, and owner review. Retain provenance for anything promoted from an archive.
4. Never represent a chain status label, template variable, or prior prompt assertion as a platform fact.
5. Use the smallest change that addresses a measured failure, then re-run the affected checks.

## Relationship to the operating method

This is a source-specific distillation. [Custom GPT Operating Method](./CUSTOM-GPT-OPERATING-METHOD.md) remains the canonical end-to-end method. The four Agent Skills implement it at intake, building, conversion, and skill authoring stages.
