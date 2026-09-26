import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  createRendererBehaviorCoverage,
  diagnosticBehaviorLabels,
  renderedFragment,
} from "./github-markdown-diagnostics.mjs";

export { renderedFragment };

export const fixturePath = fileURLToPath(
  new URL("./fixtures/github-markdown-fixture.v1.md", import.meta.url),
);

const responseDetailLimit = 500;
const sensitiveResponseField = /((?:"?(?:authorization|proxy-authorization|cookie|set-cookie|x-api-key|api[-_ ]?key|access[-_ ]?token|refresh[-_ ]?token|client[-_ ]?secret|token|secret|password)"?)\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^,\s}]+)/gi;

const boundedResponseDetail = (responseText) => {
  const redacted = String(responseText)
    // Redact the scheme and credential before replacing a header field value.
    .replace(/\b(Bearer|Basic)\s+[^\s"',}]+/gi, "$1 [REDACTED]")
    .replace(sensitiveResponseField, "$1[REDACTED]")
    .replace(/\b(?:github_pat|gh[pousr])_[A-Za-z0-9_]+\b/gi, "[REDACTED]");

  if (redacted.length <= responseDetailLimit) return redacted;
  return `${redacted.slice(0, responseDetailLimit - 3)}...`;
};

/**
 * Formats a non-2xx GitHub Markdown response for both renderer runners.
 *
 * Keep the response detail bounded and redacted so rate-limit and API error
 * context is useful in CI without allowing a response to flood the logs or
 * expose credentials.
 *
 * @param {number} status
 * @param {string} endpoint
 * @param {string} responseText
 * @returns {string}
 */
export const formatGithubRendererResponseError = (status, endpoint, responseText) =>
  `GitHub Markdown rendering failed with ${status} from ${endpoint}: ${
    boundedResponseDetail(responseText) || "[empty response body]"
  }`;

const headings = [
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
];

const headingMarkup = (heading) =>
  new RegExp(`<h2[^>]*>${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/h2>`);
export const assertRenderedMarkdown = (rendered) => {
  const rendererBehaviorCoverage = createRendererBehaviorCoverage("standalone");
  assert.match(rendered, /<h1[^>]*>Custom GPT Specification Package<\/h1>/);
  for (const heading of headings) assert.match(rendered, headingMarkup(heading));
  assert.deepEqual(
    headings.map((heading) => rendered.search(headingMarkup(heading))),
    [...headings.map((heading) => rendered.search(headingMarkup(heading)))].sort((a, b) => a - b),
  );
  rendererBehaviorCoverage.checkBehavior(rendered, diagnosticBehaviorLabels.tableAndCodeRendering, "Signal", () => {
    assert.match(rendered, /<markdown-accessiblity-table><table[^>]*>/);
    assert.match(rendered, /<strong>Ready<\/strong>/);
    assert.match(rendered, /class="highlight highlight-source-ts"/);
    assert.match(rendered, /answer/);
  });
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.safeLinksRemainLinks,
    "Read the evidence guide",
    () => {
      assert.match(
        rendered,
        /<a href="https:\/\/example\.com\/evidence"[^>]*>Read the evidence guide<\/a>/,
      );
      assert.match(
        rendered,
        /<a href="\.\/evidence-guide\.md"[^>]*>Read the repository evidence guide<\/a>/,
      );
      assert.match(rendered, /<a href="https:\/\/example\.com\/safe"[^>]*>Safe HTTPS link<\/a>/);
      assert.match(
        rendered,
        /<a href="https:\/\/example\.com\/reference-safe"[^>]*>Reference-style safe HTTPS link<\/a>/,
      );
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.relativeEvidenceLinksPreserveSectionAnchors,
    "Read the repository evidence section",
    () => {
      assert.match(
        rendered,
        /<a href="\.\/evidence-guide\.md#evidence-handling"[^>]*>Read the repository evidence section<\/a>/,
      );
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.nestedRepositoryRelativeEvidenceLinksPreserveNestedPaths,
    "Read the nested repository evidence guide",
    () => {
      assert.match(
        rendered,
        /<a href="\.\/docs\/evidence-guide\.md#evidence-handling"[^>]*>Read the nested repository evidence guide<\/a>/,
      );
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.unsafeUrlProtocolsAreRemovedOrMadeNonExecutable,
    "Unsafe protocol link",
    () => {
      for (const marker of [
        "Unsafe protocol link",
        "Unsafe protocol image",
        "Data protocol link",
        "Data protocol image",
        "VBScript protocol link",
        "VBScript protocol image",
        "Mixed-case data protocol link",
        "Mixed-case data protocol image",
        "Mixed-case VBScript protocol link",
        "Mixed-case VBScript protocol image",
        "Percent-encoded JavaScript link",
        "Percent-encoded JavaScript image",
        "Percent-encoded data link",
        "Percent-encoded data image",
        "HTML-entity-encoded JavaScript link",
        "HTML-entity-encoded JavaScript image",
        "HTML-entity-encoded data link",
        "HTML-entity-encoded data image",
        "HTML-entity-encoded VBScript link",
        "HTML-entity-encoded VBScript image",
        "Reference-style unsafe protocol link",
        "Reference-style unsafe protocol image",
        "Reference-style data link",
        "Reference-style data image",
        "Reference-style VBScript link",
        "Reference-style VBScript image",
        "Reference-style mixed-case data link",
        "Reference-style mixed-case data image",
        "Reference-style mixed-case VBScript link",
        "Reference-style mixed-case VBScript image",
        "Reference-style percent-encoded JavaScript link",
        "Reference-style percent-encoded JavaScript image",
        "Reference-style percent-encoded data link",
        "Reference-style percent-encoded data image",
      ]) {
        assert.ok(rendered.includes(marker), `missing unsafe URL marker: ${marker}`);
      }
      assert.doesNotMatch(
        rendered,
        /(?:href|src)=["'][^"']*(?:(?:javascript|data|vbscript):|(?:java%73cript|%64%61%74%61|%76%62%73%63%72%69%70%74):|(?:java&#x73;cript|data&#x3a;|vb&#x73;cript):)/i,
      );
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.unsafeRawHtmlLinkAndImageDestinationsAreNonExecutable,
    "Before unsafe raw HTML link",
    () => {
      assert.match(
        rendered,
        /Before unsafe raw HTML link raw link text after unsafe raw HTML link\./,
      );
      assert.match(rendered, /Before unsafe raw HTML image/);
      assert.match(rendered, /raw image text/);
      assert.match(rendered, /after unsafe raw HTML image\./);
      assert.doesNotMatch(rendered, /href=["'][^"']*javascript:/i);
      assert.doesNotMatch(rendered, /src=["'][^"']*javascript:/i);
      for (const marker of [
        "Before mixed-case unsafe raw HTML link",
        "mixed-case raw link text",
        "after mixed-case unsafe raw HTML link.",
        "Before percent-encoded unsafe raw HTML link",
        "percent-encoded raw link text",
        "after percent-encoded unsafe raw HTML link.",
        "Before mixed-case unsafe raw HTML image",
        "mixed-case raw image text",
        "after mixed-case unsafe raw HTML image.",
        "Before percent-encoded unsafe raw HTML image",
        "percent-encoded raw image text",
        "after percent-encoded unsafe raw HTML image.",
      ]) {
        assert.ok(rendered.includes(marker), `missing raw HTML safety marker: ${marker}`);
      }
      assert.doesNotMatch(
        rendered,
        /(?:href|src)=["'][^"']*(?:(?:javascript|data|vbscript):|(?:java%73cript|%64%61%74%61|%76%62%73%63%72%69%70%74):)/i,
      );
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.safeRawHtmlLinkAndImageDestinationsRemainUsable,
    "Before safe raw HTML link",
    () => {
      assert.match(
        rendered,
        /Before safe raw HTML link <a href="https:\/\/example\.com\/raw-safe"[^>]*>raw safe link text<\/a> after safe raw HTML link\./,
      );
      const safeImage = rendered.match(/<img\b[^>]*alt="raw safe image text"[^>]*>/)?.[0];
      assert.ok(safeImage, "safe raw HTML image was not rendered");
      assert.match(
        safeImage,
        /(?:src|data-canonical-src)="https:\/\/example\.com\/raw-safe\.png"/,
      );
      assert.match(rendered, /Before safe raw HTML image/);
      assert.match(rendered, /after safe raw HTML image\./);
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.safeInlineHtmlIsPreserved,
    "Before raw HTML",
    () => {
      assert.match(rendered, /Before raw HTML <span>boundary<\/span> after raw HTML\./);
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.executableRawHtmlIsEscaped,
    "Before executable raw HTML",
    () => {
      assert.match(
        rendered,
        /Before executable raw HTML &lt;script&gt;alert\("xss"\)&lt;\/script&gt; after executable raw HTML\./,
      );
      assert.doesNotMatch(rendered, /<script/);
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.unsafeHtmlAttributesAreRemoved,
    "Before unsafe attributes",
    () => {
      assert.match(
        rendered,
        /Before unsafe attributes <span>attributes removed<\/span> after unsafe attributes\./,
      );
      assert.doesNotMatch(rendered, /onclick=/);
      assert.doesNotMatch(rendered, /style="display:none"/);
      assert.doesNotMatch(rendered, /data-testid=/);
      assert.doesNotMatch(rendered, /class="raw-html"/);
    },
  );
  rendererBehaviorCoverage.checkBehavior(
    rendered,
    diagnosticBehaviorLabels.listsAndAuditFindingsRender,
    "Allowed:",
    () => {
      assert.match(rendered, /<ul[^>]*>[\s\S]*<li><strong>Allowed:<\/strong> Public documentation/);
      assert.match(rendered, /<ol[^>]*>[\s\S]*<li>"Review the evidence\."<\/li>/);
      assert.match(rendered, /<h3[^>]*>Per-item findings<\/h3>/);
    },
  );
  rendererBehaviorCoverage.assertComplete();
};

const runLiveCheck = async () => {
  const fixtureBytes = await readFile(fixturePath);
  const fixture = fixtureBytes.toString("utf8");
  const endpoint =
    process.env.GITHUB_MARKDOWN_API_URL ?? "https://api.github.com/markdown";
  const apiVersion = process.env.GITHUB_MARKDOWN_API_VERSION ?? "2022-11-28";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": apiVersion,
      "User-Agent": "overkill-hill-foundry-markdown-check",
    },
    body: JSON.stringify({
      text: fixture,
      mode: "gfm",
      context: "OKHP3/OverKill-Hill-FoundRy",
    }),
  });

  const rendered = await response.text();
  if (!response.ok) {
    throw new Error(
      formatGithubRendererResponseError(response.status, endpoint, rendered),
    );
  }

  assertRenderedMarkdown(rendered);
  assert.deepEqual(await readFile(fixturePath), fixtureBytes);

  console.log(
    `GitHub Markdown rendering passed for ${fixturePath} using ${endpoint}`,
  );
};

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await runLiveCheck();
}
