## 🧱 PROMPT #44 — Download Link Check

### 🧠 Purpose
Ensures that the downloadable ZIP archive of all Knowledge files used in the GPT is present, correctly named, and accessible before final export. This prompt verifies packaging completeness and prevents missing resources in the Builder upload flow.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 📦 PROMPT #44 — Knowledge File Download Check

Let’s make sure the **download link for all required Knowledge files** is ready.

### 📁 Review Checklist:
- ✅ ZIP file includes all referenced files:
  - `dataLedger_*.txt` (all 8 canonical)
  - Entity maps, prompt icons, or metadata files
  - Any attached input payloads (if declared as source)
- ✅ File is named clearly (e.g. `GleeGPT_KnowledgeBundle_v1.zip`)
- ✅ ZIP link is active, shareable, and accessible to Builder or collaborators

---

### 🔗 Insert Download Link Below:
```plaintext
https://... (Paste final file location or confirm it will be manually inserted)
```

If you haven’t generated the archive yet:
> “Download link for all necessary Knowledge files in zipped format isn’t present — let’s create it before finalizing.”

If file paths are symbolic:
> “Ensure actual file contents are bundled, not just path references.”

> "Don’t leave the bundle behind — it’s like showing up to a party without the snacks."
```

---

✅ Prompt is PME-ready. Consider pairing with PROMPT #43 in final validation loop.

