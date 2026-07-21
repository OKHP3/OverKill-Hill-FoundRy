# Consolidated Custom GPT Method

This directory is the durable, deduplicated result of the temporary Custom GPT source ingestion. It is designed to improve four related Agent Skills:

1. `okhp3-custom-gpt-readiness`: recover evidence and decide whether a concept is ready to build.
2. `okhp3-custom-gpt-builder`: create, test, release, and maintain a Custom GPT.
3. `okhp3-custom-gpt-skill-conversion-planner`: map a configured Custom GPT into a portable Agent Skill plan.
4. `okhp3-skill-foundry`: author, evaluate, and improve the resulting SKILL.md package.

The documents here do not preserve the temporary source corpus verbatim. They retain only reusable methods, explicitly label the strength of each claim, and avoid repeating the same guidance in multiple forms.

| Document | Use |
| --- | --- |
| [Corpus ledger](./CORPUS-LEDGER.md) | Records what was processed, how duplicates were handled, and the thematic evidence base. |
| [Operating method](./CUSTOM-GPT-OPERATING-METHOD.md) | A single end-to-end method for building, maturing, and converting Custom GPTs. |
| [Evidence register](./EVIDENCE-REGISTER.md) | Separates current verified platform facts, source-derived practices, and unproven theories. |
| [Prompt-chain distillation](./PROMPT-CHAIN-DISTILLATION.md) | Reusable phase gates, recovery paths, and exclusions recovered from the temporary prompt-chain corpus. |
| [Data-ledger distillation](./DATA-LEDGER-DISTILLATION.md) | Converts historical hydration and dehydration ideas into explicit, versioned thread-transition capsules. |

## Claim labels

- **Verified platform fact**: checked against current official product documentation. Recheck when platform behavior changes.
- **Verified corpus fact**: directly measured during this local ingestion run.
- **Source-derived practice**: a repeatable recommendation found across the source material. It is useful guidance, not a proof of universal performance.
- **Theory / hypothesis**: a proposed explanation or technique that needs a named evaluation before it is adopted as a rule.
- **Preference**: a local design choice. It is neither a platform fact nor a general requirement.

The public repository should keep only public-safe distilled material. The temporary originals and extraction copies remain under `custom-gpts/ingestion/` and are ignored by Git.
