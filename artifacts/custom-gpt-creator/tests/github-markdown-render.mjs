import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const fixturePath = fileURLToPath(
  new URL("./fixtures/github-markdown-fixture.v1.md", import.meta.url),
);
const fixtureBytes = await readFile(fixturePath);
const fixture = fixtureBytes.toString("utf8");
const renderedFragment = (html, marker) => {
  const markerPosition = html.indexOf(marker);
  if (markerPosition === -1) {
    return `[marker "${marker}" not found]\n${html.slice(0, 500)}`;
  }

  const start = Math.max(0, markerPosition - 180);
  const end = Math.min(html.length, markerPosition + marker.length + 260);
  return html.slice(start, end);
};
const checkBehavior = (rendered, behavior, marker, assertion) => {
  try {
    assertion();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `${behavior} failed: ${message}\nRendered fragment near "${marker}":\n${renderedFragment(rendered, marker)}`,
      { cause: error },
    );
  }
};
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
    `GitHub Markdown rendering failed with ${response.status}: ${rendered.slice(0, 500)}`,
  );
}

assert.match(rendered, /<h1[^>]*>Custom GPT Specification Package<\/h1>/);
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
for (const heading of headings) assert.match(rendered, headingMarkup(heading));
assert.deepEqual(
  headings.map((heading) => rendered.search(headingMarkup(heading))),
  [...headings.map((heading) => rendered.search(headingMarkup(heading)))].sort((a, b) => a - b),
);
checkBehavior(rendered, "table and code rendering", "Signal", () => {
  assert.match(rendered, /<markdown-accessiblity-table><table[^>]*>/);
  assert.match(rendered, /<strong>Ready<\/strong>/);
  assert.match(rendered, /class="highlight highlight-source-ts"/);
  assert.match(rendered, /answer/);
});
checkBehavior(rendered, "safe links remain links", "Read the evidence guide", () => {
  assert.match(
    rendered,
    /<a href="https:\/\/example\.com\/evidence"[^>]*>Read the evidence guide<\/a>/,
  );
  assert.match(
    rendered,
    /<a href="\.\/evidence-guide\.md"[^>]*>Read the repository evidence guide<\/a>/,
  );
  assert.match(rendered, /<a href="https:\/\/example\.com\/safe"[^>]*>Safe HTTPS link<\/a>/);
});
checkBehavior(
  rendered,
  "relative evidence links preserve section anchors",
  "Read the repository evidence section",
  () => {
    assert.match(
      rendered,
      /<a href="\.\/evidence-guide\.md#evidence-handling"[^>]*>Read the repository evidence section<\/a>/,
    );
  },
);
checkBehavior(
  rendered,
  "nested repository-relative evidence links preserve nested paths",
  "Read the nested repository evidence guide",
  () => {
    assert.match(
      rendered,
      /<a href="\.\/docs\/evidence-guide\.md"[^>]*>Read the nested repository evidence guide<\/a>/,
    );
  },
);
checkBehavior(rendered, "unsafe URL protocols are removed", "Unsafe protocol link", () => {
  assert.match(rendered, /<p[^>]*>Unsafe protocol link<\/p>/);
  assert.match(rendered, /alt="Unsafe protocol image"/);
  assert.doesNotMatch(rendered, /(?:href|src)=["'][^"']*javascript:/i);
});
checkBehavior(rendered, "safe inline HTML is preserved", "Before raw HTML", () => {
  assert.match(rendered, /Before raw HTML <span>boundary<\/span> after raw HTML\./);
});
checkBehavior(rendered, "executable raw HTML is escaped", "Before executable raw HTML", () => {
  assert.match(
    rendered,
    /Before executable raw HTML &lt;script&gt;alert\("xss"\)&lt;\/script&gt; after executable raw HTML\./,
  );
  assert.doesNotMatch(rendered, /<script/);
});
checkBehavior(rendered, "unsafe HTML attributes are removed", "Before unsafe attributes", () => {
  assert.match(
    rendered,
    /Before unsafe attributes <span>attributes removed<\/span> after unsafe attributes\./,
  );
  assert.doesNotMatch(rendered, /onclick=/);
  assert.doesNotMatch(rendered, /style="display:none"/);
  assert.doesNotMatch(rendered, /data-testid=/);
  assert.doesNotMatch(rendered, /class="raw-html"/);
});
checkBehavior(rendered, "lists and audit findings render", "Allowed:", () => {
  assert.match(rendered, /<ul[^>]*>[\s\S]*<li><strong>Allowed:<\/strong> Public documentation/);
  assert.match(rendered, /<ol[^>]*>[\s\S]*<li>"Review the evidence\."<\/li>/);
  assert.match(rendered, /<h3[^>]*>Per-item findings<\/h3>/);
});
assert.deepEqual(await readFile(fixturePath), fixtureBytes);

console.log(
  `GitHub Markdown rendering passed for ${fixturePath} using ${endpoint}`,
);