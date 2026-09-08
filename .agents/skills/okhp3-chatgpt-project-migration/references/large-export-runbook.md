# Large export extraction

Status: implemented helper; actual project migration requires source evidence.

## Contract

Input is a UTF-8 JSON top-level array of conversation objects. Inspect the actual
export shape before use. Extract a ZIP's JSON member locally first if necessary;
the helper does not accept ZIP or HTML. Preserve the original archive.

Output goes to a new directory. Choose an ignored local staging location or a
private archive outside Git. No network service, API key, or extra Python package
is required. Use Python 3; on Windows the launcher may be `py -3`.

From the repository root:

```powershell
py -3 .agents/skills/okhp3-chatgpt-project-migration/scripts/extract-conversations.py --help
py -3 .agents/skills/okhp3-chatgpt-project-migration/scripts/extract-conversations.py --input 'D:/PrivateArchive/conversations.json' --output 'custom-gpts/ingestion/project-capture-01' --ids 'D:/PrivateArchive/project-ids.txt'
```

Replace example paths with inspected source paths. The IDs file contains one
conversation ID per line from the project inventory. `--all` explicitly selects
the entire account corpus; use it only when that broader capture is requested.
Neither titles nor textual keyword matches prove project membership.

## Fidelity and failure handling

- Raw object bytes preserve unknown fields, all mapping nodes, alternate answers,
  and non-text metadata. A selected record is not summarized or flattened.
- Output metadata includes checksums and counts. Source hash proves identity of
  the scanned file, not completeness relative to the live ChatGPT service.
- Memory scales with the largest allowed record plus index metadata, not the
  entire file. `--max-record-mb` bounds individual record size; decoded Python
  objects can use several times the raw size. Raise it only with sufficient RAM.
- Malformed, truncated, oversized, or unsupported data must produce an incomplete
  result and nonzero exit. Preserve partial output for diagnosis and retry into
  a fresh directory. Do not silently skip bad input or overwrite an earlier run.
- Missing selected IDs and duplicate IDs require reconciliation. A full-file
  scan can succeed while project coverage remains incomplete.
- Attachment references are preserved, but their files are not downloaded or
  validated. Count actual assets separately. Project instructions, project files,
  Canvas content, and UI-only state also require explicit inventory.
- Split unusually long transcripts into ordered message-sized review chunks,
  retaining source IDs and all branches. Keep the raw record as authoritative.

## Repeat runs

Retain each source hash and capture date. Reconcile later exports by conversation
ID and record hash; a changed conversation must be reviewed again. Preserve prior
versions and detect renamed threads by ID. Record export/UI cutoff differences
before interpreting unmatched IDs as loss.

Run local regression checks:

```powershell
py -3 .agents/skills/okhp3-chatgpt-project-migration/tests/test-extract-conversations.py
```

Synthetic tests establish the helper's tested behavior. They do not establish
real 1.5 GB performance, complete project access, or an independent skill uplift
benchmark. Those remain separate evidence gates.
