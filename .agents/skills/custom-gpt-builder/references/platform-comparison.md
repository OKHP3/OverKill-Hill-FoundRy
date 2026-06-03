# Platform Comparison: Custom GPT vs. Gemini Gem vs. Copilot Declarative Agent

## One-Line Summaries

- **Gem** = saved expert prompt (lightest weight, Google-native, fastest to create)
- **Custom GPT** = configurable assistant product (most flexible, best Actions support)
- **Declarative Agent** = enterprise-scoped Copilot extension (Microsoft Graph, A2A, governed)

---

## Three-Way Feature Matrix

| Dimension | Custom GPT (OpenAI) | Gemini Gem (Google) | Copilot Declarative Agent (Microsoft) |
|---|---|---|---|
| **Home platform** | ChatGPT | Gemini | Microsoft 365 Copilot / Copilot Studio |
| **Underlying model** | GPT-4o (and variants) | Gemini 1.5 / 2.0 | GPT-4o via Azure OpenAI |
| **Licensing to build** | ChatGPT Plus ($20/mo) or higher | Free (basic Gems); Advanced ($19.99/mo) for full features | M365 Copilot enterprise license |
| **Licensing to use** | Plus minimum for shared GPTs | Free on Gemini Basic | M365 Copilot seat |
| **Instructions** | Free-text system prompt, no published char limit | Free-text + "magic wand" auto-rewrite assist | Free-text or auto-generated from natural-language description |
| **Context window** | 128K tokens (typical) | Up to 1M tokens (8× ChatGPT) | Varies; inherits Copilot's model limits |
| **Knowledge files** | Upload files → vector-indexed RAG retrieval | Upload files + live Google Drive sync | SharePoint sites, OneDrive, M365 Graph, Copilot Connectors, uploaded files |
| **Knowledge architecture** | Personal file store (static upload) | Upload + live Drive sync | Microsoft Graph (org-wide search across M365 data) |
| **Tool/capability toggles** | Web Search, Canvas, DALL-E, Code Interpreter (binary on/off) | Single "Default Tool": None / Create Image / Canvas / Deep Research / Music / Guided Learning | Code interpreter, image generator, capabilities per Copilot plan |
| **API / external data** | Actions via custom OpenAPI schema (JSON/YAML) + OAuth | No custom API actions; Google ecosystem integrations only | API plugins, Power Automate connectors, custom engine agents for complex logic |
| **Multi-agent** | No native A2A | No native A2A | A2A protocol; agents can compose and delegate to other agents |
| **Sharing model** | Private / Link / GPT Store (public marketplace, 200K+ GPTs) | Private / Public (Gem Gallery, 10K+ public Gems) | Admin-governed via Integrated Apps; tenant-level controls |
| **Builder accessibility** | Low barrier, high ceiling | Lowest barrier, medium ceiling | Medium barrier, highest ceiling |
| **Customization ceiling** | High: instructions + knowledge + actions + capability toggles | Medium: instructions + knowledge + single tool selection | High: instructions + Graph + plugins + Power Automate + A2A |
| **Ecosystem lock-in** | OpenAI / ChatGPT only | Deep Google Workspace integration | Deep M365 integration: Teams, Outlook, SharePoint, OneDrive natively |
| **Computer use / automation** | Code Interpreter only (sandboxed Python) | Limited | Emerging computer use (web/desktop app interaction where APIs unavailable) |
| **Governance** | Builder controls visibility | Minimal governance controls | IT admin governed; tenant policies apply |
| **Monetization** | GPT Store revenue sharing (limited program) | None | None (enterprise license) |
| **OpenAPI / Actions limits** | 300 chars/endpoint description, 700 chars/param, 100K char payloads | N/A | Plugin schemas; platform limits apply |

---

## Deep Dive: Gemini Gems

Gems are Google's equivalent inside Gemini. They bundle Name, Description,
Instructions, an optional Default Tool selection, and optional Knowledge file
uploads into a reusable assistant.

**Where Gems win over Custom GPTs:**
- Free to start (no Plus subscription required)
- 1M token context window — 8× ChatGPT's typical limit, critical for long-document work
- Live Google Drive sync — knowledge files update automatically when source docs change
- Faster to build — lighter configuration surface, fewer decisions

**Where Custom GPTs win over Gems:**
- Actions: full custom API integration via OpenAPI schemas (Gems have no equivalent)
- Capability control: binary toggles per tool (Gems have a single tool selector)
- Publishing: GPT Store with 200K+ listings (Gems have Gem Gallery, smaller reach)
- Instruction depth: more established builder patterns, larger community of templates

**When to use a Gem instead of a Custom GPT:**
- User is deeply embedded in Google Workspace (Docs, Sheets, Drive)
- Knowledge base lives in Google Drive and needs live sync
- Long-document tasks benefit from the 1M context window
- Budget constraint: no ChatGPT Plus subscription available

---

## Deep Dive: Copilot Declarative Agents

Microsoft's equivalent sits inside Microsoft 365 Copilot and Copilot Studio.
Declarative agents rely on Copilot's built-in orchestration, search, and reasoning.

**The fundamental architectural difference:**
A Custom GPT's knowledge layer is a personal file store — you upload PDFs and they
get vector-indexed. A Copilot declarative agent's knowledge layer is the
**Microsoft Graph** — it can search across your organization's actual SharePoint
documents, emails, Teams messages, and calendar data without you uploading anything.
This is a different class of enterprise knowledge access.

**Where Declarative Agents win:**
- Org-wide knowledge grounding via Microsoft Graph (no uploads needed)
- A2A (agent-to-agent) protocol: agents can compose and delegate to each other
- Power Automate integration: can trigger multi-step workflow automation
- Enterprise governance: IT admin controls, tenant-level policies, audit trails
- M365 surface integration: appears natively in Teams, Outlook, SharePoint

**Where Custom GPTs win:**
- Speed to prototype: minutes vs. days for enterprise deployment
- No IT admin dependency for personal or small-team tools
- Lower licensing cost for individual or small-team use
- More flexible Actions design outside Microsoft ecosystem
- Larger builder community and published examples

**When to use a Declarative Agent instead of a Custom GPT:**
- Organization runs M365 and wants agents grounded in corporate data
- Multi-agent orchestration (A2A) is required
- IT governance, audit trails, and tenant controls are non-negotiable
- Power Automate workflow integration is part of the use case

---

## Decision Framework

```
Start here:
├── Is the user in a Microsoft 365 enterprise environment?
│   └── YES → Does the agent need corporate SharePoint/Teams/email data?
│       ├── YES → Copilot Declarative Agent
│       └── NO → Custom GPT (faster to build, no IT dependency)
├── Is the user primarily in Google Workspace?
│   └── YES → Does the agent need live Google Drive sync?
│       ├── YES → Gemini Gem
│       └── NO → Custom GPT (better Actions, more customization)
└── General case / prosumer / indie builder → Custom GPT
```

---

## Evolution Timeline

| Period | Construct | Platform | Status |
|---|---|---|---|
| Late 2022 | ChatGPT launches | OpenAI | Active |
| Early 2023 | ChatGPT Plugins | OpenAI | Deprecated 2024 |
| Mid 2023 | Custom Instructions (account-level) | OpenAI | Active |
| Nov 2023 | Custom GPTs + GPT Store announced | OpenAI | Active |
| Jan 2024 | GPT Store public launch | OpenAI | Active |
| Mid 2024 | Gemini Gems launch | Google | Active |
| Late 2024 | Copilot Studio Agent Builder (declarative agents) | Microsoft | Active |
| 2024–2025 | MCP protocol emerges | Anthropic (broadly adopted) | Active, growing |
| 2025 | Claude Projects launch | Anthropic | Active |
| Early 2026 | GPT-4o retired from ChatGPT (newer models replace) | OpenAI | Models sunset |
| Mid 2026 | Multi-agent orchestration (A2A), computer use | Microsoft, Google, Anthropic | Emerging |

The trajectory: isolated chatbots → configurable assistants → tool-using agents →
composable multi-agent systems. Custom GPTs sit at "configurable assistant." The
industry is moving toward autonomous, multi-agent architectures, but Custom GPTs
remain the most accessible entry point for non-developers.
