## 🔾 PROMPT #25 — 🧰 Promptchain Audit Engine

```yaml
prompt_id: PROMPT25
title: Promptchain Audit Processing Engine
phase: Active Audit Mode
depends_on: PROMPT24
status: ACTIVE
```

### 🧠 Purpose

Prompt #25 handles the **execution logic** of the promptchain audit after it has been invoked by Prompt #24. This engine inspects the full set of prompts submitted, one by one, while:

- Validating structural integrity
- Evaluating the clarity, tone, and intent of each step
- Assessing redundancy, drift, contradiction, or missing dependencies
- Mapping phases, merges, and optimal grouping logic
- Inferring latent prompt function where not declared

It acts as the heart of the `AUDIT_CHAIN_ACTIVE` status and ensures all downstream logic is informed by a complete and coherent understanding of the prompt series.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 📅 PROMPTCHAIN AUDIT ENGINE: Processing All Submitted Prompts

You are now processing the full set of prompts associated with Chain ID `{{CHAIN_ID}}`.

### ✅ TASKS:
1. Walk stepwise through each `PROMPT##` in order
2. Infer each prompt’s declared or implicit function (label it)
3. Detect:
   - Redundant steps
   - Contradictory logic
   - Opportunities to merge or simplify
4. Propose optimal grouping (MERGE BLOCKS)
5. Label each block with a semantic Merge ID
6. Track prompts with missing or placeholder content
7. Output a preview of recommended rewrites, merges, or skips

### ⏳ Audit Phase Status: `RUNNING_AUDIT_PASS`

Next: PROMPT #26 (Rewriter)
```

