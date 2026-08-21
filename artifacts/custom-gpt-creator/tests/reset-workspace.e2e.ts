import { expect, test, type Page } from "@playwright/test";

const creatorStateKey = "cgpt-creator-state";
const stepKeys = Array.from({ length: 9 }, (_, index) => `cgpt-step-${index}`);

async function seedSavedProgress(page: Page): Promise<void> {
  await page.evaluate(({ creatorStateKey, stepKeys }) => {
    localStorage.clear();
    for (const key of stepKeys) {
      localStorage.setItem(
        key,
        JSON.stringify(key === "cgpt-step-8" ? { ownerName: "Saved owner" } : { saved: true }),
      );
    }
    localStorage.setItem(
      creatorStateKey,
      JSON.stringify({
        currentPage: 8,
        completedSteps: Array.from({ length: 9 }, (_, index) => index),
        sidebarOpen: true,
      }),
    );
  }, { creatorStateKey, stepKeys });
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
  await expect.poll(() => getCreatorStorage(page)).toEqual({});
});
