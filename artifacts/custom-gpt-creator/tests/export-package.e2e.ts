import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const creatorStateKey = "cgpt-creator-state";

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
    localStorage.setItem(key, "");
  }, creatorStateKey);
  await page.reload();
  await page.getByRole("button", { name: "Export Package" }).click();
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
    localStorage.setItem("cgpt-step-2", JSON.stringify(savedInstructions));
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
      JSON.stringify({ currentPage: "export", completedSteps: Array.from({ length: 9 }, (_, index) => index), sidebarOpen: true }),
    );
  }, creatorStateKey);
  await page.reload();

  await expect(page.locator("h1")).toContainText("Export Package");
  await expect(page.getByRole("alert")).toHaveCount(0);
  await expect(copyButton).toBeEnabled();
  await expect(downloadButton).toBeEnabled();
  await expectExportActionsToProduceMarkdown(page);
});
