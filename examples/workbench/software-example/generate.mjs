import { mkdir, writeFile } from "node:fs/promises";
import { buildCapabilityFiles, createCapabilityBackup, newProject } from "../../../artifacts/mockup-sandbox/src/lib/capability-workbench.ts";

const project = {
  ...newProject("software"),
  id: "contract-inspector-example",
  name: "JSON Contract Inspector",
  owner: "OverKill Hill FoundRy",
  version: "0.1.0",
  purpose: "Inspect a JSON value and report its top-level fields and primitive value types.",
  audience: "OverKill Hill builders",
  inputs: "A JSON value entered in the browser starter.",
  outputs: "A JSON report of validJson and top-level field types.",
  constraints: "Dependency-free, local-only, never execute input, and treat names as data.",
  instructions: "Parse the input and report its top-level shape; return a readable parse error for invalid JSON.",
  acceptance: "Valid objects report field types; arrays and primitives report their shape; malformed JSON reports validJson false; hostile text cannot inject markup.",
  components: "Generated app/index.html, app/README.md, and the versioned FoundRy backup envelope.",
  skillRefs: "",
  evidence: "Smoke checker exercises valid, invalid, and hostile JSON in a real browser runtime.",
  reviewed: false,
};

const root = new URL("./generated/", import.meta.url);
const files = buildCapabilityFiles(project);
for (const file of files) {
  const target = new URL(file.path, root);
  await mkdir(new URL(".", target), { recursive: true });
  await writeFile(target, file.content);
}
await writeFile(new URL("backup.json", root), createCapabilityBackup({ version: 1, activeId: project.id, projects: [project] }));
