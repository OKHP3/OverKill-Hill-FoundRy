# Custom GPT Operating Method

This is the single, source-aware method for creating a Custom GPT, maturing it through evidence, and converting its durable parts into an Agent Skill.

## 1. Recover evidence before design

Create an evidence ledger before asking the user to restate information. For every claimed requirement, capture:

| Field | Meaning |
| --- | --- |
| Claim | The requirement, behavior, constraint, or observation. |
| Classification | Verified platform fact, verified corpus fact, source-derived practice, theory, preference, inference, or unknown. |
| Source | File, conversation, official document, test result, or owner statement. |
| Status | Present, partial, conflicting, missing, or needs verification. |
| Consequence | The build, safety, or evaluation decision affected by the claim. |

Do not silently convert a preference into a requirement or a source claim into a platform fact.

## 2. Build a narrow product contract

Write a brief that fixes the primary user, job, desired outcomes, non-goals, allowed and disallowed data, tool permissions, safety boundaries, and observable acceptance tests. A concept is not build-ready while it lacks a primary job, an audience, a data boundary, a safety boundary, or a way to decide whether an output succeeded.

Then define the conversation contract:

- expected inputs and outputs;
- ranked tasks;
- questions that must be asked versus assumptions that may be labeled and carried forward;
- catastrophic mistakes and escalation routes;
- a source hierarchy for stable, current, user-provided, and unknown information.

## 3. Write an ordered behavior contract

Use this order unless the job gives a clear reason to change it:

1. identity, user, mission, and scope;
2. priority order and decision rules;
3. boundaries, refusals, and data handling;
4. dialogue and clarification policy;
5. knowledge-use policy;
6. tool-use policy, including triggers, confirmations, and failure fallback;
7. output contract;
8. concise examples that exercise difficult cases.

Resolve contradictions explicitly. For example, replace a pair of vague demands such as "be concise" and "be comprehensive" with an ordered rule that defines when depth wins and what a concise result contains. Add an instruction only to solve a named failure or meet an acceptance test.

## 4. Engineer knowledge for retrieval, not storage

Treat files as a retrieval corpus. Keep each source focused, current, named clearly, and traceable to an owner or version. Give each section a specific heading, one topic, a definition when needed, a rule or procedure, and an example or exception when ambiguity is likely.

Separate behavior rules from reference material. Put durable behavior in the instruction contract; put subject matter, procedures, examples, and evidence in knowledge files. Mark stale or disputed information. Test whether the assistant finds the correct source and applies it, rather than assuming that an upload proves grounding.

**Source-derived practice:** a Context, Rule, Example pattern can make a retrieved section easier to interpret. It is a writing pattern to test, not a platform guarantee.

### Preserve thread transitions explicitly

Treat a conversation handoff as a versioned capsule, not as automatic memory. A capsule should contain scope, source and provenance, confirmed decisions, open work, the minimum working context, artifact delta, and owner. At the next conversation, deliberately provide it, check freshness and conflicts, and record any new assumptions.

Knowledge files are reference material, not a durable GPT-managed write store. If persistent update behavior is required, define an external system of record and a verified integration with explicit authorization, write trigger, confirmation, failure handling, and audit trail. Do not represent generated chat files or a Custom GPT's knowledge attachments as persistent writeback.

## 5. Use the smallest capable tool surface

Enable a capability only when it changes the result materially. For every enabled tool or external connection, document:

- trigger and non-trigger conditions;
- the smallest permitted data payload;
- required user confirmation and any write boundary;
- expected failure behavior;
- a test for correct use and a test for non-use.

Do not use tool availability as a substitute for product design.

## 6. Mature through a measured change loop

Maintain a compact evaluation set that covers the primary job, a boundary, a knowledge-retrieval case, an ambiguity case, an adversarial or injection-like case, and a tool failure where relevant. Each test needs observable expectations, not aspirational language.

For every change:

1. state the failure or opportunity;
2. state the smallest proposed change and its hypothesis;
3. run the affected tests and regressions;
4. record the observed result, new failure modes, and rollback decision;
5. promote the change only when it improves the intended outcome without violating a guardrail.

### Use phase gates, not irreversible prompt chains

When the work is complex, split the lifecycle into small modules: intake, contract, configuration, challenge, release, and recovery. A module should name its required input, observable exit gate, and recovery route. Do not turn the modules into an inflexible sequence that forbids simplification, confirmation, or a return to earlier evidence. A completion label is a reviewable decision, not a permanent state.

**Source-derived practice:** phase gates make dependencies and missing artifacts visible. The performance benefit is a hypothesis until the build uses an evaluation that compares gated and ungated work.

### Theory: semantic-interference review

The corpus proposes that conflicting instructions, mixed-purpose context, uncontrolled retrieved text, and unsynchronized multi-step work can produce behavior drift. Treat this as a **theory to test**, not a diagnosis. Convert it into observable checks such as contradiction detection, required-field checks, source-conflict tests, and adversarial retrieval tests.

## 7. Convert behavior, not the Builder screen

When a Custom GPT has proven value, create a conversion dossier that maps each behavior to a portable construct:

| Custom GPT asset | Skill destination | Required conversion check |
| --- | --- | --- |
| Instructions | Imperative procedure and safety rules in `SKILL.md` | Preserve priority order and boundaries without UI language. |
| Knowledge files | Curated references or assets | Preserve provenance, ownership, and retrieval intent. |
| Thread-transition capsule | Versioned reference or handoff artifact | Preserve source, decisions, open work, and delta without promising memory transfer. |
| Conversation starters | Trigger examples and input contract | Verify they describe real activation conditions. |
| Capabilities | Tool policy, script, or explicit exclusion | Do not imply tool access exists in the new runtime. |
| Apps or Actions | Adapter design, script, or exclusion | Isolate authentication, permissions, and side effects. |
| Preview tests and feedback | Evals and regression cases | Retain failure modes, not only happy paths. |
| Sharing and Builder metadata | Release or governance documentation | Treat as platform-specific and nonportable. |

The conversion is complete only when semantic losses have a mitigation, explicit acceptance, or a documented drop decision.

## 8. Build the portable skill and measure its value

The Agent Skill should be smaller than the original Custom GPT configuration where possible. Its description must make the trigger clear; the body must provide an imperative procedure; deeper material belongs in references, scripts, or assets. Add three distinct evidence-anchored evals and compare performance with and without the skill. A portable package has earned its place when it produces a measurable, repeatable improvement rather than merely restating general model knowledge.
