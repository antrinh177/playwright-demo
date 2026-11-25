import {type Locator, type Page, expect} from "@playwright/test";

export class ProductsPage {
    readonly badgeCount: Locator;

    constructor(private readonly page: Page){
        this.badgeCount = page.locator("//span[text() = '1' and @data-test='shopping-cart-badge']");
    }

    async addToCart(productName: string){
        await this.page.locator(`//div[text() = '${productName}']/../../..//button[text()='Add to cart']`).click();
    }

    async validateBadgeCount(badgeCount: string){
        await expect(this.page.locator(`//span[text() = '${badgeCount}' and @data-test='shopping-cart-badge']`)).toBeVisible();
    }

}