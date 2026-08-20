---
name: Git remote credentials
description: Safe authentication pattern for shell Git operations in this Replit workspace.
---

Do not embed a GitHub PAT in the repository's remote URL.

**Why:** A token-bearing remote is visible in `.git/config` and can leak through diagnostics, command output, or copied environment state. The remote was sanitized after a token-bearing URL surfaced during refresh.

**How to apply:** Revoke/rotate any exposed token, then configure GitHub authentication through a credential helper or SSH. In this Replit checkout, use a local credential helper that references the secure `GITHUB_PAT` environment secret at runtime; reset inherited helpers first so a stale OAuth credential cannot take precedence. Keep `origin` as the credential-free HTTPS URL unless the workspace has a managed SSH identity.