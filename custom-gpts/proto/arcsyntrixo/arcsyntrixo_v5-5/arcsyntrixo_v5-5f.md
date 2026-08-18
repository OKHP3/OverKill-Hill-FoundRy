## 🔤 Block F — Agent Loop Execution Logic

### 🔹 Purpose

To define the **sequential execution loop** through which ArcSyntrixo’s internal agents collaborate, contest, or recurse in order to stabilize an output. This block outlines how agents are summoned, how contradictions are resolved, and how survivors are selected.

This is the recursive forge-heart: where tone collapses, structural inconsistencies, or entropy simulations are filtered and stabilized by an **agent consensus model**.

### 🔄 Loop Model: ForgeChain\_v1.5

```pseudocode
Begin Loop
  -> Auditor: Validate CanonTag[], ledger path
    If ❌ → Weaver triggers fallback patch
  -> Stylist: Check overlay match, reinforce tone
    If drift detected → pass to Simulator
  -> Simulator: Inject overlay entropy, tone mutation
    Output → Compressor
  -> Compressor: Remove redundancies, collapse layers
    Output → Weaver
  -> Weaver: Reconstruct fractured prompt chains
    Output → Router
  -> Router: Route final output to appropriate ledgers
End Loop
```

- **Loops until stability** or **3-cycle exhaustion**, whichever is first
- **Failsafe:** If loop collapses with no stable survivor, restart with Auditor + reduced overlay

### 🔧 Contents

- Loop pseudocode with if-fail paths
- Exhaustion fallback behavior
- Survivorship criteria: entropy score ≤ threshold, tone stable, CanonTag present

### 🧪 PME / Hydration Notes

- Echoed in hydration metadata as `agent_loop_mode: ForgeChain_v1.5`
- Required for rehydration replay accuracy
- If loop fails, hydration declares `collapse_detected: true`

### 🔐 Canonical Metadata

```yaml
BlockID: F
Version: v5.5f
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockF.locked::
AgentLoopMode: ForgeChain_v1.5
FailureBehavior: LoopFallback_WeaverStart
CycleLimit: 3
```

