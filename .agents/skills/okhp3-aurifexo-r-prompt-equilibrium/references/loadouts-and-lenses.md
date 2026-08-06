# Aurifexo-R Loadouts and Lenses

## Loadout selection

| Loadout | Use when | Required output |
|---|---|---|
| `lean` | The task has one dominant constraint and low ambiguity | One primary finding, candidate result, validation note |
| `standard` | The task has normal multi-constraint tension | Logic, Tone, Structure, Completeness findings and synthesis |
| `deep` | Requirements conflict, stakes are elevated, or the user asks for a deep audit | Standard findings plus Research, Counterfactual, and Simulator |
| `audit` | The user asks for formal audit, readiness, or release review | Evidence inventory, conflict register, AntiPath, acceptance tests |

AgentZero-R chooses a loadout from task signals: complexity, ambiguity, sensitivity, format strictness, domain specificity, token budget, and false-consensus risk. It is optional. A user may override it. Always expose the reason for the choice.

## Lens contracts

| Lens | Input | Output | Exit criterion |
|---|---|---|---|
| Logic | Goal, requirements, constraints | Contradictions, dependencies, assumptions, feasibility notes | Every material requirement has a status |
| Tone | Audience, desired register, sensitivities | Tone risks and concrete adjustments | Register is explicit and audience-appropriate |
| Structure | Desired artifact and format | Ordered outline, hierarchy, format fixes | Candidate can be scanned and handed off |
| Completeness | Requirements and failure modes | Missing inputs, edge cases, acceptance checks | Known gaps are labeled, not silently filled |
| Research | Supplied references or verified tools | Supported, unverified, or unsupported claims | No claim lacks a status |
| Counterfactual | Candidate and assumptions | Conditions that would change the result | Fragile assumptions are visible |
| Simulator | Candidate workflow | Likely interaction and failure paths | Simulation is clearly labeled as hypothetical |
| Compressor | Draft and requirements | Shorter draft with preserved meaning | No requirement, caveat, decision, or test is lost |
| Router | Candidate and destination options | Next artifact and handoff route | The next reusable form is explicit |

## AntiPath-R contract

AntiPath-R is a conditional dissent procedure. It is not a permanent adversarial persona. Trigger it for a real omission, contradiction, elevated risk, ambiguity, suspicious consensus, or explicit user request. Each finding must include the concrete objection, affected requirement or assumption, evidence or reason, and repair or escalation.

## HarmonySynth contract

HarmonySynth compares lens findings with the original requirements. It must preserve disagreement and uncertainty. Its result is a candidate synthesis, not proof of correctness.
