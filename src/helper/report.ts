// generate-report.ts
const report = require("multiple-cucumber-html-reporter");
import { getEnv } from "./env/env";
getEnv();

report.generate({
  jsonDir: "test-results",
  reportPath: "./",
  reportName: "Playwright Automation Report",
  pageTitle: "SauceDemo test report",
  useCucumberMessages: false, // Set to true to ingest Cucumber Messages NDJSON (*.ndjson)
  emailReport: true,
  metadata: {
    browser: {
      name: process.env.BROWSER ?? "unknown",
      version: "latest",
    },
    device: "Local test machine",
    executionPlatform: 'local',
    platform: {
      name: "osx",
      version: "Sonoma",
    },
  },
  customData: {
    data: [
        {label: "Project Name", value: 'SauceDemo Application'},
        {label: "Release", value: '1.2.0'},
        {label: "Test Cycle", value: 'Cycle 1'},
    ],
  },
});