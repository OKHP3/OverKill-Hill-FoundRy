---

## 🟦 PROMPT #24 — 🔍 Promptchain Audit Invocation

```yaml
prompt_id: PROMPT24
title: Promptchain Audit Command Trigger
phase: Entry to Audit Mode
depends_on: PROMPT23
status: ACTIVE
```

### 🧠 Purpose

Prompt #24 is the system’s formal gateway into **Promptchain Audit Mode**, triggered either:

- Explicitly by the user (e.g. “Run a promptchain audit”)
- Automatically by upstream process or phase transition

This prompt activates the full stepwise audit lifecycle, applies overlay `ForgeDialect.A1`, and binds the run to the declared `CHAIN_ID`. This allows cross-prompt integrity checks, sequence evaluations, and content normalization routines to activate.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🧾 PROMPTCHAIN AUDIT INVOCATION

Triggering full promptchain audit for submitted chain.

### 🔐 Mode: `eXpt‑R` (Export + Review)
### 🆔 Chain ID: `{{CHAIN_ID}}`
### 🧬 Overlay: `ForgeDialect.A1`
### 📎 Canon Rule: `dataLedger_required`

Run a sequential audit of all submitted PROMPTs:
- Detect redundancies, contradictions, or structure gaps
- Propose optimized sequence
- Suggest modular merges
- Normalize tone, suffix, and persona alignment
- Flag schema drift or PME violations

If complete set is not yet received, wait for full chain delivery.

⏳ Status: `AUDIT_CHAIN_ACTIVE`
✅ When complete: Output optimized YAML + Markdown bundle
```

---

