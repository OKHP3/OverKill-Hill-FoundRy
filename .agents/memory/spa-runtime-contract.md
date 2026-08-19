---
name: SPA runtime contract
description: Relationship between the Custom GPT Creator source pages and the current mockup sandbox entrypoint.
---

The Custom GPT Creator transfer document describes a runnable SPA with stateful page navigation, but the current mockup sandbox App entrypoint serves only discovered isolated components under preview routes. The page files remain in the repository without being imported by that entrypoint.

**Why:** This is a product-surface decision, not a cosmetic discrepancy. Treating the page files as the live SPA causes misleading workflows, deployment instructions, and review results.

**How to apply:** Before adding features or claiming the SPA is runnable, choose one explicit direction: restore a real app entrypoint/workflow for the pages, or reclassify the pages as archived/reference source and update the transfer docs and Pages workflow accordingly.