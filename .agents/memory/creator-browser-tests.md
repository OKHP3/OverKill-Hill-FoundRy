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