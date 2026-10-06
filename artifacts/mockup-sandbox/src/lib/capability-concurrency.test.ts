import assert from "node:assert/strict";
import test from "node:test";
import {
  CAPABILITY_WORKSPACE_KEY,
  createCapabilityConflictBackup,
  loadCapabilityWorkspace,
  newProject,
  saveCapabilityWorkspaceRevisionAware,
  type CapabilityWorkspace,
} from "./capability-workbench.ts";

function makeWorkspace(): CapabilityWorkspace {
  const project = newProject();
  return { version: 1, activeId: project.id, projects: [project] };
}

function installStorage(): { values: Map<string, string>; restore: () => void } {
  const values = new Map<string, string>();
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  });
  return {
    values,
    restore: () => {
      if (previous) Object.defineProperty(globalThis, "localStorage", previous);
      else delete (globalThis as { localStorage?: unknown }).localStorage;
    },
  };
}

test("two stale tabs merge different project fields without losing either edit", () => {
  const storage = installStorage();
  try {
    const base = makeWorkspace();
    assert.equal(saveCapabilityWorkspaceRevisionAware(base).saved, true);
    const tabA = structuredClone(base);
    const tabB = structuredClone(base);
    tabA.projects[0].name = "Saved from tab A";
    assert.equal(saveCapabilityWorkspaceRevisionAware(tabA, base).saved, true);
    tabB.projects[0].purpose = "Saved from tab B";
    const result = saveCapabilityWorkspaceRevisionAware(tabB, base);
    assert.equal(result.saved, true);
    assert.equal(result.workspace.projects[0].name, "Saved from tab A");
    assert.equal(result.workspace.projects[0].purpose, "Saved from tab B");
    const persisted = JSON.parse(storage.values.get(CAPABILITY_WORKSPACE_KEY)!);
    assert.equal(persisted.projects[0].name, "Saved from tab A");
    assert.equal(persisted.projects[0].purpose, "Saved from tab B");
  } finally {
    storage.restore();
  }
});

test("same-field stale writes keep authority and export both inspectable snapshots", () => {
  const storage = installStorage();
  try {
    const base = makeWorkspace();
    assert.equal(saveCapabilityWorkspaceRevisionAware(base).saved, true);
    const tabA = structuredClone(base);
    const tabB = structuredClone(base);
    tabA.projects[0].name = "Authoritative edit";
    assert.equal(saveCapabilityWorkspaceRevisionAware(tabA, base).saved, true);
    tabB.projects[0].name = "Competing edit";
    const result = saveCapabilityWorkspaceRevisionAware(tabB, base);
    assert.equal(result.saved, false);
    assert.equal(result.workspace.projects[0].name, "Competing edit");
    assert.equal(result.conflict?.authoritativeSnapshot.projects[0].name, "Authoritative edit");
    assert.equal(result.conflict?.competingSnapshot.projects[0].name, "Competing edit");
    assert.ok(result.conflict?.authoritativeRevision);
    const recovery = JSON.parse(createCapabilityConflictBackup(result.conflict!));
    assert.equal(recovery.authoritativeSnapshot.projects[0].name, "Authoritative edit");
    assert.equal(recovery.competingSnapshot.projects[0].name, "Competing edit");
    assert.equal(loadCapabilityWorkspace().workspace.projects[0].name, "Competing edit");
    assert.equal(JSON.parse(storage.values.get(CAPABILITY_WORKSPACE_KEY)!).projects[0].name, "Authoritative edit");
  } finally {
    storage.restore();
  }
});
