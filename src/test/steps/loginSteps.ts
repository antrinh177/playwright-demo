import { Given, Then, When } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import { LoginPage } from "../../pages/LoginPage";
import {getTestDataValue} from "../testdata/testData";

const getLoginPage = () => new LoginPage(pageFixture.page);

Given('User navigates to the application', async function () {

  await getLoginPage().navigateToPage();
  console.log("Sauce Demo navigated")
});

Given('User enter the username as {string}', async function (username) {
  await getLoginPage().enterUsername(getTestDataValue(username));
  console.log(`Username entered: ${getTestDataValue(username)}`)
});

Given('User enter the password as {string}', async function (password) {
  await getLoginPage().enterPassword(getTestDataValue(password));
  console.log(`Password entered: ${getTestDataValue(password)}`)
});

When('User click on the login button', async function () {
  await getLoginPage().clickLogin();
  console.log("Login button clicked")
});

Then('Login should be success', async function () {
  await getLoginPage().validateLoginSuccess();
  console.log(`Login successfully`);
});

When('Login should fail', async function () {
  await getLoginPage().validateLoginFailure();
  console.log(`Failed to login`);
});