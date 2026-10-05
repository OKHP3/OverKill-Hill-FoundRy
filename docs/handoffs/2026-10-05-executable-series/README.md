# Executable FoundRy series - 2026-10-05

This series converts all 48 findings from the [five-pass review](../../reviews/2026-10-04-equilibrium-review.md) into 28 bounded worker assignments. Three stopped attempts are preserved. Reusing A03's thread for A02 keeps the 28 assignments and stopped attempts within the owner's maximum of 30 workers overall, including the three earlier review agents. New findings can be assigned to an existing capable thread after its prior duty closes. The original review remains dated evidence; this [machine ledger](tasks.json) owns current assignment status. The coordinator is thread `01a1096a-9ad8-7011-9cc5-25c41ff67308`, the sole integration owner.

## Budgets and dispatch

The coordinator goal has the requested 20,000,000-token ceiling. Every worker starts with `gpt-6-luna`, effort `low`. Ordinary configured goals use 200,000 tokens; the preserved concurrent-save implementation uses a 1,000,000 ceiling with a smaller 15,000-50,000-token working target. A02's old 50,000 goal stopped at its limit; its next duty will reuse the completed A03 thread. Every worker retains the owner's absolute 2,000,000-token ceiling. These are ceilings, not spending targets. Spawn APIs have no token-quota field: workers must record the returned goal configuration and usage, or mark controls unavailable and stop at the soft bound. Account capacity is not reserved or purchased. The 28 current duty budgets total 6,400,000 tokens; three stopped attempts had 100,000 combined in configured budgets. A03, its two scoped corrections, A02 and A04 together allocate at most 1,650,000 to one worker, below the individual ceiling. Actual usage can overshoot a goal at a tool/message boundary and must be recorded separately. A future amendment must remain under each owner ceiling.

At most three workers run at once in this series. Dispatch only a ready dependency frontier, publish each claim, and wait for its exact acknowledgement. Independent writers use separate branches/worktrees. Shared application files are sequenced A02 -> A05 -> A06; A17-A20 can propose decisions but have no implementation file ownership. Root alone writes tasks.json, this README and the assignment index. Each worker alone writes its receipt until handback. Initial workers are A01, A02 and A03; A25 is independently ready for the next free slot. Unseen-task custody must happen before exemplar optimization, and human/authentication/private-fixture gates cannot be supplied by an agent's invented assumptions.

## Assignment index

| Agent task | Review findings | Duty | Current state | Goal ceiling | Launch prompt |
| --- | --- | --- | --- | ---: | --- |
| A01 | FND-01 | Current requirements ledger | dispatched | 200,000 | [a01](prompts/a01.md) |
| A02 | FND-02, FND-43 | Concurrent saves and immediate memory recovery | transferred; acceptance pending | 1,000,000 | [a02](prompts/a02.md) |
| A03 | FND-03, FND-21 | Clipboard rejection and controlled copy races | ready-for-review | 200,000 | [a03](prompts/a03.md) |
| A04 | FND-24, FND-47, FND-48 | Backup contract, original preservation and Windows commands | queued | 200,000 | [a04](prompts/a04.md) |
| A05 | FND-22, FND-45 | Stale import confirmation and current backup escape | queued | 200,000 | [a05](prompts/a05.md) |
| A06 | FND-44 | Exact malformed-source recovery export | queued | 200,000 | [a06](prompts/a06.md) |
| A07 | FND-25 | Transfer and rollback across actual browser origins | queued | 200,000 | [a07](prompts/a07.md) |
| A08 | FND-26 | Firefox and WebKit acceptance | queued | 200,000 | [a08](prompts/a08.md) |
| A09 | FND-27 | Keyboard and real assistive technology acceptance | external-gate | 200,000 | [a09](prompts/a09.md) |
| A10 | FND-06, FND-07, FND-08 | Existing-source selection, rights and import parity | external-gate | 200,000 | [a10](prompts/a10.md) |
| A11 | FND-04, FND-09, FND-46 | Build one source-safe intent-to-use exemplar | queued | 200,000 | [a11](prompts/a11.md) |
| A12 | FND-11, FND-32 | Recipient discovery and actual skill outcome | queued | 200,000 | [a12](prompts/a12.md) |
| A13 | FND-10, FND-12, FND-17 | Behavior preservation, hostile source boundary and references | queued | 200,000 | [a13](prompts/a13.md) |
| A14 | FND-14, FND-15, FND-16 | One adapter with least permissions and lifecycle receipts | conditional | 200,000 | [a14](prompts/a14.md) |
| A15 | FND-13, FND-18, FND-19 | Observed results, revision binding and stale invalidation | queued | 200,000 | [a15](prompts/a15.md) |
| A16 | FND-05 | Independent unseen-task custody and user acceptance | external-gate | 200,000 | [a16](prompts/a16.md) |
| A17 | FND-20 | Revision history decision and recoverable diff | conditional | 200,000 | [a17](prompts/a17.md) |
| A18 | FND-23 | Conflict-aware merge import decision | conditional | 200,000 | [a18](prompts/a18.md) |
| A19 | FND-28 | Structured contract decision | conditional | 200,000 | [a19](prompts/a19.md) |
| A20 | FND-29 | Canonical Skillz selection decision | conditional | 200,000 | [a20](prompts/a20.md) |
| A21 | FND-30 | Bounded external-agent handoff | queued | 200,000 | [a21](prompts/a21.md) |
| A22 | FND-31, FND-33 | Prompt and controlled workflow outcomes | queued | 200,000 | [a22](prompts/a22.md) |
| A23 | FND-34 | Useful bounded software starter outcome | queued | 200,000 | [a23](prompts/a23.md) |
| A24 | FND-35, FND-36 | Replit authentication and per-release surface receipts | external-gate | 200,000 | [a24](prompts/a24.md) |
| A25 | FND-37 | Separate dependency PR reviews | ready-for-review | 200,000 | [a25](prompts/a25.md) |
| A26 | FND-38, FND-39 | Protected ReFolDec evaluation and review-package operation | external-gate | 200,000 | [a26](prompts/a26.md) |
| A27 | FND-40 | ReFolDec release decision and permitted publication | external-gate | 200,000 | [a27](prompts/a27.md) |
| A28 | FND-41, FND-42 | Additional host and sibling adoption decisions | external-gate | 200,000 | [a28](prompts/a28.md) |

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

For a discovered issue, root first records exact reproduction, affected acceptance criteria, source/candidate SHA, severity and evidence in tasks.json discoveries. Deduplicate against all 48 findings. Add it to an existing task only before ownership handback and with a published scope amendment; otherwise create a new task with exclusive files and explicit prerequisites and reuse a completed thread within its remaining owner ceiling. Do not exceed 30 overall workers, including the three existing reviewers and preserved stopped attempts. Reuse a completed thread for a follow-up within its duty. After two failed attempts on one cause, return the exact command/error and patch; root selects the smallest model capable of the now-demonstrated problem and records why. No silent model escalation, unlimited retries or new children.

## Evidence and recovery

The frozen production baseline is `74ffadb447f702065e7912ca9fce5c9e8f36a22d`; the source release and five-pass review were delivered before this series. Read [production reconciliation](../2026-10-04-production-reconciliation.md) for dated surface receipts. Root fetches current main before dispatch and supplies the verified base; workers inventory locally and root updates their base when prerequisites merge. Preserve prior recovery refs/bundles and historical handoffs. Final root integration runs governance plus checks invalidated by the change, uses protected PR checks, verifies the exact resulting SHA and records each surface separately. Do not overwrite history to turn pending evidence into completed evidence.

## Setup-control amendment - October 5, 2026

The initial A01 and A03 workers reached their configured small goal ceilings without implementation. Their worktrees and exact stop reports are preserved in the ledger. Replacement workers use coordinator-prepared standalone clones inside the writable project root, the same small model, and 200,000-token goals. A02 published its acceptance before source edits. Goal accounting and account quota remain distinct. Do not recreate an exhausted goal or claim that a follow-up message increases it; the host reports budgetLimited until an authorized control change or replacement task is used.


## Coordinator tasks discovered during dispatch

C01 calibrates goal ceilings from actual setup accounting rather than treating the smaller work target as a viable hard setup budget. C02 centralizes authenticated publication and installed-environment validation where child sandbox settings block network or metadata writes. These are operational tasks owned by this coordinator, with evidence and closure in tasks.json; they do not add product requirements or new worker slots. Do not change host permissions, bypass approval controls, approve an unseen private fixture or pretend a queued follow-up has been received. Pending app approval requests can prevent a worker from processing coordinator messages; exact status remains visible in its thread and the ledger.

A02 transfer amendment: its original worker returned unverified partial changes at 50,653/50,000 and cannot resume that goal. A03 will finish its clipboard duty, then acknowledge an A02 scope transfer and a new 1,000,000 goal on a prepared writable clone. Track cumulative allocations and actual usage per receiving thread; do not exceed 2,000,000 by resetting counters between duties. There are six new spawned threads and three completed earlier review agents, nine in total. Three new attempts stopped at configured ceilings; active status is tracked in tasks.json.


Overall roster amendment: count /root/equilibrium_evidence, /root/equilibrium_outcome and /root/equilibrium_safety as three already existing slots. Reuse A03 for A02 and later A04, A01 for A24, A25 for A20, and A06 for A07 after their gates and prior goals are complete. The plan therefore needs at most 27 new threads plus those three earlier reviewers. Newly discovered duties reuse completed capable threads with explicit scopes and remaining allocation; no total above 30 is allowed.


## First results checkpoint - October 5, 2026

PR56 published the 28-task execution packet at main `aaf41daf882f14907323f34aa9325f05f354285f`. A03 now has three passing focused Chromium cases and source typecheck evidence; publication waits for the protected first-results PR. A25 returned a separate five-PR dependency review, with conditional checks and defer decisions preserved. A03's completed thread has been sent the A02 transfer on a prepared clone at that newer main, with all three prior partial files preserved. Implementation waits for its exact receipt and root publication acknowledgement. A01 is still waiting on its host approval; no ledger or received acknowledgement is claimed.

Later checkpoint: A02 transfer receipt `0e81e8287988dc23ef93c6dad199b3a9f87ce88c` was published and explicitly acknowledged; implementation may resume. A01's unaccepted host-stalled dispatch was withdrawn and a separate in-session agent receives its scope, with both prior checkouts preserved. Seven new workers plus the three earlier reviewers now total ten; the overall plan remains at most 30 through the reuse assignments above. Root reproduced and repaired a delayed clipboard rejection after a project change, extending the final focused suite to four passing cases. The prior full suite passed 55 cases; fresh CI must test the final source.
