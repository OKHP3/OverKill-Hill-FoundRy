# Process map: Synthetic evidence-linked review

Source capture: `public-example-001`

Trigger: A supplied artifact needs an evidence-linked review.

## Steps
1. **act-001** (activity, actor-reviewer): Capture the supplied artifact and preserve its source identifiers.
   - Entry: The artifact is supplied.
   - Exit: The artifact has a stable identity and evidence references.
   - Evidence: evidence-public-example
1. **gw-001** (gateway, actor-reviewer): Determine whether the evidence supports the requested review.
   - Entry: The artifact and evidence references are captured.
   - Exit: The review is either documented or blocked with a recovery route.
   - Evidence: evidence-public-example

## Decisions
- **gw-001** Is the required evidence available and permitted for this review? Outcomes: review, blocked. Rule: Review only supported material; otherwise return blocked and identify the missing evidence.

## Exceptions
- When **Required evidence or permission is missing**, return blocked, record the unresolved item, and request clarification or source review (owner: actor-initiator).

## Evidence boundary
Do not promote unresolved or rejected evidence to a confirmed rule.

- `evidence-public-example` (accepted): A bounded evidence-linked review can preserve identifiers and stop when support is missing.