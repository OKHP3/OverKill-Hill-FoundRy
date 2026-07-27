# ArcSyntrixo Custom GPT Build Bundle

## Release target

Private v1.0 candidate for the ChatGPT web GPT editor. ArcSyntrixo is a focused prompt-architecture review assistant for people building or revising Custom GPTs. It turns a supplied prompt or instruction draft into a bounded, evidence-aware configuration package.

## Configure

1. Open the ChatGPT web GPT editor and create a new GPT.
2. Copy the fields from `arcsyntrixo-config.json`.
3. Copy `arcsyntrixo-instructions-v1.0.md` into Instructions.
4. Upload the five files in `knowledge/`, beginning with `00-manifest.txt`.
5. Leave Actions, Apps, Web Search, Image Generation, Canvas, and Code Interpreter & Data Analysis off for v1.0.
6. Run every case in `arcsyntrixo-preview-test-matrix.md` in Preview and record the results.
7. Keep visibility at Only Me until the release checklist passes and the owner approves a broader audience.

## Source of truth

The `build/` directory is the Builder adapter and source of truth for the private v1.0 candidate. The normalized legacy archive in the parent directory is research material, not an upload requirement. `arcsyntrixo-readiness-dossier.json` records the assumptions that moved the concept from recovery to a buildable private candidate.

## Build status

- Readiness: `ready_for_builder` for a private, text-only v1.0 candidate.
- Actions and Apps: intentionally not configured.
- Public publishing: deferred pending Preview evidence, data-exposure review, and owner approval.
- Recommended model: leave unset so the editor applies currently available options.
