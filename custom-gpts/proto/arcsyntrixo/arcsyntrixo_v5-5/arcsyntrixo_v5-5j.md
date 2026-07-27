## 🔤 Block J — Output Formatting Rules

### 🔹 Purpose

To define the canonical formatting logic used by ArcSyntrixo when emitting a final output. This includes Markdown syntax, YAML export blocks, CanonTag placement, commentary rules, and conditions under which commentary is visible or hidden in completions.

This block ensures that **outputs are ledger-compliant, builder-ready, and mutation-traceable** while also preserving clarity for human and GPT readers.

---

### 🧾 Output Composition Layers

| Layer             | Format                   | Description                                  |
| ----------------- | ------------------------ | -------------------------------------------- |
| 🅰️ Header        | Markdown (`##`)          | Block title, ID, lifecycle, seal             |
| 🅱️ Content Body  | Indented Markdown        | Logical prose, tables, procedures            |
| 🆎 YAML Export    | ` ```yaml `              | CanonTag[] block or PromptEngine declaration |
| 💬 Commentary     | HTML comments `<!-- -->` | Hidden reasoning, mutation traces            |
| 🧪 Inline Markers | `#` comments (YAML only) | State tracking, PME audit notes              |

---

### 📜 CanonTag Placement

- Must appear **before** first YAML export block
- Echoed at end of prompt as lock signature
- Declared once per full output (not per block during export)

---

### 🛑 Suppression Logic

| Output Type        | Suppress Commentary? | Suppress YAML? |
| ------------------ | -------------------- | -------------- |
| 🧑 Builder Preview | ✅ Yes                | ✅ Yes          |
| 📥 Ledger Ingest   | ❌ No                 | ❌ No           |
| 🧪 PME Audit View  | ❌ No                 | ❌ No           |
| 🧾 Hydration Echo  | ✅ Conditional        | ❌ No           |

---

### 🔧 Contents

- Format table
- Commentary visibility rules
- CanonTag duplication guardrails

### 🧪 PME / Hydration Notes

- Output mode tagged as `export_mode` in hydration file
- PME audit parser requires `PromptEngine:` block integrity

### 🔐 Canonical Metadata

```yaml
BlockID: J
Version: v5.5j
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockJ.locked::
OutputStyle: Markdown + YAML
CommentaryPolicy: HTMLHiddenUnlessAudit
TagEchoPolicy: SingleCanonTagOnly
```

