import assert from "node:assert/strict";
import test from "node:test";
import type { CapabilityProject, CapabilityWorkspace } from "./capability-workbench.ts";
import { planCapabilityWorkspaceImport } from "./coop-import-plan.ts";

const project = (id: string, name = id): CapabilityProject => ({
  id, name, kind: "prompt", owner: "owner", version: "1.0.0", purpose: "purpose",
  audience: "audience", inputs: "inputs", outputs: "outputs", constraints: "constraints",
  instructions: "instructions", acceptance: "acceptance", components: "components",
  skillRefs: "skillRefs", evidence: "evidence", reviewed: false,
  createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z",
});
const workspace = (projects: CapabilityProject[]): CapabilityWorkspace => ({ version: 1, activeId: projects[0].id, projects });

test("classifies identical, conflicting, and new ids deterministically", () => {
  const existing = workspace([project("same"), project("change", "old")]);
  const incoming = workspace([project("change", "new"), project("same"), project("new")]);
  const plan = planCapabilityWorkspaceImport(existing, incoming);
  assert.deepEqual(plan.projects.map(({ id, status }) => ({ id, status })), [
    { id: "same", status: "identical" }, { id: "change", status: "conflicting" }, { id: "new", status: "new" },
  ]);
  assert.equal(plan.projectCount, 3);
  assert.equal(plan.countOverflow, false);
});

test("flags overflow without selecting a conflict resolution", () => {
  const plan = planCapabilityWorkspaceImport(workspace([project("a")]), workspace([project("b"), project("c")]), 2);
  assert.equal(plan.projectCount, 3);
  assert.equal(plan.countOverflow, true);
  assert.equal(plan.projects[0].status, "new");
});

test("does not mutate inputs or expose mutable project references", () => {
  const existing = workspace([project("same")]);
  const incoming = workspace([project("same")]);
  const plan = planCapabilityWorkspaceImport(existing, incoming);
  plan.projects[0].existing!.name = "changed preview";
  assert.equal(existing.projects[0].name, "same");
  assert.equal(incoming.projects[0].name, "same");
});

test("rejects an invalid project bound", () => {
  assert.throws(() => planCapabilityWorkspaceImport(workspace([project("a")]), workspace([project("b")]), 0), /positive integer/);
});
