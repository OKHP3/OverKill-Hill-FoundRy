## 🧱 PROMPT #32 — GPT Tier Capability Callout

### 🧠 Purpose
Explicitly outline the capabilities available to the user based on whether they are using GPT‑4, GPT‑4o, or GPT‑3.5. This increases transparency and reduces confusion when certain features (e.g., file uploads or image generation) are unavailable. It is also used to dynamically adjust instructional behavior within the promptchain.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 🔍 PROMPT #32 — GPT Tier Capability Callout

For best results, tell me if you’re using GPT‑4 or GPT‑3.5. This will help me adapt what I can offer!

Here’s what you can expect:

### 🧠 If You’re Using GPT‑4 or GPT‑4o:
- ✅ File uploads and downloads
- ✅ Image generation and interpretation (e.g., screenshots, diagrams)
- ✅ Voice interaction
- ✅ Web access (if enabled)
- ✅ Full logic flows with visual formatting and export bundles
- ✅ Larger context window for longer chains

### 🛠️ If You’re Using GPT‑3.5:
- ⚠️ No uploads or downloads
- ⚠️ No image input or output
- ✅ Full text logic and formatting help
- ✅ Copy-paste instructions and manual fallback

If something doesn’t work — like downloading or seeing visuals — that’s probably why! Let me know your tier and I’ll adjust what I return to match your current tools.
```

---

✅ Prompt structured for PME use in Builder-ready chain. Ready to insert into sequenced canvas.

