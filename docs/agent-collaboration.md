# Agent collaboration in FoundRy

## Owner direction — 2026-09-07

The owner prioritizes useful work per token over completion speed and reports a
larger ChatGPT allocation, some Claude capacity, and a small Copilot allocation.
Conserve Replit usage by moving portable reasoning and implementation to other
available hosts. These are routing preferences, not measured balances or promises
of platform access. A subscription allowance is not an API credential or a shared
token pool; do not enable paid APIs, buy capacity, or change billing to collaborate.

The owner reports that synchronization directives are already running in six
Repls: the OverKill Hill, AskJamie, and Glee-fully websites and their respective
FoundRys. Their completion is not verified by this note. Skillz was supplied for
context only. Do not launch duplicate synchronization jobs or change sibling repos
from this checkout. All three FoundRy repositories are intentionally public.

[AGENTS.md](../AGENTS.md) is canonical. This protocol adapts local execution;
universal governance remains with OverKill-Hill. It does not install an
orchestrator, connect accounts, or dispatch agents by itself.

## Route a bounded task

| Host | Default assignment given the owner's allocation | Return |
| --- | --- | --- |
| ChatGPT/Codex | Coordination, repository inspection, portable implementation, tests, documentation, and integration when repository access is available | Focused change or review, commit/PR reference, validation evidence |
| Claude | A difficult design question, conflict analysis, or an independent review when that extra judgment has value | Bounded recommendation or owned change with evidence and limitations |
| GitHub Copilot | Small edits, a specific test, or review of a narrow diff | Scoped patch or actionable finding |
| Replit | Preserve and synchronize its own checkout; validate Replit preview, environment, and platform-specific behavior | Before/after Git state, runtime result, blockers |

Roles may change with actual access, remaining capacity, and task difficulty. The
receiving host must confirm what it can do. A chat-only host can draft a patch or
review for a repository-enabled executor; it must not claim that draft was applied.
Avoid forcing a small model through repeated failure. Use the lightest capable
effort for a bounded task; escalate with the failing command, error, and attempted
fixes when complexity warrants it. Do not invent token prices or quota estimates.

## Claim, work, and integrate

1. **Inspect first.** Read canonical instructions, the
   [assignment index](handoffs/README.md), and any linked task record.
   Check the local branch, working tree, active merge/rebase, and repository URL;
   fetch origin and compare `HEAD...origin/main`. Reconcile Git before new edits.
   Preserve local changes and recovery refs. Use fast-forward updates for a clean,
   behind-only checkout; integrate divergence explicitly on a task branch without
   force-pushing or discarding local work.
2. **Claim one bounded task.** Reuse its existing GitHub issue or PR if available.
   The coordinator maintains the assignment index with a link to that record.
   Otherwise create one task record only when delegation needs it, under
   `docs/handoffs/<yyyy-mm-dd>-<task-slug>-<host>.md`, with the fields below.
   Record owner/host, base SHA, branch, allowed files, acceptance criteria, and
   integration owner. Publish the record through an authorized GitHub write or
   provide it to the owner for relay. Private chat alone is not a shared claim.
3. **Acknowledge ownership.** The receiver records acceptance in the linked issue,
   PR, or handoff file before writing: task ID, host/agent identity, UTC timestamp,
   accepted file scope, and base SHA. Set status to `accepted` only after that
   evidence exists. If only chat is available, the owner may relay the receiver's
   exact acknowledgement into the record, labeled as relayed with its source and
   time; a sender's assignment alone is not acceptance. The coordinator resolves
   competing claims; a branch or
   comment is not an atomic lock. Until ownership is agreed, limit work to reads.
   For an already running Replit task, obtain its current checkpoint before
   assigning any overlapping implementation elsewhere.
4. **Work independently where useful.** Use separate branches and checkouts for
   independent tasks. Assign shared files to one writer or sequence dependent
   work. Read-only reviewers may inspect the same commit. Delegate only if a
   concrete independent task saves more effort than its handoff costs; subagents
   inherit the same file scope, budget preference, and reporting requirements.
5. **Hand back evidence.** Commit only task files. Return the compact record below,
   updating status to `ready-for-review`, `blocked`, or `handed-off` as appropriate.
   A timeout or exhausted allowance does not transfer ownership automatically.
   Preserve the partial result and record the next owner when acknowledged.
6. **Integrate once.** The named integration owner fetches current main, checks
   overlapping changes and the exact PR head, reviews the diff, and runs the
   required checks. Merge only within owner-authorized scope and repository
   protections. Other hosts consume that result; they do not merge competing
   copies or rewrite shared history. Re-fetch after a rejected push and reassess.
7. **Verify receipt.** Replit fetches the merged result, preserves its local work,
   reconciles to main, and reports its HEAD, fresh origin/main, working-tree status,
   and ahead/behind counts. Synchronization requires equal SHAs and 0/0 counts,
   with any remaining local work explicitly accounted for. Preview and production
   deployment are separate claims. Delete task branches only after confirming
   integration, recovery, and cleanup authorization.

Use connected GitHub tools or authenticated Git for authorized actions. If a host
lacks access, return an exact handoff for the owner or an authorized executor;
do not assume another host received it, share credentials, or send unsolicited
messages to third parties.

## Compact task and handoff record

Keep one current record per task; link earlier evidence rather than copying whole
conversations. Retain dated decision changes and superseded conclusions when they
matter to recovery. Use repository-relative paths and public-safe content.

```text
Task ID / objective:
Status / updated at (UTC): proposed | accepted | in-progress | blocked |
                          ready-for-review | handed-off | integrated | verified
Record URL or path:
Repository / source host / task owner / integration owner:
Next host / acknowledgement (pending or evidence):
Base SHA / branch / current SHA / PR:
Allowed files / exclusions / dependencies:
Acceptance criteria:
Effort or retry bound / escalation trigger:
Changed files and why:
Evidence: confirmed / inferred / proposed / unknown:
Validation: command, tested SHA, environment, result, evidence link:
Checks not run and why:
Local work preserved / recovery reference or location:
Blockers / owner decision needed:
Exact next action:
```

Do not record guessed model usage. Include actual usage only when the host exposes
it and it is useful; otherwise use `unknown`. Close the record as `verified` only
when its acceptance criteria are met, not merely because a PR was merged.

## Spend effort on evidence

- Read relevant diffs, task files, and linked findings first. Expand research only
  when an unresolved question requires it. Prefer scripts to repeated AI analysis.
- Reuse test evidence only when the tested code, dependencies, configuration, and
  relevant environment still match. Run checks required by CI and local policy.
- Run `python3 scripts/governance-check.py` before review and the filename dry run
  for documentation changes. For workbench changes use the commands in
  [the workbench guide](capability-workbench.md#validation). No need to run an
  extra local browser suite for prose-only edits unless a concrete risk warrants it.
- Report useful deltas and blockers. Avoid repeated whole-repository audits,
  duplicate reviews without a specific question, tight status polling, and
  speculative work outside the current acceptance criteria.
- Preserve the `cgpt-workspace` store, capability projects, and Canvas previews.
  Cross-host Git synchronization does not synchronize browser-local project data.

## Next receiving-agent action

After safely fetching this document's merged revision, the current Replit task
should finish or checkpoint its existing synchronization assignment and return
the compact record. The coordinator can then route remaining portable work to
ChatGPT/Codex and reserve Replit for runtime checks. There are no new live task
assignments or verified acknowledgements established by this document.
