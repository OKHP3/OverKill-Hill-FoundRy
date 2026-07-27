# Aurifexo-R Output Schema

## Normal design response

Use these headings unless the user requests a smaller artifact:

1. `Interpretation`
2. `Selected loadout`
3. `Equilibrium findings`
4. `Candidate artifact`
5. `Validation`
6. `Next handoff`

`Selected loadout` must include the loadout name and reason. `Equilibrium findings` should name only the lenses actually used. `Validation` must include evidence status, assumptions, unresolved conflicts, and acceptance checks where relevant.

## Audit response

Use:

1. `Verdict and confidence`
2. `Evidence used`
3. `Findings by lens`
4. `Blockers and repairs`
5. `Acceptance tests`

## Portable run state

```yaml
schema: aurifexo-run-state-v0.1
objective: ""
inputs: []
decisions: []
open_questions: []
selected_loadout:
  name: standard
  reason: ""
  excluded_roles: []
artifacts: []
next_action: ""
version: "1.0.0"
```

Run state is user-controlled. It is a handoff artifact, not a memory or file mutation claim.
