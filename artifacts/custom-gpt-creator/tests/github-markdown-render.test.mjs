import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

import {
  checkBehavior,
  createRendererBehaviorCoverage,
  diagnosticBehaviorLabels,
  rendererBehaviorManifest,
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
      "https://api.github.com/markdown",
      '{"message":"Service unavailable","request_id":"req-123"}',
    ),
    'GitHub Markdown rendering failed with 503 from https://api.github.com/markdown: {"message":"Service unavailable","request_id":"req-123"}',
  );
});

test("bounds and redacts non-success renderer response details", () => {
  const credential = "ghp_renderer-response-secret";
  const diagnostic = formatGithubRendererResponseError(
    401,
    "https://api.github.com/markdown",
    `{"message":"Bad credentials","authorization":"Bearer ${credential}","detail":"${"x".repeat(600)}"}`,
  );

  assert.match(
    diagnostic,
    /^GitHub Markdown rendering failed with 401 from https:\/\/api\.github\.com\/markdown:/,
  );
  assert.match(diagnostic, /"authorization":\[REDACTED\]/);
  assert.match(diagnostic, /\.\.\.$/);
  assert.ok(!diagnostic.includes(credential));
  assert.ok(
    diagnostic.length <=
      "GitHub Markdown rendering failed with 401 from https://api.github.com/markdown: ".length +
        500,
  );
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

test("defines one deterministic behavior manifest for both renderer runners", () => {
  assert.deepEqual(
    rendererBehaviorManifest.map(({ id, label }) => [id, label]),
    [
      ["tableAndCodeRendering", "table and code rendering"],
      ["safeLinksRemainLinks", "safe links remain links"],
      [
        "relativeEvidenceLinksPreserveSectionAnchors",
        "relative evidence links preserve section anchors",
      ],
      [
        "nestedRepositoryRelativeEvidenceLinksPreserveNestedPaths",
        "nested repository-relative evidence links preserve nested paths",
      ],
      [
        "unsafeUrlProtocolsAreRemovedOrMadeNonExecutable",
        "unsafe URL protocols are removed or made non-executable",
      ],
      [
        "unsafeRawHtmlLinkAndImageDestinationsAreNonExecutable",
        "unsafe raw HTML link and image destinations are non-executable",
      ],
      [
        "safeRawHtmlLinkAndImageDestinationsRemainUsable",
        "safe raw HTML link and image destinations remain usable",
      ],
      ["safeInlineHtmlIsPreserved", "safe inline HTML is preserved"],
      ["executableRawHtmlIsEscaped", "executable raw HTML is escaped"],
      ["unsafeHtmlAttributesAreRemoved", "unsafe HTML attributes are removed"],
      ["listsAndAuditFindingsRender", "lists and audit findings render"],
    ],
  );
});

test("requires every manifest behavior in both runner sources without GitHub", async () => {
  const testsDirectory = dirname(fileURLToPath(import.meta.url));
  const runnerSources = await Promise.all(
    ["github-markdown.e2e.ts", "github-markdown-render.mjs"].map(async (filename) => [
      filename,
      await readFile(resolve(testsDirectory, filename), "utf8"),
    ]),
  );

  for (const [filename, source] of runnerSources) {
    const coverageCalls = source.split("rendererBehaviorCoverage.checkBehavior(").slice(1);
    for (const { id } of rendererBehaviorManifest) {
      assert.ok(
        coverageCalls.some((call) => call.includes(`diagnosticBehaviorLabels.${id}`)),
        `${filename} is missing manifest behavior ${id}`,
      );
    }
  }
});

test("fails clearly when a renderer runner loses manifest coverage", () => {
  const coverage = createRendererBehaviorCoverage("standalone");
  coverage.checkBehavior("", diagnosticBehaviorLabels.tableAndCodeRendering, "Signal", () => {});

  assert.throws(
    () => coverage.assertComplete(),
    (error) => {
      assert.match(error.message, /standalone GitHub renderer behavior coverage drift/);
      assert.match(error.message, /missing: safeLinksRemainLinks/);
      assert.match(error.message, /Update both runners and the shared manifest together/);
      return true;
    },
  );
});

test("fails clearly when a runner adds an unregistered renderer behavior", () => {
  const coverage = createRendererBehaviorCoverage("Playwright");

  assert.throws(
    () => coverage.checkBehavior("", "new renderer behavior", "Signal", () => {}),
    /Playwright GitHub renderer behavior coverage drift: unknown behavior/,
  );
});