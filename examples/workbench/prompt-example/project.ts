import {
  buildCapabilityFiles,
  createCapabilityBackup,
  parseCapabilityBackup,
  type CapabilityProject,
} from "../../../artifacts/mockup-sandbox/src/lib/capability-workbench.ts";

export const project: CapabilityProject = {
  id: "prompt-example-action-items",
  name: "Action item extractor with source references",
  kind: "prompt",
  owner: "OverKill Hill",
  version: "0.1.0",
  purpose:
    "Extract concrete action items from supplied notes while retaining a short source reference for each item.",
  audience: "OverKill Hill readers reviewing meeting notes, transcripts, or project updates.",
  inputs:
    "Plain text notes supplied by the user, optionally with headings, speaker names, dates, or line-like markers.",
  outputs:
    "A concise Markdown table with action, owner when stated, due date when stated, status, and source reference.",
  constraints:
    "Do not invent owners, dates, or commitments. Mark missing fields as unknown and quote only short source snippets.",
  instructions:
    "Identify commitments and next actions, separate decisions from actions, preserve the source wording where useful, and attach each row to the nearest available heading, speaker, date, or quoted phrase.",
  acceptance:
    "Every extracted row has a traceable source reference; uncertain ownership or timing is labeled unknown; no action is added when the source contains no commitment.",
  components: "Prompt contract, representative cases, and a human review checklist.",
  skillRefs: "",
  evidence:
    "Authored fixture cases below define expected review outcomes. No model execution or behavioral evaluation has been run.",
  reviewed: false,
  createdAt: "2026-09-07T00:00:00.000Z",
  updatedAt: "2026-09-07T00:00:00.000Z",
};

export function makeBackup(): string {
  return createCapabilityBackup({ version: 1, activeId: project.id, projects: [project] });
}

export function generatedFiles() {
  return buildCapabilityFiles(project);
}

export function roundTripBackup(): CapabilityProject {
  return parseCapabilityBackup(makeBackup()).projects[0];
}
