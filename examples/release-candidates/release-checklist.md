# Release checklist

Deployment is a separate, explicit action. Do not run a Pages or repository
visibility change as part of this checklist.

- [ ] Owner explicitly approves `OKHP3/refoldec` (or records an approved successor).
- [ ] Owner, scope, and allowed dependencies are recorded in
  `release-manifest.json`.
- [x] Public README, specification, schema, examples, validator, skill,
  evaluations, provenance, attribution, changelog, and version are present.
- [x] Source audit passes with no restricted references.
- [x] Package preflight passes on the public example.
- [ ] Human source, license, privacy, and conflict review is signed and dated.
- [ ] Protected holdout is run by a separate evaluator and failures are recorded.
- [ ] Equilibrium decision is updated from defer to an owner-approved decision.
- [ ] Only after all gates pass: separately authorize deployment.