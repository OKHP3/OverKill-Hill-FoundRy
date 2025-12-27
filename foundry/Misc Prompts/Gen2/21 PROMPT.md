## 🟦 PROMPT #21 — 📂 Entity Comparison + Sync Directive

```yaml
prompt_id: PROMPT21
title: Entity Model Sync Checker
phase: Sync Layer / Validation Precursor
depends_on: PROMPT20
status: ACTIVE
```

### 🧠 Purpose

Prompt #21 compares the current proto-GPT's structure (as gathered during Prompt #03) against the canonical source of truth found in `dataLedger_registry_v2.txt`. The goal is to:

- Detect new Tool, Tool-ette, or Function-ette entries
- Flag conflicts or discrepancies in ID, parent/child links, emoji roles, or descriptions
- Offer the user options to resolve conflicts or apply deltas automatically

This is a **registry sync and validation checkpoint** prior to final GPT Builder export or PME Lock-in.

---

### 🪄 Prompt Text (Markdown)

📂 Run **Registry Entity Sync + Comparison Scan**

Compare uploaded or declared structure (from Prompt #03) to official `dataLedger_registry_v2.txt`.

- Match entity names, slugs, parent/child links
- Confirm emoji roles, suffixes, overlays
- Identify missing entries or non-canonical fragments
- Flag any unresolved overlap or duplication

> ✅ If no conflicts, confirm: `ENTITY_REGISTRY_MATCH ✅` ❓ If discrepancies exist, ask:
>
> - Should I auto-apply all new entries?
> - Should I present a merge table for review?
> - Should I pause for manual intervention?

Once confirmed or resolved, proceed to Prompt #22.

---

