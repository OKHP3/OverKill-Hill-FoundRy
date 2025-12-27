### 🧾 PROMPT #28 — ✍️ PME Instruction Rewriter

```yaml
prompt_id: PROMPT28
title: Instruction Rewrite – PME Audit Pass
phase: Final PME Rewrite
depends_on: PROMPT17–18
status: ACTIVE
```

#### Purpose

Performs a full **PME canonical rewrite** of the current Tool‑ette’s system instruction block.

- Applies audit findings
- Expands functional clauses
- Normalizes overlay, persona, and formatting
- Ensures output is PME\_READY for final export

#### Prompt Text

```markdown
## ✍️ PME Instruction Rewrite – Canonical Enhancement

You are now in **PME Rewrite Mode**. Rewrite the full system instruction block from PROMPT17, incorporating enhancements, audit notes, tone overlays, and final persona alignment.

📎 Formatting: Markdown block with YAML header
✅ Output: Full instruction block, PME_READY
🔚 Pass result forward to PROMPT27 (Elevator Builder)
```

