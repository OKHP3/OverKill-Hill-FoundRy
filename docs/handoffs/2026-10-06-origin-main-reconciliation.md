# Origin main save and reconciliation - October 6, 2026

The owner requested that all session changes be saved and committed to origin
main. A fresh inventory found the primary Windows checkout clean at
`b267575f77226abcefc704062d893545da35e432`, equal to freshly fetched
`origin/main` with zero ahead/behind. The integration checkout was clean, and its
previous head `9c532ea632173e3159f7017cadba36119d3fccad` was already incorporated
through [PR63](https://github.com/OKHP3/overkill-hill-foundry/pull/63).

All managed worktrees and prepared series clones were inventoried before any
mutation. Two stopped worker checkouts held historical uncommitted drafts. Their
exact file scopes were checked, committed on new recovery branches and pushed
without resetting, deleting, rebasing or force-pushing either history.

| Preserved work | Recovery branch | Recovery commit | Production disposition |
| --- | --- | --- | --- |
| A02: earlier library, page and concurrency-test draft | `recovery/foundry-stopped-a02-20261006` | [0e9593b421facfb8ca19070f4304e3a110699d94](https://github.com/OKHP3/overkill-hill-foundry/commit/0e9593b421facfb8ca19070f4304e3a110699d94) | Superseded by the reviewed concurrency implementation in PR59 and subsequent import/raw-recovery corrections. This snapshot has no new runtime certification. |
| A25: dependency-review draft and worker receipt | `recovery/foundry-stopped-a25-20261006` | [7daaa97f6cca9e6a32429203a79330f38902d9ef](https://github.com/OKHP3/overkill-hill-foundry/commit/7daaa97f6cca9e6a32429203a79330f38902d9ef) | Both draft texts are already present on main, followed by coordinator verification addenda. The current main report retains that additional evidence. |

A02's snapshot is based on `cdc8397b643821bcd2eaa5fc32a065e19cc01f2f`;
A25's is based on `6a9eac55365558612aaf1472393efc539f5a6005`. Both affected
checkouts were clean after their recovery commits. The other inventoried
checkouts were already clean. Generated caches, disposable traces and private
coordinator proof files remain preserved in their ignored locations.

The only new production change from this reconciliation is this durable receipt.
Application source, the 28-duty execution ledger and its explicit human,
authentication, independent-custody and capability-publication gates are retained.
No dependency upgrade or deferred product feature is adopted by this save request.

The integration owner runs the repository governance entry point, filename dry
run and whitespace checks, then publishes this receipt through normal protected
PR checks. The actual resulting merge, deployment and per-surface receipts are
resolved from that PR and the existing project record; no future SHA is invented
in this self-published document. Source parity and connector authentication remain
separate observations.
