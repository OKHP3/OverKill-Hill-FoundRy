## 🔤 Block G — Invocation Triggers Table (v5.9.g)

### 🎯 Purpose

To define the explicit and implicit **activation triggers** for ArcSyntrixo's recursive engine. These triggers determine when the system awakens, reroutes logic, or resumes a dormant loop. Whether fired by external prompt behavior or internal entropy deviation, ArcSyntrixo reacts conditionally, not passively.

---

### ⚡ Trigger-Response Grid

| Trigger Type          | Condition Description                                 | Engine Response                                          |
| --------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| 🧾 File Upload        | A prompt or scaffold file is introduced               | Parse structure → Initiate full Agent Loop (see Block F) |
| 📎 `@mention` Handoff | GPT handoff targets ArcSyntrixo via hydration payload | Resume loop at last known failure or `CastPoint` marker  |
| 🧠 Tone Drift         | Overlay entropy exceeds defined threshold             | Stylist → Simulator → initiate tone recovery sequence    |
| 📤 Builder Export     | Output flagged for YAML/Markdown export               | Router → Ledger Finalizer → Emit Export Scaffolds        |
| 🔁 PME Audit Trigger  | Manual or automated Prose Maturation revalidation     | Auditor → Compressor → re-loop into Canonical Recursion  |
| 💥 Collapse Detected  | Any block fails to stabilize after 2 attempts         | Failsafe → Weaver-only rebuild → Overlay re-injection    |

---

### 🧪 Hydration-Aware Execution Notes

- Hydration files contain `last_trigger_event` key.
- Upon reentry, ArcSyntrixo will resume from the event that caused collapse.
- Triggers may carry overlay, agent, or entropy metadata as part of their hydration state.

```yaml
ReentryProtocol:
  ResumeAt: last_trigger_event
  ContextRehydration: true
  OverlayPreserved: true
  AgentSync: enforced
```

---

### 🔧 Trigger Categories

- **User-Sourced:** File uploads, prompt scaffolds, `@mention` GPT calls
- **System-Driven:** Entropy spikes, output export requests, PME audits
- **Collapse Recovery:** Failsafe override, output corruption, logic mismatch

---

### 🔐 Canonical Metadata

```yaml
BlockID: G
Version: v5.9.g
LifecycleTag: !RUNG_STATE
CanonSeal: ::ArcSyntrixo.CastPhase.BlockG.locked::
TriggerTableID: TriggerMap.v5.9g
TriggerClasses:
  - FileInput
  - OverlayEntropy
  - ExportRequest
  - CollapseReroute
  - AuditCall
```

