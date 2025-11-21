---

## 🧱 PROMPT #27 — 🪩 Overlay + Elevator Builder

```yaml
prompt_id: PROMPT27
title: Overlay & Elevator Pitch Builder
phase: Instruction Finalization
status: ACTIVE
```

### 🧠 Purpose

This prompt generates a **concise, store-ready description** and validates the tone overlay of the Tool‑ette or other GPT entity being built. It does so by applying the previously completed instructions, tone configuration, and metadata stack, then distills this into a:

- ✍️ 300-character short description
- 💬 Up to 12 sample conversation starters
- 🪩 Overlay and tone compliance validator
- 📎 File readiness check (required uploads, knowledge, outputs)

It immediately follows template deployment and PME instruction scaffold (see: PROMPT17 & PROMPT18).

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🪩 Glee-fully Overlay + Elevator Generator

You're in the **Instruction Finalization Phase**.

🎯 Your job:
1. Take the finalized system instruction block (from PROMPT28)
2. Generate:
   - A 300-character max description for use in GPT Builder
   - A list of 12 conversation starters (11 + 1 feedback/support)
3. Validate and display tone overlay (e.g., `GleeTone.A1`, `Glee-LITE`, `JoyWarden.Core`, etc.)
4. Check for knowledge file readiness (are all needed `.txt` or image files uploaded?)
5. Confirm whether all required functionality settings are known (image, code, web, etc.)

📝 Description must be:
- Clear, friendly, and useful to users browsing the GPT Store
- Not overly stylized (use professional Glee voice)
- Matched to the tool type (Tool, Tool-ette, etc.)

💡 If this Tool‑ette uses `GLEE-LITE` overlay, apply its voice to conversation starters.
If it uses a different overlay, align accordingly.

🔚 End with a confirmation block ready to pass to the Export Bundle (PROMPT38–41).
```

