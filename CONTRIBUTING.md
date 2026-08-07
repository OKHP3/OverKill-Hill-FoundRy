# Contributing to OverKill Hill FoundRy

This is a human-readable complement to `AGENTS.md`, which is the canonical guide for both human and agent contributors. Read `AGENTS.md` first; this file adds practical workflow guidance for people submitting changes.

---

## Before you start

- Review `README.md` for an overview of ReFolDec and what this repository is for.
- Review `AGENTS.md` sections 3 (scope), 5 (architecture and boundaries), and 8 (change conventions) before proposing or making any change.
- The repository preserves a boundary between private capture (Notion) and public publication (GitHub). Contributions must remain understandable without private Notion access.

---

## What belongs here

Contributions that fit the repository's mission:

- Improvements to the ReFolDec specification, examples, or vocabulary.
- Schema refinements for `schemas/`.
- New or improved Agent Skills under `.agents/skills/`.
- Documentation corrections and link fixes.
- Technology inventory updates when a runtime version or tool changes.
- Child-repository template improvements under `_template/`.

Contributions that do not belong here:

- Private Notion links as required references.
- Client-specific material, credentials, or personal information.
- Application build systems, servers, or deployment configuration for the root repository (the only current CI workflow is the technology-release audit).
- Changes to generated artifacts or dependencies without explicit discussion.

---

## Branch and pull request conventions

1. Branch from `main`. Use a short descriptive name: `docs/fix-specification-links`, `skills/add-process-gap-analysis`, `schema/add-refold-field`.
2. Keep each pull request focused on one layer of change: identity, specification, example, schema, operating model, Agent Skill, or diagram. Do not bundle unrelated changes.
3. Write a clear PR description that states what changed and why. Reference relevant sections of `AGENTS.md` or `docs/` if applicable.
4. Do not use destructive version-control commands (`git reset --hard`, `git checkout --`) on shared branches.
5. No repository-specific branch protection rules are currently documented. Until a policy is established, treat `main` as the integration branch and request review before merging.

---

## Commit style

- Use small, named commits: one logical change per commit.
- Commit messages should state the artifact type and what changed, for example:
  - `docs: clarify fold/unfold distinction in specification`
  - `skills: add okhp3-process-gap-analysis SKILL.md`
  - `schema: add optional refold-target field to artifact schema`
- Do not use em dashes in commit messages or prose (project-wide convention).

---

## Prose and content standards

- Keep prose precise and high-density. Explanation must earn its space.
- Avoid hype and marketing language.
- Preserve standalone punchy lines that carry meaning. Do not merge them into paragraphs for convenience.
- Mark conclusions as confirmed, inferred, or unknown when evidence is incomplete.
- Generated content must not use em dashes.

---

## Agent Skill contributions

Agent Skills live under `.agents/skills/<skill-name>/SKILL.md`. Before authoring or revising a skill:

1. Read the existing `SKILL.md` for the skill you are modifying, or the `okhp3-skill-foundry` skill for guidance on authoring new skills.
2. Follow the progressive-disclosure structure: trigger conditions, inputs, outputs, and step-by-step procedure.
3. Include a `**Why:**` note on any non-obvious decision so future contributors can judge edge cases.
4. Update `.agents/skills/catalog.md` (or the equivalent index) if the skill is new.

---

## Validation before submitting

Run the verification commands from `AGENTS.md` section 7 before opening a pull request:

```bash
python3 scripts/foundry-sync.py --strict
python3 scripts/manifest-audit.py
python3 scripts/registry-audit.py
python3 scripts/sync-report.py
python3 -m json.tool refoldec.manifest.json >/dev/null
bash -n scripts/post-merge.sh
python3 scripts/normalize_filenames.py . --recursive
```

The filename normalizer is dry-run by default. Do not pass `--apply` unless a rename is explicitly requested and reviewed.

---

## Code of conduct

All contributors are expected to follow the project's `CODE_OF_CONDUCT.md`. Participation in this project constitutes agreement to its terms. Enforcement contacts are listed in that file.

---

## Reporting issues

Open a GitHub Issue to report documentation errors, broken links, schema gaps, or missing examples. Provide enough context that a maintainer can reproduce or verify the issue without access to private material.

For security issues, see `SECURITY.md`.

---

## License

By contributing to this repository you agree that your contributions will be licensed under the Apache License 2.0. See `LICENSE` for the full text.
