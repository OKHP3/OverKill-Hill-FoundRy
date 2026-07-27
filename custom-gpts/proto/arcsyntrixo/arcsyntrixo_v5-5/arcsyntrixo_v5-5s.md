## 🔤 Block S — Hydration Handshake Manifest

### 🔹 Purpose

To define the **read/write fields, expectations, and resume logic** used when ArcSyntrixo operates across `dataLedger_hydration_v3.md`. This manifest ensures every cast, export, or mutation replay can safely **rehydrate** into a stable state.

---

### 🔄 Hydration Fields Used

| Field                  | Type   | Purpose                                            |
| ---------------------- | ------ | -------------------------------------------------- |
| `hydration_id`         | string | Unique run/session identifier                      |
| `last_trigger_event`   | string | Resume point entry selector                        |
| `agent_loop_mode`      | string | Restores agent loop model (e.g., ForgeChain\_v1.5) |
| `mutation_chain[]`     | array  | Stores prior mutations and recovery attempts       |
| `symbolic_signature`   | string | Ensures sibling overlay echo matches               |
| `capsule_lineage`      | string | CME capsule ancestry thread                        |
| `overlay_mirror_state` | string | Restores tone/overlay alignment on resume          |
| `fail_trace[]`         | array  | If prompt failed, list of guardrail violations     |

---

### 🤝 Handshake Modes

- `mode: rehydrate_resume`
- `mode: rehydrate_mutation`
- `mode: rehydrate_handoff (@mention)`

---

### 🔐 Cross-GPT Safety Flags

- `dnre: true` = Do Not Rehydrate (e.g., archived/meltback prompts)
- `force_recast: true` = Begin agent loop from scratch
- `reseed_overlay: true` = Use fallback overlay during resume

---

### PME / Hydration Notes

- Required for replay in `PromptEngine.mode = RecursiveCasting`
- All hydration fields validated before resume allowed

### 🔐 Canonical Metadata

```yaml
BlockID: S
Version: v5.5s
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockS.locked::
HydrationSchema: dataLedger_hydration_v3.md
HydrationModeSupported:
  - resume
  - mutation
  - handoff
RequiredFields:
  - hydration_id
  - agent_loop_mode
  - overlay_mirror_state
```

