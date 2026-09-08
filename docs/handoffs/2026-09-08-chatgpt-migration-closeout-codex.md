# ChatGPT project migration closeout

Task ID: chatgpt-migration-closeout

Status: tooling validated; source migration blocked on source file and project inventory.

Repository: OKHP3/OverKill-Hill-FoundRy.
Task owner and integration owner: Codex root.
Base: 7d2d964; branch: codex/chatgpt-migration-closeout.

## Scope and acknowledgement

The owner requested a complete audit of this task, GitHub publication of its
deliverables, and small-model delegation for remaining work. Codex root accepted
the migration skill package and this closeout record on 2026-09-08.
Same-host subagents received bounded assignments: streaming helper/tests and a
read-only evidence audit. Both use gpt-5.6-luna at low effort, the smallest model
available to this subagent interface. Root integrates once.

Unrelated concurrent repository edits are excluded. No sibling repository,
private source corpus, or capability release is authorized by this record.

## Confirmed completed before this closeout

- The export-first proposal and source manifest contract were authored.
- The original migration skill, three evaluation designs, and catalog entry are
  present in the fetched main branch. The checkout initially matched origin/main.
- These files document a process; they do not prove a migration took place.

## Current closeout work

- Bundle a local streaming splitter for oversized conversation JSON.
- Test filtering, exact raw preservation, alternate branches, malformed input,
  record limits, and overwrite prevention.
- Update the skill for current public governance and source-data trust boundaries.
- Record a fourth evaluation design for large input and malicious source instructions.

## Remaining activities and dependencies

1. Obtain the actual export file. The owner supplied `custom-gpts/ingestion/`;
   recursive inspection found older Aurifexo working material, no export ZIP or
   gigabyte-scale conversations JSON. The largest existing file was 6,222,379 bytes.
2. Establish authenticated access and enumerate the target project's threads,
   project instructions, files, and other supported artifacts with a dated cutoff.
3. Run extraction against the real export, normalize the selected conversation
   records, and reconcile IDs, all available branches, and assets.
4. Recover UI-only or missing content and record inaccessible or expired assets.
5. Review and incorporate public-safe material into repository artifacts with
   per-source routing and preservation of contradictions/historical versions.
6. Complete a live skill evaluation if a benchmark or production-readiness claim
   is required. Existing eval JSON is test design, not completed live evidence.

Notion is optional and was never configured as a required migration dependency.
No account settings, memory restoration, or new ChatGPT thread creation is implied.

## Archive decision

Not ready to archive as a fully completed migration. The tool package can be
published independently, but the source-dependent acceptance criteria above must
be completed or explicitly transferred/removed by the owner before full closeout.

## Validation evidence

- Six streaming regression tests passed with Python via `py -3`, including
  multi-megabyte records, tiny chunks, branch counts, filtering, byte hashes,
  malformed records, size guard, and existing-output rejection.
- `py -3 scripts/governance-check.py` temporarily passed after another process
  corrected an unrelated historical release hash. After merging updated main,
  the final check failed again with GOV-PUBLIC-020. This remains a review blocker;
  the six extractor regressions passed on the reconciled branch.
- Filename dry-run reported no changes needed.
- Browser surface discovery timed out; authenticated project access is unverified.
- No real export run, 1.5 GB performance measurement, live comparative skill
  benchmark, project inventory, or semantic incorporation is claimed.
- A concurrent process committed and amended shared-checkout work during this
  task. Root preserved that history and applied a focused parser correction;
  those concurrent commits must not be represented as isolated root work.

Exact next input: actual export ZIP or conversations JSON in the supplied folder,
or its full path elsewhere.
Exact next operation: validate its shape and select the project inventory IDs.
