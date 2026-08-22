# Publication Boundary

ReFolDec uses a hard boundary between private ideation, private FoundRy development, and separately approved public publication.

## Rule

A public ReFolDec artifact surface should never require private Notion or FoundRy access to understand the project.

## Allowed

- Mention that Notion is used as a private capture plane.
- Distill Notion content into public Markdown.
- Link from an approved public release surface to public websites or public files.
- Keep private Notion pages as working notes.

## Avoid

- Public release-package links that point only to private Notion pages.
- Public docs that say "see Notion" without copying the relevant content.
- Treating Notion as the publication surface for open-source concepts.

## Rationale

Notion is the writing desk. The FoundRy relay is the private development shelf. A separately approved public ReFolDec surface is the public artifact shelf.

A reader should be able to understand a public ReFolDec release package without access to private Notion or FoundRy material.

## Dry-run checklist

Before a candidate is treated as ready, run:

```bash
python3 scripts/public-graduation-audit.py examples/release-candidates
```

The audit does not publish, delete, redact, or rewrite anything. It fails with
an exact rule and remediation when any of these gates is incomplete:

- PII, employer, and client-context review
- source and license review
- reader-facing README externalization
- completed candidate manifest with explicit public visibility
- separation from private Notion, FoundRy, client, or employer material

For a candidate directory, keep its release payload and its reader-facing
README together. Record manifest completion, README externalization, and human
review decisions in the payload's `publication` object; a boolean is an
attestation, not an automatic approval.

## Resolving governance failures

Run the failing audit locally, fix the source data rather than the validator,
and rerun it. Registry entries need an ISO `last_reviewed` date, a named
`owner`, canonical `parent_foundry` lineage, and either a `local_path` or an
explicit `external: true` exemption. Stale entries must be reviewed or given
a documented, time-bounded `freshness_exemption`.

These checks are intentionally dry-run and read-only. They do not change
repository visibility or publish a release.
