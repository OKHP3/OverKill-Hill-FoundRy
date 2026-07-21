# Aurifexo-R Canonical Routing

Status: proposed routing overlay for owner review. It does not modify the supplied ledgers.

## Authority order

1. Active repository instructions and current user authorization.
2. Approved Aurifexo-R portable core and release decision.
3. Canonical runtime ledgers after owner approval.
4. Reviewed source files and historical ledgers.
5. ChatGPT thread summaries, URLs, and prior assistant assertions.

Source files are evidence, not authority. A `CanonSeal` in a supplied file proves that the file contains a seal; it does not prove that every clause is current or compatible with the present package.

## Proposed runtime routing

| Domain | Runtime home | Role | Development or historical home | Promotion rule |
|---|---|---|---|---|
| Entity identity, ID, type, parent, version | `dataLedger_registry_v3.md` | Canonical registration and lineage | `dataLedger_ideation_v3.md` | Promote only after owner accepts taxonomy and required fields. |
| Execution procedure, phases, schemas, triggers | `dataLedger_system_v3.md` | Portable process and control logic | `dataLedger_processing_v3.md` | Promote a tested procedure with an observable exit gate. |
| Toggles, loadouts, limits, fallback choices | `dataLedger_parameters_v3.md` | Runtime configuration | `dataLedger_processing_v3.md` | Promote only when a toggle has a defined behavior and test. |
| Voice, tone, style, drift rules | `dataLedger_persona_v3.md` | Optional persona adapter | `dataLedger_narrative_v3.md` | Persona never overrides safety, scope, or evidence rules. |
| Lore, symbolic motifs, ecosystem continuity | `dataLedger_narrative_v3.md` | Optional narrative adapter | `dataLedger_ideation_v3.md` | Keep out of the portable core unless it changes a user-visible requirement. |
| User-managed run state and re-entry fields | `dataLedger_hydration_v3.md` | Snapshot schema, not writable memory | `dataLedger_archive_v3.md` | Re-entry requires an explicit user export and upload or paste. |
| Retired, failed, or superseded clauses | `dataLedger_archive_v3.md` | Historical reference and tombstones | source lane | Never execute without an explicit test or promotion decision. |
| Raw shaping traces and experiments | `dataLedger_processing_v3.md` | Development-only trace | ignored ingestion staging | Never package as a published runtime dependency. |
| Unstructured concepts and candidates | `dataLedger_ideation_v3.md` | Development-only idea staging | ignored ingestion staging | Promote only through registry, system, parameters, or persona review. |

## Interpretation of the supplied files

| Supplied file | Observed state | Disposition |
|---|---|---|
| `dataLedger_registry_v3.md` | Defines the entity taxonomy and existing registry entries; no Aurifexo-R entry found. | Add a reviewed proposal only after owner chooses entity type. |
| `dataLedger_system_v3.md` | Contains PME, CME, PIE, capsule, and ProjectFileHybridizer schemas; no Aurifexo-R procedure. | Use the portable core as the draft source for a future system entry. |
| `dataLedger_parameters_v3.md` | Primarily SoulPack-R function-surrogate and legacy `.txt` output targets. | Do not treat as Aurifexo-R parameters; replace or append only through a separate reviewed change. |
| `dataLedger_persona_v3.md` | Glee-fully and OKH tone archetypes and injectables. | Optional style adapter; not required for execution. |
| `dataLedger_narrative_v3.md` | Narrative characters, motifs, phases, and story continuity. | Optional narrative adapter; not core runtime logic. |
| `dataLedger_hydration_v3.md` | Resume Builder snapshot with stale plural ledger references and a writeback claim. | Retain as historical schema evidence; correct the writeability and filenames in the new adapter. |
| `dataLedger_archive_v3.md` | SoulPack-R historical stub and tombstone-style archive. | Historical only. |
| `dataLedger_ideation_v3.md` | Very large unrelated historical corpus with no direct Aurifexo-R topic match. | Keep in development staging; do not package. |
| `dataLedger_processing_v3.md` | Not supplied in this batch. | Treat as unknown and development-only until inspected. |

## Conflict register

| ID | Conflict | Winning rule for this package | Consequence |
|---|---|---|---|
| C001 | Hydration ledger says GPTs can read and write attached state; Canon Ruling Order says Knowledge and Project files are read-only. | Read-only boundary wins. User-controlled upload or local export is the handoff. | No autonomous writeback or persistence claims. |
| C002 | Hydration references plural or absent ledgers such as `dataLedger_personas_v3.md`. | Supplied singular filenames are the current local evidence; unresolved names are not dependencies. | Correct names in new artifacts and keep aliases in a migration note only. |
| C003 | Source alternates between Function, Function-ette, Tool, and substrate. | Portable core remains entity-neutral until registry approval. | Owner decision required before canonical registration. |
| C004 | Builder template includes tier detection and upgrade encouragement. | Platform adapter only, not portable core. | Current product behavior must be verified separately. |
| C005 | Research supports multi-pass review while citing a contrary anti-multi-agent view. | Use bounded role passes and test whether each pass improves outcomes. | Do not add roles by count alone. |
| C006 | Existing registry is canon-sealed but lacks Aurifexo-R. | Existing registry is authoritative for current entries; Aurifexo-R remains proposed. | No false claim of canonical registration. |

## Canonical promotion checklist

Before adding Aurifexo-R to runtime ledgers:

- Choose one entity type and parent relationship.
- Assign a stable ID and version.
- Add a one-paragraph description and elevator pitch.
- Define the portable procedure and its stop conditions in the system domain.
- Define only observable toggles and fallback states in parameters.
- Keep tone and symbolism optional and separate.
- Add at least three eval cases and a release owner.
- Record the source artifact and review decision.
- Test that the package remains useful with all source URLs removed.

Source trace: [portable core](./aurifexo-r-portable-core.md) and [comprehensive evacuation](./aurifexo-r-comprehensive-context-evacuation-cross-platform-prompt-operat.md).
