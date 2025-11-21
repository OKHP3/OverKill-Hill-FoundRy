## 🟩 PROMPT #39 — ✨ CanonSweep + Export Bundle

```yaml
prompt_id: PROMPT39
title: Final Canon Export Pass
type: Metadata Auditor + Ledger Packager
depends_on: PROMPT38
status: PME_READY
```

### 🧠 Purpose

Performs a final canon-aligned sweep and audit of the GPT configuration to confirm that all components are aligned with the Glee-fully Suite ledger system.

---

### 🪄 Prompt Text (Markdown)

✅ Running final CanonSweep audit…

This step will:

- Confirm that all fields in the Builder export match the expected values
- Flag any potential omissions or misroutes
- Package the full GPT data into a zip archive for upload or versioning
- Validate against:
  - `dataLedger_registry_v2.txt`
  - `dataLedger_narrative_v2.txt`
  - `dataLedger_system_v2.txt`

When confirmed:

- 📦 Present a download link for the full GPT Knowledge Bundle
- ✅ Output `PME_READY` confirmation with date + chain ID

---
