# Executable FoundRy series - 2026-10-05

This series converts all 48 findings from the [five-pass review](../../reviews/2026-10-04-equilibrium-review.md) into 28 bounded worker assignments. Two of the owner's maximum 30 new-worker slots remain reserved for verified new work. The original review remains dated evidence; this [machine ledger](tasks.json) owns current assignment status. The coordinator is thread `01a1096a-9ad8-7011-9cc5-25c41ff67308`, the sole integration owner.

## Budgets and dispatch

The coordinator goal has the requested 20,000,000-token ceiling. Every worker starts with `gpt-6-luna`, effort `low`, a 15,000-50,000-token goal budget and an absolute ceiling of 2,000,000. These are ceilings, not spending targets. Spawn APIs have no token-quota field: workers must record the returned goal configuration and usage, or mark controls unavailable and stop at the soft bound. Account capacity is not reserved or purchased. The 28 planned worker budgets total 835,000 tokens; a future amendment must remain under each owner ceiling.

At most three workers run at once in this series. Dispatch only a ready dependency frontier, publish each claim, and wait for its exact acknowledgement. Independent writers use separate branches/worktrees. Shared application files are sequenced A02 -> A05 -> A06; A17-A20 can propose decisions but have no implementation file ownership. Root alone writes tasks.json, this README and the assignment index. Each worker alone writes its receipt until handback. Initial workers are A01, A02 and A03; A25 is independently ready for the next free slot. Unseen-task custody must happen before exemplar optimization, and human/authentication/private-fixture gates cannot be supplied by an agent's invented assumptions.

## Assignment index

| Agent task | Review findings | Duty | Initial gate | Goal budget | Launch prompt |
| --- | --- | --- | --- | ---: | --- |
| A01 | FND-01 | Current requirements ledger | ready | 20,000 | [a01](prompts/a01.md) |
| A02 | FND-02, FND-43 | Concurrent saves and immediate memory recovery | ready | 50,000 | [a02](prompts/a02.md) |
| A03 | FND-03, FND-21 | Clipboard rejection and controlled copy races | ready | 30,000 | [a03](prompts/a03.md) |
| A04 | FND-24, FND-47, FND-48 | Backup contract, original preservation and Windows commands | queued | 25,000 | [a04](prompts/a04.md) |
| A05 | FND-22, FND-45 | Stale import confirmation and current backup escape | queued | 40,000 | [a05](prompts/a05.md) |
| A06 | FND-44 | Exact malformed-source recovery export | queued | 30,000 | [a06](prompts/a06.md) |
| A07 | FND-25 | Transfer and rollback across actual browser origins | queued | 30,000 | [a07](prompts/a07.md) |
| A08 | FND-26 | Firefox and WebKit acceptance | queued | 25,000 | [a08](prompts/a08.md) |
| A09 | FND-27 | Keyboard and real assistive technology acceptance | external-gate | 20,000 | [a09](prompts/a09.md) |
| A10 | FND-06, FND-07, FND-08 | Existing-source selection, rights and import parity | external-gate | 40,000 | [a10](prompts/a10.md) |
| A11 | FND-04, FND-09, FND-46 | Build one source-safe intent-to-use exemplar | queued | 50,000 | [a11](prompts/a11.md) |
| A12 | FND-11, FND-32 | Recipient discovery and actual skill outcome | queued | 30,000 | [a12](prompts/a12.md) |
| A13 | FND-10, FND-12, FND-17 | Behavior preservation, hostile source boundary and references | queued | 40,000 | [a13](prompts/a13.md) |
| A14 | FND-14, FND-15, FND-16 | One adapter with least permissions and lifecycle receipts | conditional | 50,000 | [a14](prompts/a14.md) |
| A15 | FND-13, FND-18, FND-19 | Observed results, revision binding and stale invalidation | queued | 35,000 | [a15](prompts/a15.md) |
| A16 | FND-05 | Independent unseen-task custody and user acceptance | external-gate | 25,000 | [a16](prompts/a16.md) |
| A17 | FND-20 | Revision history decision and recoverable diff | conditional | 20,000 | [a17](prompts/a17.md) |
| A18 | FND-23 | Conflict-aware merge import decision | conditional | 20,000 | [a18](prompts/a18.md) |
| A19 | FND-28 | Structured contract decision | conditional | 15,000 | [a19](prompts/a19.md) |
| A20 | FND-29 | Canonical Skillz selection decision | conditional | 15,000 | [a20](prompts/a20.md) |
| A21 | FND-30 | Bounded external-agent handoff | queued | 20,000 | [a21](prompts/a21.md) |
| A22 | FND-31, FND-33 | Prompt and controlled workflow outcomes | queued | 35,000 | [a22](prompts/a22.md) |
| A23 | FND-34 | Useful bounded software starter outcome | queued | 30,000 | [a23](prompts/a23.md) |
| A24 | FND-35, FND-36 | Replit authentication and per-release surface receipts | external-gate | 20,000 | [a24](prompts/a24.md) |
| A25 | FND-37 | Separate dependency PR reviews | ready | 30,000 | [a25](prompts/a25.md) |
| A26 | FND-38, FND-39 | Protected ReFolDec evaluation and review-package operation | external-gate | 40,000 | [a26](prompts/a26.md) |
| A27 | FND-40 | ReFolDec release decision and permitted publication | external-gate | 30,000 | [a27](prompts/a27.md) |
| A28 | FND-41, FND-42 | Additional host and sibling adoption decisions | external-gate | 20,000 | [a28](prompts/a28.md) |

## Execution order and closure

Inspect coverage, token ceilings, active file ownership and the next manually approved frontier with:

```powershell
python scripts/agent-series-status.py
```

The command reads the ledger and never spawns agents or assumes a dependency has passed. Dispatch the reported prompt with its recorded model/effort, then record the returned thread ID in tasks.json. Current thread IDs and acknowledgement evidence are in that ledger; initial table gates above remain the dated dispatch plan.

1. Freeze requirements and repair the two reproduced defects. Preserve any pre-upgrade originals before applying app/schema changes to personal data. Synthetic fixtures may verify source behavior without accessing personal browser projects.
2. Freeze the current backup contract and run stale-import/raw-recovery work with one page/library writer at a time. Verify transfer on actual origins, then other browser engines and human assistive technology. An automation accessibility tree does not prove screen-reader speech.
3. Name an independent custodian and freeze unseen task/rubric before optimizing a source-safe exemplar. A11 builds a candidate; A12 discovers/runs it; A13 checks behavior/boundaries; A15 returns results to the saved revision. Those shared receipts close A11, FND-04 and FND-32 once; do not count them as multiple capabilities. A16's execution phase follows the frozen candidate, independent of its earlier custody phase.
4. Build an adapter only when the exemplar demonstrates need. Design permissions first, test denial/absence before side effects, then record install/use/removal. Optional history/merge/contract/catalog designs require adopt/defer decisions and scope amendments before implementation.
5. Trial prompt/workflow/software and external handoff outcomes after the exemplar. Handle dependency PRs separately. Maintain source, CI, Pages, Replit preview/connector and Notion receipts as separate claims for each actual release. Source parity does not prove connector authentication or browser-data transfer.
6. Protected ReFolDec work requires actual authorized fixture custody, exposure history and frozen hashes. Package leak-scan and behavioral evaluation are independent receipts. Capability publication and sibling mutations retain their explicit owner/surface gates.

Each task prompt supplies exact files, branch/base, findings, observable closure, exclusions, retry bound and required return. Status advances only on evidence: ready/queued/conditional/external-gate -> dispatched -> accepted -> in-progress -> ready-for-review -> integrated -> verified. A gate can remain pending without spawning an idle worker. A goal marked complete confirms that thread's duty, not every finding in the series.

## New work and economical escalation

For a discovered issue, root first records exact reproduction, affected acceptance criteria, source/candidate SHA, severity and evidence in tasks.json discoveries. Deduplicate against all 48 findings. Add it to an existing task only before ownership handback and with a published scope amendment; otherwise use A29/A30 with exclusive files and explicit prerequisites. Do not spawn beyond 30 total new workers. Reuse a completed thread for a follow-up within its duty. After two failed attempts on one cause, return the exact command/error and patch; root selects the smallest model capable of the now-demonstrated problem and records why. No silent model escalation, unlimited retries or new children.

## Evidence and recovery

The frozen production baseline is `74ffadb447f702065e7912ca9fce5c9e8f36a22d`; the source release and five-pass review were delivered before this series. Read [production reconciliation](../2026-10-04-production-reconciliation.md) for dated surface receipts. Workers must fetch current main before writing and root updates their base when prerequisites merge. Preserve prior recovery refs/bundles and historical handoffs. Final root integration runs governance plus checks invalidated by the change, uses protected PR checks, verifies the exact resulting SHA and records each surface separately. Do not overwrite history to turn pending evidence into completed evidence.
