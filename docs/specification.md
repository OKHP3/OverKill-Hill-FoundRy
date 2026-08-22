# ReFolDec Specification

**Status:** v0.1 FoundRy-hosted private scaffold; public release not yet graduated
**Name:** ReFolDec — Recursively Folding Codec  
**Purpose:** bidirectional process-capture and transformation framework

---

## Repository relationship and visibility

OverKill Hill FoundRy is the primary identity of the repository that hosts this specification. It is a private governance relay. ReFolDec is a FoundRy-hosted capability and prospective public artifact, not an alternate name for the relay.

ReFolDec material can be prepared here while private. A public ReFolDec release must be published through a separately approved artifact surface after the FoundRy graduation checks; it must not include private FoundRy, Notion, client, or employer material.

---

## 1. Definition

ReFolDec is a framework for transforming artifacts across maturity states.

It has three primary operations:

1. **Fold** — move raw or weakly structured material into a more structured, useful, durable artifact.
2. **Unfold** — decompose a mature artifact into source primitives, patterns, assumptions, dependencies, and reusable instructions.
3. **Refold** — recombine the improved primitives into a stronger artifact, process, model, or agent-facing instruction package.

---

## 2. Artifact maturity ladder

A ReFolDec artifact may move across this ladder:

```text
signal → thought → note → concept → outline → process → artifact → system → canon
```

The ladder is not strictly linear. Artifacts can jump levels, loop backward, fork, merge, or be intentionally inverted.

---

## 3. Executable artifact contract

The executable minimum contract is implemented by
`scripts/refoldec-validate.py` and described by
`schemas/refoldec-artifact-schema.json`. Run it against one or more files or
directories:

```bash
python3 scripts/refoldec-validate.py examples/refoldec-fixtures/valid
```

The validator accepts JSON, YAML, and Markdown with YAML front matter. It
fails with actionable `FAIL <path>: <reason>` messages; it never modifies
source material or invents missing provenance.

Every artifact must identify:

- `id` — stable artifact identifier;
- `title` — human-readable name;
- `artifact_type` — signal, thought, note, concept, outline, process, artifact, system, canon;
- `maturity_state` — raw, captured, structured, modeled, validated, published, canonical;
- `source_context` — where the artifact came from;
- `folded_outputs` — artifacts produced from this artifact;
- `unfolded_primitives` — primitives extracted from this artifact;
- `reuse_targets` — ways this artifact can be reused.
- `lineage` — `source_ids`, `folded_output_ids`, and
  `unfolded_primitive_ids`; the latter two must mirror the corresponding
  top-level arrays;
- `publication` — `visibility`, `source_access`, and `approved_surface`;
- `freshness` — `current`, `stale`, or `unknown`;
- `evidence` — arrays of field names classified as `confirmed`, `inferred`,
  or `unknown`.

IDs are lowercase kebab-case and must be unique within a validation run.
Lineage references must resolve to artifacts in that run. Folded outputs and
unfolded primitives must point back to their source through
`lineage.source_ids`, proving that both directions remain connected.

An artifact marked `published` or `canonical` must be public. Public artifacts
must declare `source_access: public` and `approved_surface: true`; a private
or mixed source is therefore a hard failure, even if a public link is present.
Stale artifacts fail validation. Unknown evidence is reported as unknown and
is not silently promoted to confirmed.

The contract is deliberately not a general-purpose YAML parser or workflow
engine. The validator checks structural metadata and declared relationships,
not whether a claim is true, whether a source is legally publishable, or
whether a privacy/security review is adequate. Those reviews remain required.

For process work, `schemas/refoldec-process-capture-schema.json` and
`templates/refoldec-capture-record.yaml` define the canonical capture record.
Its executable checks preserve source references, stable `act-NNN`/`gw-NNN`/
`evt-NNN` step identifiers, confidence, unresolved ambiguity, rejected
material, and the human confirmation gate. See
`docs/refoldec-capture-pipeline.md` for Fold, Unfold, Refold, and recovery
instructions.

---

## 4. Relationship to xME/xIE

ReFolDec generalizes xME/xIE.

| Earlier term | ReFolDec mapping |
|---|---|
| xME | Fold operation; maturation upward |
| xIE | Unfold operation; inversion downward |
| xMIE | Full bidirectional engine |
| ReFolDec | Productized codec and operating framework |

---

## 5. Relationship to process capture

ReFolDec is especially useful when the artifact is a process.

A process can be captured as raw notes, matured into structured documentation, rendered as a diagram, linked to source pages, packaged as an Agent Skill, and later unfolded into reusable primitives.

---

## 6. Relationship to Agent Skills

Agent Skills are a natural publication target for ReFolDec.

A mature process may be refolded into:

```text
SKILL.md + references + scripts + assets + tests
```

This turns human process knowledge into reusable non-human operating instructions.

---

## 7. Relationship to Notion and GitHub

ReFolDec uses separate persistence planes:

- **Notion:** private capture and synthesis plane.
- **FoundRy:** private governance and development relay.
- **Approved public artifact surface:** public, versioned ReFolDec publication plane after graduation.

Public ReFolDec artifacts should not depend on private Notion pages or private FoundRy sources.

---

## 8. Non-goals

ReFolDec does not attempt to formalize every thought. It is for thoughts, processes, and artifacts that merit capture, reuse, publication, or operationalization.
