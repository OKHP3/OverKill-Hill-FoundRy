import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const fixturePath = resolve("tests/fixtures/github-markdown-rendering.md");
const githubMarkdownEndpoint = "https://api.github.com/markdown";

test("renders the versioned export fixture through GitHub's documented GFM endpoint", async ({ request }) => {
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

  expect(response.status(), await response.text()).toBe(200);
  const renderedHtml = await response.text();

  // These assertions intentionally inspect GitHub's HTML response instead of
  // comparing another local parser. The fixture is sent as-is and is never
  // rewritten into the downloaded export.
  expect(renderedHtml).toMatch(
    /<markdown-accessiblity-table><table role="table">[\s\S]*<th>Signal<\/th>[\s\S]*<td><strong>Ready<\/strong><\/td>/,
  );
  expect(renderedHtml).toContain('<div class="highlight highlight-source-ts"><pre class="notranslate">');
  expect(renderedHtml).toContain('<span class="pl-s1">answer</span>');
  expect(renderedHtml).toContain('<a href="https://example.com/docs" rel="nofollow">Read the docs</a>');
  expect(renderedHtml).toMatch(/<ul>[\s\S]*<li>Parent item[\s\S]*<ul>[\s\S]*<li>Nested item<\/li>/);
  expect(renderedHtml).toContain(
    "Before raw HTML <span>boundary</span> after raw HTML.",
  );
  await expect(readFile(fixturePath)).resolves.toEqual(fixtureBytes);
});