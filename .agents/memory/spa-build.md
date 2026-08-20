---
name: Custom GPT Creator SPA
description: Build record and runtime facts for the Custom GPT Creator SPA in artifacts/mockup-sandbox.
---

## Rule
The dedicated `custom-gpt-creator` web artifact serves the runnable SPA, while `mockup-sandbox` remains the Canvas artifact for isolated component previews. The creator bridge imports the canonical page and data source from the sandbox rather than maintaining a copy.

**Why:** The product needs a deployable browser application without breaking the existing canvas preview surface. Sharing the canonical source keeps the two surfaces from drifting.

**How to apply:** Keep the creator artifact’s managed workflow and artifact metadata as the runtime authority. Preserve the sandbox’s `/__mockup` service and its generated preview registry when changing shared creator source.

## Key runtime behavior
- The canonical creator shell and all page modules remain in the sandbox source; the dedicated web artifact is the deployable entrypoint.
- The creator uses `useState` navigation rather than browser URL routing.
- All state persists to localStorage per step key (`cgpt-step-0` through `cgpt-step-8`) and the creator-navigation key.

## OKH brand tokens applied
- Background: `#111827` | Surface: `#181f26` | Panel: `#1e2936`
- Accent: `#c46a2c` (orange) | Accent-hi: `#e6a03c` (amber)
- Fonts: Alfa Slab One (headings), DM Sans (body), JetBrains Mono (mono/labels)
- Loaded from Google Fonts in index.html

## Attached assets deleted
All 12 source knowledge files in `attached_assets/` were deleted after incorporation into `src/data/knowledge.ts`.

## Export
Export page reads all localStorage keys and assembles a Markdown spec package; also offers Instructions-only view for pasting directly into ChatGPT builder.
