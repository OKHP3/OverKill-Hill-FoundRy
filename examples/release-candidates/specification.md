# ReFolDec specification 0.1.0

## Definition

ReFolDec is a bidirectional framework for transforming artifacts across
maturity states:

1. **Fold** structures raw or weakly structured material into a durable
   artifact.
2. **Unfold** decomposes a mature artifact into source primitives, patterns,
   assumptions, dependencies, and reusable instructions.
3. **Refold** recombines selected primitives into a stronger artifact.

## Minimum artifact contract

An artifact identifies a stable `id`, title, artifact type, maturity state,
source context, folded outputs, unfolded primitives, reuse targets, lineage,
publication metadata, freshness, and evidence classification. Lineage must
resolve within the validation run. Published artifacts must have public source
access and an approved surface.

The contract is structural. It does not prove that a claim is true, that a
source may legally be redistributed, or that a privacy review is adequate.
Those are separate human gates.

## Maturity ladder

`signal → thought → note → concept → outline → process → artifact → system → canon`

The ladder permits forks, merges, loops, and deliberate backward movement.

## Non-goals

ReFolDec does not formalize every thought, replace subject-matter review,
authorize system writes, or turn an uncertain source into a confirmed claim.