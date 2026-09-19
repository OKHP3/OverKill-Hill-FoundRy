# Replit, GitHub, and Windows synchronization

GitHub `origin/main` is the shared integration baseline. Preserve and integrate
Replit worker commits before declaring either checkout synchronized.

## Diagnose before changing branches

```sh
git status --short --branch
git fetch origin
git rev-parse HEAD origin/main
git rev-list --left-right --count HEAD...origin/main
git branch -vv
git stash list
```

The count is local-only commits followed by remote-only commits. A clean tree
with `0 0` and identical hashes proves source parity. A clean tree with commits
ahead still contains work that has not landed on main. Fetch without pruning
until stale references have been reviewed and recovery material preserved.

## Replit workflow permission failure

On 2026-09-19, Replit could fetch but GitHub rejected a push with:

```text
refusing to allow an OAuth App to create or update workflow ... without workflow scope
```

Repeated pulls, new commits, and force-pushing do not repair this credential
permission boundary. Do not put credentials in repository files or copy tokens
between hosts.

Preserve the original commits on a recovery branch and in a Git bundle. Transfer
the bundle through an owner-authorized channel to the Windows checkout, whose
existing GitHub access can publish workflow changes. Verify the bundle, retain
the original head under a recovery ref, merge fresh `origin/main` on the recovery
branch, and open a PR. The bundle and temporary transfer branch must not become
part of the final application tree. Alternatively, the owner can reconnect the
Replit Git provider with the needed permission; agents must not silently widen
credential permissions.

## Integration and cleanup

1. Review changed files and run `python3 scripts/governance-check.py` plus checks
   for affected code. Require passing CI at the PR's exact head.
2. Merge the authorized PR. After a squash, its old feature commits are not
   ancestors of the new main commit even when their content was integrated.
3. Preserve the old branch tip before replacing a divergent local main. Switch
   away from it, retain its history in recovery refs or a verified bundle, and
   recreate main from fetched origin only after proving the merged content is
   retained. Never overwrite a dirty checkout.
4. Delete only branches proven resolved at their exact tips. Replit `subrepl-*`
   branches may contain unfinished work; age alone does not justify deletion.
   Archive reviewed refs before removing them. Prune verified stale remote
   tracking refs; keep uncertain work and historical recovery material.
5. Verify both checkouts on `main`, identical `HEAD` and `origin/main`, `0 0`,
   clean status, and successful `git pull --ff-only` / `git push origin main`.
   Refresh Replit's Git panel separately; its display can lag the shell.
6. Verify resulting main CI and Pages deployment separately. Mark related
   resolved notifications read and Done after closeout.

Future work should start from freshly fetched main on a task branch. Replit
workflow changes use the Windows/GitHub integration route unless the owner
changes the Git provider's permission. Source parity does not establish connector
authorization or completion of queued agent tasks.
