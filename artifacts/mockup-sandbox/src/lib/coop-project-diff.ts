import type { CapabilityProject } from "./capability-workbench.ts";

export type ProjectDiffField = keyof CapabilityProject;

export interface ProjectFieldChange {
  field: ProjectDiffField;
  before: CapabilityProject[ProjectDiffField];
  after: CapabilityProject[ProjectDiffField];
}

export interface ProjectRevisionDiff {
  authored: ProjectFieldChange[];
  metadata: ProjectFieldChange[];
}

const AUTHORED_FIELDS = [
  "name",
  "kind",
  "owner",
  "version",
  "purpose",
  "audience",
  "inputs",
  "outputs",
  "constraints",
  "instructions",
  "acceptance",
  "components",
  "skillRefs",
  "evidence",
  "reviewed",
] as const satisfies readonly (keyof CapabilityProject)[];

const METADATA_FIELDS = ["id", "createdAt", "updatedAt"] as const satisfies
  readonly (keyof CapabilityProject)[];

function changesFor(
  before: CapabilityProject,
  after: CapabilityProject,
  fields: readonly (keyof CapabilityProject)[],
): ProjectFieldChange[] {
  return fields.flatMap((field) =>
    Object.is(before[field], after[field])
      ? []
      : [{ field, before: before[field], after: after[field] }],
  );
}

/** Compare two project revisions while keeping authored changes separate from metadata. */
export function diffCapabilityProjects(
  before: CapabilityProject,
  after: CapabilityProject,
): ProjectRevisionDiff {
  return {
    authored: changesFor(before, after, AUTHORED_FIELDS),
    metadata: changesFor(before, after, METADATA_FIELDS),
  };
}
