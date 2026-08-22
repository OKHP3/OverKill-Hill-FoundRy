# ReFolDec Capture Pipeline

This is the executable operating guide for capturing a repeatable process without
turning guesses into facts. The canonical record is
`schemas/refoldec-process-capture-schema.json`; start from
`templates/refoldec-capture-record.yaml`.

## Entry criteria

Start a capture when a repeatable activity, a raw idea about one, or a mature
artifact needs to be made recoverable. Before importing material, record its
source boundary and access level. Private Notion, client, and employer material
stays private unless an approved connector and boundary review explicitly allow
otherwise. If the source is not available, capture the gap rather than
reconstructing it from memory.

## Fold — capture and structure

1. Record `source_context`, the process boundary, actors, trigger, inputs, and
   outputs.
2. Extract the happy path as single imperative actions. Use `act-NNN` for
   activities, `gw-NNN` for decisions, and `evt-NNN` for events. Once assigned,
   an identifier survives reordering and revision.
3. Add entry and exit criteria, systems, controls, exceptions, and evidence
   references to every step that depends on a claim.
4. Classify each claim as high, medium, low, or unknown confidence. Put
   unresolved questions in `ambiguities`; do not put them in prose where they
   can disappear.

## Unfold — audit a mature artifact

Decompose the artifact into source claims, assumptions, dependencies, patterns,
and reusable primitives. Every output records `input_ids`, `output_ids`, and
`preserved_provenance: true` only when the source relationship is retained.
Evidence that does not survive review goes in `rejected_material` with a reason
and a recovery action. A diagram is a view over the capture record, not proof
that the process is correct.

## Refold — produce reusable outputs

Refold only from confirmed or explicitly marked inferred primitives. A normal
refold can produce three separate views: structured documentation, a
model-ready representation, and reusable primitives or an Agent Skill seed.
Each appears under `transformations.derived_outputs` with its source IDs and
review status. The downstream Agent Skill packaging task owns full skill
authoring; this pipeline only proves the provenance-bearing handoff.

## Exit gates

| Gate | Required evidence | Result |
|---|---|---|
| Structured | Required sections exist; stable IDs are unique; source boundary is recorded | `capture_status: structured` |
| Reviewed | Exceptions, decisions, controls, ambiguities, and rejected material have owners or next actions | `capture_status: reviewed` |
| Human confirmation | A subject-matter expert confirms the current-state record and its stated boundary | `confirmation_gate.status: confirmed` and `capture_status: confirmed` |
| Reusable/public | Confirmation plus provenance and publication/privacy review; no unresolved blocker | A derived output may be reused or separately graduated |

No diagram, structured document, or reusable output is treated as correct merely
because it validates structurally. Confirmation is a human gate.

## Recovery routes

- `clarify`: ask the targeted question in `ambiguities`, then revise the same
  capture while preserving its ID history.
- `re-capture`: restart from the source when the sequence or boundary is wrong.
- `review-source`: inspect a cited document, observation, or artifact again.
- `restore-prior-capture`: return to the last known-good record when a refold
  loses provenance or introduces unsupported claims.
- `stop`: stop publication/reuse when access, consent, or evidence cannot be
  established.

Rejected evidence is never deleted to make a gate pass. A later capture may
resolve it and reference the original evidence ID.

## Validation

Run:

```bash
python3 scripts/refoldec-capture-validate.py examples/refoldec-capture
python3 scripts/refoldec-validate.py examples/refoldec-fixtures/valid
python3 tests/test-refoldec-capture.py
```

The capture validator checks required sections, stable IDs, evidence references,
provenance-preserving transformations, and the confirmation gate. It does not
claim that a human's process description is true.