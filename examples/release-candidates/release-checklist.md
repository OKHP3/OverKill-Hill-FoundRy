# Release checklist

Deployment is a separate, explicit action. Do not run a Pages or repository
visibility change as part of this checklist.

- [x] Owner explicitly approves `OKHP3/refoldec` (or records an approved successor).
- [ ] Owner, scope, and allowed dependencies are recorded in
  `release-manifest.json`.
- [x] Public README, specification, schema, examples, validator, skill,
  evaluations, provenance, attribution, changelog, and version are present.
- [x] Source audit passes with no restricted references.
- [x] Package preflight passes on the public example.
- [x] Human source, license, privacy, and conflict review is signed and dated
  in `provenance.json` by Jamie OverKill Hill on 2026-08-21.
- [x] Protected holdout was reviewed by a separate evaluator against the
  deterministic reference runtime; the result is recorded as a bounded pass in
  `holdout-evaluation.md`, with no live-model or production behavior claim.
- [ ] Equilibrium decision is updated from defer to an owner-approved decision.
- [ ] Only after all gates pass: separately authorize deployment.
