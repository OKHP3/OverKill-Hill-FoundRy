# Capability workbench backup migration design

Status: proposed implementation contract (F17). The current release has one
supported backup envelope: schema `okh-capability-workspace-backup`,
`schemaVersion: 1`, audience `overkillhill`, and lineage
`parentFoundry: OKHP3/OverKill-Hill-FoundRy` ([`capability-workbench.ts`](../artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L297-L350)). No earlier or additional supported schema is inferred here.

## Current v1 contract

The envelope contains `schema`, `schemaVersion`, `audience`, `lineage`,
`exportedAt`, and `workspace`; the workspace contains `version: 1`,
`activeId`, and a non-empty `projects` array. Each project has the exact fields
`id`, `name`, `kind`, `owner`, `version`, `purpose`, `audience`, `inputs`,
`outputs`, `constraints`, `instructions`, `acceptance`, `components`,
`skillRefs`, `evidence`, `reviewed`, `createdAt`, and `updatedAt`. `kind` is one
of `prompt`, `skill`, `workflow`, or `software`; `reviewed` is boolean; all
other listed project fields are text ([source](../artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L1-L63)).

Validation currently enforces 1–20 projects, unique non-blank IDs, an existing
`activeId`, no unknown project fields, UTF-8 byte limits of 40,000 per text
field, and a 2,000,000-byte import/export boundary ([source](../artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L32-L36), [validation](../artifacts/mockup-sandbox/src/lib/capability-workbench.ts#L114-L159)).

## Proposed migration API

Add a pure migration boundary around the existing parser. It accepts the raw
backup bytes/text and returns either a validated current workspace plus a
report, or a structured failure. Dispatch first on the envelope's
`schema`/`schemaVersion`; v1 is parsed by the current rules. Future adapters
must be explicitly registered. Unknown schema/version fails before any write.

The result should include:

* `status: "unchanged" | "migrated" | "failed"`;
* the source `schema` and `schemaVersion` when readable;
* a human-readable change list and warnings;
* the validated workspace only on success; and
* the original input bytes (or a durable reference to them) for recovery.

`dryRun: true` parses and validates, reports the planned adapter and changes,
and performs no storage write. A real migration must retain the exact original
bytes before replacement, write only after validation succeeds, and read back
the replacement. If validation, adapter execution, write, or read-back fails,
the old workspace remains authoritative and the saved original bytes remain
available for rollback. Import confirmation remains a separate user action;
the current UI already validates before offering replacement ([UI](../artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L214-L245), [confirmation](../artifacts/mockup-sandbox/src/pages/capability-workbench.tsx#L425-L445)).

Do not silently coerce unknown fields, invent defaults, or reinterpret an
unsupported historical format. A v1 input with no required change is
`unchanged`; a future adapter is `migrated` only when its output passes the
current workspace validator. Preserve source bytes even when the parsed value
is semantically identical.

## Acceptance fixture matrix

| Fixture | Expected result | Required evidence |
|---|---|---|
| Generated v1 backup, Unicode text | `unchanged`, same workspace | byte-preserved source and deep-equal parsed workspace; existing round-trip precedent ([test](../artifacts/mockup-sandbox/src/lib/capability-workbench.test.ts#L41-L47)) |
| v1 envelope with malformed JSON | `failed`, no write | current workspace and source bytes unchanged |
| v1 with wrong audience or lineage | `failed`, no write | explicit boundary error; source retained |
| v1 with duplicate ID or unknown project field | `failed`, no write | validator error; source retained ([tests](../artifacts/mockup-sandbox/src/lib/capability-workbench.test.ts#L49-L80)) |
| v1 over 2,000,000 UTF-8 bytes | `failed`, no write | import bound enforced before storage mutation |
| readable unknown `schemaVersion` | `failed`, no adapter call | exact bytes retained; rollback remains possible |
| readable unknown `schema` | `failed`, no adapter call | exact bytes retained; rollback remains possible |
| registered future fixture (when one exists) | dry-run report, then `migrated` after commit | adapter output validates; pre-migration bytes and post-write read-back match |
| simulated write or read-back failure | `failed`, rollback/authoritative old state | failure is observable; no partial replacement |
| dry run for every successful fixture | report only | storage snapshot and byte source unchanged |

The matrix is a contract for future implementation and fixtures; it does not
claim that migration adapters or rollback machinery exist in the current app.
