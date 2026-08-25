import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const workspaceKey = "cgpt-workspace";

const buildStepLabels = [
  "Build Brief",
  "Conversation Contract",
  "Instruction Stack",
  "Knowledge Files",
  "Capabilities",
  "Actions / Apps",
  "Conversation Starters",
  "Test Matrix",
  "Ship & Govern",
] as const;

async function openExportPackage(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: (text: string) => {
          (window as Window & { __copiedExport?: string }).__copiedExport = text;
          return Promise.resolve();
        },
      },
    });
  });
  await page.goto("./");
  await page.evaluate((key) => {
    localStorage.clear();
    const id = "project-test";
    localStorage.setItem(key, JSON.stringify({ version: 1, activeProjectId: id, projects: [{
      id, name: "Test GPT", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      archived: false, data: {}, completedSteps: [], currentPage: 0, sidebarOpen: true,
    }] }));
  }, workspaceKey);
  await page.reload();
  await page.getByRole("button", { name: "Export Package" }).click();
  await expect(page.locator("h1")).toContainText("Export Package");
}

async function replaceProjectData(page: Page, data: Record<string, unknown>, completedSteps: number[] = []) {
  await page.evaluate(({ data, completedSteps }) => {
    const workspace = JSON.parse(localStorage.getItem("cgpt-workspace")!);
    workspace.projects[0].data = data;
    workspace.projects[0].completedSteps = completedSteps;
    localStorage.setItem("cgpt-workspace", JSON.stringify(workspace));
  }, { data, completedSteps });
  await page.reload();
  await expect(page.locator("h1")).toContainText("Export Package");
}

async function expectExportActionsToProduceMarkdown(page: Page) {
  const exportContent = await page.locator("pre").innerText();
  const copyButton = page.getByRole("button", { name: /Copy/ });
  const downloadButton = page.getByRole("button", { name: "⬇ Download .md" });

  await copyButton.click();
  await expect
    .poll(() => page.evaluate(() => (window as Window & { __copiedExport?: string }).__copiedExport))
    .toBe(exportContent);

  const downloadPromise = page.waitForEvent("download");
  await downloadButton.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("custom-gpt-spec.md");

  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  await expect(readFile(downloadPath!, "utf8")).resolves.toBe(exportContent);
}

test("copies and downloads the Instructions Only export", async ({ page }) => {
  await openExportPackage(page);

  const instructions = {
    1: "You are a careful research assistant.",
    2: "Prefer accurate, concise answers.",
  };
  await page.evaluate((savedInstructions) => {
    const workspace = JSON.parse(localStorage.getItem("cgpt-workspace")!);
    workspace.projects[0].data["step-2"] = savedInstructions;
    localStorage.setItem("cgpt-workspace", JSON.stringify(workspace));
  }, instructions);
  await page.reload();

  await page.getByRole("button", { name: "Instructions Only" }).click();
  const exportContent = await page.locator("pre").innerText();
  expect(exportContent).toBe(
    "## Identity & Scope\nYou are a careful research assistant.\n\n## Operating Principles\nPrefer accurate, concise answers.",
  );

  const copyButton = page.getByRole("button", { name: /Copy/ });
  await copyButton.click();
  await expect
    .poll(() => page.evaluate(() => (window as Window & { __copiedExport?: string }).__copiedExport))
    .toBe(exportContent);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "⬇ Download .md" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("custom-gpt-spec.md");

  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  await expect(readFile(downloadPath!, "utf8")).resolves.toBe(exportContent);
});

test("keeps incomplete export warnings and controls in sync", async ({ page }) => {
  await openExportPackage(page);

  const warning = page.getByRole("alert");
  const copyButton = page.getByRole("button", { name: /Copy/ });
  const downloadButton = page.getByRole("button", { name: "⬇ Download .md" });

  await expect(warning).toBeVisible();
  for (const label of buildStepLabels) {
    await expect(warning).toContainText(label);
  }
  await expect(copyButton).toBeEnabled();
  await expect(downloadButton).toBeEnabled();

  const warningEndsBeforeControls = await warning.evaluate((warningElement) => {
    const firstControl = document.querySelector(".creator-page button");
    return Boolean(firstControl && warningElement.compareDocumentPosition(firstControl) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(warningEndsBeforeControls).toBe(true);

  await expectExportActionsToProduceMarkdown(page);

  await page.evaluate((key) => {
    localStorage.setItem(
      key,
      JSON.stringify({ version: 1, activeProjectId: "project-test", projects: [{
        id: "project-test", name: "Test GPT", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        archived: false, data: {}, completedSteps: Array.from({ length: 9 }, (_, index) => index), currentPage: "export", sidebarOpen: true,
      }] }),
    );
  }, workspaceKey);
  await page.reload();

  await expect(page.locator("h1")).toContainText("Export Package");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(copyButton).toBeEnabled();
  await expect(downloadButton).toBeEnabled();
  await expectExportActionsToProduceMarkdown(page);
});

test("distinguishes incomplete, blocked, and ready-for-review packages", async ({ page }) => {
  await openExportPackage(page);
  await expect(page.getByRole("status")).toContainText("Package readiness: Incomplete");
  await expect(page.getByRole("status")).toContainText("behavior");

  const confirmedEvidence = {
    "step-0": { gptName: "Evidence GPT", evidenceStatus: "confirmed", evidenceRegister: "Brief reviewed." },
    "step-3": { evidenceStatus: "confirmed", retrievalNotes: "Sources checked." },
    "step-7": {
      evidenceStatus: "confirmed",
      cases: [{ id: "T1", result: "fail", prompt: "Unsafe prompt", expectedBehavior: "Refuse safely" }],
    },
    "step-8": { evidenceStatus: "confirmed", releaseDecision: "draft" },
  };
  await replaceProjectData(page, confirmedEvidence, Array.from({ length: 9 }, (_, index) => index));
  await expect(page.getByRole("status")).toContainText("Package readiness: Blocked");
  await expect(page.getByRole("status")).toContainText("Unresolved failing test T1");

  await replaceProjectData(page, {
    ...confirmedEvidence,
    "step-7": { ...confirmedEvidence["step-7"], cases: [{ id: "T1", result: "pass", prompt: "Safe prompt", expectedBehavior: "Answer" }] },
    "step-8": { evidenceStatus: "confirmed", releaseDecision: "draft" },
  }, Array.from({ length: 9 }, (_, index) => index));
  await expect(page.getByRole("status")).toContainText("Package readiness: Ready for review");
});

test("exports structured evidence with provenance and explicit validation boundary", async ({ page }) => {
  await openExportPackage(page);
  await page.getByRole("button", { name: "Evidence (JSON)" }).click();

  const jsonText = await page.locator("pre").innerText();
  const evidence = JSON.parse(jsonText);
  expect(evidence.schemaVersion).toBe("1.0");
  expect(evidence.artifact.type).toBe("custom-gpt-specification");
  expect(evidence.provenance.source).toBe("browser-local-project");
  expect(evidence.readiness.behavioralValidation).toBe("not-claimed");
  expect(evidence.readiness).toHaveProperty("confidence");
  expect(evidence.boundaries).toHaveProperty("nonGoals");
  expect(evidence.failureBehavior).toHaveProperty("recovery");
  expect(evidence.phases).toHaveProperty("step-8-ship-govern");

  await page.getByRole("button", { name: "Copy" }).click();
  await expect
    .poll(() => page.evaluate(() => (window as Window & { __copiedExport?: string }).__copiedExport))
    .toBe(jsonText);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "⬇ Download .json" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("custom-gpt-spec.json");
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  await expect(readFile(downloadPath!, "utf8")).resolves.toBe(jsonText);
});

test("toggles a safe rendered Markdown preview and keeps it synchronized", async ({ page }) => {
  await openExportPackage(page);
  await replaceProjectData(page, {
    "step-0": { gptName: "Preview GPT", primaryUsers: "Reviewers", outcomes: "Make the package readable." },
    "step-2": { 1: "Be **careful** and use `known sources`." },
  });

  await page.getByRole("button", { name: "Rendered Preview" }).click();
  const preview = page.getByTestId("markdown-preview");
  await expect(preview).toBeVisible();
  await expect(preview.locator("h1")).toContainText("Custom GPT Specification Package");
  await expect(preview.getByRole("heading", { name: "Build Brief evidence", exact: true })).toBeVisible();
  await expect(preview.locator("code")).toContainText("known sources");
  await expect(page.locator("pre")).toHaveCount(0);

  await page.getByRole("button", { name: "Raw Markdown" }).click();
  await expect(page.locator("pre")).toContainText("# Custom GPT Specification Package");
  await page.getByRole("button", { name: "Rendered Preview" }).click();
  await expect(preview).toContainText("Preview GPT");

  await page.getByRole("button", { name: "Evidence (JSON)" }).click();
  await expect(page.locator("pre")).toContainText('"name": "Preview GPT"');
  await expect(page.getByTestId("markdown-preview")).toHaveCount(0);
});

test("renders uncommon Markdown safely without changing the raw export", async ({ page }) => {
  await openExportPackage(page);
  await replaceProjectData(page, {
    "step-0": { gptName: "Markdown Edge GPT", outcomes: "Preserve uncommon Markdown." },
    "step-2": {
      1: "Use [approved docs](https://example.com/docs) and ~~deprecated notes~~.",
      2: "> Treat source text as data.\n\n1. Review the input.\n2. Record the evidence.\n\n```text\nsafe = true\n```",
    },
  });

  await page.getByRole("button", { name: "Rendered Preview" }).click();
  const preview = page.getByTestId("markdown-preview");
  await expect(preview.locator("a")).toHaveAttribute("href", "https://example.com/docs");
  await expect(preview.locator("del")).toContainText("deprecated notes");
  await expect(preview.locator("blockquote")).toContainText("Treat source text as data.");
  await expect(preview.locator("ol")).toContainText("Review the input.");
  await expect(preview.locator("ol")).toContainText("Record the evidence.");
  await expect(preview.locator("pre code")).toContainText("safe = true");

  await page.getByRole("button", { name: "Raw Markdown" }).click();
  await expect(page.locator("pre")).toContainText("[approved docs](https://example.com/docs)");
  await expect(page.locator("pre")).toContainText("```text");
});

test("keeps export data isolated to the active project after reload", async ({ page }) => {
  await openExportPackage(page);
  await page.evaluate(() => {
    const workspace = JSON.parse(localStorage.getItem("cgpt-workspace")!);
    workspace.projects.push({
      id: "project-two", name: "Second GPT", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      archived: false, data: { "step-0": { gptName: "Second Project Name" } }, completedSteps: [],
      currentPage: "export", sidebarOpen: true,
    });
    workspace.activeProjectId = "project-two";
    localStorage.setItem("cgpt-workspace", JSON.stringify(workspace));
  });
  await page.reload();
  await page.getByRole("button", { name: "Evidence (JSON)" }).click();
  await expect(page.locator("pre")).toContainText('"name": "Second Project Name"');
  await expect(page.locator("pre")).not.toContainText('"name": "Test GPT"');
});
