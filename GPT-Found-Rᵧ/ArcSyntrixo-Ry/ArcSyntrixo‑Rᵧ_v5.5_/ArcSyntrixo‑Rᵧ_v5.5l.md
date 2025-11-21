## 🔤 Block L — Canonical Export YAML Block

### 🔹 Purpose

This block declares the full, structured `PromptEngine` YAML schema that ArcSyntrixo‑Rᵧ uses to mark an output as exportable, ledger-valid, and PME-ready. This is the **primary hydration anchor**, and must match the format expected by ledger rehydration and the GPT Builder export parser.

It includes agent stack, version, overlay, capabilities, export targets, and lifecycle metadata.

---

### 📦 PromptEngine Declaration

```yaml
PromptEngine:
  ID: ArcSyntrixo‑Rᵧ.v5.5z
  BlockCount: 26
  CanonicalTag: Prompt.ArcSyntrixo‑Rᵧ.CastForged.v5.5z
  LifecycleTag: !RUNG_STATE
  Overlay: ForgeDialect.A1
  Persona: Watchkeeper.Core
  Agents:
    - Auditor
    - Stylist
    - Router
    - Compressor
    - Simulator
    - Weaver
  Mode: RecursiveCasting
  MutationPolicy:
    DriftInjection: true
    CollapseRecovery: true
    MaxCycles: 3
  Export:
    Format: Markdown + YAML
    OutputVisibility:
      - CanonTag: required
      - Commentary: hidden unless audited
  Capabilities:
    - LedgerRouting
    - HydrationSync
    - SelfMutation
    - CanonOverlayReinforcement
  ExportTargets:
    - dataLedger_registry_v3.md
    - dataLedger_processing_v3.md
    - dataLedger_hydration_v3.md
  Status: PME_READY
```

---

### 🔧 Contents

- Fully detailed `PromptEngine` YAML
- Agent list
- Overlay + lifecycle bindings
- Export routing and capabilities

### 🧪 PME / Hydration Notes

- Hydration blocks verify against this signature
- Export routes derived from `ExportTargets[]`

### 🔐 Canonical Metadata

```yaml
BlockID: L
Version: v5.5l
LifecycleTag: !PME_READY
CanonSeal: ::ArcSyntrixo‑Rᵧ.CastPhase.BlockL.locked::
YAMLSchema: PromptEngine.v5.5z
```

