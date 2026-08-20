---
name: Scheduled cleanup safety
description: Safety rule for any unattended branch-deletion automation.
---

Use candidate discovery only as a preliminary screen for destructive branch cleanup. Immediately before deleting each branch, re-read its current ref, repository protection/default status, and local open-pull-request state.

**Why:** A branch can receive a new commit or gain a pull request after a scheduled job initially lists candidates. Deleting from that stale snapshot can remove active work. A historical merged pull request is also not evidence that a reused branch's current tip is safe to delete.

**How to apply:** Keep the evaluated SHA with each candidate. Treat a merged pull request as eligible only when its recorded head SHA equals that evaluated tip, and skip deletion unless the live branch still has that same SHA, is not default or protected, and has no open local pull request. Apply those checks during manual dry runs as well so their output reflects the current decision.