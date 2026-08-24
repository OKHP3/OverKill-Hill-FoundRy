# Equilibrium decision

**Decision:** defer-for-evidence; do not deploy.

## Evidence ledger

- **Confirmed:** the candidate is self-contained; required files are present;
  the synthetic example passes the package preflight; deployment is manual and
  disabled.
- **Inferred:** the fold/unfold/refold framing may transfer to other domains.
- **Unknown:** usability across hosts, performance, accessibility of generated
  outputs, legal status of future contributions, and live-model holdout behavior.

## Independent challenge

The strongest challenge is that structural completeness can look like product
readiness. The package rejects that interpretation: it labels itself a
candidate, keeps owner approval pending, and protects an unseen evaluation
case. The validator cannot detect every privacy or licensing issue, so human
review remains blocking.

## Limits

No benchmark, user study, legal opinion, or live model evaluation is claimed.
The protected holdout was reviewed by a separate evaluator against a recorded
`0.1.0` package snapshot. The deterministic reference runtime passed each
declared expectation, but the current package hash differs from the evaluated
hash. This historical result is bounded evidence for that snapshot only; the
current package requires a fresh holdout evaluation before approval. The
package still contains portable instructions and no live model or host
integration was executed.
The exact record is `holdout-evaluation.md`; the protected prompt and
expectations are intentionally not present in that record.

The package validator, source example validator, and public-graduation audit
pass. The historical reference-runtime holdout pass is retained, while the
current-package holdout gate remains open. The structural-versus-behavioral
limitation remains explicit because the adapter is not a live model or host
integration.

The release decision remains `defer-for-evidence`. No current-package
behavioral, reliability, outcome, or production-readiness claim is justified by
this run.