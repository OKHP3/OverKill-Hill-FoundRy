# ReFolDec Specification

**Status:** v0.1 scaffold  
**Name:** ReFolDec — Recursively Folding Codec  
**Purpose:** bidirectional process-capture and transformation framework

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

## 3. Minimum artifact fields

A ReFolDec-compatible artifact should identify:

- `id` — stable artifact identifier;
- `title` — human-readable name;
- `artifact_type` — signal, thought, note, concept, outline, process, artifact, system, canon;
- `maturity_state` — raw, captured, structured, modeled, validated, published, canonical;
- `source_context` — where the artifact came from;
- `folded_outputs` — artifacts produced from this artifact;
- `unfolded_primitives` — primitives extracted from this artifact;
- `reuse_targets` — ways this artifact can be reused.

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

ReFolDec treats Notion and GitHub as separate persistence planes:

- **Notion:** private capture and synthesis plane.
- **GitHub:** public, versioned artifact plane.

Public GitHub files should not depend on private Notion pages.

---

## 8. Non-goals

ReFolDec does not attempt to formalize every thought. It is for thoughts, processes, and artifacts that merit capture, reuse, publication, or operationalization.
