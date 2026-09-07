import assert from "node:assert/strict";
import test from "node:test";
import {
  CAPABILITY_WORKSPACE_KEY,
  assessCapability,
  buildCapabilityFiles,
  buildCapabilityZip,
  createCapabilityBackup,
  loadCapabilityWorkspace,
  newProject,
  parseCapabilityBackup,
  saveCapabilityWorkspace,
  type CapabilityProject,
  type CapabilityWorkspace,
} from "./capability-workbench.ts";

function completeProject(
  kind: CapabilityProject["kind"] = "prompt",
): CapabilityProject {
  return {
    ...newProject(kind),
    name: "Unicode guard 🔥",
    owner: "Jamie Hill",
    purpose: "Inspect structured contracts safely",
    audience: "OverKill Hill builders",
    inputs: "A JSON value",
    outputs: "A field and type report",
    constraints: "Never execute input; keep all data local",
    instructions: "Parse input and report its top-level shape",
    acceptance: "Valid JSON reports fields; invalid JSON reports an error",
    components: "Browser UI and contract inspector",
    skillRefs: "skillz/example only",
    evidence: "Unit test covers valid and malicious input handling",
  };
}

function workspace(project = completeProject()): CapabilityWorkspace {
  return { version: 1, activeId: project.id, projects: [project] };
}

test("backup round-trips an OKH workspace without sharing object references", () => {
  const original = workspace();
  const parsed = parseCapabilityBackup(createCapabilityBackup(original));
  assert.deepEqual(parsed, original);
  parsed.projects[0].name = "changed";
  assert.equal(original.projects[0].name, "Unicode guard 🔥");
});

test("backup parser rejects malformed, unknown, non-OKH, duplicate, and oversized input", () => {
  assert.throws(() => parseCapabilityBackup("{"), /valid JSON/);
  assert.throws(
    () =>
      parseCapabilityBackup(
        JSON.stringify({ schema: "elsewhere", schemaVersion: 1 }),
      ),
    /unknown schema/,
  );
  const envelope = JSON.parse(createCapabilityBackup(workspace()));
  envelope.audience = "askjamie";
  assert.throws(
    () => parseCapabilityBackup(JSON.stringify(envelope)),
    /not an OverKill Hill/,
  );
  envelope.audience = "overkillhill";
  envelope.workspace.projects.push({ ...envelope.workspace.projects[0] });
  assert.throws(
    () => parseCapabilityBackup(JSON.stringify(envelope)),
    /duplicate project id/,
  );
  envelope.workspace.projects.pop();
  envelope.workspace.projects[0].foreignPrivateState =
    "must not cross the schema boundary";
  assert.throws(
    () => parseCapabilityBackup(JSON.stringify(envelope)),
    /unknown project field/,
  );
  assert.throws(
    () => parseCapabilityBackup(" ".repeat(2_000_001)),
    /import limit/,
  );
});

test("generated backups enforce their own formatted export bound", () => {
  const projects = Array.from({ length: 5 }, (_, index) => ({
    ...completeProject(),
    id: `large-${index}`,
    name: "x".repeat(40_000),
    owner: "x".repeat(40_000),
    purpose: "x".repeat(40_000),
    audience: "x".repeat(40_000),
    inputs: "x".repeat(40_000),
    outputs: "x".repeat(40_000),
    instructions: "x".repeat(40_000),
    constraints: "x".repeat(40_000),
    components: "x".repeat(40_000),
    evidence: "x".repeat(40_000),
  }));
  assert.throws(
    () =>
      createCapabilityBackup({
        version: 1,
        activeId: projects[0].id,
        projects,
      }),
    /generated capability backup exceeds/,
  );
});

test("storage does not read GPT data and leaves malformed capability data untouched", () => {
  const values = new Map([
    [CAPABILITY_WORKSPACE_KEY, "not-json"],
    ["cgpt-workspace", "private sibling data"],
  ]);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      get length() {
        return values.size;
      },
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      key: (index: number) => [...values.keys()][index] ?? null,
    },
  });
  const result = loadCapabilityWorkspace();
  assert.match(result.warning, /left unchanged/);
  assert.equal(values.get(CAPABILITY_WORKSPACE_KEY), "not-json");
  assert.equal(values.get("cgpt-workspace"), "private sibling data");
  assert.equal(saveCapabilityWorkspace(workspace()), true);
  assert.equal(JSON.parse(values.get(CAPABILITY_WORKSPACE_KEY)!).version, 1);
  assert.equal(
    saveCapabilityWorkspace({ ...workspace(), projects: [] }),
    false,
  );
});

test("readiness remains a structural draft after owner review", () => {
  const project = completeProject();
  project.audience = "Internal software maintainers";
  assert.equal(
    assessCapability(project).state,
    "ready-for-owner-review-structural-draft",
  );
  project.reviewed = true;
  const result = assessCapability(project);
  assert.equal(result.state, "owner-reviewed-structural-draft");
  assert.equal(result.blockers.length, 0);
});

test("target packages include bounded target artifacts and honest claims", () => {
  for (const kind of ["prompt", "skill", "workflow", "software"] as const) {
    const files = buildCapabilityFiles(completeProject(kind));
    const paths = files.map((file) => file.path);
    assert.ok(paths.includes("capability.json"));
    assert.ok(paths.includes("docs/skillz-references.md"));
    assert.ok(
      paths.includes(
        {
          prompt: "prompts/prompt-contract.md",
          skill: "skill/SKILL.md",
          workflow: "docs/workflow-plan.md",
          software: "app/index.html",
        }[kind],
      ),
    );
    assert.match(
      files.find((file) => file.path === "docs/validation.md")!.content,
      /Behavioral validation: \*\*not claimed\*\*/,
    );
  }
  const skill = buildCapabilityFiles({
    ...completeProject("skill"),
    purpose: 'quote: "yes"\n---\nprivate',
  }).find((file) => file.path === "skill/SKILL.md")!.content;
  assert.match(skill, /^---\nname: "unicode-guard"/);
  assert.match(skill, /^---\nname: [^\n]+\ndescription: [^\n]+\n---\n\n# /);
});

test("software starter safely embeds hostile text and provides real contract-inspection behavior", () => {
  const files = buildCapabilityFiles({
    ...completeProject("software"),
    name: "</title><script>globalThis.pwned=true</script>",
    purpose: "</script><img src=x onerror=alert(1)>",
  });
  const html = files.find((file) => file.path === "app/index.html")!.content;
  assert.doesNotMatch(html, /<script>globalThis\.pwned/);
  assert.doesNotMatch(html, /<img src=x/);
  assert.match(html, /JSON\.parse\(input\.value\)/);
  assert.match(html, /Object\.fromEntries/);
  assert.match(html, /does not implement or validate the bespoke capability/);
});

test("stored ZIP has UTF-8 names, valid stored entries, and correct CRC records", () => {
  const bytes = buildCapabilityZip(completeProject("software"));
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const decoder = new TextDecoder();
  const paths: string[] = [];
  const testCrc32 = (data: Uint8Array): number => {
    let crc = 0xffffffff;
    for (const byte of data) {
      crc ^= byte;
      for (let bit = 0; bit < 8; bit += 1)
        crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
    return (crc ^ 0xffffffff) >>> 0;
  };
  let cursor = 0;
  while (view.getUint32(cursor, true) === 0x04034b50) {
    assert.equal(
      view.getUint16(cursor + 8, true),
      0,
      "entry uses the stored method",
    );
    const expectedCrc = view.getUint32(cursor + 14, true);
    const size = view.getUint32(cursor + 18, true);
    const pathLength = view.getUint16(cursor + 26, true);
    const extraLength = view.getUint16(cursor + 28, true);
    const pathStart = cursor + 30;
    const dataStart = pathStart + pathLength + extraLength;
    paths.push(
      decoder.decode(bytes.subarray(pathStart, pathStart + pathLength)),
    );
    assert.equal(
      testCrc32(bytes.subarray(dataStart, dataStart + size)),
      expectedCrc,
    );
    cursor = dataStart + size;
  }
  assert.ok(paths.includes("capability.json"));
  assert.ok(paths.includes("app/index.html"));
  assert.equal(
    view.getUint32(cursor, true),
    0x02014b50,
    "central directory follows local entries",
  );
  assert.ok(decoder.decode(bytes).includes("Unicode guard 🔥"));
});

test("failed storage writes keep newer memory edits when the workbench remounts", () => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    },
  });
  const project = newProject();
  const workspace: CapabilityWorkspace = {
    version: 1,
    activeId: project.id,
    projects: [project],
  };
  assert.equal(saveCapabilityWorkspace(workspace), true);
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: () => {
        throw new Error("quota");
      },
    },
  });
  workspace.projects[0].name = "Newest unsaved edit";
  assert.equal(saveCapabilityWorkspace(workspace), false);
  assert.equal(
    loadCapabilityWorkspace().workspace.projects[0].name,
    "Newest unsaved edit",
  );
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => {
        values.set(key, value);
      },
    },
  });
  assert.equal(saveCapabilityWorkspace(workspace), true);
});
