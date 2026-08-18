# Aurifexo-R Custom GPT Build Bundle

## Release target

Private v1.0 candidate for the ChatGPT web GPT editor. The bundle is prepared for `Only Me` testing. It uses no Actions, Apps, or external credentials and does not depend on the original ChatGPT thread.

## Configure

1. Open the ChatGPT web GPT editor and create a new GPT.
2. Copy the fields from `aurifexo-r-config.json`.
3. Copy the complete contents of `aurifexo-r-instructions-v1.0.md` into Instructions.
4. Upload the five files in `knowledge/` as Knowledge files, beginning with `00-manifest.txt`.
5. Leave Actions and Apps off. Leave Web Search, Image Generation, Canvas, and Code Interpreter & Data Analysis off for v1.0.
6. Run `aurifexo-r-preview-test-matrix.md` in Preview and record results.
7. Keep the GPT private until every release gate passes.

## Source of truth

The portable core and routing artifacts in the parent directory define the concept. The files in this folder are the ChatGPT adapter. Historical ledgers and raw source capture are not upload requirements for v1.0.

## Build status

- Readiness: `ready_for_builder` for a private, text-only v1.
- Actions: intentionally not configured.
- Apps: intentionally not configured.
- Public publishing: deferred until testing, data exposure review, and owner approval.
- Recommended model: leave unset so the editor can apply current availability.
