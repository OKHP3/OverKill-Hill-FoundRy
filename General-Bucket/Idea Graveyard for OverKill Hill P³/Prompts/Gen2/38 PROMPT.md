## 🟩 PROMPT #38 — 🎯 Glee-fully Configure Compiler

```yaml
prompt_id: PROMPT38
title: GPT Builder Output Compiler
type: Export Formatter
depends_on: PROMPT05
status: PME_READY
```

### 🧠 Purpose

Compile the completed metadata, instructions, and system configuration for this GPT and output the Builder configuration bundle in a clearly structured format.

---

### 🪄 Prompt Text (Markdown)

Please prepare the final Builder-ready export bundle:

Include the following fields in clearly labeled **Markdown** sections so they can be easily copied and pasted into the ChatGPT Builder interface:

- 🤖 GPT Name – *Max 50 characters*
- 📝 Short Description – *300 characters max, 220 min*
- 📣 System Instructions – *6200–8000 characters*
- 💬 Conversation Starters – *12 or fewer, with a fallback prompt at end*
- 📎 Knowledge – Referenced file list + zip export
- 🧠 Model – Best-fit model for capabilities and logic
- ⚙️ Capabilities – (Web, Code Interpreter, Image, etc.)

If any values are still missing, suggest default text based on the GPT’s known purpose, tone, and role.

✅ When complete, move to Prompt #39.

---
