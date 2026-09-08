import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_CAPABILITY_FIELD_LENGTH,
  MAX_CAPABILITY_IMPORT_BYTES,
  MAX_CAPABILITY_PROJECTS,
  createCapabilityBackup,
  newProject,
  parseCapabilityBackup,
  type CapabilityProject,
  type CapabilityWorkspace,
} from "./capability-workbench.ts";

const utf8Bytes = (value: string): number => new TextEncoder().encode(value).length;

function fixture(): CapabilityWorkspace {
  const project: CapabilityProject = {
    ...newProject("prompt"),
    id: "boundary-project",
    name: "Boundary fixture",
  };
  return { version: 1, activeId: project.id, projects: [project] };
}

function envelope(workspace = fixture()): Record<string, unknown> {
  return JSON.parse(createCapabilityBackup(workspace)) as Record<string, unknown>;
}

function textWithBytes(byteCount: number): string {
  const emoji = "🔥";
  const emojiBytes = utf8Bytes(emoji);
  const emojiCount = Math.floor(byteCount / emojiBytes);
  return emoji.repeat(emojiCount) + "x".repeat(byteCount - emojiCount * emojiBytes);
}

test("parser accepts and rejects the UTF-8 field boundary by bytes", () => {
  const cases = [
    { bytes: MAX_CAPABILITY_FIELD_LENGTH, accepted: true },
    { bytes: MAX_CAPABILITY_FIELD_LENGTH + 1, accepted: false },
  ];
  for (const { bytes, accepted } of cases) {
    const value = envelope();
    const project = value.workspace as { projects: Array<Record<string, unknown>> };
    project.projects[0].purpose = textWithBytes(bytes - 0);
    assert.equal(utf8Bytes(project.projects[0].purpose as string), bytes);
    if (accepted) {
      assert.equal(parseCapabilityBackup(JSON.stringify(value)).projects[0].purpose, project.projects[0].purpose);
    } else {
      assert.throws(() => parseCapabilityBackup(JSON.stringify(value)), /40000-byte limit/);
    }
  }
});

test("parser accepts the project-count ceiling and rejects one beyond it", () => {
  const cases = [
    { count: MAX_CAPABILITY_PROJECTS, accepted: true },
    { count: MAX_CAPABILITY_PROJECTS + 1, accepted: false },
  ];
  for (const { count, accepted } of cases) {
    const projects = Array.from({ length: count }, (_, index) => ({
      ...newProject("prompt"),
      id: `count-${index}`,
    }));
    const value = envelope();
    value.workspace = { version: 1, activeId: "count-0", projects };
    if (accepted) {
      assert.equal(parseCapabilityBackup(JSON.stringify(value)).projects.length, count);
    } else {
      assert.throws(() => parseCapabilityBackup(JSON.stringify(value)), /20-project limit/);
    }
  }
});

test("parser measures the import boundary in UTF-8 bytes", () => {
  const base = envelope();
  const prefix = JSON.stringify({ ...base, padding: "" });
  const paddingBytes = MAX_CAPABILITY_IMPORT_BYTES - utf8Bytes(prefix);
  assert.ok(paddingBytes > 0);
  const exact = JSON.stringify({ ...base, padding: "x".repeat(paddingBytes) });
  assert.equal(utf8Bytes(exact), MAX_CAPABILITY_IMPORT_BYTES);
  assert.equal(parseCapabilityBackup(exact).activeId, "boundary-project");
  const over = JSON.stringify({ ...base, padding: "x".repeat(paddingBytes + 1) });
  assert.equal(utf8Bytes(over), MAX_CAPABILITY_IMPORT_BYTES + 1);
  assert.throws(() => parseCapabilityBackup(over), /2000000-byte import limit/);
});

test("envelope extensions are ignored while unknown versions remain rejected", () => {
  const extended = envelope();
  extended.futureMetadata = { producer: "test", bytes: "🔥" };
  (extended.lineage as Record<string, unknown>).futureField = true;
  assert.equal(parseCapabilityBackup(JSON.stringify(extended)).activeId, "boundary-project");

  const unknownVersion = { ...extended, schemaVersion: 2 };
  assert.throws(() => parseCapabilityBackup(JSON.stringify(unknownVersion)), /unknown schema or version/);
});

test("parsed workspaces isolate project arrays and values across parses", () => {
  const backup = createCapabilityBackup(fixture());
  const first = parseCapabilityBackup(backup);
  first.projects.push({ ...first.projects[0], id: "mutated" });
  first.projects[0].name = "mutated";
  const second = parseCapabilityBackup(backup);
  assert.equal(second.projects.length, 1);
  assert.equal(second.projects[0].id, "boundary-project");
  assert.equal(second.projects[0].name, "Boundary fixture");
});
