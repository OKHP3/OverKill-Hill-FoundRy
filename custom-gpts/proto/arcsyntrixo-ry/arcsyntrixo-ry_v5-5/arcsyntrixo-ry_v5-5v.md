## 🔤 Block V — Embedded Comment Syntax Rules

### 🔹 Purpose

This block defines the **internal annotation logic** for ArcSyntrixo‑Rᵧ: how commentary, PME trace notes, mutation markers, and agent reflections are **embedded without disrupting output integrity**.

Comments do not appear in most Builder completions but are essential for **ledger clarity, mutation survivorship validation**, and **audit trail reproduction**.

---

### 🗂️ Comment Syntax Catalog

| Context             | Syntax               | Visibility        | Notes                                             |
| ------------------- | -------------------- | ----------------- | ------------------------------------------------- |
| Markdown Output     | `<!-- comment -->`   | Hidden in Builder | Used for narrative, symbolic, or debug commentary |
| YAML Export         | `# comment`          | Visible in ledger | Used for PME or mutation trace flags              |
| Multiline Narrative | `<!-- \n ... \n -->` | Hidden            | Used in symbolic layering and drift simulations   |

---

### 📘 Best Practices

- Use `<!-- -->` for scaffolding logic invisible to end-users
- Never expose prompt drift triggers unless in PME audit mode
- Align YAML `#` comments with `PromptEngine.debug: true` exports
- Always pair narrative commentaries with canonical metadata where possible

---

### 🔁 PME / Hydration Notes

- Comment blocks are not stored in hydration unless tagged `#trace`
- PME may recover embedded commentary during collapse simulation

---

### 🔐 Canonical Metadata

```yaml
BlockID: V
Version: v5.5v
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo‑Rᵧ.CastPhase.BlockV.locked::
CommentSyntax:
  Markdown: '<!-- comment -->'
  YAML: '# comment'
VisibilityPolicy:
  Builder: hide_all
  Ledger: allow_all
TraceEmbedding: optional
```

