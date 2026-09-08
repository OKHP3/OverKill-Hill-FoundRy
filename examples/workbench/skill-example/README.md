# Repository handoff skill example

This example is a public-safe Agent Skill package project for preparing a concise, evidence-backed repository handoff. `backup.json` is an importable version 1 capability-workbench backup. `generated/` is the package produced by the repository's existing capability generator.

The generated `skill/SKILL.md` is a structural draft. It has not been installed, published, or evaluated for model behavior.

## Trigger examples

- “Prepare a handoff for the repository task. Record the base commit, owned paths, checks, and limits.”
- “Turn these repository status notes into a concise agent handoff with exact validation evidence.”

## Non-trigger examples

- “Write a product announcement for this repository.” This is publication copy, not a repository handoff.
- “Explain what a Git branch is.” This is a general question with no handoff request.

## Manual evaluation recipe

1. Import `backup.json` into the capability workbench and confirm one project is restored with kind `skill`.
2. Compare the restored fields with `generated/capability.json`; confirm the project identity, purpose, constraints, and acceptance text match.
3. Read `generated/skill/SKILL.md` and present each trigger and non-trigger request to a human or an installed evaluation harness.
4. Confirm a trigger response records base, exclusive scope, changed paths, checks, limits, and authorization boundaries.
5. Confirm a non-trigger response does not produce a repository handoff.

This recipe describes review steps only. It does not establish model execution, behavioral validation, installation, publication, or authorization.
