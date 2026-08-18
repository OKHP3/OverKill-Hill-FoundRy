# Migration Notes — Agent-Skill-Builder → OverKill-Hill-FoundRy

**Date:** 2026-08-18  
**Source:** `https://replit.com/t/overkill-hill/repls/Agent-Skill-Builder` (pre-session state)  
**Destination:** `https://replit.com/t/overkill-hill/repls/OverKill-Hill-FoundRy` + `OKHP3/OverKill-Hill-FoundRy`

---

## What was unique to Agent-Skill-Builder

The Agent-Skill-Builder Replit workspace was consolidated into this repo. The following content was unique to that workspace (captured in the `consolidation` git commit, `37ffc31`):

| Source file (in `attached_assets/`) | Destination | Description |
|--------------------------------------|-------------|-------------|
| `inventory_of_toolbox_tools_and_tool-ettes_1782437366159.md` | `custom-gpts/proto/glee-fully/toolbox-inventory.md` | Complete Glee-fully toolbox inventory: all ~50 GPTs (Trunk, Branches, Twigs, Leaves) with full descriptions, primary functions, and elevator pitches |
| `operators-cathedral-layout_1782437347551.md` | `docs/operators-cathedral-layout.md` | Hyper-length Cathedral Boilerplate Codex for GPT instruction blocks — the GLEE-fully Cathedral Codex-R template including all seven sections (System & Persona, Response Structure, Input Interpretation, Memory, Execution, Safety, Closing Codex) |

## What was already in FoundRy (no action needed)

- **Custom GPT Creator SPA** (`artifacts/mockup-sandbox/`) — fully documented in `docs/custom-gpt-creator-transfer.md`; code already present via GitHub history (commit `0052342` "Add Forge components to mockup sandbox")
- **All 43 Agent Skills** (`.agents/skills/`) — present in GitHub main branch prior to merge
- All `custom-gpts/proto/`, `registry/`, `schemas/`, `docs/`, and `scripts/` content — present in GitHub main branch

## What was intentionally skipped

- Content created or modified in the final ~10 minutes of the Agent-Skill-Builder session (per user instruction: capture pre-session state only)
- Replit scaffold/infra files (`.replit`, workflow configs) — Replit-environment-specific; not portable

## Post-migration status

- Original `attached_assets/` files retained in place (raw source, for reference)
- Files placed at canonical FoundRy paths with clean names (timestamps removed)
- Registry triage log updated
