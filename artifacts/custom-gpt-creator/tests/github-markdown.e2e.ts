import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const fixturePath = resolve("tests/fixtures/github-markdown-fixture.v1.md");
const githubMarkdownEndpoint = "https://api.github.com/markdown";
const headingMarkup = (heading: string) =>
  new RegExp(`<h2[^>]*>${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/h2>`);
const renderedFragment = (html: string, marker: string) => {
  const markerPosition = html.indexOf(marker);
  if (markerPosition === -1) {
    return `[marker "${marker}" not found]\n${html.slice(0, 500)}`;
  }

  const start = Math.max(0, markerPosition - 180);
  const end = Math.min(html.length, markerPosition + marker.length + 260);
  return html.slice(start, end);
};
const checkBehavior = (
  renderedHtml: string,
  behavior: string,
  marker: string,
  assertion: () => void,
) => {
  try {
    assertion();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${behavior} failed: ${message}\nRendered fragment near "${marker}":\n${renderedFragment(renderedHtml, marker)}`,
      { cause: error },
    );
  }
};

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

  checkBehavior(renderedHtml, "table and code rendering", "Signal", () => {
    expect(renderedHtml).toMatch(
      /<markdown-accessiblity-table><table role="table">[\s\S]*<th>Signal<\/th>[\s\S]*<td><strong>Ready<\/strong><\/td>/,
    );
    expect(renderedHtml).toContain('<div class="highlight highlight-source-ts"><pre class="notranslate">');
    expect(renderedHtml).toContain('<span class="pl-s1">answer</span>');
  });
  checkBehavior(renderedHtml, "safe links remain links", "Read the evidence guide", () => {
    expect(renderedHtml).toContain(
      '<a href="https://example.com/evidence" rel="nofollow">Read the evidence guide</a>',
    );
    expect(renderedHtml).toContain(
      '<a href="./evidence-guide.md">Read the repository evidence guide</a>',
    );
    expect(renderedHtml).toContain(
      '<a href="https://example.com/safe" rel="nofollow">Safe HTTPS link</a>',
    );
  });
  checkBehavior(renderedHtml, "unsafe URL protocols are removed", "Unsafe protocol link", () => {
    expect(renderedHtml).toMatch(/<p>Unsafe protocol link<\/p>/);
    expect(renderedHtml).toContain('alt="Unsafe protocol image"');
    expect(renderedHtml).not.toMatch(/(?:href|src)=["'][^"']*javascript:/i);
  });
  checkBehavior(renderedHtml, "safe inline HTML is preserved", "Before raw HTML", () => {
    expect(renderedHtml).toContain(
      'Before raw HTML <span>boundary</span> after raw HTML.',
    );
  });
  checkBehavior(renderedHtml, "executable raw HTML is escaped", "Before executable raw HTML", () => {
    expect(renderedHtml).toContain(
      'Before executable raw HTML &lt;script&gt;alert("xss")&lt;/script&gt; after executable raw HTML.',
    );
    expect(renderedHtml).not.toContain("<script");
  });
  checkBehavior(renderedHtml, "unsafe HTML attributes are removed", "Before unsafe attributes", () => {
    expect(renderedHtml).toContain(
      "Before unsafe attributes <span>attributes removed</span> after unsafe attributes.",
    );
    expect(renderedHtml).not.toContain("onclick=");
    expect(renderedHtml).not.toContain('style="display:none"');
    expect(renderedHtml).not.toContain("data-testid=");
  });
  checkBehavior(renderedHtml, "lists and audit findings render", "Allowed:", () => {
    expect(renderedHtml).toMatch(/<ul>[\s\S]*<li><strong>Allowed:<\/strong> Public documentation/);
    expect(renderedHtml).toMatch(/<ol>[\s\S]*<li>"Review the evidence\."<\/li>/);
    expect(renderedHtml).toMatch(/<h3[^>]*>Per-item findings<\/h3>/);
  });
  await expect(readFile(fixturePath)).resolves.toEqual(fixtureBytes);
});