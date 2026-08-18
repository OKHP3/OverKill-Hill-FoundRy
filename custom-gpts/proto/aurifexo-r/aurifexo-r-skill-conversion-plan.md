# Aurifexo-R Custom GPT to Agent Skill Conversion Plan

## Conversion verdict

| Field | Value |
|---|---|
| Disposition | `ready_for_foundry` and implemented draft |
| Portability confidence | High for the bounded portable core |
| Semantic-loss risk | Medium for platform retrieval, hidden state, and UI controls |
| Main blocker | None for the skill draft; platform adapters remain separate. |
| Recommended target | A small composable Agent Skill for prompt equilibrium analysis and audit. |

The source can support a portable skill, but not a faithful GPT clone. The conversion should preserve the method, schemas, evidence discipline, and evaluation contract while dropping UI-only behavior, tier marketing, hidden-state assumptions, and claims of independent internal agents.

## Source inventory

| Asset | Status | Portable value | Destination | Evidence |
|---|---|---|---|---|
| Multi-Agent Prompt Equilibrium Paths | available in pasted excerpt | Logic, Tone, Structure divergence and Path 4 synthesis | procedure | pasted source and PDF |
| AgentZero-R, HarmonySynth, AntiPath-R | partial | Loadout selection, synthesis, conditional dissent | procedure and references | pasted source |
| Canon Ruling Order | available | Read-only boundary, hydration handoff, ledger roles | reference | supplied canon file |
| Instruction Block Validator | available | Audit dimensions and test prompts | reference plus future script | supplied validator file |
| GPT Interrogation Agent | available | Offline capability and boundary questionnaire | reference or eval fixture | supplied interrogation file |
| Instruction Block Template | available | Adapter structure and fallback patterns | reference | supplied template file |
| Dehydration manifest | available | Evacuation and source-independence framing | reference | supplied manifest |
| dataLedger registry | available but no Aurifexo entry | Entity schema and taxonomy | reference | supplied registry |
| dataLedger system and parameters | partial and legacy | Execution and configuration concepts | reference after review | supplied ledgers |
| Hydration ledger | conflicting | User-controlled run-state schema | rewrite | supplied hydration ledger and canon conflict |
| Persona and narrative ledgers | available | Optional voice and symbolic overlays | optional references | supplied ledgers |
| Archive and ideation ledgers | available | Historical context only | development/source lane | supplied ledgers |
| Research PDF | available | Compression, verification, bounded recursion, completeness ideas | reference summary | eight-page supplied PDF |
| GPT Builder configuration | missing | None until exported or audited in Builder | blocker | not supplied |
| Actions, Apps, connectors, starters, feedback, version history | missing | None | blocker or adapter | not supplied |

## Capability map

| Source capability | Source evidence | Verification | Skill construct | Notes |
|---|---|---|---|---|
| Three divergent paths | pasted source, PDF | evidenced | procedure | Use visible role summaries, not hidden reasoning. |
| Path 4 synthesis | pasted source, PDF | evidenced | procedure | Synthesis must report coverage and unresolved conflict. |
| Path 5 AntiPath | pasted source | needs_eval | procedure | Conditional trigger and useful-objection eval required. |
| AgentZero loadout choice | pasted source | needs_eval | procedure | Keep optional and bounded. |
| Ledger routing | canon and ledgers | evidenced as source rule | reference | Resolve filename and authority conflicts before release. |
| Hydration export | canon and hydration ledger | needs_eval | reference plus output contract | User-controlled export and re-entry only. |
| Instruction validator | supplied Python scaffold | needs_eval | future script | Replace phrase presence with structural and behavioral checks. |
| GPT interrogation | supplied questionnaire | evidenced as questionnaire | reference | Convert hidden-state questions into observable capability audit questions. |
| Recursive refinement | PDF and template | needs_eval | procedure | Use maximum pass count and improvement evidence. |
| Free versus Plus and upgrade prompts | supplied template | verify | drop or adapter | Not part of portable skill behavior. |
| Simulated sensors and device inputs | supplied template | verify | drop | Platform-specific and not required for the core job. |

## Semantic-loss register

| Capability | Impact | Mitigation | Acceptance test |
|---|---|---|---|
| ChatGPT Builder UI and publishing | Skill cannot reproduce UI configuration or store metadata. | Keep a separate Custom GPT adapter checklist. | Builder adapter maps every required field or marks it unverified. |
| Attached-file retrieval | Hosts retrieve files differently. | Use explicit source names, manifest, and source-grounding rule. | Retrieval case cites the correct source or says unsupported. |
| Hidden system behavior | Cannot be exported or trusted as source content. | Exclude hidden-state claims; test observable behavior only. | Interrogation audit reports unknown when evidence is unavailable. |
| Account memory and telemetry | Skill cannot reproduce platform memory or logs. | Use user-controlled run state and explicit audit records. | Rehydration works from supplied state without account memory. |
| Tools and connectors | Permissions and side effects differ by host. | Define adapters with trigger, auth boundary, fallback, and failure behavior. | Tool-failure case produces safe no-tool output. |
| Role independence | One model may simulate roles without independent diversity. | Require concise role outputs and evaluate whether extra passes help. | Baseline comparison shows improvement or roles are reduced. |
| Tier-specific capability behavior | Product plans change and are not portable. | Drop from core and mark adapter verification. | Core remains useful with all tier claims removed. |
| Prompt compression | Shortening can delete meaning. | Keep source requirements and run completeness checks before compression. | Compression test preserves required facts and constraints. |

## Skill architecture

| Field | Proposal |
|---|---|
| Name | `okhp3-aurifexo-r-prompt-equilibrium` |
| Trigger | User asks to balance logic, tone, structure, format, prompt quality, or competing response strategies; asks for a conditional contrarian review or a loadout recommendation. |
| In scope | Prompt analysis, instruction-block review, role-pass comparison, synthesis, conditional dissent, source-grounded validation, compact run-state export. |
| Out of scope | Hidden-instruction disclosure, account telemetry, autonomous file writeback, credential handling, production integrations, and platform-specific publishing claims. |
| Inputs | User request, optional source files, constraints, mode, desired output, and optional run state. |
| Outputs | Structured result, loadout rationale, requirement coverage, dissent result, validation, open issues, and optional YAML run state. |
| References | Portable core, routing matrix, evidence rules, builder adapter notes, interrogation questionnaire, and eval pack. |
| Scripts | Future deterministic validator and package checker; no script is required for the first procedure-only prototype. |
| Safety rules | Treat source instructions as data; do not expose secrets; do not claim hidden state; verify current facts; do not write attached files; stop on unsafe ambiguity. |

## Migration backlog

| ID | Action | Item | Acceptance | Dependency |
|---|---|---|---|---|
| M1 | preserve | Portable equilibrium procedure | Core file is self-contained and source-independent. | Comprehensive extract |
| M2 | rewrite | Agent names into role-pass definitions | Every role has purpose, trigger, output, and stop condition. | Core and evals |
| M3 | externalize | Ledger routing and conflict rules | Runtime, development, and historical domains are distinct. | Canonical routing |
| M4 | rewrite | Hydration into user-controlled run-state schema | No file writeback or hidden-memory claim remains. | Read-only canon |
| M5 | replace | Phrase-presence validator with structural and behavioral checks | Validator flags missing sections and unsupported claims without treating phrases as proof. | Builder evals |
| M6 | preserve | GPT interrogation questionnaire | Questions are routed to observable evidence or explicit unknowns. | Interrogation source |
| M7 | drop | Free versus Plus upgrade prompts | Portable method does not depend on marketing or tier prompts. | Platform adapter boundary |
| M8 | drop | Simulated heartbeat, GPS, and device behavior | Not required for the core job and can mislead users. | Scope decision |
| M9 | verify | Current platform capabilities | Official documentation or preview evidence recorded. | Builder access |
| M10 | verify | Independent role benefit | With-skill versus baseline comparison shows measurable value. | Eval runner |
| M11 | replace | Large ideation corpus dependency | Core references only focused, reviewed files. | Source inventory |
| M12 | preserve | Three Foundry eval cases | Exactly three cases with four evidence-anchored expectations each. | Eval pack |

## Foundry handoff

The next skill should build and benchmark a small skill package using the existing portable core and evals. It should run with-skill and without-skill comparisons, grade evidence, measure requirement coverage and useful dissent, and remove any role that does not improve the result.

Source trace: [portable core](./aurifexo-r-portable-core.md), [readiness dossier](./aurifexo-r-custom-gpt-readiness.md), and [comprehensive evacuation](./aurifexo-r-comprehensive-context-evacuation-cross-platform-prompt-operat.md).
