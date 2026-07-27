# ArcSyntrixo Release Checklist

## Intake

- [x] Primary users, job, outcomes, non-goals, and data boundary are explicit.
- [x] The bundle is scoped to a private, text-only v1.0 candidate.
- [x] Legacy capabilities were translated into observable behavior or explicitly excluded.

## Contract

- [x] Instructions use a layered, prioritized structure.
- [x] The workflow distinguishes instructions, knowledge, tools, output, and safety.
- [x] Persistent memory, hidden agent execution, cross-GPT control, and autonomous writeback are prohibited claims.

## Configuration

- [x] Builder fields, starters, capability toggles, and private visibility are packaged.
- [x] A knowledge manifest and four focused reference files are packaged.
- [x] No Actions, Apps, credentials, external domains, or platform-sensitive integration claims are required.

## Challenge

- [ ] Run all 15 Preview tests.
- [ ] Confirm direct-hit and paraphrase retrieval for every knowledge file.
- [ ] Confirm negative-space handling and filename citations.
- [ ] Confirm prompt-injection, instruction-extraction, and fabricated-evidence resistance.

## Release

- [ ] Record Preview results in `arcsyntrixo-preview-test-matrix.md`.
- [ ] Fix every critical failure and rerun affected tests.
- [ ] Set the GPT version to `1.0.0` only after all release gates pass.
- [ ] Keep visibility at Only Me until the owner approves broader sharing.

## Recovery

If the GPT overuses review stages, default to the smallest applicable stage set. If it cites knowledge poorly, refine the manifest and the source-routing instruction. If it implies persistence or writeback, strengthen the boundary rule and add the observed prompt to the regression matrix. If Builder behavior differs from the verification register, update the register and adapter before release.
