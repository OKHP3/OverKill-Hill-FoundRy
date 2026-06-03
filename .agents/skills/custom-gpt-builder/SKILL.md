---
name: custom-gpt-builder
description: >
  Production-grade Agent Skill for designing, building, auditing, and maintaining
  OpenAI Custom GPTs as disciplined AI products. Activate when the user asks to
  create, refactor, audit, score, or govern a Custom GPT — or when they share a
  system prompt, knowledge files, or a GPT description and want to improve it.
  Covers the full build lifecycle: product brief, layered instruction architecture,
  knowledge-file engineering, capability/tool configuration, Actions vs. MCP policy,
  systematic red-team evaluation, and governed versioning. Includes cross-platform
  comparison against Gemini Gems and Copilot declarative agents, a four-tier quality
  rubric (Poor → Exemplary), and a 16-term taxonomy mapping Custom GPTs against all
  adjacent generative AI constructs. Built to the agentskills.io open standard for
  cross-agent portability.
---

# Custom GPT Builder

A production-grade Agent Skill for converting prompt ideas into versionable,
reusable, testable GPT build packages. Guides builders from product brief through
instruction architecture, knowledge-file engineering, evaluation, and release.

## When to Use

- User asks to create, build, or design a Custom GPT
- User shares a system prompt and asks for improvement or review
- User wants to audit or score an existing GPT against a quality rubric
- User asks how Custom GPTs compare to Gemini Gems or Copilot declarative agents
- User wants to govern, version, or deprecate GPTs in a portfolio
- User asks what makes a GPT "good" or how to get consistent behavior

## Core Mental Model

```
Custom GPT = same engine, different briefing
           = Identity + Workflow + Instructions + Knowledge + Tools + Distribution
```

A Custom GPT is a **product design artifact**, not just a prompt. The builder's
job is product management + UX design + information architecture + prompt engineering
— not just writing instructions.

**The production litmus test:**
> If the GPT cannot outperform a well-written one-off prompt, it does not deserve
> to exist as a GPT.

---

## Build Lifecycle (10 Steps)

### Step 1 — Define the job (not the persona)

Answer one question before touching the builder:
**What single job does this GPT do that a plain ChatGPT prompt cannot do reliably?**

Bad: "Help with marketing."
Good: "Turn messy product ideas into landing-page copy, positioning, objections,
       FAQs, and a launch checklist — for solo founders — in one session."

Write down: specific task, user role, inputs they provide, expected output,
what the GPT must never do.

### Step 2 — Profile the user

Specify who the GPT serves. A GPT for "everyone" becomes generic sludge.
Examples: beginner user, enterprise architect, salesperson, student, developer,
internal employee, public customer. Tone, depth, and scope all flow from this.

### Step 3 — Define the repeatable workflow

Every strong GPT has a spine:
`Input → Diagnose → Retrieve context → Transform → Validate → Output`

Map the user's journey through this spine before writing a single instruction.

### Step 4 — Draft instructions off-platform

Write in a text editor first. Test in a scratch chat. Only move to GPT Builder
once the instructions reliably produce the target behavior.

Use the layered structure in `references/instruction-architecture.md`.

### Step 5 — Prepare knowledge files

See `references/knowledge-file-engineering.md` for chunking, manifest format,
naming conventions, retrieval testing, and failure diagnosis.

### Step 6 — Write conversation starters

4 starters that are **workflow launch buttons**, not slogans. Each should be
a specific task a user could click and immediately get value from.

Good: "Audit this resume against a senior enterprise architect role."
Bad:  "How can you help me?"

### Step 7 — Configure capabilities

Enable only what the job requires. Every extra capability is a failure path.

| Capability | Enable when |
|---|---|
| Web Search | Current facts, news, product research |
| Code Interpreter | Analysis, CSV transforms, file execution |
| Image Generation | Visual output is part of the job |
| Canvas | Collaborative editing is part of the workflow |
| Actions / MCP | Live API data is required (see note below) |

**Actions vs. MCP note:** Actions use a proprietary OpenAPI schema locked to
ChatGPT. MCP (Model Context Protocol) is the emerging open standard. For new
builds, prefer MCP-compatible tool design for cross-platform portability.
Actions are unavailable in Pro (o-series reasoning) mode.

### Step 8 — Test systematically with adversarial cases

See `references/evaluation-redteam.md` for the full test pack covering:
happy path, edge cases, out-of-scope refusals, knowledge retrieval verification,
prompt injection, and instructions-extraction attempts.

### Step 9 — Version it

```
v0.1  Concept
v0.5  Usable prototype
v0.8  Tested beta
v1.0  Stable release
v1.x  Patch / knowledge refresh
v2.0  Major workflow redesign
```

Maintain a changelog. When behavior shifts after a model update, you need to
know what changed on your side vs. OpenAI's.

### Step 10 — Set visibility and ship

| Visibility | Use for | Requirement |
|---|---|---|
| Only Me | Iteration, personal tools | None |
| Anyone with Link | Team / client distribution | Share URL |
| GPT Store | Public marketplace | Verified builder profile |

Start at "Only Me." Promote once stable.

---

## Quality Scoring

Use the four-tier rubric in `references/quality-rubric.md` to score any GPT
across seven dimensions: Instructions, Knowledge Files, Conversation Starters,
Capabilities, Actions, Scope Discipline, and Maintenance.

**The inflection points:**
- Poor → Acceptable: caring enough to write real instructions
- Acceptable → Good: treating the GPT like a product (structured, curated, tested)
- Good → Exemplary: treating the GPT like production software (versioned, hardened,
  retrieval-optimized, maintained)

---

## Platform Comparison

See `references/platform-comparison.md` for the full three-way comparison:
Custom GPT (OpenAI) vs. Gemini Gem (Google) vs. Copilot Declarative Agent (Microsoft).

**One-line summary:**
- Gem = saved expert prompt (lightest, Google-native)
- Custom GPT = configurable assistant product (most flexible, best Actions support)
- Declarative Agent = enterprise-scoped Copilot extension (Microsoft Graph, A2A, governed)

---

## AI Terminology Taxonomy

See `references/ai-taxonomy.md` for the 16-term taxonomy mapping Custom GPTs
against: Chat, Thread, Prompt, Project, Connector, Plugin, MCP, RAG, Agent,
Skill, Assistant (API), Fine-Tuning, Gem, Declarative Agent, and more.

---

## Instruction Architecture Reference

See `references/instruction-architecture.md` for:
- The canonical 9-section instruction template (copy-paste ready)
- Layer-by-layer writing guide
- Anti-patterns and common failure modes
- Instruction density vs. length guidance

---

## Knowledge File Engineering

See `references/knowledge-file-engineering.md` for:
- How RAG chunking actually works inside Custom GPTs
- Why files get ignored and how to fix it
- Manifest/index file format
- Retrieval testing methodology

---

## Files in This Skill

| File | Contents |
|---|---|
| `SKILL.md` | This file — build lifecycle, quick reference |
| `references/instruction-architecture.md` | Instruction template, layers, anti-patterns |
| `references/knowledge-file-engineering.md` | RAG mechanics, chunking, retrieval testing |
| `references/platform-comparison.md` | GPT vs. Gem vs. Declarative Agent (full) |
| `references/quality-rubric.md` | Four-tier scoring rubric with weighted criteria |
| `references/ai-taxonomy.md` | 16-term taxonomy of adjacent AI constructs |
| `references/evaluation-redteam.md` | Systematic test pack + adversarial cases |
