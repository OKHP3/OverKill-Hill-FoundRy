# Data-Ledger Distillation

This document preserves the durable lessons from the historical `dataledgers/` and `_dataledgers/` source areas. The original ledgers were an early attempt to preserve valuable thread outcomes and carry them across context boundaries. They are not a specification for Custom GPT memory, automatic file mutation, or hidden shared state.

## Evidence boundary

| Claim | Classification | Basis |
| --- | --- | --- |
| The source corpus contained 41 usable artifacts: 22 Markdown files, 16 text files, two Word files, and one YAML file. | Verified corpus fact | Controlled extraction run, 2026-07-20. |
| The source evolved from v1 text templates to v3 Markdown-ledger families, with separate ideation, processing, narrative, registry, archive, and hydration concepts. | Verified corpus fact | `past-versions/`, v3 files, and the source README. |
| The concept originated circa 2024 and predates the owner's Custom GPT work. | Owner statement | The local artifacts inspected for this distillation are dated 2025 or later, so they do not independently establish the 2024 origin. |
| The original aim was to distill a thread into valuable portable material and intentionally reintroduce it into later work. | Source-derived practice | V1 processing templates, hydration file, and ideation corpus. |
| A Custom GPT has a persistent, writable memory layer because it can read uploaded knowledge. | False model | Current official documentation describes knowledge as uploaded reference material, not as a GPT-managed write store. |
| A handoff capsule improves cross-thread continuity. | Theory | It is plausible and worth testing, but the corpus contains no controlled comparison. |

## Current platform boundary

Custom GPT knowledge files are source material for a conversation, while instructions define behavior. The current GPT editor documentation describes up to 20 attached files, but OpenAI's File Uploads FAQ currently gives a conflicting limit of 10 files per GPT lifetime. Treat file count and size as volatile, verify the Builder UI and current official documentation before release, and do not design the method around a fixed number. [Creating and editing GPTs](https://help.openai.com/en/articles/8554397-creating-and-editing-gpts) · [File Uploads FAQ](https://help.openai.com/en/articles/8555545-file-uploads-faq/)

Code Interpreter and Data Analysis can create downloadable chat outputs when enabled, but that is not a durable record system. Persistent updates need an explicit external authority, such as a repository, database, or intentionally designed Action. Custom Actions connect a GPT to an external API and therefore require an explicit schema, authentication, data boundary, and test plan. [Data analysis with ChatGPT](https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt) · [Configuring actions in GPTs](https://help.openai.com/en/articles/9442513)

## Distilled method: the thread-transition capsule

Replace the multi-ledger runtime claim with a small, inspectable artifact that is written outside the chat by an authorized person, repository workflow, or verified integration.

| Field | Meaning | Required check |
| --- | --- | --- |
| Scope and source | Project, task, source conversation or artifact identifiers, and capture time | Source is accessible to the intended owner or explicitly unavailable. |
| Decisions | Confirmed choices and their rationale | Each decision has an owner and status. |
| Open work | Questions, risks, next action, and acceptance condition | A later user can resume without inventing the missing step. |
| Lifecycle | `active`, `experimental`, `retired`, or `unknown`, plus review date | A downstream user knows whether a record is guidance, a hypothesis, or history. |
| Working context | Only the facts, constraints, terminology, and examples needed next | Sensitive or stale material is removed or labeled. |
| Artifact delta | What changed, what was rejected, and what remains unverified | A reviewer can compare it to the preceding capsule. |
| Provenance | Source links or file paths, version, author, review date, and checksum when actually computed | Claims remain traceable and conflicts remain visible. |

### Dehydrate

1. Identify the next task and its audience.
2. Extract confirmed decisions, unresolved questions, constraints, sources, and test evidence.
3. Remove raw transcript bulk, duplicate phrasing, personal data not needed for the next task, and unsupported model claims.
4. Mark every remaining claim as confirmed, inferred, theory, preference, or unknown.
5. Save the capsule in the external system of record and record the owner and version.

### Hydrate

1. Deliberately provide the capsule to the next conversation, project, tool, or workflow.
2. Check source freshness, conflicts, permissions, and user intent before relying on it.
3. State the carried assumptions and ask only for gaps that affect the outcome.
4. Use the capsule as reference context, not as an instruction hierarchy or proof of platform capability.
5. At the next transition, create a new capsule with a visible delta rather than overwriting history invisibly.

## Source-ledger mapping

| Historical ledger role | Durable destination | Do not preserve |
| --- | --- | --- |
| Ideation and riff capture | Backlog or research notes with promotion criteria | Automatic promotion into production instructions. |
| Processing and debug logs | Task log, experiment record, or branch-local scratch artifact | Claims that a GPT autonomously committed the log. |
| Narrative and persona | Versioned style guide or domain reference | Treating tone material as runtime memory. |
| Registry | Manifest or catalog with ownership and status | Symbolic status labels as proof of delivery. |
| Parameters and system schemas | Testable procedure, specification, or skill reference | Hidden toggles, invented capabilities, or irreversible locks. |
| Archive and lineage | Version history or decision log | Using archived content without a review and promotion decision. |
| Hydration | Thread-transition capsule | Full-session restoration or unverified continuity claims. |

## Integration with Custom GPT practice

- Keep a Custom GPT's instructions focused on stable behavior, boundaries, and a short handoff policy.
- Use knowledge files for curated reference material only. Do not upload an unbounded ledger or raw thread archive and expect reliable recall.
- Use a versioned repository artifact as the source of truth for transition capsules. Upload or paste only the capsule needed for the current task.
- If a workflow needs persistent writes, specify the external system, authorization model, exact write trigger, confirmation rule, failure path, and audit record. Do not imply that a knowledge file is writable by the GPT.
- Test continuity with a two-thread evaluation: create a capsule in the first thread, start a new thread with only that capsule, and verify the next task can proceed without invented facts or lost boundaries.

## What is preserved and what is retired

Preserve the core insight: valuable work should be distilled, attributed, portable, and reviewable across transitions. Retire the claims that a Custom GPT automatically reads, writes, commits, seals, or reanimates a ledger; that a file is executable state; or that a fixed, canonical ledger taxonomy fits every project.

The word **hydration** remains useful as a metaphor for deliberate context restoration. It does not describe automatic session restoration, long-term memory, or a platform guarantee.
