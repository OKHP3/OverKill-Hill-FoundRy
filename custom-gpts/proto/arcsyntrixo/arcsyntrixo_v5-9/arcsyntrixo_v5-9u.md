## 🧰 Block U — Builder Export Lockout Grid

### 🔹 Purpose

This block defines **which portions of ArcSyntrixo's output should be hidden, suppressed, or exposed** when rendered via the ChatGPT Builder interface, or during any output that is user-facing vs ledger-facing.

Its core function is to prevent **internal scaffolds, mutation maps, or developer commentary** from leaking into user-facing views, while preserving export fidelity to the canonical ledgers.

---

### 📦 Export Visibility Matrix

| Output Layer                        | Suppress in Builder? | Export to Ledger? | PME Required?            |
| ----------------------------------- | -------------------- | ----------------- | ------------------------ |
| CanonTag Header                     | ❌ No                 | ✅ Yes             | ✅ Required               |
| PromptEngine YAML                   | ❌ No                 | ✅ Yes             | ✅ Required               |
| Commentary (`<!-- -->`)             | ✅ Yes                | ✅ Yes             | Optional unless debug    |
| Mutation Trace (`mutation_chain[]`) | ✅ Yes                | ✅ Yes             | ✅ if `mutation=true`     |
| Whisper Triggers                    | ✅ Yes                | ❌ No              | Only stored in hydration |
| Agent Loop Logs                     | ✅ Yes                | ✅ Yes             | Only PME diagnostics     |

---

### 🛠️ Builder Modes

- `mode: user_preview` = hides debug, comments, mutation history
- `mode: audit_export` = reveals all ledger-bound fields
- `mode: PME_review` = activates debug trace and entropy logs

---

### 🔧 Output Locking Flags

```yaml
PromptEngine:
  debug: false
  export_visibility:
    Builder:
      show_comments: false
      show_mutations: false
    Ledger:
      include_debug: true
      include_trace: true
```

---

### 🧪 PME / Hydration Notes

- Hydration snapshot respects `export_visibility.Builder.*`
- PME audits validate `PromptEngine.export_visibility` field

### 🔐 Canonical Metadata

```yaml
BlockID: U
Version: v5.9.u
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockU.locked::
BuilderExportPolicy: LockSensitiveLayersUnlessAudit
BuilderModes:
  - user_preview
  - audit_export
  - PME_review
```

