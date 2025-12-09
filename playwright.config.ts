import { defineConfig, devices } from "@playwright/test";
import { defaultData } from "./data/default";

export default defineConfig({
  globalSetup: require.resolve("./global-setup.ts"),
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["junit", { outputFile: process.env.JUNIT_FILE || "playwright-report/results.xml" }],
  ],
  use: {
    screenshot: "on",
    trace: "on-first-retry",
    storageState: "auth/storageState.json",
  },
  projects: [
    {
      name: "default",
      testDir: "./tests/UI",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: defaultData.uibaseURL[0].baseURL,
      },
    },
    {
      name: "public-api",
      testDir: "./tests/API",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: defaultData.apibaseURL[0].baseURL,
      },
    },
  ],
});