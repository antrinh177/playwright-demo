import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const cucumberCli = resolve(
    process.cwd(),
    "node_modules/@cucumber/cucumber/bin/cucumber-js"
);

const cucumberResult = spawnSync(
    process.execPath,
    [cucumberCli, "--config", "src/test/cucumber.json", ...process.argv.slice(2)],
    { stdio: "inherit" }
);

if (cucumberResult.error) {
    throw cucumberResult.error;
}

const reportResult = spawnSync(
    process.execPath,
    ["-r", "ts-node/register", "src/helper/report.ts"],
    { stdio: "inherit" }
);

if (reportResult.error) {
    throw reportResult.error;
}

const cucumberExitCode = cucumberResult.status ?? 1;
const reportExitCode = reportResult.status ?? 1;
process.exitCode = cucumberExitCode !== 0 ? cucumberExitCode : reportExitCode;
