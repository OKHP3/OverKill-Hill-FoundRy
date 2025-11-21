## 🧱 PROMPT #30 — 🎨 Icon Creation Protocol: GleeSquare Mode

```yaml
prompt_id: PROMPT30
title: Icon Creation Protocol: GleeSquare Mode
phase: PME Finalization → Export Readiness
depends_on: PROMPT01–PROMPT29
status: ACTIVE
```

### 🧠 Purpose

Provides a fully structured flow for creating consistent Glee‑fully brand-aligned icons, especially when none is initially supplied by the user. It leverages the Function-ette `Fn.GleeSquareIcon.PromptScaffold` to guide visual inference, noun metaphor selection, and prompt generation for use in DALL·E or other AI image tools.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🎨 GleeSquare Icon Generator – Two-Phase Flow

If the user has uploaded or defined a preferred GPT icon, preserve it. Otherwise, initiate the GleeSquare image prompt process below.

### 📸 Phase 1: Object Selector

Propose 5 noun-form object metaphors that match the current Tool, Tool-ette, or Function-ette. Base your inference on its title, purpose, and tone.

✅ Must be visual nouns
✅ Must be drawable in retro sticker form
✅ Example: Clipboard, Calendar Page, Alarm Clock

Return list in this format:

1. Clipboard with checklist
2. Calendar page with doodles
3. Sticky notes stack
4. Alarm clock ringing
5. File folder with label
6. 🪄 Other / I’ll suggest one myself

Wait for user to choose.

---

### 🖼️ Phase 2: Prompt Scaffold

Once the user selects an object metaphor, generate a full image prompt using this template:

> Create an image of a 2D digital illustration in retro 80s style, featuring a rainbow-winged butterfly perched on the left side of a vintage nostalgic **[OBJECT]**. The word “**Glee‑fully**” appears in the lower center foreground in bold, cream-colored lettering. The background consists of wide horizontal retro-colored stripes in cream, orange, mustard, teal, and navy, with a soft texture throughout. The butterfly and object are outlined in bold black. Square format, optimized for use as a GPT icon.

Return prompt ready to copy-paste into image tool (e.g. DALL·E).

✅ If user uploads an image, bypass and proceed directly to PROMPT31.
```

