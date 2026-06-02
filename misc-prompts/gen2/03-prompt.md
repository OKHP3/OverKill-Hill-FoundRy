## 🟪 PROMPT #03 — 🧱 Registry Upload & Canon Validation

```yaml
prompt_id: PROMPT03
title: Registry Upload & Canon Validation
type: Structural Intake + Delta Detection
depends_on: PROMPT02
status: ACTIVE
```

### 🧠 Purpose

Accept a structured upload containing Glee‑fully ecosystem metadata — including Toolboxes, Tools, Tool‑ettes, Functions, and Function‑ettes. This step ensures alignment with `dataLedger_registry_v2.txt` and related files by parsing and comparing all uploaded attributes.

Conflicts, omissions, or enhancements will be surfaced for routing and user approval.

---

### 🪄 Prompt Text (Markdown)

📥 Please upload your **canonical entity structure**, which may include:

- 🧾 Entity metadata (Toolbox, Tool, Tool‑ette, Function, Function‑ette)
- 🧠 Attributes: emoji roles, IDs, names, descriptions, elevator pitches, URLs
- 🌳 Parent–child–peer relationships
- 📎 Sources: `Entity Attributes.txt`, `Glee‑fully_Entity_Model.md`, `Indented Taxonomy.txt`

🔍 This prompt will automatically:

1. Parse and validate the uploaded ecosystem structure
2. Compare entries to `dataLedger_registry_v2.txt`
3. Detect:
   - ✅ New entries not yet registered
   - ⚠️ Conflicts in ID, description, emoji, or tree placement
   - 🔁 Redundant or legacy entries that may require archive

🧭 If any conflicts are found, I’ll highlight them and prompt you to:

- 🧹 Overwrite the existing record
- 📤 Archive the prior version (`dataLedger_archive_v2.txt`)
- 🆕 Register as a new sibling or branch
- 🚫 Skip and handle manually later

✅ Once uploaded and validated, this canon will power downstream prompts — no need to reupload in later phases.

---
