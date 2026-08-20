---
name: Creator browser tests
description: Durable environment constraints for running Chromium browser tests in this Repl.
---

Keep browser-test runners compatible with the workspace browser runtime, and retain the Chromium runtime libraries in the Repl environment.

**Why:** An older Playwright release stalled during test discovery under the workspace Node runtime, and a fresh Chromium download could not launch until the Nix graphics, font, audio, and display libraries were present.

**How to apply:** When changing the browser-test runner or the Repl's system dependencies, validate a clean browser launch before relying on automated coverage.