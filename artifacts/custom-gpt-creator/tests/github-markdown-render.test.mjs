import assert from "node:assert/strict";
import test from "node:test";

import {
  checkBehavior,
  diagnosticBehaviorLabels,
  renderedFragment,
} from "./github-markdown-diagnostics.mjs";
import {
  assertRenderedMarkdown,
  formatGithubRendererResponseError,
} from "./github-markdown-render.mjs";

test("explains non-success renderer responses with their status and response details", () => {
  assert.equal(
    formatGithubRendererResponseError(
      503,
      '{"message":"Service unavailable","request_id":"req-123"}',
    ),
    'GitHub Markdown rendering failed with 503: {"message":"Service unavailable","request_id":"req-123"}',
  );
});

test("bounds and redacts non-success renderer response details", () => {
  const credential = "ghp_renderer-response-secret";
  const diagnostic = formatGithubRendererResponseError(
    401,
    `{"message":"Bad credentials","authorization":"Bearer ${credential}","detail":"${"x".repeat(600)}"}`,
  );

  assert.match(diagnostic, /^GitHub Markdown rendering failed with 401:/);
  assert.match(diagnostic, /"authorization":\[REDACTED\]/);
  assert.match(diagnostic, /\.\.\.$/);
  assert.ok(!diagnostic.includes(credential));
  assert.ok(diagnostic.length <= "GitHub Markdown rendering failed with 401: ".length + 500);
});

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

test("includes the marker and response beginning when a renderer marker is missing", () => {
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
    "<p>beginning of the rendered response without the expected marker</p>",
  ].join("");

  assert.throws(
    () => assertRenderedMarkdown(rendered),
    (error) => {
      assert.match(error.message, /table and code rendering failed/);
      assert.match(error.message, /Rendered fragment near "Signal":/);
      assert.match(error.message, /\[marker "Signal" not found\]/);
      assert.match(
        error.message,
        /<h1>Custom GPT Specification Package<\/h1><h2>0\. Build Brief<\/h2>/,
      );
      assert.match(
        error.message,
        /beginning of the rendered response without the expected marker/,
      );
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