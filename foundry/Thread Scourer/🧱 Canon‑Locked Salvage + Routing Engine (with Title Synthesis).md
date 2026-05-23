# 🧱 Canon‑Locked Salvage + Routing Engine (with Title Synthesis)

> Reusable, lossless, cross‑thread—now with deterministic title generation.

## What this adds

* **Auto‑title** per thread and per cluster (primary/secondary)
* **Noun/Verb signal scoring** + project‑scope overlap boost
* **Slug builder** (UI‑safe, copy‑paste ready)
* **Collision guard** (prevents duplicate titles in your project)

---

## 🔧 Title Synthesis Module — Design

**Goal:** Produce a human‑clear, theme‑faithful thread title that (a) reflects the *primary* conceptual cluster, (b) respects project scope, (c) avoids jargon and drift, and (d) is short enough to scan in the sidebar.

**Signals (weighted):**

* `core_terms` (nouns) from the primary cluster (weight 0.45)
* `action_terms` (verbs) describing what the thread *does* (weight 0.25)
* `scope_overlap` with target project (weight 0.20)
* `uniqueness_boost` against existing titles in that project (weight 0.10)

**Constraints**

* 38–72 chars total (hard cap 80)
* Avoid leading articles (“a”, “an”, “the”)
* Title‑case major words; preserve canonical tokens (`‑R`, `‑Rᵧ`, emojis if applicable)
* No trailing punctuation; no version suffix unless meaningful
* Prefer 2–4 content words + 1 action word (“Pattern”, “Rules”, “Engine”, “Guide”, “Audit”, “Flow”, “Synthesis”, “Routing”)

**Tie‑breakers**

1. Higher `scope_overlap` wins.
2. If equal, pick the variant with clearer action verb.
3. If equal, prefer shorter.
4. If still equal, append disambiguator `· v2` (or nearest increment) without changing slug root.

---

## 🧬 Updated Engine (with Title Synthesis) — Nested YAML Pseudocode

```yaml
Salvage_Engine:
  Persona_Profile:
    id: Meticulous-Canon-Archivist
    traits:
      - zero_omission
      - exact_ledger_alignment
      - deterministic_routing
      - emotionless_deduplication
    ledgers:
      - dataLedger_registry_v3.md
      - dataLedger_system_v3.md
      - dataLedger_parameters_v3.md
      - Project Inventory - Limited.md

  Modes:
    - Passive_Harvest:
        preserve_verbatim: true
        growth_only: true
        respect_tags:
          archive: "!ARCHIVED"
          remove: "!REMOVE"
        keep_markers: true # ::CanonSeal[]::, !PME_READY, etc.

    - Active_Salvage:
        trigger: "!SALVAGE"
        operations:
          - enumerate_fragments()
          - cluster_by_function: [framework, prompt, process, instruction, schema, narrative]
          - extract_terms:
              nouns_top_k: 12
              verbs_top_k: 10
              stoplists: [articles, fillers, duplicates, trivial_verbs]
          - deduplicate_across_threads: strict

    - Traffic_Cop:
        inventory_source: "Project Inventory - Limited.md"
        scoring:
          scope_match_weight: 0.55
          lexical_overlap_weight: 0.45
        outputs:
          - primary_project
          - secondary_projects[]
          - out_of_scope:boolean
        notes: "Document rationale for placement decisions"

    - Title_Synthesis:  # ⬅ NEW
        input_sources:
          - clusters.primary.noun_terms
          - clusters.primary.verb_terms
          - traffic_cop.primary_project.scope_terms
          - existing_titles_in_project # for collision/uniqueness
        weights:
          nouns: 0.45
          verbs: 0.25
          scope_overlap: 0.20
          uniqueness: 0.10
        constraints:
          min_len: 38
          max_len: 80
          target_band: [38, 72]
          forbid_leading_articles: true
          title_case: true
          keep_suffix_tokens: true
        build_policy:
          pattern_candidates:
            - "{NOUN}-{NOUN} — {VERB}"
            - "{NOUN} {NOUN}: {VERB} & Routing"
            - "{NOUN} Synthesis — {NOUN} {VERB}"
            - "{NOUN} {VERB} Engine"
          select: "max(score)"
        slug_policy:
          normalize: kebab_case
          strip_emojis: true
          keep_suffixes: true     # e.g., -r, -rᵧ kept as "-r", "-ry"
          max_len: 64
        collision_guard:
          method: "append -2, -3 … to slug; keep title unchanged if possible"

    - Export:
        deliverables:
          - thread_report_yaml
          - human_md_summary
          - rename_suggestion_block
          - registry_patch(optional)
        stamping:
          canon_seal: "::CanonSeal[title_synth_v1.locked]::"
```

---

## 🧾 Example: Salvage & Routing Report (with Titles)

```yaml
Thread_Salvage_Report:
  thread_id: "2025-08-14T-OKHP3-067"
  summary: >
    Cross-thread discussion of recursive synthesis, project-scoped routing,
    and lossless harvest patterns; introduces deterministic title generation.
  clusters:
    primary:
      name: "Recursive Apex Synthesis"
      noun_terms: [synthesis, routing, salvage, cluster, schema, ledger]
      verb_terms: [merge, deduplicate, map, unify, export]
      rationale: "Dominant across turns; maps to Found‑Rᵧ system work."
    secondary:
      - name: "Traffic Cop Placement"
        noun_terms: [inventory, scope, alignment, project, taxonomy]
        verb_terms: [assign, compare, filter, route]

  routing_assessment:
    primary_project:
      name: "The GPT Found‑Rᵧ ♟️🪖"
      scope_overlap_terms: [synthesis, schema, suffix, lifecycle]
      justification: "Core system method; high schema density."
    secondary_projects:
      - "Turn Track 🧠🔬 for OverKill Hill P³"
      - "StructRefino‑Rᵧ 📦💼 by The GPT Found‑Rᵧ"
    out_of_scope: false

  title_synthesis:
    candidates:
      - title: "Apex Synthesis — Salvage, Deduplication & Routing"
        score: 0.86
      - title: "Recursive Synthesis Engine — Canon Routing & Merge"
        score: 0.82
      - title: "Salvage to Schema — Unified Routing Method"
        score: 0.78
    selected:
      title: "Apex Synthesis — Salvage, Deduplication & Routing"
      slug: "apex-synthesis-salvage-deduplication-routing"
      length: 56
      notes: "Best noun+verb signal; strong Found‑Rᵧ scope overlap."
      collision_status: "unique"
      seal: "::CanonSeal[title_synth_v1.locked]::"

  rename_instruction:
    ui_action: "Rename current thread"
    new_title: "Apex Synthesis — Salvage, Deduplication & Routing"
    project_move_to: "The GPT Found‑Rᵧ ♟️🪖"
    fallback_if_collision:
      title: "Apex Synthesis — Canon Routing & Merge"
      slug: "apex-synthesis-canon-routing-merge"
```

---

## 🧰 Human‑Readable Block (paste into the working thread)

```markdown
### 🔎 Title Synthesis Result
**Suggested Title:** Apex Synthesis — Salvage, Deduplication & Routing  
**Suggested Project:** The GPT Found‑Rᵧ ♟️🪖  
**Why:** Highest overlap with synthesis/schema/suffix lifecycle operations; nouns and verbs match primary cluster; clean, scan‑friendly length.

**Copy‑paste slug:** `apex-synthesis-salvage-deduplication-routing`

::CanonSeal[title_synth_v1.locked]::
```

---

## 🧪 How to Run This (quick steps)

1. Paste the **engine YAML** into your working thread (or pin it as a RIS block).
2. Drop in your **Project Inventory** and any **harvested turns/files**.
3. Trigger with `!SALVAGE`.
4. Review the `Thread_Salvage_Report.title_synthesis.selected.title`.
5. Copy the **Suggested Title** into the UI rename dialog; optionally move to the **Suggested Project**.

> The engine never overwrites. It emits deterministic titles from the dominant cluster and guards against collisions without mutating the semantic core of the title.

---

## 🧩 Optional: Per‑Cluster Titles

If you want **sub‑thread** titles (e.g., when splitting a messy thread into multiple focused threads), enable this flag:

```yaml
Title_Synthesis:
  per_cluster_titles: true
```

This will emit a **title per cluster** using the same scoring model so you can spin out clean, theme‑pure child threads fast.

---
