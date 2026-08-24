# ReFolDec evaluation fixtures

`evals.json` contains development cases and metadata for one protected release
holdout. It intentionally does not contain the protected prompt or
expectations.

## Maintainer-only holdout rotation

1. Create or replace an untracked `protected-holdout.json` in this directory
   from the approved private review material. The file must contain `id`,
   `partition: "holdout"`, `risk`, `prompt`, and a non-empty `expectations` list.
2. Keep the `id` equal to `release_holdout.case_id` in `evals.json`; do not add
   the case to the development `evals` array.
3. Run:

   ```text
   python3 scripts/refoldec-holdout-evaluate.py \
     --package examples/release-candidates/skill \
     --holdout-file examples/release-candidates/skill/tests/protected-holdout.json \
     --output examples/release-candidates/holdout-evaluation.json
   ```

4. Review the resulting case hash, package hash, adapter boundary, verdict,
   and release consequence. Do not commit the protected file or paste its
   prompt/expectations into Markdown or JSON records.

The root ignore rules exclude the conventional filename. Rotation is
reviewable through the metadata/hash and evaluator output, while the protected
content stays outside the development and public optimization loop.