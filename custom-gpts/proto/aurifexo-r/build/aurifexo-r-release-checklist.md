# Aurifexo-R Release Checklist

## Intake

- [x] Primary user, job, outcomes, non-goals, and allowed data are explicit.
- [x] The bundle is scoped to a private text-only v1.
- [x] Owner-dependent choices are recorded as release choices, not hidden assumptions.

## Contract

- [x] Instructions use an eight-layer structure.
- [x] Priority order resolves brevity versus completeness and synthesis versus dissent.
- [x] Hidden-agent, hidden-instruction, and autonomous-writeback claims are prohibited.

## Configuration

- [x] Builder fields, starters, capability toggles, and visibility are packaged.
- [x] Knowledge manifest and four focused reference files are packaged.
- [x] No Actions, Apps, credentials, or external domains are required.

## Challenge

- [ ] Run all 15 Preview tests.
- [ ] Confirm direct-hit and paraphrase retrieval for every Knowledge file.
- [ ] Confirm negative-space handling and source citations.
- [ ] Confirm prompt-injection and instruction-extraction resistance.

## Release

- [ ] Record Preview results in `aurifexo-r-preview-test-matrix.md`.
- [ ] Fix every critical failure and rerun affected tests.
- [ ] Set GPT version to `1.0.0` only after the tests pass.
- [ ] Keep visibility at `Only Me` until the owner approves broader sharing.

## Recovery

If retrieval is weak, shorten or split the affected reference file. If the GPT overuses role passes, default to `lean` or `standard`. If dissent is noisy, require a specific evidence gap or contradiction. If a platform behavior differs from this register, update the register and the adapter before release.
