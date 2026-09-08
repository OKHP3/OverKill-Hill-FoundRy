import { expect, test } from "@playwright/test";

const capabilityKey = "okh-capability-workspace";
const creatorKey = "cgpt-workspace";
const unrelatedKey = "coop-unrelated-browser-state";

test("workbench and studio keep independent projects across history and reload", async ({
  page,
}) => {
  const capability = {
    version: 1,
    activeId: "capability-seeded",
    projects: [
      {
        id: "capability-seeded",
        name: "Seeded capability",
        kind: "prompt",
        owner: "Acceptance fixture",
        version: "1.0.0",
        purpose: "Prove namespace persistence",
        audience: "Test readers",
        inputs: "Fixture input",
        outputs: "Fixture output",
        constraints: "No shared storage",
        instructions: "Keep this project intact",
        acceptance: "Survives navigation and reload",
        components: "Browser",
        skillRefs: "",
        evidence: "Fixture only",
        reviewed: false,
        createdAt: "2026-09-07T00:00:00.000Z",
        updatedAt: "2026-09-07T00:00:00.000Z",
      },
    ],
  };
  const creator = {
    version: 1,
    activeProjectId: "gpt-seeded",
    projects: [
      {
        id: "gpt-seeded",
        name: "Seeded GPT",
        createdAt: "2026-09-07T00:00:00.000Z",
        updatedAt: "2026-09-07T00:00:00.000Z",
        archived: false,
        data: {},
        completedSteps: [],
        currentPage: 0,
        sidebarOpen: true,
      },
    ],
  };

  await page.addInitScript(
    ({ capabilityKey, capability, creatorKey, creator, unrelatedKey }) => {
      localStorage.setItem(capabilityKey, JSON.stringify(capability));
      localStorage.setItem(creatorKey, JSON.stringify(creator));
      localStorage.setItem(unrelatedKey, "preserve-me");
    },
    { capabilityKey, capability, creatorKey, creator, unrelatedKey },
  );

  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: "Capability workbench", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Seeded capability", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Open Custom GPT studio →" }).click();
  await expect(
    page.getByRole("heading", { name: /Step 0.*Build Brief/ }),
  ).toBeVisible();
  await expect(page.getByText("Seeded GPT", { exact: true })).toBeVisible();

  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Capability workbench", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Seeded capability", exact: true }),
  ).toBeVisible();

  await page.goForward();
  await expect(
    page.getByRole("heading", { name: /Step 0.*Build Brief/ }),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByText("Seeded GPT", { exact: true })).toBeVisible();

  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: "Seeded capability", exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Seeded capability", exact: true }),
  ).toBeVisible();

  expect(
    await page.evaluate(
      ([capabilityKey, creatorKey, unrelatedKey]) => ({
        capability: localStorage.getItem(capabilityKey),
        creator: localStorage.getItem(creatorKey),
        unrelated: localStorage.getItem(unrelatedKey),
      }),
      [capabilityKey, creatorKey, unrelatedKey],
    ),
  ).toEqual({
    capability: JSON.stringify(capability),
    creator: JSON.stringify(creator),
    unrelated: "preserve-me",
  });
});
