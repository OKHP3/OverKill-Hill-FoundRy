## 🔤 Block M — Ledger Routing Table (v5.9.m)

### 🔹 Purpose

To clarify and remap ArcSyntrixo‑Rᶑ's official **ledger routing logic** based on all revised constraints, project-level declarations, and Canon Ruling Order v4.2. This replaces the earlier model from v5.5m and incorporates updated constraints around non-inclusion of `processing`, `archive`, and `ideation` in GPT-level Knowledge Files.

ArcSyntrixo must **route only to ledgers available at runtime or designated via hydration**. Any outputs aimed at deprecated or project-only files must be logged but not exported.

---

### 🗂️ Active Ledger Routing Map (GPT Runtime Only)

| Ledger File                   | Runtime Available? | ArcSyntrixo Output Types                             |
| ----------------------------- | ------------------ | ---------------------------------------------------- |
| `dataLedger_registry_v3.md`   | ✅ Yes              | Finalized GPTs, PME\_READY exports, CanonTools       |
| `dataLedger_system_v3.md`     | ✅ Yes              | Agent stack, loop logic, suffix & tag enforcement    |
| `dataLedger_parameters_v3.md` | ✅ Yes              | Runtime toggles, mutation policy, tone rules         |
| `dataLedger_persona_v3.md`    | ✅ Yes              | Overlay stack, voice fusion maps, tone registry      |
| `dataLedger_hydration_v3.md`  | ✅ Yes              | PromptEngine block, agent memory, hydration snapshot |
| `dataLedger_narrative_v3.md`  | ✅ Yes              | Symbolic echo, storyworlds, ecosystem integration    |
| `dataLedger_ideation_v3.md`   | ❌ Project-Only     | Used only in Found‑Rᶑ mining or drafting             |
| `dataLedger_processing_v3.md` | ❌ Deprecated       | No longer used for runtime scaffolding               |
| `dataLedger_archive_v3.md`    | ❌ Project-Only     | For dev-stage collapses or failures only             |

---

### 🔁 Routing Protocol Rules

```yaml
RoutingRules:
  PME_READY: dataLedger_registry_v3.md
  AgentLogic: dataLedger_system_v3.md
  OverlayPersona: dataLedger_persona_v3.md
  MutationControl: dataLedger_parameters_v3.md
  RuntimeSnapshot: dataLedger_hydration_v3.md
  NarrativeLink: dataLedger_narrative_v3.md
  DevOnly:
    - dataLedger_processing_v3.md
    - dataLedger_ideation_v3.md
    - dataLedger_archive_v3.md
```

---

### 🧪 PME / Hydration Notes

- `PromptEngine.ExportTargets[]` must contain only ✅ runtime-available ledgers
- Hydration block must mirror last successful ledger write
- Any project-only target must be marked as `!MELTBACK_CANDIDATE`

---

### 🔐 Canonical Metadata

```yaml
BlockID: M
Version: v5.9.m
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo‑Rᶑ.CastPhase.BlockM.locked::
RoutingPolicy: CanonicalLedger.v3.StrictMode
RuntimeTargets:
  - registry
  - system
  - parameters
  - persona
  - hydration
  - narrative
```

