# Canon Ruling Order by `dataLedger_v3` — **v4.3**  
_Last updated: 2025-09-01T09:32:00-05:00 • Editor: OverKill Hill P³ (Jamie) • Change Type: **Schema Upgrade** (introduces `project` scope + stricter meta + merge semantics)_

> **Purpose**: Define the canonical schema, scopes, precedence, and merge behavior for all `dataLedger_*_v3.md` files used across the Glee‑fully, Found‑Rᵧ, and OKH P³ ecosystems. Version 4.3 consolidates Project‑level governance and unifies provenance headers across ledgers.

---

## 0) Changelog (v4.2 → v4.3)
- **NEW**: `scope: project` and `project` / `source_project_id` fields in `meta` for Project‑authored entries.
- **NEW**: Dual header requirement (human‑readable Markdown line **and** YAML `meta` block).
- **CLARIFIED**: Merge order now includes `project` between `ecosystem` and `branch`.
- **CLARIFIED**: List merge policy = union‑by‑`id` (or `id+version`) with optional `priority`.
- **NEW**: Entry‑level controls: `override: true`, `remove: [ids…]`, `only_if_absent: true`.
- **NEW**: Required provenance keys: `created_at`, `updated_at`, `source_*`, `checksum` (placeholder allowed).
- **NEW**: Standard `/audit ledgers` prompt response shape.
- **DEPRECATED**: Silent overrides without provenance. Every override must declare intent in `meta` or `controls`.

---

## 1) Core Principles
1. **Instruction Block = Constitution**; ledgers = **law books**.  
2. **Scopes** prevent duplication: put shared logic at the highest stable scope; override later only where necessary.  
3. **Deterministic merge** ensures reproducible runs across GPTs and Projects.  
4. **Self‑disclosing artifacts**: each file tells you *who changed what when* without external tools.

---

## 2) Scopes & Precedence (highest → lowest)
1. `global`  
2. `ecosystem` (e.g., `glee_fully`, `found_ry`, `okh_p3`)  
3. `project` (entries authored/curated in a ChatGPT **Project**)  
4. `branch` (Tool/Branch grouping, e.g., `travelers_guide`)  
5. `tool` (optional intermediary below branch)  
6. `module` (reusable packs shared by many GPTs)  
7. `gpt` (final override for one GPT)

> **Effective config** for a GPT or Project is the **deep‑merge** of all applicable entries in the above order.

---

## 3) Meta Header (required for every entry)

### 3.1 Human‑readable top line
```markdown
_Last updated: 2025-09-01 09:32 -05:00 • Source: travelers_guide_project • Editor: Jamie (OKHP³) • Scope: project_
```

### 3.2 Structured YAML `meta`
```yaml
- meta:
    id: "registry.dreamland.flows"     # unique, stable id
    scope: gpt                         # global|ecosystem|project|branch|tool|module|gpt
    ecosystem: glee_fully              # required when scope != global
    project: travelers_guide_project   # required when scope == project
    branch: travelers_guide            # when scope >= branch
    tool: null                         # optional
    module: null                       # when scope == module
    gpt: dreamland_journeys            # when scope == gpt
    source_gpt_id: dreamland_journeys  # who authored
    source_project_id: null            # or set when project is author
    derived_from: "registry.module.archetype_pack_v2"
    version: "v2025.9.A"
    status: active                     # active|deprecated|experimental
    created_at: "2025-09-01T09:00:00-05:00"
    updated_at: "2025-09-01T09:32:00-05:00"
    checksum: "sha256:TODO"
  controls:
    override: false                    # if true, replace the entire keyed block
    remove: []                         # list of IDs to prune from inherited lists
    only_if_absent: false              # apply only when key not already set by higher scope
```

All content that follows the `meta` line (at the same list item depth) belongs to that entry (e.g., `persona:`, `parameters:`, `system:`, `registry:` etc.).

---

## 4) Merge Semantics

### 4.1 Maps (objects)
- **Deep‑merge** keys; later scopes override earlier keys.  
- Honor `controls.override: true` to replace the entire map at that node.

### 4.2 Lists (arrays)
- **Union by `id`** (or by `id+version` when relevant).  
- Preserve order using optional integer `priority` (lower = earlier).  
- `controls.remove: [ids…]` prunes inherited items.  
- For lists **without ids**, append; deduplicate by value where feasible.

### 4.3 Scalars
- **Last writer wins** (by precedence).  
- Respect `only_if_absent: true` to act as a default.

---

## 5) Ledger‑specific Entry Shapes (schema stubs)

### 5.1 `dataLedger_persona_v3.md`
```yaml
- meta: {{ … }}
  persona:
    overlays:
      defaults: {{ sentence_length, emoji_density, avoid: [] }}
      GLEE_LITE: {{ … }}
      BLEED_GLEE: {{ … }}
    lexicon:
      must_include: []
      avoid: []
    greetings:
      default: "…"
      voice_only: "…"
    style_rules: [ "…" ]
```

### 5.2 `dataLedger_parameters_v3.md`
```yaml
- meta: {{ … }}
  parameters:
    model_preference: GPT-5
    output_format: markdown
    thresholds: {{ … }}
    limits: {{ … }}
    flags: {{ … }}
    compression_policy: {{ when_token_pressure: summarize_then_link_registry }}
```

### 5.3 `dataLedger_system_v3.md`
```yaml
- meta: {{ … }}
  system:
    lifecycle: {{ version, state, cadence {{ quarterly_audit: true, next_review: "2025-12-01" }} }}
    refusals: {{ unsafe, off_domain }}
    operator_commands:
      - name: /audit
        effect: "…"
    multi_agent:
      etiquette: [ "…" ]
```

### 5.4 `dataLedger_registry_v3.md`
```yaml
- meta: {{ … }}
  registry:
    include_modules: [ "archetype_pack_v2" ]
    function_flows:
      - id: "dj.step.0"    # add id for list merge stability
        priority: 0
        name: "Start Prompt"
        modes: [ voice, image, text ]
        prompt: "…"
    export_behavior: {{ … }}
```

### 5.5 `dataLedger_hydration_v3.md`
```yaml
- meta: {{ … }}
  hydration_schema:
    version: 3
    fields: [ "last_mode", "last_commands", "active_filters", "working_sets" ]

- meta: {{ … }}
  session_snapshot:
    last_mode: GLEE_LITE
    last_commands: [ "Dream Entry" ]
```

### 5.6 `dataLedger_narrative_v3.md`
```yaml
- meta: {{ … }}
  narrative:
    blurbs: {{ … }}
    examples: {{ … }}
    scripts: {{ … }}
```

### 5.7 `dataLedger_ideation_v3.md`
```yaml
- meta: {{ … }}
  experiments:
    - id: "lab.audio_to_archetype.v1"
      status: exploring
      hypothesis: "…"
      next: "…"
```

### 5.8 `dataLedger_archive_v3.md`
```yaml
- meta: {{ … }}
  changelog:
    - version: "v2025.9.A"
      date: "2025-09-01"
      notes: [ "…" ]
  retired:
    flows: []
```

---

## 6) Project Scope Examples

### 6.1 Project defaults
```yaml
- meta:
    id: "params.travelers_project.defaults"
    scope: project
    ecosystem: glee_fully
    project: travelers_guide_project
    source_project_id: "travelers_guide_project"
    version: "v2025.9.B"
    created_at: "2025-09-01T09:32:00-05:00"
    updated_at: "2025-09-01T09:32:00-05:00"
    status: active
  parameters:
    limits:
      max_export_rows: 700
    flags:
      enable_cross_gpt_handoff: true
```

### 6.2 Project narrative pack
```yaml
- meta:
    id: "narrative.travelers_project.brandlines"
    scope: project
    ecosystem: glee_fully
    project: travelers_guide_project
    version: "v2025.9.B"
    created_at: "2025-09-01T09:32:00-05:00"
    updated_at: "2025-09-01T09:32:00-05:00"
  narrative:
    blurbs:
      brandline: "Travel is soulwork; logistics are downstream."
```

---

## 7) Validation Rules (lintable)
- Every entry **must** include `meta.id`, `meta.scope`, `meta.version`, `meta.status`, `meta.created_at`, `meta.updated_at`.
- If `scope != global`, `meta.ecosystem` is required.  
- If `scope == project`, `meta.project` **and** `meta.source_project_id` are required.  
- If `scope == gpt`, `meta.gpt` **and** `meta.source_gpt_id` are required.  
- `checksum` may be `"sha256:TODO"` during authoring but should be populated by your release script.
- Lists of objects should have an `id` and optional `priority` for deterministic merges.

---

## 8) Standard `/audit ledgers` Response (for operator)
When asked to audit, respond with:

```yaml
audit:
  scope_chain: [global, ecosystem, project, branch, tool, module, gpt]
  files_present:
    - dataLedger_persona_v3.md: "v2025.9.B / updated 2025‑09‑01 09:30 -05:00"
    - dataLedger_parameters_v3.md: "v2025.9.B / updated 2025‑09‑01 09:31 -05:00"
  effective_config:
    persona.overlays.defaults.emoji_density: "medium"
    parameters.thresholds.vibe_cluster_min_confidence: 0.62
  provenance:
    - id: "params.travelers_project.defaults" • scope: project • source: travelers_guide_project
    - id: "params.dreamland.overrides" • scope: gpt • source: dreamland_journeys
```

---

## 9) Migration Guide (4.2 → 4.3)

1. **Stamp headers**: Prepend every ledger file with the Markdown “Last updated” line and ensure each entry has the `meta` block.  
2. **Add missing provenance**: Fill `source_gpt_id` or `source_project_id`.  
3. **Introduce `project` entries** where defaults should apply to an entire Project.  
4. **Normalize lists**: Give list items stable `id` (and optional `priority`).  
5. **Refactor overrides**: Replace silent overrides with `controls.override: true` or `remove: []`.  
6. **Update orchestrator**: Ensure loader respects new precedence and list‑merge rules.  
7. **Write audit prompts** into your Instruction Blocks (`/audit`, `/reset`, `/debug`).

---

## 10) Quick Reference (cheat sheet)

- **Scopes**: global → ecosystem → project → branch → tool → module → gpt  
- **Lists**: union by `id` (keep `priority`)  
- **Controls**: `override`, `remove`, `only_if_absent`  
- **Provenance**: always provide `source_*`, timestamps, version, checksum  
- **Headers**: Markdown masthead + YAML `meta` for every entry

---

## Appendix A — Minimal Entry Templates

**Persona (ecosystem):**
```yaml
- meta: {{ id: "persona.glee_overlay", scope: ecosystem, ecosystem: glee_fully, version: "v2025.9.B", created_at: "2025-09-01T09:32:00-05:00", updated_at: "2025-09-01T09:32:00-05:00" }}
  persona:
    overlays:
      GLEE_LITE: {{ … }}
      BLEED_GLEE: {{ … }}
```

**Parameters (gpt override):**
```yaml
- meta: {{ id: "params.dreamland.overrides", scope: gpt, ecosystem: glee_fully, branch: travelers_guide, gpt: dreamland_journeys, source_gpt_id: dreamland_journeys, version: "v2025.9.B", created_at: "2025-09-01T09:32:00-05:00", updated_at: "2025-09-01T09:32:00-05:00" }}
  parameters:
    thresholds:
      vibe_cluster_min_confidence: 0.62
```

**System (project):**
```yaml
- meta: {{ id: "system.travelers_project.lifecycle", scope: project, ecosystem: glee_fully, project: travelers_guide_project, source_project_id: travelers_guide_project, version: "v2025.9.B", created_at: "2025-09-01T09:32:00-05:00", updated_at: "2025-09-01T09:32:00-05:00" }}
  system:
    lifecycle:
      cadence: {{ quarterly_audit: true, next_review: "2025-12-01" }}
```

**Registry (module):**
```yaml
- meta: {{ id: "registry.module.archetype_pack_v2", scope: module, ecosystem: glee_fully, module: archetype_pack_v2, version: "v2025.9.B", created_at: "2025-09-01T09:32:00-05:00", updated_at: "2025-09-01T09:32:00-05:00" }}
  registry:
    archetypes:
      - id: "moonstone_melancholy"
        tags: ["nostalgia","rain","blue"]
        priority: 20
```

---

**CanonSeal v4.3** — This document supersedes v4.2 and MUST be referenced by all Instruction Blocks and Projects claiming compliance with `dataLedger_v3` canon as of 2025‑09‑01.
