# AGENTS.md — FoundRy Child Repository

## 0. Role

This repository is a child capability repository governed by `OKHP3/OverKill-Hill-FoundRy` and ultimately by the Tier 0 golden master at `OKHP3/OverKill-Hill`.

## 1. Authority Chain

```text
OKHP3/OverKill-Hill
  → OKHP3/OverKill-Hill-FoundRy
    → this child repository
```

## 2. Required Root Files

```text
AGENTS.md
README.md
CHANGELOG.md
LICENSE.md
manifest.yaml
```

## 3. Preferred Capability Structure

```text
docs/
origin/
skill/
prompts/
research/
tests/
schemas/
assets/
exports/
archive/
```

## 4. Manifest Contract

The root `manifest.yaml` must identify:

- `brand_domain`
- `governance.parent_foundry`
- `governance.agents_version`
- `governance.naming_pattern`
- `repo.lifecycle_status`
- `repo.visibility`
- `visibility_control.public_graduation_allowed`

## 5. Agent Behavior

Agents working in this repo must:

- Preserve source artifacts in `origin/`.
- Put refined deployable instructions in `skill/`.
- Put research and rationale in `research/` and `docs/`.
- Record meaningful changes in `CHANGELOG.md`.
- Avoid deleting legacy GPT, Gem, or Copilot artifacts unless explicitly instructed.

## 6. Public Graduation

A private repository may become public only after manifest review, PII scrub, source/license review, and public-readiness review. Repositories with client or employer-specific data must remain private unless explicitly cleared.
