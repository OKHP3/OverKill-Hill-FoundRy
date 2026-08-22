import { expect, test, type Page } from "@playwright/test";

const workspaceKey = "cgpt-workspace";

async function seedSavedProgress(page: Page): Promise<void> {
  await page.evaluate((key) => {
    localStorage.clear();
    const id = "project-test";
    const data: Record<string, unknown> = {};
    for (let index = 0; index < 9; index += 1) data[`step-${index}`] = { saved: true };
    data["step-8"] = { ownerName: "Saved owner", releaseDecision: "validated", releaseEvidence: "Owner reviewed the saved build.", evidenceStatus: "confirmed" };
    data["step-7"] = { cases: Array.from({ length: 10 }, (_, index) => ({ id: String(index), category: "happy", prompt: "saved", expectedBehavior: "saved", result: "pass" })), evidenceStatus: "observed", ownerReview: "Saved owner reviewed results." };
    localStorage.setItem(key, JSON.stringify({ version: 1, activeProjectId: id, projects: [{ id, name: "Saved GPT", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), archived: false, data, completedSteps: Array.from({ length: 9 }, (_, index) => index), currentPage: 8, sidebarOpen: true }] }));
  }, workspaceKey);
  await page.reload();
}

async function getCreatorStorage(page: Page): Promise<Record<string, string>> {
  return page.evaluate(() => {
    const entries: Record<string, string> = {};
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("cgpt-")) {
        entries[key] = localStorage.getItem(key) ?? "";
      }
    }
    return entries;
  });
}

test("cancels without changing progress and clears all saved progress on Start over", async ({ page }) => {
  await page.goto("./");
  await seedSavedProgress(page);

  await expect(page.locator("h1")).toContainText("Step 8 · Ship & Govern");
  await expect(page.getByText("9 of 9 steps complete")).toBeVisible();
  const savedStorage = await getCreatorStorage(page);

  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByRole("button", { name: /Start over/ }).click();

  await expect(page.locator("h1")).toContainText("Step 8 · Ship & Govern");
  await expect(page.getByText("9 of 9 steps complete")).toBeVisible();
  await expect.poll(() => getCreatorStorage(page)).toEqual(savedStorage);

  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Start over/ }).click();

  await expect(page.locator("h1")).toContainText("Step 0 · Build Brief");
  await expect(page.getByText("0 of 9 steps complete")).toBeVisible();
  const remaining = await getCreatorStorage(page);
  expect(Object.keys(remaining)).toEqual(["cgpt-workspace"]);
  const workspace = JSON.parse(remaining["cgpt-workspace"]);
  expect(workspace.projects).toHaveLength(1);
  expect(workspace.projects[0].data["step-0"].gptName).toBe("");
  expect(workspace.projects[0].data["step-8"]).toBeUndefined();
});
