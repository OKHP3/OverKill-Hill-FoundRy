import assert from "node:assert/strict";
import test from "node:test";
import { diffCapabilityProjects } from "./coop-project-diff.ts";
import { newProject, type CapabilityProject } from "./capability-workbench.ts";

function project(): CapabilityProject {
  return {
    ...newProject("prompt"),
    id: "project-1",
    name: "A project 🔥",
    owner: "Jamie",
    purpose: "Compare revisions",
    audience: "Builders",
    inputs: "Text",
    outputs: "A diff",
    constraints: "Keep data intact",
    instructions: "Report changes",
    acceptance: "Changes are ordered",
    components: "A pure function",
    skillRefs: "none",
    evidence: "Synthetic test evidence",
    createdAt: "2026-09-07T00:00:00.000Z",
    updatedAt: "2026-09-07T00:00:00.000Z",
  };
}

test("identical projects produce deterministic empty buckets", () => {
  const value = project();
  assert.deepEqual(diffCapabilityProjects(value, value), {
    authored: [],
    metadata: [],
  });
});

test("edited authored fields and metadata are separated in stable field order", () => {
  const before = project();
  const after = { ...before, evidence: "verified?", name: "Changed", reviewed: true,
    updatedAt: "2026-09-08T00:00:00.000Z", id: "project-2" };
  assert.deepEqual(diffCapabilityProjects(before, after), {
    authored: [
      { field: "name", before: "A project 🔥", after: "Changed" },
      { field: "evidence", before: "Synthetic test evidence", after: "verified?" },
      { field: "reviewed", before: false, after: true },
    ],
    metadata: [
      { field: "id", before: "project-1", after: "project-2" },
      { field: "updatedAt", before: "2026-09-07T00:00:00.000Z", after: "2026-09-08T00:00:00.000Z" },
    ],
  });
});

test("Unicode and hostile-looking text is returned unchanged as data", () => {
  const before = project();
  const hostile = "</script><img src=x onerror=alert('x')>\u2028\ud83d\udca5";
  const after = { ...before, instructions: hostile, purpose: "\u0000\u2028" };
  const diff = diffCapabilityProjects(before, after);
  assert.deepEqual(diff.authored, [
    { field: "purpose", before: "Compare revisions", after: "\u0000\u2028" },
    { field: "instructions", before: "Report changes", after: hostile },
  ]);
  assert.equal(typeof diff.authored[0].after, "string");
});

test("does not mutate either project", () => {
  const before = project();
  const after = { ...before, name: "Changed" };
  const beforeSnapshot = structuredClone(before);
  const afterSnapshot = structuredClone(after);
  diffCapabilityProjects(before, after).authored[0].after = "mutated result";
  assert.deepEqual(before, beforeSnapshot);
  assert.deepEqual(after, afterSnapshot);
});
