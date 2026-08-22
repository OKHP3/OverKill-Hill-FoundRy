# ReFolDec public graduation record

This document defines the release shelf prepared for review. It does not
publish this repository, change visibility, or authorize a deployment.

## Target surface and ownership

**Named target:** a separately owned public repository
`OKHP3/refoldec` (or an owner-approved successor with the same boundary).

**Current approval:** pending explicit owner approval. The prepared package is
kept in `examples/release-candidates/` only as a reviewable candidate; that
directory is not the public product and the FoundRy relay remains the private
host.

The target may contain only the ReFolDec specification, schemas, validator,
public examples, portable Agent Skill package, attribution, provenance,
version history, and review records. It may depend on public standards and
ordinary local tooling, but not on restricted workspace services, private
capture pages, client material, or employer material.

## Gate decision

**Decision: NO-GO for deployment.** The package is structurally prepared and
its source audit is designed to be repeatable, but owner approval of the named
target and a human release sign-off are still required. ReFolDec is not being
declared canonical, stable, or production-ready.

## Review evidence

- `scripts/public-graduation-audit.py` checks package completeness, restricted
  references, public metadata, and deployment separation.
- `skill/tests/evals.json` includes development cases and an unseen protected
  holdout. No holdout performance is claimed until a separate evaluator runs it.
- `equilibrium-decision.md` records evidence tiers, limitations, and dissent.
- `release-checklist.md` records the owner actions required before deployment.

## Owner approval record

| Decision | Owner | Date | Status |
| --- | --- | --- | --- |
| Approve `OKHP3/refoldec` as the public artifact surface | Repository owner | — | Pending |

An owner must update this record and the release manifest before any separate
deployment action.