## BrandGuard Knowledge Forge Blueprint

### Purpose
This blueprint defines the reusable **prompt architecture** for generating 12–16 longform knowledge files per BrandGuard GPT. Each file will be produced within Canvas as a **machine-readable Markdown knowledge article** (8–30 pages, 6,000–30,000 words) containing references, citations, and structured metadata suitable for ingestion into Custom GPT or RAG pipelines.

---

### 1. Conceptual Rationale
Custom GPTs and similar LLM endpoints represent a **new digital surface for discovery and conversion**—the AI analogue to paid search in the early web era.

**1995 → 2025 parallel:**
- Then: Companies paid for visibility via **domain names and SEO/SEM.**
- Now: Companies can secure early share of voice in the **GPT Marketplace and Gemini Gem ecosystems.**

A well-trained Custom GPT acts as a **conversion funnel and trust proxy**, capturing queries that used to start on Google. The cost and complexity of entry are low, yet brand risk (if left unclaimed) is high—creating a first-mover opportunity similar to domain registration in the 1990s.

---

### 2. Core Output Definition
Each knowledge file will be:
- **Format:** Markdown (.md)
- **Length:** 8–30 pages (≈6,000–30,000 words / 8,000–30,000 tokens)
- **Sections:** 6–10 thematic blocks with subheadings and tables
- **Citation Discipline:** Inline parentheticals or footnotes to verifiable public-domain sources
- **Readability:** Structured for **machine parsing** (clear headings, tables, minimal prose drift)
- **Voice:** Neutral, educational, domain-authoritative (no speculation, no insider tone)

---

### 3. Universal Prompt Structure
Each BrandGuard knowledge-file prompt follows this architecture:

#### (1) Role Definition
```markdown
You are a domain-specific research and content synthesis agent for [COMPANY NAME]: BrandGuard.
Your task is to generate a verified, high-depth knowledge article suitable for ingestion into a custom GPT.
```

#### (2) Output Schema
```markdown
Output Format: Markdown (.md)
Target Length: 8–30 pages (6,000–30,000 words)
Include front matter, structured sections, tables, and a validation checklist.
```

#### (3) Front Matter Template
```yaml
---
title: "[Topic Title]"
version: "1.0"
topic_key: "[short_topic_key]"
date: "[YYYY-MM-DD]"
brand: "[BrandGuard GPT Name]"
---
```

#### (4) Section Blueprint
```markdown
## Introduction & Brand Context
## Core Products / Services Landscape
## Technology & Innovation Frameworks
## Market Position / Competitive Dynamics
## Sustainability & ESG Commitments
## Consumer Experience & Loyalty Systems
## Industry Trends / Partnerships / Collaborations
## Challenges & Future Outlook
## Likely User Questions
## Validation Summary (CanonSeal)
```

#### (5) Reasoning Directives
- Use **Chain-of-Thought (CoT)** for logical structuring.
- Use **Tree-of-Thought (ToT)** to branch complex analyses.
- Use **SCAMPER** for innovation ideation.
- Use **Constitutional Prompting** for factual and safety alignment.
- Include **tables** for comparisons, certification lists, and data summaries.
- Validate against at least **3 public sources per major claim.**

---

### 4. Execution Phases (Reusable per Company)
| Phase | Mode | Description |
|-------|------|-------------|
| **1. Schema & Outline Generation** | Thinking | Define front matter and section skeleton. |
| **2. Research Harvest** | Browsing | Collect public data, press releases, sustainability and CSR reports. |
| **3. Draft Composition** | Thinking / Canvas | Generate full Markdown document per schema. |
| **4. Validation Pass** | Thinking | Check citations, ensure completeness, add CanonSeal. |
| **5. Export & Archive** | Canvas / Python | Export to Markdown or PDF for ingestion. |

---

### 5. Adaptation Layer per BrandGuard GPT
Each of the 11 BrandGuard GPTs (e.g., LEGO, Starbucks, Brooks Running, Ping, Costco, Hershey, LVMH, Dollar General, Coca-Cola, Discount Tire, Scheels) inherits this base prompt structure.

Only the following vary per GPT:
1. **Brand-Specific Metadata:** brand name, domain key, ecosystem tone.
2. **Source Pool:** company website, CSR reports, investor statements.
3. **Voice Modifier:** playful (LEGO), elevated luxury (LVMH), value-conscious (Dollar General).
4. **Topical Emphasis:** e.g., “Sustainability Certifications” for BFS vs. “Customer Experience” for Starbucks.

---

### 6. Validation Checklist (Embedded in Each Article)
```markdown
✅ Front Matter Complete
✅ All Major Sections Present
✅ Minimum 3 Citations per Key Section
✅ SCAMPER / CoT / ToT Applied
✅ CanonSeal Present with Date
✅ Markdown Integrity Verified
✅ Machine-Readable Tables Used
✅ Length Target Achieved (8–30 pages)
```

---

### 7. End State
By executing this prompt blueprint, each BrandGuard GPT gains a **complete, self-contained knowledge corpus** composed of:
- 12–16 modular Markdown knowledge files
- Machine-readable, citation-backed brand intelligence
- Ready-to-ingest inputs for GPT Builder, Gemini Gems, or private RAG pipelines

The output functions as both **educational content** and **digital territory staking**—the modern equivalent of early internet domain registration, now expressed through Custom GPT ecosystems.

