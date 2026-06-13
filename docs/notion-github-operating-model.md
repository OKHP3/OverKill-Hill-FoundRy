# Notion + GitHub Operating Model

ReFolDec uses two persistence planes:

- **Notion** is the private workshop: capture, drafting, ideation, synthesis, and working memory.
- **GitHub** is the public canonical surface: distilled Markdown, schemas, examples, specs, and release-ready artifacts.

The rule is simple: public repositories should not require private Notion access to be understood.

---

## Boundary rule

If a GitHub file needs to reference an idea first drafted in Notion, do not link to the private Notion page as the only source. Instead:

1. copy or distill the useful content into Markdown;
2. place that Markdown in `docs/`, `examples/`, `schemas/`, or another appropriate public path;
3. link GitHub files to that public Markdown artifact;
4. keep the Notion page as workshop context, not publication infrastructure.

---

## Recommended flow

```text
Notion capture
→ Notion synthesis
→ Markdown distillation
→ GitHub commit
→ public artifact
→ optional site/project page
```

---

## Notion role

Notion is allowed to be messy, recursive, provisional, and private.

Use it for:

- epiphany capture;
- thread distillation;
- private source notes;
- planning pages;
- draft outlines;
- working tables;
- linked project dashboards.

Notion is the writing desk.

---

## GitHub role

GitHub should be clean, portable, and public.

Use it for:

- specs;
- schemas;
- manifests;
- agent instructions;
- examples;
- diagrams;
- release notes;
- public documentation.

GitHub is the canonical artifact shelf.

---

## Publication checklist

Before committing a ReFolDec artifact to GitHub:

- Does it make sense without a private Notion link?
- Does it name the artifact type and maturity state?
- Does it distinguish raw thought from refined concept?
- Does it preserve useful source context without exposing private workspace details?
- Does it point to public files, not private capture surfaces?
