---
name: Git remote credentials
description: Safe authentication pattern for shell Git operations in this Replit workspace.
---

Do not embed a GitHub PAT in the repository's remote URL.

**Why:** A token-bearing remote is visible in `.git/config` and can leak through diagnostics, command output, or copied environment state. The remote was sanitized after a token-bearing URL surfaced during refresh.

**How to apply:** Revoke/rotate any exposed token, then configure GitHub authentication through a credential helper or SSH. Keep `origin` as the credential-free HTTPS URL unless the workspace has a managed SSH identity.