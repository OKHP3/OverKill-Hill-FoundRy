import { expect, test, type Page } from "@playwright/test";

const numberedSteps = [
  { label: "Build Brief", heading: "Step 0 · Build Brief" },
  { label: "Conversation Contract", heading: "Step 1 · Conversation Contract" },
  { label: "Instruction Stack", heading: "Step 2 · Instruction Stack" },
  { label: "Knowledge Files", heading: "Step 3 · Knowledge Files" },
  { label: "Capabilities", heading: "Step 4 · Capabilities" },
  { label: "Actions / Apps", heading: "Step 5 · Actions / Apps" },
  { label: "Conversation Starters", heading: "Step 6 · Conversation Starters" },
  { label: "Test Matrix", heading: "Step 7 · Test Matrix" },
  { label: "Ship & Govern", heading: "Step 8 · Ship & Govern" },
] as const;

const brief = {
  gptName: "Reload Proof GPT",
  primaryUsers: "QA engineers protecting saved work",
  outcomes: "Preserve the brief across reloads",
};

async function expectCreatorPath(page: Page) {
  await expect(page).toHaveURL(/\/custom-gpt-creator(?:\/|$)/);
}

test("keeps the build brief through navigation, reload, and Markdown export", async ({
  page,
}) => {
  await page.goto("./");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expectCreatorPath(page);

  await page.locator("input").nth(0).fill(brief.gptName);
  await page.locator("input").nth(1).fill(brief.primaryUsers);
  await page.locator("textarea").nth(0).fill(brief.outcomes);

  const creatorNavigation = page.getByRole("navigation", {
    name: "Creator workflow",
  });

  for (const [index, step] of numberedSteps.entries()) {
    await creatorNavigation
      .getByRole("button", { name: new RegExp(step.label) })
      .click();
    await expect(page.locator("h1")).toContainText(step.heading);
    await expectCreatorPath(page);

    if (index === numberedSteps.length - 1) {
      await page.reload();
      await expect(page.locator("h1")).toContainText(step.heading);
      await expectCreatorPath(page);
    }
  }

  await creatorNavigation.getByRole("button", { name: /Build Brief/ }).click();
  await expect(page.locator("input").nth(0)).toHaveValue(brief.gptName);
  await expect(page.locator("input").nth(1)).toHaveValue(brief.primaryUsers);
  await expect(page.locator("textarea").nth(0)).toHaveValue(brief.outcomes);

  await creatorNavigation.getByRole("button", { name: "Audit Mode" }).click();
  await expect(page.locator("h1")).toContainText("Audit Mode");
  await expectCreatorPath(page);

  await creatorNavigation
    .getByRole("button", { name: "Platform Comparison" })
    .click();
  await expect(page.locator("h1")).toContainText("Platform Comparison");
  await expectCreatorPath(page);

  await creatorNavigation
    .getByRole("button", { name: "Export Package" })
    .click();
  await expect(page.locator("h1")).toContainText("Export Package");
  await expect(page.locator("pre")).toContainText(brief.gptName);
  await expect(page.locator("pre")).toContainText(brief.primaryUsers);
  await expect(page.locator("pre")).toContainText(brief.outcomes);
  await expectCreatorPath(page);
});