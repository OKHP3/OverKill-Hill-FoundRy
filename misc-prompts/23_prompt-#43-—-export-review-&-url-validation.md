---

## 🧱 PROMPT #43 — Export Review & URL Validation

### 🧠 Purpose
Performs a final QA pass before export, specifically checking that all embedded URLs point to finalized targets, not placeholder slugs or incorrect entity links. This safeguard ensures each link is aligned with the correct GPT, Tool, Tool-ette, or Function-ette entity.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🔍 PROMPT #43 — Final URL & Functionality Check

Before we export this GPT, let’s confirm that:

- 🔗 All **URLs are final** — no placeholder slugs, no draft entity IDs
- 🧭 Internal references (parent/peer/sibling GPTs) point to **active Custom GPTs**
- 🧰 Suite, 🪚 Tool, and 🔩 Tool-ette references resolve to real, published entries
- 📬 Feedback or Ko-Fi links are correctly sourced (include `?source=...` tag)

---

### ✅ URL Checklist:
1. GPT Store link:
2. Parent Tool link:
3. Sibling Tool-ettes:
4. Feedback mailto:
5. Ko-Fi support URL:


---

### 🧠 Functional Sanity Checks:
- [ ] Does the system greeting trigger on first load?
- [ ] Are image uploads, downloads, and tier-aware fallback messages in place?
- [ ] Are export formats and output logic consistent?
- [ ] Are linked entities discoverable by new users?


> "Take a final pass through the canvas, pay particular attention to and reconfirm that all URLs have been corrected to point to the intended targets and not stubs, slugs, or placeholders."

> "Ensure that all functionality is tip-top and fully Glee-Approved. Complete in an OverKill Hill P\u00b3 fashion. \ud83d\udd0d"
```

---

✅ Prompt ready for PME lock-in. Consider pairing with PROMPT #36 as part of final closeout sequence.

