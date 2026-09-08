import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 320, height: 800 },
  { width: 390, height: 844 },
] as const;

const themes = ["light", "dark"] as const;

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
}

for (const viewport of viewports) {
  for (const theme of themes) {
    test(`${viewport.width}px ${theme} keeps long workbench content usable`, async ({ page }, testInfo) => {
      await page.setViewportSize(viewport);
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem("forge-theme", selectedTheme);
      }, theme);
      await page.goto("./");

      await expect(page.getByRole("heading", { name: "Capability workbench", exact: true })).toBeVisible();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

      const longName = "A capability project name that remains readable at narrow widths — 2026";
      await page.getByLabel("Capability name", { exact: true }).fill(longName);
      await page.getByLabel("Owner", { exact: true }).fill("Narrow viewport acceptance");
      await page.getByLabel("Purpose", { exact: true }).fill("Verify responsive controls remain usable.");
      await page.getByLabel("Audience", { exact: true }).fill("Maintainers");
      await expectNoHorizontalOverflow(page);

      await page.getByRole("button", { name: "Contract", exact: true }).click();
      await page.getByLabel("Inputs", { exact: true }).fill("Source records");
      await page.getByLabel("Outputs", { exact: true }).fill("Reviewable package");
      await page.getByLabel("Constraints", { exact: true }).fill("Stay local");
      await page.getByLabel("Acceptance criteria", { exact: true }).fill("Controls remain visible and usable.");

      await page.getByRole("button", { name: "Build", exact: true }).click();
      await page.getByLabel("Instructions", { exact: true }).fill("Capture the method.");
      await page.getByLabel("Components", { exact: true }).fill("Forms and package preview");
      await page.getByLabel("Skillz and canonical references").fill("https://github.com/OKHP3/skillz");

      await page.getByRole("button", { name: "Validate", exact: true }).click();
      await page.getByLabel("Evidence and validation notes").fill("Observed in Playwright.");
      await page.getByRole("checkbox", { name: /I reviewed this starter/ }).check();
      await page.getByRole("button", { name: "Package", exact: true }).click();
      await expect(page.getByRole("button", { name: "Download starter ZIP", exact: true })).toBeVisible();

      await expect(page.getByLabel("Generated files")).toBeVisible();
      await expectNoHorizontalOverflow(page);

      const download = page.waitForEvent("download");
      await page.getByRole("button", { name: "Download starter ZIP", exact: true }).click();
      await expect(download).resolves.toBeTruthy();
      expect((await download).suggestedFilename()).toBe(
        "a-capability-project-name-that-remains-readable-at-narrow-widths-2026-starter.zip",
      );
      await page.screenshot({ path: testInfo.outputPath(`responsive-${theme}-${viewport.width}.png`), fullPage: false });
    });
  }
}
