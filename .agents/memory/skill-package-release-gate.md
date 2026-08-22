---
name: Skill package release gate
description: Durable rules for converting ReFolDec process captures into portable Agent Skill packages.
---

An approved portable skill package must preserve the exact source capture hash,
stable lineage IDs, public source access, human confirmation, explicit
permissions and untrusted-input handling, and a protected unseen holdout.

**Why:** A polished SKILL.md can still hide private dependencies, lose source
lineage, or overclaim quality from an exposed benchmark.

**How to apply:** Package only after the canonical capture validator passes;
reject private-only or unresolved approved releases, and treat live holdout
results as version-specific evidence rather than inherited history.