# ReFolDec 0.1.0 release candidate

This is a self-contained review package for ReFolDec, the Recursively Folding
Codec. It describes a framework for moving material from a less structured
state into a more useful artifact, decomposing mature artifacts into reusable
primitives, and recombining those primitives.

## Maturity and boundary

This candidate is **validated for structural review only**. It is not a
canonical or stable release, and it makes no claim of production readiness.
It can be understood from the files in this directory and does not require
access to a restricted workspace, a capture service, or an unpublished
repository.

The proposed publication destination is recorded in `release-manifest.json`.
Deployment is intentionally a separate action and is disabled in this
candidate.

## Package map

- `specification.md` — public concept and contract
- `schema.json` — machine-readable artifact shape
- `validator/` — dependency-free release preflight
- `examples/` — synthetic public example
- `examples/public-process-capture.json` — confirmed public capture used for the skill package lineage
- `skill/` — portable Agent Skill and evaluation package
- `provenance.json` — source lineage and review evidence
- `equilibrium-decision.md` — independent review and limitations
- `release-checklist.md` and `rollback-plan.md` — owner gate and recovery

Run the source audit from the repository root:

```bash
python3 scripts/public-graduation-audit.py examples/release-candidates
```

Run the package preflight:

```bash
python3 examples/release-candidates/validator/refoldec-validate.py \
  examples/release-candidates/examples/public-process.json
```

## License

The package is provided under Apache License 2.0; see `LICENSE` and
`ATTRIBUTION.md`.