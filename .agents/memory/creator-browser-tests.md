---
name: Creator browser tests
description: Durable environment constraints for running Chromium browser tests in this Repl.
---

Keep browser-test runners compatible with the workspace browser runtime, and retain the Chromium runtime libraries in the Repl environment.

**Why:** An older Playwright release stalled during test discovery under the workspace Node runtime, and a fresh Chromium download could not launch until the Nix graphics, font, audio, and display libraries were present.

**How to apply:** When changing the browser-test runner or the Repl's system dependencies, validate a clean browser launch before relying on automated coverage.

## Reset persistence constraint

Destructive localStorage resets must suspend shell persistence through the reset render and perform a final delayed cleanup, because mounted step pages can autosave defaults after the parent reset handler runs.

**Why:** React effects from the reset shell and newly mounted step can otherwise recreate `cgpt-*` keys immediately after they are removed.

**How to apply:** When changing the creator reset flow, assert both UI reset state and an empty `cgpt-*` storage namespace after confirmation.

## Downloaded Markdown compatibility

External export checks should render the exact downloaded bytes with a declared standard Markdown parser, keeping raw HTML disabled when literal user content is the intended compatibility boundary.

**Why:** An in-app preview can diverge from the file a user opens elsewhere; byte preservation and independent parsing catch that gap without changing export behavior.

**How to apply:** Include headings, inline emphasis/code, lists, separators, uncommon user Markdown, and intentionally unsupported syntax in the downloaded-file fixture.

When comparing multiple Markdown renderers, assert semantic anchors instead of
requiring byte-identical HTML. Renderers can intentionally differ in escaping
code content and raw HTML while preserving the exported Markdown's meaning.

**Why:** A compatibility test should catch lost structure, not fail because one
viewer serializes the same safe code or HTML boundary differently.

**How to apply:** Keep the downloaded-byte equality assertion separate, then
record renderer-specific differences explicitly alongside shared structure checks.