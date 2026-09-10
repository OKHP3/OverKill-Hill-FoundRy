import { expect, test } from "@playwright/test";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  githubFixtureCompletedSteps,
  githubFixtureProjectData,
} from "./github-markdown-fixture-data";

const workspaceKey = "cgpt-workspace";
const githubFixturePath = fileURLToPath(
  new URL("./fixtures/github-markdown-fixture.v1.md", import.meta.url),
);

test.skip(
  process.env.GITHUB_MARKDOWN_FIXTURE_REFRESH !== "1",
  "Fixture refresh is disabled by default; use the package refresh command to opt in.",
);

test("refreshes the committed GitHub fixture from the Creator export", async ({
  page,
}) => {
  await page.goto("./#creator");
  await page.evaluate(
    ({ data, completedSteps, key }) => {
      localStorage.clear();
      const id = "project-test";
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 1,
          activeProjectId: id,
          projects: [
            {
              id,
              name: "Test GPT",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              archived: false,
              data,
              completedSteps,
              currentPage: 0,
              sidebarOpen: true,
            },
          ],
        }),
      );
    },
    {
      data: githubFixtureProjectData,
      completedSteps: githubFixtureCompletedSteps,
      key: workspaceKey,
    },
  );
  await page.reload();
  await page.getByRole("button", { name: "Export Package" }).click();
  await expect(page.locator("h1")).toContainText("Export Package");

  const generatedMarkdown = await page.locator("pre").innerText();
  const generatedBytes = Buffer.from(generatedMarkdown, "utf8");
  await writeFile(githubFixturePath, generatedBytes);
  await expect(readFile(githubFixturePath)).resolves.toEqual(generatedBytes);
});
