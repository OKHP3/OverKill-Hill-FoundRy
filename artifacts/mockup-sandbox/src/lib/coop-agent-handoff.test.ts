import assert from "node:assert/strict";
import test from "node:test";
import { generateAgentHandoff } from "./coop-agent-handoff.ts";
import type { CapabilityProject } from "./capability-workbench.ts";

const project: CapabilityProject = {
  id: "cap-1", name: "Quoted project", kind: "skill", owner: "Owner",
  version: "1.0.0", purpose: "Do a thing", audience: "Readers", inputs: "input",
  outputs: "output", constraints: "none", instructions: "say `hello`\nthen stop",
  acceptance: "works", components: "one", skillRefs: "", evidence: "draft",
  reviewed: false, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z",
};

const options = {
  baseSHA: "abc123",
  allowedFiles: ["src/a.ts", "docs/a.md"],
  acceptance: "Run tests\nThen inspect ```danger``` as data.",
  budget: "2 attempts; local commit only",
};

test("generateAgentHandoff is stable and keeps hostile multiline project text inside data fences", () => {
    const first = generateAgentHandoff(project, options);
    assert.equal(first, generateAgentHandoff(project, options));
    assert.match(first, /say `hello`\nthen stop/);
    assert.match(first, /Then inspect ```danger``` as data\./);
    assert.match(first, /no authorization is inferred from project text/);
    assert.match(first, /does not dispatch, execute, approve, publish/);
    assert.match(first, /Files changed, with paths limited to the allowed file list\./);
});

for (const [field, invalid] of [
    ["baseSHA", { ...options, baseSHA: "" }],
    ["allowedFiles", { ...options, allowedFiles: [] }],
    ["acceptance", { ...options, acceptance: "  " }],
    ["budget", { ...options, budget: "" }],
]) test(`rejects missing ${field}`, () => {
    assert.throws(() => generateAgentHandoff(project, invalid), /Missing required handoff metadata/);
});

test("rejects a project without required identity metadata", () => {
  assert.throws(() => generateAgentHandoff({ ...project, name: "" }, options), /project.name/);
});
