# OverKill Hill FoundRy — Governance Model

## Tier Structure

The OKHP3 governance model uses a three-tier relay:

```
Tier 0: OKHP3/OverKill-Hill           (golden governance)
Tier 1: OKHP3/OverKill-Hill-FoundRy   (this relay)
Tier 2: foundry-*, vault-*, article-*, narrative-*, mermaid-*, mac-studio-* (child repos)
```

## Repository Families

| Prefix | Purpose |
|--------|---------|
| `foundry-*` | Capability forge and prompt systems |
| `vault-*` | Long-term knowledge archives |
| `article-*` | Published writing and research |
| `narrative-*` | Narrative framework prototypes |
| `mermaid-*` | Diagram and visualization tools |
| `mac-studio-*` | Local AI workbench configurations |

## Lifecycle Statuses

`spark` → `research` → `concept` → `prototype` → `capability` → `productizing` → `product` → `active` → `archived` / `deprecated`

## Required Files per Child Repository

Every governed child repository must include:
- `AGENTS.md` — agent instructions and operating context
- `README.md` — human-readable overview
- `manifest.yaml` — machine-readable governance metadata
- `CHANGELOG.md` — change history

## Scaffold

New child repositories are initialized from `_template/`. Run `scripts/foundry-sync.py` to audit compliance.
