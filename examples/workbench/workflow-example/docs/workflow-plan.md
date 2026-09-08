# Local release evidence checklist workflow plan

This is an implementation plan. Steps have not been executed merely because this file exists.

## Inputs

A candidate package, its intended release revision, and available local check results.

## Workflow instructions

1. Identify the candidate revision and package files.
2. Run the available structural generator and backup round-trip checks.
3. Record each check as pass or fail with command and evidence path.
4. Ask a human to review release readiness and publication authority.
5. Stop on missing or contradictory evidence.

## Outputs

A dated evidence checklist with pass, fail, inconclusive, and not-run outcomes plus explicit human follow-up steps.

## Acceptance criteria

The walkthrough shows one synthetic pass and one synthetic fail; each outcome names its evidence and human action. Structural checks are executed separately from this authored walkthrough.
