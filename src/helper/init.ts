const fs = require("fs-extra");

async function initialize(): Promise<void> {
    await fs.ensureDir("test-results");
    await fs.emptyDir("test-results");
}

initialize().catch((error: unknown) => {
    console.error("Failed to prepare test-results directory:", error);
    process.exitCode = 1;
});