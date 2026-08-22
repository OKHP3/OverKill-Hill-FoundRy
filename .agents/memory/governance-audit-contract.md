---
name: Governance audit contract
description: FoundRy governance checks must stay portable, schema-aware, actionable, and read-only.
---

FoundRy governance validation uses a dependency-free parser for the repository's
declared YAML contract and must never mutate source files or publish artifacts.

**Why:** CI must be able to run the checks on a clean Python runner, while
governance failures need to be reviewable and safe to remediate manually.

**How to apply:** Extend the declared schemas and targeted validators for new
rules; keep failures tied to a rule and remediation, and preserve dry-run
behavior for public graduation.