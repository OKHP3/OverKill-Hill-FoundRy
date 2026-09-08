# Synthetic release evidence walkthrough

This walkthrough is authored documentation for a hypothetical package review. It is synthetic: no release scheduler, workflow engine, or external publication was run. The structural checks listed below were executed locally and are recorded separately.

## Structural checks executed

| Check | Result | Evidence |
| --- | --- | --- |
| Generate workflow files with `buildCapabilityFiles` | Pass | This example's generated files, including `docs/workflow-plan.md` |
| Create and parse the version 1 backup with `createCapabilityBackup` and `parseCapabilityBackup` | Pass | `backup.json` round-trips to the authored project |

These checks establish package shape and backup compatibility only. They do not establish that a model follows the workflow or that publication is authorized.

## Synthetic pass

Scenario: the candidate revision is `abc1234`, all expected package files are present, and the recorded structural checks above have evidence paths.

1. Human records **pass** for package completeness and links the file listing plus `backup.json`.
2. Human reviews the acceptance criteria and marks the evidence ledger ready for an owner decision.
3. Human makes the separate release and publication decision; this example does not make that decision.

## Synthetic fail

Scenario: the candidate revision is `def5678`, but `docs/validation.md` is absent from the candidate package.

1. Human records **fail** for package completeness and links the missing-file report.
2. Human stops the release review and asks the author to regenerate the package.
3. No publication decision is made until the missing evidence is supplied and reviewed again.

The pass and fail outcomes above are illustrative records, not observed release events.
