import assert from "node:assert/strict";
import test from "node:test";

import {
  checkBehavior,
  diagnosticBehaviorLabels,
  renderedFragment,
} from "./github-markdown-diagnostics.mjs";
import { assertRenderedMarkdown } from "./github-markdown-render.mjs";

test("keeps behavior and nearby fragment in renderer failure diagnostics", () => {
  const rendered = [
    '<h1>Custom GPT Specification Package</h1>',
    ...[
      "0. Build Brief",
      "1. Conversation Contract",
      "2. Instructions",
      "3. Knowledge Files",
      "4. Capabilities",
      "5. Actions / Apps",
      "6. Conversation Starters",
      "7. Test Matrix",
      "8. Governance",
      "Evidence and Provenance Record",
      "9. Audit Findings",
    ].map((heading) => `<h2>${heading}</h2>`),
    "<p>Signal</p><p>nearby rendered fragment from the failing response</p>",
  ].join("");

  assert.throws(
    () => assertRenderedMarkdown(rendered),
    (error) => {
      assert.match(error.message, /table and code rendering failed/);
      assert.match(error.message, /Rendered fragment near "Signal":/);
      assert.match(error.message, /nearby rendered fragment from the failing response/);
      return true;
    },
  );
});

test("uses the shared GitHub renderer diagnostic contract", () => {
  const marker = "MARKER";
  const rendered = `${"a".repeat(200)}${marker}${"b".repeat(300)}`;

  assert.equal(
    renderedFragment(rendered, marker),
    `${"a".repeat(180)}${marker}${"b".repeat(260)}`,
  );
  assert.equal(
    renderedFragment("response without marker", marker),
    `[marker "${marker}" not found]\nresponse without marker`,
  );
  assert.throws(
    () =>
      checkBehavior(
        rendered,
        diagnosticBehaviorLabels.safeLinksRemainLinks,
        marker,
        () => {
          throw new Error("contract failure");
        },
      ),
    (error) => {
      assert.match(
        error.message,
        new RegExp(
          `${diagnosticBehaviorLabels.safeLinksRemainLinks} failed: contract failure\\nRendered fragment near "${marker}":`,
        ),
      );
      assert.match(error.message, new RegExp(`${"a".repeat(180)}${marker}`));
      return true;
    },
  );
});