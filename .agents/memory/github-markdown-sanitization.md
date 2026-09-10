---
name: GitHub Markdown sanitization
description: Durable behavior of GitHub's live Markdown renderer relevant to compatibility assertions.
---

GitHub's Markdown endpoint removes executable URL protocols such as `javascript:` from link and image destinations. Unsafe links remain readable as plain text, while unsafe images may remain as non-executable image markup with empty destinations. Safe HTTPS images can also receive a GitHub image-proxy URL and a layout `style` attribute.

**Why:** Exact HTML snapshots are brittle at this boundary and can mistake GitHub's safe sanitizer output for an unsafe export.

**How to apply:** Assert readable unsafe-link text and the absence of active `href`/`src` values using unsafe protocols. For safe links, assert readable text and the HTTPS destination; avoid requiring GitHub's generated image-proxy URL or rejecting all renderer-added styles.

When the GitHub Markdown API receives repository context, it may add attributes such as `dir="auto"` to block-level elements including paragraphs, lists, and code wrappers.

**Why:** Context-enabled live rendering can change element attributes without changing the semantic HTML or link targets.

**How to apply:** Match opening tags with attribute-tolerant patterns while keeping evidence-link `href` assertions exact.