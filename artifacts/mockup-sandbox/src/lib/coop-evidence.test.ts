import assert from "node:assert/strict";
import test from "node:test";
import {
  assessCapability,
  buildCapabilityFiles,
  newProject,
  type CapabilityKind,
  type CapabilityProject,
} from "./capability-workbench.ts";

const kinds: CapabilityKind[] = ["prompt", "skill", "workflow", "software"];

function completeProject(kind: CapabilityKind, evidence: string, reviewed = false): CapabilityProject {
  return {
    ...newProject(kind),
    name: `${kind} evidence fixture`,
    owner: "FoundRy test owner",
    purpose: "Describe a bounded capability",
    audience: "OverKill Hill builders",
    inputs: "A supplied request",
    outputs: "A reviewable package",
    constraints: "Keep claims bounded to recorded evidence",
    instructions: "Produce the package without executing the capability",
    acceptance: "The package preserves its evidence boundary",
    components: "Generator output",
    evidence,
    reviewed,
  };
}

function generatedFile(project: CapabilityProject, path: string): string {
  const file = buildCapabilityFiles(project).find((candidate) => candidate.path === path);
  assert.ok(file, `generated package should contain ${path}`);
  return file.content;
}

test("every generated kind keeps authored evidence separate from proof and permission", () => {
  for (const kind of kinds) {
    const project = completeProject(kind, "Owner supplied acceptance notes", true);
    const packageJson = JSON.parse(generatedFile(project, "capability.json")) as {
      capability: CapabilityProject;
      readiness: {
        state: string;
        behavioralValidation: string;
        publicationAuthorized: boolean;
      };
    };
    assert.equal(packageJson.capability.evidence, "Owner supplied acceptance notes");
    assert.equal(packageJson.capability.reviewed, true);
    assert.equal(packageJson.readiness.state, "owner-reviewed-structural-draft");
    assert.equal(packageJson.readiness.behavioralValidation, "not-claimed");
    assert.equal(packageJson.readiness.publicationAuthorized, false);

    const validation = generatedFile(project, "docs/validation.md");
    assert.match(validation, /Behavioral validation: \*\*not claimed\*\*/);
    assert.match(validation, /Publication authorization: \*\*not granted\*\*/);
    assert.match(validation, /Owner supplied acceptance notes/);
  }
});

test("empty or whitespace evidence remains incomplete even after review", () => {
  for (const kind of kinds) {
    for (const evidence of ["", "   \n\t  "]) {
      const project = completeProject(kind, evidence, true);
      const assessment = assessCapability(project);
      assert.equal(assessment.state, "incomplete-structural-draft");
      assert.ok(assessment.blockers.includes("Validation evidence recorded is incomplete."));

      const packageJson = JSON.parse(generatedFile(project, "capability.json")) as {
        readiness: { state: string; behavioralValidation: string; publicationAuthorized: boolean };
      };
      assert.equal(packageJson.readiness.state, "incomplete-structural-draft");
      assert.equal(packageJson.readiness.behavioralValidation, "not-claimed");
      assert.equal(packageJson.readiness.publicationAuthorized, false);
      assert.match(generatedFile(project, "docs/validation.md"), /Recorded evidence\n\nTBD/);
    }
  }
});

test("recorded evidence changes structural readiness only, never behavioral or publication status", () => {
  for (const kind of kinds) {
    const project = completeProject(kind, "Observed generator output in a local review", false);
    const assessment = assessCapability(project);
    assert.equal(assessment.state, "ready-for-owner-review-structural-draft");
    assert.equal(assessment.checks.find((check) => check.label === "Validation evidence recorded")?.passed, true);

    const validation = generatedFile(project, "docs/validation.md");
    assert.match(validation, /Readiness: \*\*ready-for-owner-review-structural-draft\*\*/);
    assert.match(validation, /Behavioral validation: \*\*not claimed\*\*/);
    assert.match(validation, /Publication authorization: \*\*not granted\*\*/);
    assert.match(validation, /Observed generator output in a local review/);
  }
});
