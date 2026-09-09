import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

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

  expect(renderedHtml).toMatch(
    /<markdown-accessiblity-table><table role="table">[\s\S]*<th>Signal<\/th>[\s\S]*<td><strong>Ready<\/strong><\/td>/,
  );
  expect(renderedHtml).toContain('<div class="highlight highlight-source-ts"><pre class="notranslate">');
  expect(renderedHtml).toContain('<span class="pl-s1">answer</span>');
  expect(renderedHtml).toContain(
    '<a href="https://example.com/evidence" rel="nofollow">Read the evidence guide</a>',
  );
  expect(renderedHtml).toMatch(/<ul>[\s\S]*<li><strong>Allowed:<\/strong> Public documentation/);
  expect(renderedHtml).toMatch(/<ol>[\s\S]*<li>"Review the evidence\."<\/li>/);
  expect(renderedHtml).toContain(
    'Before raw HTML <span>boundary</span> after raw HTML.',
  );
  expect(renderedHtml).toMatch(/<h3[^>]*>Per-item findings<\/h3>/);
  await expect(readFile(fixturePath)).resolves.toEqual(fixtureBytes);
});