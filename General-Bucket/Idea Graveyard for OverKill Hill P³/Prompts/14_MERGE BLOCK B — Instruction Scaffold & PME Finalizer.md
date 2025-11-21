---

## 🧱 MERGE BLOCK B — Instruction Scaffold & PME Finalizer

### 🔗 Includes Finalized Prompts:

- PROMPT #17 — Instruction Overlay Template
- PROMPT #18 — Scaffold Activation & Metadata Collector
- PROMPT #28 — PME Instruction Rewriter (Full Audit Pass)

---

### 🧾 PROMPT #17 — 🏆 Platinum Twig Template Deployment

```yaml
prompt_id: PROMPT17
title: Platinum Twig Instruction Template
type: Deployment Overlay
depends_on: PROMPT00–PROMPT16
status: ACTIVE
```

#### Purpose

Deploys the full **Glee-fully Tool-ette Platinum Twig Instruction Template**, which functions as the structural foundation for Tool-ette logic, voice, flow, and feature expectations.

- Installs scaffolding for system instructions
- Injects placeholder callouts for function flow, tone, metadata
- Provides copy/paste-ready Markdown block

#### Prompt Text

```markdown
## 🏆 Glee-fully Tool-ette – Platinum Twig Instruction Template
*(Optimized for Function Delivery, Charm, and Character Budget Awareness)*

Paste this into your custom GPT’s instructions section and swap out bracketed values with the appropriate Tool-ette-specific content.

[...template content omitted for brevity — available in full reference blocks elsewhere...]
```

````

---

### 🧾 PROMPT #18 — 📦 Finalization Bundle Starter
```yaml
prompt_id: PROMPT18
title: Instruction Finalization & Metadata Collector
phase: PME Finalizer Block 1
depends_on: PROMPT17
status: ACTIVE
````

#### Purpose

Triggers the application of the finalized system instruction overlay and scaffolding. Captures:

- Short description
- Conversation starters
- Upload checklist
- Feature activation list

Functions as the metadata collector for GPT Builder UI finalization.

---

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

