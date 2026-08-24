# ReFolDec public graduation record

This document defines the release shelf prepared for review. It does not
publish this repository, change visibility, or authorize a deployment.

## Target surface and ownership

**Named target:** a separately owned public repository
`OKHP3/refoldec` (or an owner-approved successor with the same boundary).

**Current approval:** `OKHP3/refoldec` is explicitly approved by the repository
owner as the target surface, with the scope and dependency boundary recorded in
`examples/release-candidates/release-manifest.json`. The prepared package is
still kept in `examples/release-candidates/` only as a reviewable candidate;
that directory is not the public product and the FoundRy relay remains the
private host.

The target may contain only the ReFolDec specification, schemas, validator,
public examples, portable Agent Skill package, attribution, provenance,
version history, and review records. It may depend on public standards and
ordinary local tooling, but not on restricted workspace services, private
capture pages, client material, or employer material.

## Gate decision

**Decision: NO-GO for deployment.** The package is structurally prepared, human
source review is recorded, and the protected holdout has been reviewed by a
separate evaluator against the approved deterministic reference runtime. The
result is bounded to that local target, so the equilibrium decision remains
`defer-for-evidence`. ReFolDec is not being declared canonical, stable, or
production-ready.

## Review evidence

- `scripts/public-graduation-audit.py` checks package completeness, restricted
  references, public metadata, and deployment separation.
- `skill/tests/evals.json` includes development cases and metadata for an unseen
  protected holdout. The protected case is supplied separately by a maintainer;
  `holdout-evaluation.json` records only non-sensitive metadata and the case
  hash. No live-model or production performance is claimed.
- `equilibrium-decision.md` records evidence tiers, limitations, and dissent.
- `release-checklist.md` records the owner actions required before deployment.

## Owner approval record

| Decision | Owner | Date | Status |
| --- | --- | --- | --- |
| Approve `OKHP3/refoldec` as the public artifact surface | Repository owner | 2026-08-22 | Approved |

This approval names the target surface only; it does not authorize deployment.
The remaining review gates and the separate deployment action must still pass.