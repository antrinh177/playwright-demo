# Playwright and Cucumber Test Framework

This project uses Playwright, Cucumber, and TypeScript to run browser-based tests against the SauceDemo demo application.

## What is covered

- Successful and unsuccessful login scenarios
- Adding a product to the shopping cart
- Cucumber tags for selecting scenarios
- HTML, JSON, and rerun-file test output

## Requirements

- Node.js and npm
- Playwright browser binaries for the browser selected in the environment file

## Setup

Install the project dependencies and the current configured browser (Chrome)

The application and browser settings are in `src/helper/env/.env.prod`:

```dotenv
BASEURL=https://www.saucedemo.com/
BROWSER=chrome
```

The environment loader currently supports only `prod`. `BROWSER` can be `chrome`, `firefox`, or `webkit`; `chrome` uses Playwright's Chromium browser. Because dotenv is configured with `override: true`, values in `.env.prod` take precedence over matching values set in the shell or VS Code launch configuration.

Test account data is stored in `src/test/testdata/users.json`. Feature files refer to the values by keys such as `user1.username` and `user1.password`.

## Run tests

Run all configured feature files:

```bash
ENV=prod npm test
```

Run scenarios that have both the `@smoke` and `@reg` tags:

```bash
ENV=prod npm test -- --tags "@smoke and @reg"
```

Run the scenarios recorded in `@rerun.txt` after a previous test run:

```bash
npm run test:failed
```

The browser is launched in headed mode (`headless: false`), so its window should be visible while the tests are running. The hooks close the page after each scenario and close the browser when the run finishes.

## Debug in VS Code

Open **Run and Debug** and select **Debug Cucumber Tests**. Set breakpoints in the hooks, step definitions, or page objects. The launch configuration sets `ENV` to `prod`.

For Playwright's Inspector, temporarily add `await page.pause()` at the point where execution should stop, then remove it when finished.

## Reports and artifacts

Running `npm test` executes the `pretest`, `test`, and `posttest` scripts:

- `pretest` prepares the `test-results` directory.
- Cucumber writes `test-results/cucumber-report.html` and `test-results/cucumber-report.json`.
- Cucumber writes failed scenario locations to `@rerun.txt`.
- `posttest` generates the combined Multiple Cucumber HTML report as `index.html` in the project root, with supporting report files under `features/`.
- Failed scenarios have screenshots saved under `test-results/screenshots/` and attached to the Cucumber result.

## Project layout

``` 
test/
src/
  helper/
    browsers/       Browser selection and launch
    env/            Environment configuration
    types/          Environment variable types
    report.ts       Combined HTML report generation
  hooks/            Cucumber hooks and shared page fixture
  pages/            Page objects
  test/
    features/       Gherkin feature files
    steps/          Cucumber step definitions
    testdata/       Test account data
```
