import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { ProductsPage } from "../../pages/ProductsPage";

const getProductsPage = () => new ProductsPage(pageFixture.page);

When('User add the item {string} to the cart', async function (productName) {
  await getProductsPage().addToCart(productName);
  console.log(`${productName} is added to the cart`);
});

Then('The cart badge should update as {string}', async function (badgeCount) {
  await getProductsPage().validateBadgeCount(badgeCount);
  console.log(`Cart has ${badgeCount} item(s)`)
});
