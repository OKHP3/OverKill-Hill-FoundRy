import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const fixturePath = fileURLToPath(
  new URL("./fixtures/github-markdown-fixture.v1.md", import.meta.url),
);
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
    `GitHub Markdown rendering failed with ${response.status}: ${rendered.slice(0, 500)}`,
  );
}

assert.match(rendered, /<h1[^>]*>Custom GPT Specification Package<\/h1>/);
assert.match(rendered, /<h2[^>]*>0\. Build Brief<\/h2>/);
assert.match(rendered, /<h3[^>]*>Primary Outcomes<\/h3>/);
assert.match(rendered, /<ul[^>]*>[\s\S]*<ul[^>]*>[\s\S]*Nested item/);
assert.match(rendered, /<ol[^>]*>[\s\S]*Review the package\./);
assert.match(rendered, /<markdown-accessiblity-table><table[^>]*>/);
assert.match(rendered, /<strong>Ready<\/strong>/);
assert.match(rendered, /<a href="https:\/\/example\.com\/docs"[^>]*>Read the docs<\/a>/);
assert.match(rendered, /class="highlight highlight-source-ts"/);
assert.match(rendered, /answer/);
assert.match(rendered, /<span>literal HTML<\/span>/);
assert.doesNotMatch(rendered, /class="raw-html"/);
assert.deepEqual(await readFile(fixturePath), fixtureBytes);

console.log(
  `GitHub Markdown rendering passed for ${fixturePath} using ${endpoint}`,
);