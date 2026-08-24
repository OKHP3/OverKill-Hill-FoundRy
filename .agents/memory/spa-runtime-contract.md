---
name: SPA runtime contract
description: Relationship between the Custom GPT Creator source pages and the current mockup sandbox entrypoint.
---

The Custom GPT Creator is a runnable browser-only SPA in its dedicated artifact, whose thin entrypoint reuses the canonical creator pages from the mockup-sandbox source. The mockup-sandbox artifact separately serves isolated forge previews.

**Why:** The Creator and Canvas preview surfaces intentionally share source components but have different runtime responsibilities. Confusing them produces misleading workflow and deployment conclusions.

**How to apply:** Creator features belong in the canonical pages and must be verified through the dedicated Creator workflow. Canvas-only preview behavior belongs to the mockup-sandbox entrypoint and must not replace the Creator application shell.