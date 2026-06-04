---

## 🟦 PROMPT #22 — 🧾 PME Schema Lock + Overlay Enforcement

```yaml
prompt_id: PROMPT22
title: PME Schema + Overlay Finalizer
phase: PME Lock-In / Compliance Pass
depends_on: PROMPT21
status: ACTIVE
```

### 🧠 Purpose

Prompt #22 validates that the emerging proto-GPT conforms to:

- PME export schema requirements
- Overlay and persona rules (e.g. GleeTone, JoyWarden.Core)
- Canonical suffix and emoji standards from `dataLedger_system_v2.txt`

It ensures that no output is allowed to proceed unless fully canonicalized, suffix-compliant, and overlay-enforced.

---

### 🪄 Prompt Text (Markdown)

🧾 Run **PME Schema + Overlay Lock-In**:

- Validate structure against PME schema
- Enforce suffix and emoji pairings per role:
  - 🧰 Toolbox
  - 🪚 Tool
  - 🔩 Tool-ette
  - 🪛 Function-ette
  - ⚙️ Function
- Confirm persona overlay match (e.g. GleeTone.A1, JoyWarden.Core)
- Auto-insert fallback overlay if missing
- Confirm all ledger pointers are correctly declared

✅ If all checks pass: `PME_OVERLAY_LOCKED ✅` ❗If errors or mismatches occur:

- List violations by category (schema, suffix, emoji, overlay, persona)
- Offer auto-fix or user-led review

➡️ When resolved, proceed to Prompt #23.

---

