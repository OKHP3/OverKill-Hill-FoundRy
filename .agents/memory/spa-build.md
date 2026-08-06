---
name: Custom GPT Creator SPA
description: Build record and runtime facts for the Custom GPT Creator SPA in artifacts/mockup-sandbox.
---

## Rule
The Custom GPT Creator SPA lives at `artifacts/mockup-sandbox/`. Its dev workflow is "Custom GPT Creator SPA" running `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/mockup-sandbox run dev` on port 5000 (webview).

**Why:** The artifact.toml was originally configured for port 8081 / BASE_PATH=`/__mockup` for the mockup-sandbox canvas system. We override both at the workflow level to serve the main app on port 5000.

**How to apply:** Any time the SPA workflow is reconfigured, keep `PORT=5000 BASE_PATH=/` in the run command.

## Key source layout
- `src/App.tsx` — main shell; sidebar nav, page routing via useState (no react-router)
- `src/data/knowledge.ts` — all reference constants (INSTRUCTION_LAYERS, CAPABILITIES, AUDIT_ITEMS, PLATFORMS, TAXONOMY, etc.)
- `src/pages/` — one file per step (BuildBrief, ConversationContract, InstructionStack, KnowledgeFiles, Capabilities, ActionsApps, ConversationStarters, TestMatrix, ShipGovern) + AuditMode, PlatformCompare, ExportPackage
- `src/index.css` — OKH forge tokens as Tailwind v4 `@theme` custom properties
- All state persisted to localStorage per step key (`cgpt-step-0` … `cgpt-step-8`)

## OKH brand tokens applied
- Background: `#111827` | Surface: `#181f26` | Panel: `#1e2936`
- Accent: `#c46a2c` (orange) | Accent-hi: `#e6a03c` (amber)
- Fonts: Alfa Slab One (headings), DM Sans (body), JetBrains Mono (mono/labels)
- Loaded from Google Fonts in index.html

## Attached assets deleted
All 12 source knowledge files in `attached_assets/` were deleted after incorporation into `src/data/knowledge.ts`.

## Export
Export page reads all localStorage keys and assembles a Markdown spec package; also offers Instructions-only view for pasting directly into ChatGPT builder.
