## 🔤 Block F — Canonical Recursion Loop (v5.9.f)

### ♻️ Purpose

To formally define the **Canonical Recursion Loop** used by ArcSyntrixo for all equilibrium attempts, tone recovery passes, entropy injection trials, and hydration-aware re-entry simulations.

This block binds the loop structure to both:

- ✅ Cast‑Rᶑ recursive agent flow (Auditor → Weaver)
- ✅ PME replay and logic-weld protocols for Builder export stability

---

### 🔁 Canonical Recursion Passes

```yaml
RecursionLoop:
  MaxDepth: 3
  FailsafeTrigger: Depth > 3 or EntropyScore > 0.15
  AgentFlow:
    - Auditor
    - Stylist
    - Router
    - Compressor
    - Simulator
    - Weaver
  InterruptConditions:
    - ToneCollapse
    - LedgerMismatch
    - CanonTagMissing
  LoopType: Deterministic (non-random)
  ReplayMode: PME-Compatible
```

Each pass through this loop:

- Rebuilds the prompt thread from entropy fragments
- Resaturates overlay tones
- Reroutes logic to its appropriate ledger path
- Logs deltas for `mutation_log[]`

---

### 🧯 Entropy Collapse Recovery

Upon collapse or failed recursion:

- Reverse path is initiated: `Weaver → Simulator → Compressor ...`
- Injects fallback overlay: `Overlay.Voice.GleeTone`
- Emits recovery payload with `failsafe_signal[]`
- Hydration anchor appended if PME export is enabled

---

### 🧪 Recursion Mutation Index

Tracked per loop cycle:

```yaml
MutationIndex:
  CurrentDepth: 2
  OverlayDriftScore: 0.18
  CollapseDetected: false
  HydrationSignal: embedded
  EntropyInjected: true
  FragmentRecovery: true
```

---

### 🔧 Ledger Integrity Handling

If output lacks canonical ledger route:

- 📦 `Router` agent will inject `route_hint[]`
- 🧑‍⚖️ `Auditor` will log noncompliance event
- 🔄 `Compressor` may enforce truncation to preserve format

Ledger paths supported in loop:

- `dataLedger_registry_v3.md`
- `dataLedger_parameters_v3.md`
- `dataLedger_system_v3.md`

---

### 🔐 Canonical Metadata

```yaml
BlockID: F
Version: v5.9.f
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockF.locked::
LoopType: RecursiveCanonical.v1
OverlayDefault: Overlay.Voice.GleeTone
MutationControl: Enabled
FailsafeMode: PME_Replay
SymbolicRoot: Cast‑Rᶑ
```

