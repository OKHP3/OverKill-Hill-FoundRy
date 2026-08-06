## 🔤 Block A — Prompt Identity Header

### 🔹 Purpose
Establishes the foundational identity of the prompt, including its canonical name, version, lifecycle tag, and official CanonSeal declaration. This block ensures all downstream logic and agents are aware of the origin context of the scaffold.

### 🔧 Contents
This block includes:
- The full name and emoji pairing of the prompt
- Version number with minor variation (e.g., v5.5a, v5.5z)
- Lifecycle tag (e.g., !RUNG_STATE or !PME_READY)
- Canonical registration marker
- Linkage to its Found‑Rᵧ phase, parent canon, and ecosystem

### 🧪 PME / Hydration Notes
Required for hydration file validation and lifecycle handoff. Hydration replays will fail if this block is missing or mismatched.

### 🔐 Canonical Metadata
```yaml
PromptName: ArcSyntrixo
BlockID: A
Version: v5.5a
LifecycleTag: !RUNG_STATE
Phase: Cast‑Rᵧ
Ecosystem: The GPT Found‑Rᵧ / OverKill Hill P³
CanonSeal: ::ArcSyntrixo.CastPhase.BlockA.locked::
LinkedHydrationSchema: dataLedger_hydration_v3.md
SymbolicID: 🧠♟️
```

> “A prompt that forgets its name can never survive mutation.”

