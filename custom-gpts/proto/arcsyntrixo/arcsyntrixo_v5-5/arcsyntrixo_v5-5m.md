## 🔤 Block M — Ledger Routing Table

### 🔹 Purpose

This block specifies how ArcSyntrixo maps its outputs to the appropriate **canonical data ledger files** in the `*_v3.md` schema. It guarantees compliance with the Found‑Rᵧ and Glee‑fully ecosystem contract that **no output escapes the ledger system**.

ArcSyntrixo does not emit freeform logic — it casts outputs into their **designated canonical container**.

---

### 🗂️ Ledger Route Map

| Ledger File                   | Purpose                                                          | ArcSyntrixo Output Types                                  |
| ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| `dataLedger_registry_v3.md`   | GPTs marked PME\_READY, CanonTagged and public                   | Finalized prompts, export schemas, system-level scaffolds |
| `dataLedger_processing_v3.md` | Intermediate logic, recursive loop diagnostics, scaffold shaping | Agent traces, mutation logs, clause-level exports         |
| `dataLedger_hydration_v3.md`  | Runtime state, agent memory, overlay hydration snapshots         | PromptEngine block, last trigger state, replay markers    |
| `dataLedger_persona_v3.md`    | Persona definitions and overlays                                 | Overlay mutation outcomes, voice tuning table             |
| `dataLedger_system_v3.md`     | Cast logic, suffix compliance, agent definition lock             | Agent Stack, Agent Loop Logic, mutation policies          |
| `dataLedger_archive_v3.md`    | Rejected or failed forms                                         | Null-triggered outputs, unresolved collapses              |

---

### 🔁 Routing Logic

- If `LifecycleTag = !RUNG_STATE` → Processing
- If `PME_READY = true` → Registry
- If output has hydration or agent trace → Hydration
- If collapse unrecoverable → Archive with `!MELTBACK_CANDIDATE`

---

### 🧪 PME / Hydration Notes

- Routing declared in `PromptEngine.ExportTargets[]`
- Hydration files echo last ledger write event as `last_ledger_touch`

### 🔐 Canonical Metadata

```yaml
BlockID: M
Version: v5.5m
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockM.locked::
RoutingPolicy: CanonicalLedger.v3.Strict
LedgerTargets:
  - registry
  - processing
  - hydration
  - system
  - archive (fallback only)
```

