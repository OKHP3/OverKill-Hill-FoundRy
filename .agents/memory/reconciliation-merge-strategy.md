---
name: Reconciliation merge strategy
description: Merge-method rule for preserving a true local fast-forward after a reviewed reconciliation PR.
---

When a reconciliation branch contains the local `main` lineage and the requested post-merge state is a fast-forwarded local `main`, use a regular GitHub merge commit rather than a squash merge.

**Why:** A squash commit has the old remote `main` as its parent and can make the divergent local `main` impossible to fast-forward, even when the resulting tree is correct. A regular merge preserves both histories and lets the local branch advance with `git merge --ff-only origin/main`.

**How to apply:** Immediately before merging, verify the exact PR head and base, mergeability, and required checks. After the merge, fetch `origin`, fast-forward local `main`, verify identical SHAs, and retain reconciliation/archive refs until a separately approved cleanup.