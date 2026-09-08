import type { CapabilityProject, CapabilityWorkspace } from "./capability-workbench.ts";

export type ImportProjectStatus = "identical" | "conflicting" | "new";

export interface ImportProjectPlan {
  id: string;
  status: ImportProjectStatus;
  existing?: CapabilityProject;
  incoming?: CapabilityProject;
}

export interface ImportPlan {
  projects: ImportProjectPlan[];
  projectCount: number;
  maxProjects: number;
  countOverflow: boolean;
}

/**
 * Build a read-only preview for a v1 workspace import.
 *
 * Contract: callers must provide two already validated CapabilityWorkspace
 * values. This function does not parse, validate, resolve, persist, or mutate
 * either workspace. A conflict is deliberately left unresolved for an
 * explicit caller decision.
 */
export function planCapabilityWorkspaceImport(
  existing: CapabilityWorkspace,
  incoming: CapabilityWorkspace,
  maxProjects = 20,
): ImportPlan {
  if (!Number.isInteger(maxProjects) || maxProjects < 1) {
    throw new Error("maxProjects must be a positive integer.");
  }

  const existingById = new Map(existing.projects.map((project) => [project.id, project]));
  const incomingIds = new Set(incoming.projects.map((project) => project.id));
  const plans: ImportProjectPlan[] = [];

  for (const project of existing.projects) {
    if (!incomingIds.has(project.id)) continue;
    const imported = incoming.projects.find((candidate) => candidate.id === project.id)!;
    plans.push(
      imported === project || JSON.stringify(imported) === JSON.stringify(project)
        ? { id: project.id, status: "identical", existing: cloneProject(project), incoming: cloneProject(imported) }
        : { id: project.id, status: "conflicting", existing: cloneProject(project), incoming: cloneProject(imported) },
    );
  }

  for (const project of incoming.projects) {
    if (!existingById.has(project.id)) {
      plans.push({ id: project.id, status: "new", incoming: cloneProject(project) });
    }
  }

  const projectCount = existing.projects.length + plans.filter((plan) => plan.status === "new").length;
  return { projects: plans, projectCount, maxProjects, countOverflow: projectCount > maxProjects };
}

function cloneProject(project: CapabilityProject): CapabilityProject {
  return { ...project };
}
