import {type Locator, type Page, expect} from "@playwright/test";

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly pageTitle: Locator;
    readonly lockedOutError: Locator;

    constructor(private readonly page: Page){
        this.usernameInput = page.locator("//input[@placeholder='Username']");
        this.passwordInput = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@name='login-button']");
        this.pageTitle = page.locator("//span[@data-test='title']");
        this.lockedOutError = page.locator("//h3[@data-test='error']");
    }

    async navigateToPage(){
        const baseUrl = process.env.BASEURL;
        if (!baseUrl) {
            throw new Error("BASEURL is not set. Load the selected environment before navigating.");
        }
        await this.page.goto(baseUrl);
        console.log(`Navigated to ${baseUrl}`);
    }

    async enterUsername(username: string){
        //await this.usernameInput.fill(username);
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    async validateLoginSuccess(){
        await expect(this.pageTitle).toBeVisible();
    }

    async validateLoginFailure(){
        await expect(this.lockedOutError).toBeVisible();
    }

}