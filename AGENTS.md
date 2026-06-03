# AGENTS.md — OverKill-Hill-FoundRy

## 0. Role

This repository is the OverKill Hill P³ FoundRy relay. It translates the golden governance from `OKHP3/OverKill-Hill` into reusable scaffolds for OKH child repositories, including experimental architectures, recursive systems, promptcraft assets, narrative frameworks, writing projects, local AI workbenches, Mermaid tooling, and FoundRy capability prototypes.

This repo is not merely a content repository. It is a template-of-templates and governance relay.

## 1. Authority Chain

```text
OKHP3/OverKill-Hill
  → OKHP3/OverKill-Hill-FoundRy
    → OKH child repositories
```

Universal governance should originate in `OKHP3/OverKill-Hill`. This relay may adapt implementation details for the OverKill Hill domain, but must not silently fork universal rules.

## 2. Relay Responsibilities

This repository owns:

- Child repository scaffolds in `_template/`
- Repo registry files in `registry/`
- Manifest and validation schemas in `schemas/`
- Relay documentation in `docs/`
- GitHub workflow templates in `.github/`
- Governance guidance for OKH child repos

## 3. Child Repository Scope

This relay governs repositories matching these families:

- `foundry-*`
- `vault-*`
- `article-*`
- `narrative-*`
- `mermaid-*`
- `mac-studio-*`
- OKH research, app, writing, local AI, and promptcraft repositories

Known child examples include:

- `foundry-are00-abrahamic-reference-engine`
- `foundry-hmt01-homestead-r`
- `foundry-psr00-pathscrib-r`
- `foundry-unt00-un-nocked-truth`
- `mermaid-theme-builder`
- `mermaid-diagram-bpmn`
- `mac-studio-local-ai-workbench`
- `infusing-a-soul`
- `first-diagram-is-a-liar`
- `3-years-with-chatgpt`
- `magnus-progenitor-saga`
- `vault-codacies-biases-as-constants`
- `bimdb-building-information-modeling-database`

## 4. Required Child Repo Files

Every governed child repo should eventually contain:

```text
AGENTS.md
README.md
CHANGELOG.md
LICENSE.md
manifest.yaml
```

Capability repos should additionally include:

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

## 5. Naming Rules

Use lowercase kebab-case for new repositories unless a public brand repository already has a legacy casing requirement.

Preferred OKH patterns:

```text
foundry-[code][##]-[project-slug]
vault-[concept-slug]
article-[project-slug]
narrative-[world-or-system-slug]
mermaid-[function-slug]
mac-studio-[function-slug]
```

Avoid ambiguous names that do not identify domain, purpose, or lineage.

## 6. Manifest Requirements

Each child repository should include a root `manifest.yaml` conforming to `schemas/repo-manifest.schema.yaml`.

Required lineage fields:

```yaml
brand_domain: overkillhill
parent_foundry: OKHP3/OverKill-Hill-FoundRy
governance.naming_pattern: ""
```

## 7. Visibility and Graduation

Private repos may become public only after:

- PII scrub
- employer/conflict review
- source/license review
- README externalization
- manifest completion
- public-readiness checklist completion

Repositories with sensitive client or employer context must not be graduated automatically.

## 8. Agent Behavior

AI agents working in this repo must:

- Preserve governance hierarchy.
- Prefer small, auditable changes.
- Avoid deleting historical artifacts unless explicitly instructed.
- Treat `_template/` as deployable scaffold source.
- Update `registry/index.yaml` when child repo relationships are created or materially changed.
- Keep public-facing copy clear, practical, and portfolio-grade.

## 9. Directory Contract

```text
_template/   Child repo starter scaffold
registry/    Child repo catalog and triage logs
schemas/     Manifest and registry validation schemas
docs/        Relay design, governance, and migration guidance
.github/     GitHub workflow and issue template scaffolds
```

## 10. Canonical Principle

The durable unit is the capability, not the platform wrapper. GPTs, skills, agents, local modules, websites, and articles are deployment targets. The repository is the source of truth.