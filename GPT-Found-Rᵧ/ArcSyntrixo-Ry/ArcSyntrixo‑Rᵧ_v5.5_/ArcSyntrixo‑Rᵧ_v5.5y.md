## 🔤 Block Y — Export Mode Variants

### 🔹 Purpose

This block defines the **named export profiles** used by ArcSyntrixo‑Rᵧ depending on destination context. Whether output is intended for GPT Builder, ledger integration, hydration archive, or mutation sandbox, the export mode determines formatting, visibility, and CanonTag strictness.

---

### 📦 Export Profiles

| Mode ID            | Target Context         | Export Format        | Commentary | CanonTag Required? |
| ------------------ | ---------------------- | -------------------- | ---------- | ------------------ |
| `builder_preview`  | ChatGPT Builder UI     | Markdown only        | ❌ Hidden   | ✅ Yes              |
| `ledger_ingest`    | Canonical Ledger Files | Markdown + YAML      | ✅ Visible  | ✅ Yes              |
| `hydration_dump`   | `dataLedger_hydration` | YAML only snapshot   | ✅ Visible  | ❌ Optional         |
| `mutation_sandbox` | PME Replay Sim         | Debugged Markdown    | ✅ Inline   | ❌ Draft OK         |
| `pme_audit_view`   | PME Trace Validator    | Full Export w/ trace | ✅ Full     | ✅ Yes              |

---

### 🧪 Mode Control

- Export mode declared in `PromptEngine.export_mode`
- Defaults to `ledger_ingest` unless declared
- PME assigns `pme_audit_view` if mutation trace exists

---

### 🔧 Visibility Flags

```yaml
PromptEngine:
  export_mode: ledger_ingest
  show_debug: false
  show_trace: false
```

---

### PME / Hydration Notes

- Hydration replay must match `export_mode`
- PME audit fails if CanonTag required and missing

---

### 🔐 Canonical Metadata

```yaml
BlockID: Y
Version: v5.5y
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo‑Rᵧ.CastPhase.BlockY.locked::
ExportModeDefault: ledger_ingest
ExportModes:
  - builder_preview
  - ledger_ingest
  - hydration_dump
  - mutation_sandbox
  - pme_audit_view
```

