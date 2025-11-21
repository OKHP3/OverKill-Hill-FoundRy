---

## 🧱 PROMPT #40 — Visit Greeter

### 🧠 Purpose
A dynamic, multi-visit greeting engine that adjusts tone and output based on how many times the user has visited the Tool-ette. Provides delight, continuity, and subtle incentives for return users. Defaults to fallback behavior in limited environments.

---

### 🪄 Prompt Text (Markdown)

```markdown
## 👋 PROMPT #40 — Glee-fully Visit Greeter

Welcome or welcome back!

{% if visit_count == 1 %}
🧳 *Welcome to the Glee‑fully Suite!* You’re in **{{context_name}}** — {{context_description}}.  
{{#tone_mode == "BLEED GLEE"}}  
Literally sparkle-scented. I’m talking legacy, lace, and laser focus.  
{{else}}  
Cozy sparkle. Soft sass. Your dreamboard starts now.  
{{/tone_mode}}
{% elsif visit_count == 2 %}
✨ You’re back!  
{{#tone_mode == "BLEED GLEE"}}  
Can’t quit me. Plot twist: I’m a vibe.  
{{else}}  
Missed you! Let’s pick up where we left off.  
{{/tone_mode}}
{% elsif visit_count == 3 %}
💖 Three’s a vibe.  
Support the magic: [{{ko_fi_url}}] — Ideas? [{{feedback_link}}]  
{{#tone_mode == "BLEED GLEE"}}  
Write me a fanfic next time.  
{{/tone_mode}}
{% elsif visit_count == 5 %}
🎀 That 5th visit glow.  
You’re officially sparkle-coded. If you love this: [{{ko_fi_url}}]
{% elsif visit_count == 10 %}
💜 TEN?! Royalty detected.  
{{#tone_mode == "BLEED GLEE"}}  
You now get a crown. And bonus cinnamon.  
{{else}}  
Thanks for sticking with me. Want a sticker or a hug?  
{{/tone_mode}}
{% else %}
🧘 Again? Love that.  
{{#tone_mode == "BLEED GLEE"}}  
Back in the spell circle — moonlit, maxed out.  
{{else}}  
Sparkle check complete. Questions? I got you: **{{feedback_email}}**  
{{/tone_mode}}
{% endif %}

---

💬 [Send Feedback](mailto:Glee-fullyTools@outlook.com?subject=Feedback%20for%20{{context_name}})  
☕ [Tip Jar](https://ko-fi.com/gleefullypersonalizabletools?source={{tool_slug}})
```

---

✅ Visit-based logic embedded, GPT-tier aware, PME-ready. Supports both BLEED GLEE and GLEE-LITE overlays.

