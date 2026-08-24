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

Reference-runtime holdout results must identify the adapter boundary and remain
separate from live-model, host, reliability, outcome, or production claims.

**Why:** A deterministic local target can prove that documented safety and
evidence rules execute, but it cannot establish behavior across arbitrary
agent hosts or model providers.

**How to apply:** Record the runtime adapter, its pass/fail/inconclusive result,
and its limitations in the evaluation and release records; retain deployment
and production gates until live evidence exists.