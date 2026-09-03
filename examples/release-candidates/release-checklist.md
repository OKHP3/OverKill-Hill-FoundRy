# Release checklist

Deployment is a separate, explicit action. Do not run a Pages or repository
visibility change as part of this checklist.

- [x] Owner explicitly approves `OKHP3/refoldec` (or records an approved successor).
- [x] Owner, scope, and allowed dependencies are recorded in
  `release-manifest.json`.
- [x] Public README, specification, schema, examples, validator, skill,
  evaluations, provenance, attribution, changelog, and version are present.
- [x] Source audit passes with no restricted references.
- [x] Release-artifact holdout scan passes:
  `python3 scripts/refoldec-holdout-evaluate.py --scan-release-artifacts
  --holdout-file examples/release-candidates/skill/tests/protected-holdout.json`
  (the maintainer fixture is temporary and untracked). A failure blocks release
  records from shipping until protected content and placeholder hashes are removed.
  The scan detects exact content and canonicalized content within one file or
  across distinct tracked release files, regardless of file order.
  Canonicalization is limited to Unicode compatibility normalization, case
  folding, and removal of separators and punctuation; split fragments must
  each contain at least 12 canonical characters and remain in protected-text
  order. For ASCII protected text, the scan also folds a deliberately small
  list of high-confidence Greek/Cyrillic look-alikes (homographs) to catch
  character substitution attacks. This is not transliteration or broad fuzzy
  matching: other scripts, spelling changes, paraphrases, reordered fragments,
  and semantic similarity remain outside the protection boundary. Unrelated
  multilingual text is allowed.
  Boundary review on 2026-09-03: the release threat model is accidental or
  adversarial disclosure of an ASCII protected holdout through visually
  substituted text, not classification of multilingual content. The retained
  folds are the existing common substitutions plus exact Cyrillic `І/і` → `i`
  and `Ј/ј` → `j`, and uppercase-only `Н` → `h`, Greek `Ζ` → `z`, `Η` → `h`,
  `Μ` → `m`, `Ν` → `n`, and `Υ` → `y`. Uppercase forms are handled before
  case-folding so visually different lowercase `н`, `η`, `ζ`, `μ`, and `ν`
  are not broadened into false positives. For example, ordinary text such as
  Greek `μην ζώνη` and Cyrillic `данные` remains unrelated, while an exact
  `І` or `Ј` in a legitimate name is not a match unless the complete
  protected ASCII value is present. This is a narrow boundary change, covered
  by the evaluator regression cases for uppercase-only substitutions and
  lowercase exclusions.
- [x] Package preflight passes on the public example.
- [x] Human source, license, privacy, and conflict review is signed and dated
  in `provenance.json` by Jamie OverKill Hill on 2026-08-21.
- [ ] Protected holdout was reviewed by a separate evaluator against the
  current package and deterministic reference runtime; the historical
  bounded pass is recorded in `holdout-evaluation.md`, but the current package
  hash differs and requires a rerun before release approval.
- [ ] Equilibrium decision is updated from defer to an owner-approved decision.
- [ ] Only after all gates pass: separately authorize deployment.
