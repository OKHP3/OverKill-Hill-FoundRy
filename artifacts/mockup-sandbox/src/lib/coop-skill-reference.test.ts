import assert from "node:assert/strict";
import test from "node:test";
import { parseSkillReference } from "./coop-skill-reference.ts";

test("parses a pinned canonical Skillz blob reference and preserves source text", () => {
  const sourceText = "https://github.com/OKHP3/skillz/blob/0123456789abcdef0123456789abcdef01234567/foundry/example/SKILL.md";
  assert.deepEqual(parseSkillReference(sourceText), {
    sourceText,
    revision: "0123456789abcdef0123456789abcdef01234567",
    path: "foundry/example/SKILL.md",
    pinned: true,
  });
});

test("rejects mutable and slash-containing branch references", () => {
  for (const revision of ["main", "feature/foo"]) {
    assert.throws(() => parseSkillReference(`https://github.com/OKHP3/skillz/blob/${revision}/foundry/example/SKILL.md`), /full commit SHA/);
  }
});

test("rejects malformed references", () => {
  for (const sourceText of [
    "github.com/OKHP3/skillz/blob/main/example.md",
    "https://github.com/OKHP3/skillz/tree/main/example.md",
    "https://github.com/OKHP3/skillz/blob/main",
    "https://github.com/OKHP3/skillz/blob/main/../secret.md",
    "https://github.com/OKHP3/skillz/blob/main/example.md?raw=1",
  ]) {
    assert.throws(() => parseSkillReference(sourceText), /Invalid Skillz reference/);
  }
});

test("rejects other repositories, hosts, and ports", () => {
  for (const sourceText of [
    "https://github.com/other/skillz/blob/main/example.md",
    "https://gitlab.com/OKHP3/skillz/blob/main/example.md",
    "https://github.com:443/OKHP3/skillz/blob/main/example.md",
  ]) {
    assert.throws(() => parseSkillReference(sourceText), /Invalid Skillz reference/);
  }
});

test("rejects credential-bearing URLs", () => {
  assert.throws(
    () => parseSkillReference("https://user:password@github.com/OKHP3/skillz/blob/main/example.md"),
    /userinfo is not allowed/,
  );
});

