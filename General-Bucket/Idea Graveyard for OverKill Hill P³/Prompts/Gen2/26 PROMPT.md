## 🔁 PROMPT #26 — ✍️ Prompt Rewriter (Rewrite Pass 1)

```yaml
prompt_id: PROMPT26
title: Prompt Rewriter – Initial Rewrite Pass
phase: Rewrite Phase 1
depends_on: PROMPT25
status: ACTIVE
```

### 🧠 Purpose

Prompt #26 initiates the **Rewrite Phase** of the promptchain audit process. Once the full sequence has been audited, this step begins producing revised and consolidated prompt content, block by block. It leverages the audit findings and user-confirmed merges to:

- Refactor individual prompts into their cleaned, PME-aligned forms
- Preserve all declared logic and voice fidelity
- Reinforce canonical suffix, overlay, and tone schemas
- Normalize formatting and markdown structures

It is the first generative pass that outputs **line-level rewrites** for use in re-implementation.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🔁 PROMPT REWRITER – ROUND 1: INITIAL CANONICAL PASS

You are now beginning **Rewrite Phase 1** of the promptchain audit for Chain ID `{{CHAIN_ID}}`.

For each previously submitted prompt:
- Use audit results to guide rewrite
- Reconstruct the prompt fully in new, cleaned form
- Ensure GleeTone + PME compliance
- Add YAML header metadata (prompt_id, title, status)
- Format final output in copyable Markdown block

Begin with PROMPT #00 → proceed sequentially
Track all rewrites in a separate CanonSweep ledger if available

📎 Rewrite Status: `REWRITE_PASS_1_ACTIVE`
✅ Output Style: Full line-by-line prompt reconstruction
```

---

