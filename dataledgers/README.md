# dataledgers

**Canonical Data Layer — Shared Persistent Memory for the OverKill Hill P³ Ecosystem**

The `dataledgers` folder is the backbone of the entire OverKill Hill P³ / Found-Rᵧ / Glee-fully ecosystem. Every GPT thread, instruction block, tool declaration, tone overlay, engine run, and archived fragment routes through one of the 9 canonical ledger files stored here. No output is considered canon-complete until it has been registered, routed, and committed to the appropriate ledger. The ledgers serve as shared state — a persistent memory layer that survives across sessions, threads, and GPT generations.

---

## The 9 Canonical Ledgers (v3)

All current ledgers are in Markdown format, CanonSealed, and follow the `dataLedger_*_v3.md` naming scheme.

| Ledger | Forge Phase | Domain | What Routes Here |
|---|---|---|---|
| `dataLedger_archive_v3.md` | ALL | Retired content, lineage preservation | Deprecated functions, retired clause fragments, surrogates awaiting deployment, legacy symbolic scaffolding no longer active in runtime but needed for lineage tracing or future hydration |
| `dataLedger_hydration_v3.md` | ALL | Runtime snapshots and thread transport | Session state exports (GPT identity, suffix overlays, PME lifecycle, active payloads, user goal, tone) used for cross-GPT handoffs, thread restoration across sessions, and debugging or cloning GPT states |
| `dataLedger_ideation_v3.md` | 🪨 Ideation | Raw concepts, riff sessions, proto-capsules | CME and PIE outputs, riff session transcripts, decomposed fragments, concept capsules tagged `!IDEA_STAGE`, thread seeds — raw and experimental; promoted or purged weekly |
| `dataLedger_narrative_v3.md` | ✨ Gleam-Rᵧ | Characters, themes, scenes, story logic | Plot capsules, scene definitions, character entries (Glee, The Smith, Magnus, Jamie, Echoes), narrative overlays, canonical motifs, ecosystem lore for surface-level publication |
| `dataLedger_parameters_v3.md` | ⚒️ Anvil-Rᵧ | Rule parameters, function mount logic | Tone enforcement rules, symbolic chain definitions, emoji-role mappings, glossary terms, function registration stubs, toggle and sequencing gate configurations |
| `dataLedger_persona_v3.md` | ALL | Voice archetypes, tone overlays, injectables | Tone archetypes (Bleeds GLEE, Oozes OKH, Glints Lumira, Crackles Caldre, Seeps Silex), Glee-ism vernacular, persona injectables, Glee-mode switch logic, emoji glossary index |
| `dataLedger_processing_v3.md` | ⚒️ Anvil-Rᵧ | Active runs, WIP states, debug logs | Active engine runs (PME, CME, PIE, CIE), intermediate outputs, temp logs, error/debug entries, unregistered clauses, write failures, CanonSweep-R recovery outputs |
| `dataLedger_registry_v3.md` | ALL | All entity declarations | Every finalized GPT (Toolbox, Tool, Tool-ette, Function, Function-ette) with canonical ID, type, URL, overlay, persona, lifecycle tag, conversation starters, and PME-ready status; compliance seals from CanonSweep-R |
| `dataLedger_system_v3.md` | ALL | Engine schemas and process templates | PME/CME/PIE/CIE configs, Rung tables, process flow templates (Riff→Capsule, Capsule→PME), ProjectFileHybridizer protocol, naming and suffix rules — executable logic only, no narrative |

---

## Most Frequently Referenced Ledgers

- **registry** — Every tool, function, and GPT declares itself here. The starting point for any compliance check.
- **processing** — Active work-in-progress. All engine runs, write failures, CanonSweep-R recovery outputs, and unregistered clause flags land here first.
- **persona** — Referenced on every thread that applies a tone overlay. Drift logging routes here.
- **archive** — Final destination for retired content; also the source for lineage tracing during hydration.
- **system** — Authoritative source for engine schemas and the ProjectFileHybridizer protocol.

---

## How Tools Read and Write to Ledgers

**Writing** — Tools produce outputs tagged with a ledger route (`→ dataLedger_*_v3.md`) and a lifecycle tag (`!PME_READY`, `!RUNG_STATE`, `!DRIFT_ALERT`, etc.). The write is considered committed when the ledger's SHA-256 hash, file size, or timestamp reflects the change. Uncommitted writes are flagged as `CanonMismatch` by CanonSweep-R.

**Reading** — Tools load ledger content at thread initialization to establish their persona, tone overlay, registry identity, and parameter configuration. Hydration files load the full session state from the hydration ledger.

**Audit** — CanonSweep-R runs a 4+1-step compliance check against all ledgers to verify that every clause in an external thread is properly tagged, routed, and committed.

---

## Subdirectories

### `past-versions/`
Contains v1 (`.txt`) and v2 (`.txt`) generations of the ledgers before the v3 Markdown consolidation. Includes archive, ideation, narrative, parameters, persona, processing, registry, and system ledgers across both generations, plus `emoji_glossary_index.md`, `masterinput.docx`, and `masteroutput.docx` from the consolidation effort. The hydration ledger was introduced in v3 and has no past-version files.

### `canon-ruling-by-dataledger/`
Constitutional reference documents governing ledger law. Contains:
- **Canon Ruling Order files** (`canon-ruling-order-by-dataledger_v3-v4-2.md`, `canon_ruling_order_by_dataledger_v3_v4-3.md`, `canon_ruling_order_v_3_x.md`) — versioned governance rulings that define override authority, provenance requirements, schema upgrade mandates, and the conditions under which ledger entries may be modified or sealed
- **Per-ledger v4.3 snapshots** — draft/preview versions of each ledger at the v4.3 schema level, used as reference templates for the next generation of ledger content

This directory is read-only reference material. It does not replace the active v3 ledgers.

---

## Ledger Version History

| Generation | Format | Naming |
|---|---|---|
| v1 | Plain text | `dataLedger_*.txt` |
| v2 | Plain text | `dataLedger_*_v2.txt` |
| v3 (current) | Markdown + YAML hybrid | `dataLedger_*_v3.md` |
| v4.x (draft) | Markdown + provenance headers | In `canon-ruling-by-dataledger/` only |

All tools currently active in the ecosystem write to the v3 ledgers. CoilingCrank-Rᵧ (v1.0.0-Hybrid) references the v2 ledger naming; cross-tool operations that span CoilingCrank-Rᵧ and v3-native tools should account for this schema difference.
