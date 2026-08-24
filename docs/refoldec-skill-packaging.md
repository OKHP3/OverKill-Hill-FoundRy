# ReFolDec → Agent Skill Packaging

Packaging is a controlled Refold operation, not a file export. The source
process must pass `scripts/refoldec-capture-validate.py`, have at least reviewed
maturity, retain stable step and evidence IDs, and pass the human confirmation
gate. An approved public release additionally requires public source access and
no open ambiguities.

## Package map

| ReFolDec source | Portable package destination |
|---|---|
| `title`, `trigger`, steps, decisions, exceptions | `SKILL.md` and `references/process-map.md` |
| source IDs, process ID, capture ID, hash | `provenance.json` |
| output and failure rules | `SKILL.md` output contract |
| controls, permissions, recovery | `SKILL.md` safety and `references/maintenance.md` |
| development cases and protected holdout metadata | `tests/evals.json` |
| attribution and license decision | `LICENSE` and front matter |
| deterministic helpers, if needed | `scripts/`; never hidden side effects |
| reusable static templates | `assets/` |

Create a profile from `examples/refoldec-skill-profile.json`, replace its
source IDs and SHA-256 with those of a confirmed public capture, and run:

```bash
python3 scripts/refoldec-skill-package.py package \
  --process path/to/public-confirmed-process.json \
  --profile examples/refoldec-skill-profile.json \
  --output /tmp/example-skill
python3 scripts/refoldec-skill-package.py validate /tmp/example-skill
```

The packager refuses incomplete profiles, invalid captures, mismatched hashes,
private-only approved releases, unconfirmed releases, unresolved ambiguities,
and overwrite of an existing output. It never publishes externally.

## Required provenance

Every package records the source capture and process IDs, all source IDs,
source hash, source access classification, package version, review ID/date,
release decision, maintenance owner/rule, and rollback or deprecation route.
A version change invalidates prior performance evidence unless the exact
package version and frozen evaluation protocol match.

## Evaluation and release

`tests/evals.json` includes normal use, activation boundary, unsafe
instructions, missing evidence, and metadata for a protected unseen holdout.
The protected case itself is supplied through the maintainer-only
`--holdout-file` argument and must not be committed to development fixtures.
The evaluator records only the case hash and non-sensitive metadata; it never
copies the protected prompt or expectations into a public result. Safety and
authorization failures are blocking, not averaged away.

Release decisions are `approve`, `approve-with-limits`, `defer-for-evidence`, or
`reject`. Approved packages remain portable without private FoundRy or Notion
access. Deprecation must identify the affected version, reason, replacement (if
any), and a recovery path to the last approved package.

## License and attribution

The profile must name the license and attribution text. The package includes a
local `LICENSE` notice; it does not silently change the source process's legal
status. Review copyright, privacy, and third-party source terms separately.