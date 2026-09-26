---
name: Malformed export sections
description: Safety boundary for browser-local project data consumed by the Creator export page.
---

Saved project data can contain malformed whole-step values or invalid entries inside otherwise valid knowledge, starter, and test-case collections. Export code must treat those values as untrusted at both the shared readiness-summary boundary and the format-specific renderer boundary.

**Why:** The Creator computes readiness before rendering the export page, so guarding only the export formatter still allows a malformed test-case entry to replace the page with an error state.

**How to apply:** Keep valid strings and object records, ignore invalid collection entries, coerce malformed scalar fields to the format’s existing empty/default output, and preserve the raw phase records in Evidence JSON so unaffected saved content remains inspectable.