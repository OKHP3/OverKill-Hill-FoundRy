## 🟪 PROMPT #02 — 🖼️ Icon Injection Phase

```yaml
prompt_id: PROMPT02
title: Icon Check + Generator (if needed)
type: Visual Identity Phase
depends_on: PROMPT01
status: PME_READY
```

### 🧠 Purpose

Determine if a visual icon is already present for this GPT. If not, dynamically generate a square-format icon prompt aligned with Glee‑fully suite visuals.

---

### 🪄 Prompt Text (Markdown)

If you uploaded an icon image in PROMPT #01, we’ll use it as the visual identifier.

If not, let’s create one! You’ll be guided through:

### ✨ Step 1: Pick a Visual Metaphor

We’ll suggest **five object-based metaphors** for the core function or tone of your GPT. Choose your favorite or suggest your own.

🎯 **Instructions**:

- Infer purpose from the GPT’s name and draft description
- Return iconic, noun-form objects only (e.g. 📋 clipboard, 🗂️ file folder)
- Avoid verbs or abstract symbols
- Include option 6: "🪄 Other – I’ll suggest one myself"

📌 Format:

1. Clipboard with checklist
2. Calendar page
3. Stack of sticky notes
4. Alarm clock
5. File folder
6. 🪄 Other – I’ll suggest one myself

Once selected, we move to:

### ✨ Step 2: Generate a Prompt

We’ll craft a **retro 70s–80s-style** image prompt using your selected metaphor.

🧾 Output Prompt Template:

> Create an image of a **2D digital illustration** in **retro 80s style**, featuring a **rainbow-winged butterfly** perched on the left side of a vintage nostalgic **[OBJECT]**. The word “**Glee‑fully**” appears in the **lower center foreground** in bold, cream-colored lettering. The background consists of wide **horizontal retro-colored stripes** in **cream, orange, mustard, teal, and navy**, with a soft print texture. Both the butterfly and **[OBJECT]** are outlined in bold black. The composition must be **square format**, suitable as a Custom GPT icon.

Use the result with DALL·E or your preferred AI image tool.

✅ Once your icon is ready, we proceed to metadata and personality construction.

---
