---

# 🧱 MERGE BLOCK F — ForgeMode Round 2 – Tone Saturation

🔗 Includes Prompts:

- **PROMPT #11** — ForgeMode Pass 5: PME Compression & Lock-In
- **PROMPT #12** — PME Validator + Tone Amplifier
- **PROMPT #13** — Optional Overlay Saturation (BLEED GLEE Mode)
- **PROMPT #14** — PME Length + Completeness Validator
- **PROMPT #15** — PME Readiness Finalizer

🧠 **Purpose**: This block applies the final tone amplification, compression, and readiness validation before PME\_LOCK. It ensures tone saturation, visual clarity, system instruction polish, and final GPT export readiness for Builder submission.

---

## 🟨 PROMPT #11 — 🧹 ForgeMode Pass 5: PME Compression & Lock-In

```yaml
prompt_id: PROMPT11
title: ForgeMode Pass 5 – PME Compressor
phase: ForgeMode Round 2
depends_on: PROMPT10
status: ACTIVE
```

### 🧠 Purpose

This is the final pass before PME\_LOCK. It compresses the system instruction block without compromising clarity, structure, or tone. It validates PME compliance and finalizes export format readiness.

---

### 🪄 Prompt Text (Markdown)

Begin **Pass 5: PME Compression + Final Polish**

- Restructure if needed for logic clarity and character efficiency
- Confirm 6200–8000 character length for GPT Builder compatibility
- Run PME readiness checks:
  - ✅ Persona alignment
  - ✅ Metadata references
  - ✅ Embedded logic and flow
  - ✅ Canonical suffix + tone compliance

If all criteria met, return:

> PME\_READY ✅

---

## 🟨 PROMPT #12 — 🧠 PME Validator + Tone Amplifier

```yaml
prompt_id: PROMPT12
title: PME Validator – Tone + Logic Checker
depends_on: PROMPT11
phase: ForgeMode Round 2
status: ACTIVE
```

### 🧠 Purpose

Ensure final PME output reflects the strongest possible interpretation of the original idea. Sharpen metaphor, tone, logic clarity, and visual presentation.

---

### 🪄 Prompt Text (Markdown)

🛠 Run a final polishing pass:

- Confirm metaphors align with function (e.g. Tools, Tool-ettes)
- Optimize tone anchors (fun but professional, snappy yet clear)
- Maximize user guidance clarity

Return a **sharpened PME block**.

➡️ Then proceed to Prompt #13 for optional flair mode.

---

## 🟨 PROMPT #13 — 🎭 Optional: Overlay Saturation (BLEED GLEE Mode)

```yaml
prompt_id: PROMPT13
title: GLEE-LITE / BLEED GLEE Amplifier
phase: ForgeMode Round 2
depends_on: PROMPT12
status: OPTIONAL
```

### 🧠 Purpose

Infuse maximum flavor using the BLEED GLEE overlay. Used for GPTs that benefit from warmth, sparkle, and personality at peak saturation.

---

### 🪄 Prompt Text (Markdown)

🩷 Run optional BLEED GLEE saturation pass:

- Infuse “freak’n,” “OMG,” Stevie Nicks sparkle, and cozy sass
- Maximize emotional engagement and visual metaphor
- Avoid overkill if base tone is formal or corporate

Use `GleeTone.LITE` or `BLEED GLEE` overlays as appropriate.

---

## 🟨 PROMPT #14 — 📏 PME Length Check + Validator

```yaml
prompt_id: PROMPT14
title: PME Length + Completeness Check
phase: ForgeMode Round 2
depends_on: PROMPT13
status: ACTIVE
```

### 🧠 Purpose

Validate that the final PME instruction block meets Builder constraints.

---

### 🪄 Prompt Text (Markdown)

Please validate:

- Character count: 6200–8000
- All sections present
- Format compatibility with Builder

Return: `PME_VALID ✅` or list issues to resolve.

---

## 🟨 PROMPT #15 — 🧪 PME Readiness Finalizer

```yaml
prompt_id: PROMPT15
title: PME Readiness Final Pass
phase: ForgeMode Round 2
depends_on: PROMPT14
status: FINALIZER
```

### 🧠 Purpose

Declare final readiness for PME\_LOCK export and Builder integration.

---

### 🪄 Prompt Text (Markdown)

✅ If all checks passed:

> PME\_LOCKED ✅ | Chain ID: [X] | Date: [Today’s Date]

If unresolved issues remain, summarize next steps needed before lock-in.

---

