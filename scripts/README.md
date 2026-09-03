# scripts/

Utility scripts for this FoundRy relay repository.

Seeded from `OKHP3/OverKill-Hill/scripts` only when the script is applicable to governance, metadata, audit, registry, or sync work.

Site-rendering scripts, HTML page mutators, image conversion scripts, and CSS/JS publication scripts should not be copied here unless this repository begins publishing a deployable site surface.

## Governance validation

Run the complete governance sequence locally with the same entry point used by
GitHub Actions:

```bash
python3 scripts/governance-check.py
```

The runner preserves each existing check's output and stops with its
non-zero status when a check fails. It does not modify source files or release
records.

## Filename compliance audit

Run the same read-only audit used by GitHub Actions:

```bash
python3 scripts/normalize_filenames.py . --recursive --ascii-only --include-dirs --check
```

The audit excludes hidden paths, its documented default directories, and paths
that match the active repository's `.gitignore` rules. This keeps generated
content such as Python bytecode out of the report. Valid npm scope directories
such as `@types` are also retained because their names are tool-owned syntax.

To preview ignored paths as well, add `--include-ignored`. After reviewing a
normalization plan, replace `--check` with `--apply` to perform the renames.
