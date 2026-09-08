import { test, expect } from "@playwright/test";
import { createCapabilityBackup, newProject } from "../../mockup-sandbox/src/lib/capability-workbench";

test("keyboard focuses the project selector, duplicates and accepts the import confirmation", async ({ page }) => {
  await page.goto("./");

  const project = page.getByRole("combobox", { name: /^Project/ });
  await project.focus();
  await expect(project).toBeFocused();
  const originalId = await project.inputValue();
  await page.getByRole("button", { name: "Duplicate", exact: true }).press("Enter");
  await expect(project).not.toHaveValue(originalId);
  await expect(project.locator("option")).toHaveCount(2);

  const imported = newProject("prompt");
  imported.name = "Keyboard imported project";
  const backup = createCapabilityBackup({
    version: 1,
    activeId: imported.id,
    projects: [imported],
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "keyboard-backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(backup),
  });
  await expect(page.getByText("Replace this workspace?", { exact: true })).toBeVisible();

  const replace = page.getByRole("button", { name: "Replace workspace", exact: true });
  await replace.focus();
  await expect(replace).toBeFocused();
  await replace.press("Enter");
  await expect(project).toHaveValue(imported.id);
  await expect(page.getByLabel("Capability name", { exact: true })).toHaveValue(
    "Keyboard imported project",
  );
});

test("keyboard activation reaches delete and preserves the browser dialog contract", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Capability name", { exact: true }).fill("Delete me");

  const deleteButton = page.getByRole("button", { name: "Delete project", exact: true });
  await deleteButton.focus();
  await expect(deleteButton).toBeFocused();
  const dialog = page.waitForEvent("dialog").then(async (confirmation) => {
    expect(confirmation.type()).toBe("confirm");
    expect(confirmation.message()).toContain("Delete Delete me");
    await confirmation.accept();
  });
  await Promise.all([dialog, deleteButton.press("Enter")]);
  await expect(page.getByLabel("Capability name", { exact: true })).toHaveValue("Untitled capability");
});
