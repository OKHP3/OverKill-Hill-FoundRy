import { defineConfig } from "@playwright/test";

const port = process.env.PORT ?? "20017";
const baseURL =
  process.env.CREATOR_BASE_URL ??
  `http://127.0.0.1:${port}/custom-gpt-creator/`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.e2e.ts",
  outputDir: "../../.cache/custom-gpt-creator-test-results",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    launchOptions: process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : undefined,
  },
  webServer: process.env.CREATOR_BASE_URL
    ? undefined
    : {
        command:
          `PORT=${port} BASE_PATH=/custom-gpt-creator/ pnpm --filter @workspace/custom-gpt-creator run dev`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});