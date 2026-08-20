import { readFile } from "node:fs/promises";

import { expect, test, type Page } from "@playwright/test";

type ThemePreference = "light" | "dark";
type ThemeSnapshot = {
  readonly theme: string | null;
  readonly darkClass: boolean;
};

const THEME_STORAGE_KEY = "forge-theme";

async function installFirstPaintThemeProbe(page: Page): Promise<void> {
  await page.addInitScript(() => {
    type WindowWithThemeProbe = Window & {
      __themeAtRootCreation?: ThemeSnapshot;
    };

    const observedWindow = window as WindowWithThemeProbe;
    const recordThemeAtRootCreation = () => {
      const root = document.getElementById("root");
      if (root && !observedWindow.__themeAtRootCreation) {
        observedWindow.__themeAtRootCreation = {
          theme: document.documentElement.getAttribute("data-theme"),
          darkClass: document.documentElement.classList.contains("dark"),
        };
      }
    };

    const observer = new MutationObserver(recordThemeAtRootCreation);
    observer.observe(document, { childList: true, subtree: true });
    recordThemeAtRootCreation();
  });
}

async function getFirstPaintThemeSnapshot(page: Page): Promise<ThemeSnapshot | undefined> {
  return page.evaluate(() => {
    type WindowWithThemeProbe = Window & {
      __themeAtRootCreation?: ThemeSnapshot;
    };

    return (window as WindowWithThemeProbe).__themeAtRootCreation;
  });
}

async function expectDocumentTheme(page: Page, preference: ThemePreference): Promise<void> {
  await expect(page.locator("html")).toHaveAttribute("data-theme", preference);
  await expect
    .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
    .toBe(preference === "dark");
}

function getStartupThemeStorageKey(documentSource: string, documentName: string): string {
  const match = documentSource.match(
    /localStorage\.getItem\(\s*["']([^"']+)["']\s*\)/,
  );
  if (!match) {
    throw new Error(`${documentName} does not read a theme preference from localStorage.`);
  }

  return match[1];
}

test("startup HTML and the shared theme hook use one storage key", async () => {
  const [sharedAppSource, mockupStartupHtml, creatorStartupHtml] = await Promise.all([
    readFile(new URL("../../mockup-sandbox/src/App.tsx", import.meta.url), "utf8"),
    readFile(new URL("../../mockup-sandbox/index.html", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
  ]);
  const hookKeyMatch = sharedAppSource.match(
    /const\s+THEME_STORAGE_KEY\s*=\s*["']([^"']+)["']/,
  );

  if (!hookKeyMatch) {
    throw new Error("The shared mockup App is missing THEME_STORAGE_KEY.");
  }

  expect(hookKeyMatch[1]).toBe(THEME_STORAGE_KEY);
  expect(getStartupThemeStorageKey(mockupStartupHtml, "Mockup startup HTML")).toBe(
    hookKeyMatch[1],
  );
  expect(getStartupThemeStorageKey(creatorStartupHtml, "Creator startup HTML")).toBe(
    hookKeyMatch[1],
  );
});

for (const preference of ["light", "dark"] as const) {
  test(`persists ${preference} and applies it before the creator mounts again`, async ({
    page,
  }) => {
    await page.goto("./");
    await page.evaluate((key) => localStorage.removeItem(key), THEME_STORAGE_KEY);
    await page.reload();

    await page.getByRole("button", { name: preference === "light" ? "Light" : "Dark" }).click();
    await expectDocumentTheme(page, preference);
    await expect
      .poll(() => page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY))
      .toBe(preference);

    const reopenedPage = await page.context().newPage();
    await installFirstPaintThemeProbe(reopenedPage);
    await reopenedPage.goto("./");

    await expectDocumentTheme(reopenedPage, preference);
    await expect(await getFirstPaintThemeSnapshot(reopenedPage)).toEqual({
      theme: preference,
      darkClass: preference === "dark",
    });
    await reopenedPage.close();
  });
}