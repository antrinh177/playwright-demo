//Hooks: To do actions in the entire feature file
//BeforeAll → Before → Background → Scenario → After → AfterAll

import {BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep, Status} from "@cucumber/cucumber";
import {chromium, Page, Browser, expect, BrowserContext} from "@playwright/test"
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(15_000); // Cucumber's overall step timeout


let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function() {
    getEnv();
    browser = await invokeBrowser();
    console.log("Browser opened");
})

Before(async function ({pickle}) {
    console.log(`Scenario: ${pickle.name}`);
    context = await browser.newContext();
    console.log("Context created");
    page = await context.newPage()
    page.setDefaultTimeout(5_000);
    console.log("Page created");
    pageFixture.page = page;
});

After(async function ({pickle, result}) {
    // Attach screenshot when failed
    console.log(result?.status)
    if(result?.status == Status.FAILED && result.message){
         const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type: "png"})
        //this.attach(img, `image/png`);
        await this.attach(img, { mediaType: "image/png" });
        await this.attach(result.message, { mediaType: "text/plain" });
    }

    await pageFixture.page.close();
    console.log(`Page closed`);
    await context.close();
    console.log(`Context closed`);
})

AfterAll(async function() {
    await browser.close();
    console.log(`Browser closed`);
})