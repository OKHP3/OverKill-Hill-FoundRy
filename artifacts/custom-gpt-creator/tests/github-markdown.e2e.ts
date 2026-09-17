import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  checkBehavior,
  diagnosticBehaviorLabels,
} from "./github-markdown-diagnostics.mjs";

const fixturePath = resolve("tests/fixtures/github-markdown-fixture.v1.md");
const githubMarkdownEndpoint = "https://api.github.com/markdown";
const headingMarkup = (heading: string) =>
  new RegExp(`<h2[^>]*>${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/h2>`);

test("renders the complete Creator export through GitHub's documented GFM endpoint", async ({ request }) => {
  const fixtureBytes = await readFile(fixturePath);
  const markdown = fixtureBytes.toString("utf8");
  const authorization = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN;

  const response = await request.post(githubMarkdownEndpoint, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "custom-gpt-creator-markdown-rendering-check",
      ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
    },
    data: {
      text: markdown,
      mode: "gfm",
      context: "OKHP3/OverKill-Hill-FoundRy",
    },
  });

  const renderedHtml = await response.text();
  expect(response.status(), renderedHtml).toBe(200);

  // These assertions intentionally inspect GitHub's HTML response instead of
  // comparing another local parser. The fixture is sent as-is and is never
  // rewritten into the downloaded export.
  for (const heading of [
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
  ]) {
    expect(renderedHtml).toMatch(headingMarkup(heading));
  }
  const headingPositions = [
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
  ].map((heading) => renderedHtml.search(headingMarkup(heading)));
  expect(headingPositions).toEqual([...headingPositions].sort((a, b) => a - b));

  checkBehavior(renderedHtml, diagnosticBehaviorLabels.tableAndCodeRendering, "Signal", () => {
    expect(renderedHtml).toMatch(
      /<markdown-accessiblity-table><table role="table">[\s\S]*<th>Signal<\/th>[\s\S]*<td><strong>Ready<\/strong><\/td>/,
    );
    expect(renderedHtml).toMatch(
      /<div class="highlight highlight-source-ts"[^>]*><pre class="notranslate">/,
    );
    expect(renderedHtml).toContain('<span class="pl-s1">answer</span>');
  });
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.safeLinksRemainLinks,
    "Read the evidence guide",
    () => {
      expect(renderedHtml).toContain(
        '<a href="https://example.com/evidence" rel="nofollow">Read the evidence guide</a>',
      );
      expect(renderedHtml).toContain(
        '<a href="./evidence-guide.md">Read the repository evidence guide</a>',
      );
      expect(renderedHtml).toContain(
        '<a href="https://example.com/safe" rel="nofollow">Safe HTTPS link</a>',
      );
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.relativeEvidenceLinksPreserveSectionAnchors,
    "Read the repository evidence section",
    () => {
      expect(renderedHtml).toContain(
        '<a href="./evidence-guide.md#evidence-handling">Read the repository evidence section</a>',
      );
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.nestedRepositoryRelativeEvidenceLinksPreserveNestedPaths,
    "Read the nested repository evidence guide",
    () => {
      expect(renderedHtml).toContain(
        '<a href="./docs/evidence-guide.md#evidence-handling">Read the nested repository evidence guide</a>',
      );
    },
  );
  checkBehavior(
    renderedHtml,
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
      ]) {
        expect(renderedHtml).toContain(marker);
      }
      expect(renderedHtml).not.toMatch(
        /(?:href|src)=["'][^"']*(?:(?:javascript|data|vbscript):|(?:java%73cript|%64%61%74%61|%76%62%73%63%72%69%70%74):)/i,
      );
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.unsafeRawHtmlLinkAndImageDestinationsAreNonExecutable,
    "Before unsafe raw HTML link",
    () => {
      expect(renderedHtml).toContain(
        "Before unsafe raw HTML link raw link text after unsafe raw HTML link.",
      );
      expect(renderedHtml).toContain("Before unsafe raw HTML image");
      expect(renderedHtml).toContain("raw image text");
      expect(renderedHtml).toContain("after unsafe raw HTML image.");
      expect(renderedHtml).not.toMatch(/href=["'][^"']*javascript:/i);
      expect(renderedHtml).not.toMatch(/src=["'][^"']*javascript:/i);
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.safeInlineHtmlIsPreserved,
    "Before raw HTML",
    () => {
      expect(renderedHtml).toContain(
        'Before raw HTML <span>boundary</span> after raw HTML.',
      );
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.executableRawHtmlIsEscaped,
    "Before executable raw HTML",
    () => {
      expect(renderedHtml).toContain(
        'Before executable raw HTML &lt;script&gt;alert("xss")&lt;/script&gt; after executable raw HTML.',
      );
      expect(renderedHtml).not.toContain("<script");
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.unsafeHtmlAttributesAreRemoved,
    "Before unsafe attributes",
    () => {
      expect(renderedHtml).toContain(
        "Before unsafe attributes <span>attributes removed</span> after unsafe attributes.",
      );
      expect(renderedHtml).not.toContain("onclick=");
      expect(renderedHtml).not.toContain('style="display:none"');
      expect(renderedHtml).not.toContain("data-testid=");
    },
  );
  checkBehavior(
    renderedHtml,
    diagnosticBehaviorLabels.listsAndAuditFindingsRender,
    "Allowed:",
    () => {
      expect(renderedHtml).toMatch(/<ul[^>]*>[\s\S]*<li><strong>Allowed:<\/strong> Public documentation/);
      expect(renderedHtml).toMatch(/<ol[^>]*>[\s\S]*<li>"Review the evidence\."<\/li>/);
      expect(renderedHtml).toMatch(/<h3[^>]*>Per-item findings<\/h3>/);
    },
  );
  await expect(readFile(fixturePath)).resolves.toEqual(fixtureBytes);
});