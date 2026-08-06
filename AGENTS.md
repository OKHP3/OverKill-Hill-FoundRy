# Agent Guide: OverKill Hill FoundRy

## 1. Project identity

- **Repository:** `OKHP3/OverKill-Hill-FoundRy`
- **Project type:** FoundRy relay and documentation repository
- **Primary public concept:** ReFolDec, the Recursively Folding Codec
- **Canonical definition:** ReFolDec is a bidirectional process-capture and transformation framework for folding raw thought into structured artifacts, then unfolding mature artifacts back into their source primitives, patterns, and reusable instructions.
- **Git remote:** `https://github.com/OKHP3/OverKill-Hill-FoundRy.git`

The root repository is a single Git repository. No nested Git repositories were found. Its contents are primarily Markdown, YAML, JSON, Python utilities, Agent Skills, and archived capability artifacts. It is not currently documented or configured as a deployable application.

## 2. Current purpose and status

### Confirmed

- `README.md`, `docs/specification.md`, `refoldec.manifest.json`, and `docs/` define ReFolDec as the repository's main public concept.
- `manifest.yaml` identifies this repository as a FoundRy relay with lifecycle status `active`.
- The repository preserves a boundary between private capture and public publication. Notion is described as the private workshop, while GitHub is the versioned artifact surface.
- The repository contains governance files, schemas, examples, FoundRy child-repository materials, prompt archives, and local Agent Skills.
- `docs/technology-inventory.json`, `docs/technology-inventory.md`, and `scripts/technology-audit.py` document and audit the repository's supported runtimes and tooling.

### Inferred

- The main users are maintainers and agents who need to capture, mature, validate, publish, or reuse process knowledge.
- The repository is an early public scaffold for a durable ReFolDec operating model. The roadmap points toward more examples, diagrams, validators, and an eventual ReFolDec Agent Skill.

### Status conflict to preserve until resolved

- `README.md` and `refoldec.manifest.json` describe an early public scaffold.
- `manifest.yaml` currently declares `visibility: private`.

Do not change the visibility metadata without owner confirmation. Until resolved, keep public-artifact hygiene as a required standard and treat visibility as unknown in reports.

## 3. Mission, scope, and non-goals

The repository's confirmed mission is to make process capture explicit, reversible, and reusable through three primary motions:

- **Fold:** move raw or weakly structured material toward a mature artifact.
- **Unfold:** decompose a mature artifact into primitives, assumptions, patterns, dependencies, and reusable instructions.
- **Refold:** recombine improved primitives into a stronger artifact, process, model, or skill.

ReFolDec is not a generic productivity slogan, a private journal archive, or a replacement for BPMN, Mermaid, Notion, GitHub, or Agent Skills. Do not formalize every thought. Capture material when it merits reuse, validation, publication, or operationalization.

## 4. Repository map

- `README.md`: human-facing ReFolDec overview and conceptual operating model.
- `docs/specification.md`: v0.1 scaffold for operations, maturity states, artifact fields, and relationships.
- `docs/roadmap.md`: planned maturity path. Treat roadmap items as future work, not current capability.
- `CHANGELOG.md`: ReFolDec change history.
- `manifest.yaml`: FoundRy governance metadata for this repository.
- `refoldec.manifest.json`: ReFolDec concept metadata, maturity ladder, and persistence-plane model.
- `docs/`: public operating model, publication boundary, process-capture explanation, governance model, vocabulary, and stewardship notes.
- `schemas/`: ReFolDec artifact schema and FoundRy registry and repository-manifest schemas.
- `examples/`: public fold, unfold, and refold examples.
- `registry/`: FoundRy repository index and triage log.
- `docs/technology-inventory.json` and `docs/technology-inventory.md`: machine-readable and human-readable technology inventory.
- `.github/workflows/technology-audit.yml`: scheduled and manually triggerable technology-release audit; this is the repository's only current CI workflow.
- `.github/dependabot.yml`: weekly GitHub Actions dependency update configuration.
- `_template/`: scaffold for governed child repositories. Its nested `AGENTS.md` applies to repositories created from the template, not to this root repository.
- `scripts/`: Python audits, filename-normalization utility, sync report, and post-merge hook.
- `.agents/skills/`: local Agent Skills and the generated project skill catalog. Skill-local instructions apply when that skill is used.
- `custom-gpts/proto/`: normalized home for the OverKill Hill proto-GPT capability, prompt, ledger, and research archives. Each direct child has a root `README.md`. Treat these as separate artifact areas, not as a root runtime.
- `custom-gpts/consolidated/`: durable, public-safe distillations recovered from retired Custom GPT, prompt-chain, and data-ledger source material. These documents are reference methods, not a runtime memory layer.
- `docs/custom-gpt-creator-transfer.md`: full SPA transfer context — tech stack, architecture, build workflow, GitHub Pages deployment, backlog, and cold-start checklist for the Custom GPT Creator SPA at `artifacts/mockup-sandbox/`.
- `.github/`: contains the technology-audit workflow, Dependabot configuration, and the retained `.gitkeep` placeholder.
- `.replit`: declares Python 3.12 and a workflow that runs the FoundRy sync audit.

## 5. Architecture and boundaries

The documented operating flow is:

```text
private capture
  -> public Markdown distillation
  -> schema, example, or process artifact
  -> validation and publication
  -> optional Agent Skill or child-repository packaging
```

Keep private workshop context out of public dependencies. Public files must remain understandable without private Notion access. If private material informs a public artifact, distill the useful content into this repository and link public files to the resulting public artifact. Do not add private Notion URLs as required references.

## 6. Technology and runtime

- Markdown is the primary authoring format.
- YAML and JSON hold governance, registry, and artifact metadata.
- Python 3 is used by the repository audit utilities. The `.replit` configuration specifies Python 3.12.
- Shell scripts use Bash and invoke the Python utilities.
- Agent-facing content lives in `.agents/skills/` and follows each skill's local `SKILL.md`.
- No root `package.json`, Python package manifest, test framework configuration, application source tree, or deployment configuration was found.
- Do not invent an application build, test, server, or deployment command. The available Replit workflow runs `python3 scripts/foundry-sync.py` only.

## 7. Verified validation commands

Run from the repository root:

```bash
python3 scripts/foundry-sync.py --strict
python3 scripts/manifest-audit.py
python3 scripts/registry-audit.py
python3 scripts/sync-report.py
python3 -m json.tool refoldec.manifest.json >/dev/null
bash -n scripts/post-merge.sh
python3 scripts/normalize_filenames.py . --recursive
```

The filename normalizer is dry-run by default. Do not pass `--apply` unless a rename operation is explicitly requested and reviewed. `scripts/post-merge.sh` runs the FoundRy sync audit and the default dry-run filename check.

There is no repository-wide automated test suite. For documentation changes, also inspect rendered Markdown where practical, check links and referenced paths, and re-read every changed guidance file.

## 8. Change conventions

- Identify the artifact type and maturity state before editing or adding content.
- Preserve the fold, unfold, and refold relationship when revising a concept or process.
- Prefer public repository files over private workspace references.
- Keep prose precise and high-density. Avoid hype. Explanation must earn its space.
- Preserve standalone punchy lines when they carry meaning. Do not merge them into paragraphs for convenience.
- Generated content must not use em dashes.
- The inherited AutoCAD convention is R10 and remains locked when an artifact explicitly concerns that convention.
- Do not add secrets, credentials, private personal information, or client-specific material.
- Do not modify generated artifacts, dependencies, CI behavior, or application code during a guidance-only task.
- Preserve legacy artifacts unless the user explicitly requests deletion or migration.
- Use small, named commits for one layer at a time, such as identity, specification, example, schema, operating model, Agent Skill, diagram, or site integration.
- No repository-specific branch strategy is documented. Do not infer one or rewrite branch history.

## 9. Instruction precedence

- This root `AGENTS.md` is the canonical guide for the repository.
- `CLAUDE.md` currently contains only `@AGENTS.md`, so it delegates to this file.
- `_template/AGENTS.md` governs child repositories generated from `_template/`; it does not override this root guide.
- A skill's `.agents/skills/<name>/SKILL.md` applies when that skill is selected for a task and may add task-specific requirements.
- Preserve unrelated user changes. Never use destructive version-control commands such as `git reset --hard` or `git checkout --`.

## 10. Known gaps and open questions

- The authoritative repository visibility is unresolved because `README.md` and `refoldec.manifest.json` describe public publication while `manifest.yaml` says private.
- `README.md` links to `LICENSE`, but no root `LICENSE` file was found.
- `registry/index.yaml` has `last_reviewed: TBD` and should be reviewed before being treated as a current inventory.
- No root source package, repository-wide test suite, or deployable runtime was found. The only current CI workflow is the technology-release audit; any future implementation work should document its own entry points and validation commands.
- The repository does not state a confirmed external user group, production guarantee, or release process.

## 11. Keeping this guide current

Update this file when repository structure, runtime commands, visibility policy, artifact boundaries, or validation procedures change. Base updates on files and executable checks. Mark conclusions as confirmed, inferred, or unknown when evidence is incomplete. Keep this guide shorter than the body of the repository it describes and avoid duplicating detailed skill instructions here.
