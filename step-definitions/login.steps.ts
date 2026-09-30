import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { page } from '../hooks/hooks';

let loginPage: LoginPage;

Given('I am on the ZincBank login page', async function () {
  loginPage = new LoginPage(page);
  await loginPage.open();
});

When('I enter a valid email and password and click "Sign in"', async function () {
  await loginPage.enterEmail(process.env.USERNAME!);
  await loginPage.enterPassword(process.env.PASSWORD!);
  await loginPage.clickSignIn();
});

Then('I am granted access to my account', async function () {
  expect(await loginPage.isAccountAccessGranted()).toBeTruthy();
});

When('I enter an invalid email and password and click "Sign in"', async function () {
  await loginPage.enterEmail('invalid@example.com');
  await loginPage.enterPassword('WrongPassword123!');
  await loginPage.clickSignIn();
});

Then('I see an error message', async function () {
  expect(await loginPage.isErrorMessageVisible()).toBeTruthy();
});

Then('I am kept on the login page', async function () {
  expect(await loginPage.isOnLoginPage()).toBeTruthy();
});

When('I click "Open an account"', async function () {
  await loginPage.clickOpenAccount();
});

Then('I am taken to \\/apply', async function () {
  expect(await loginPage.isOnApplyPage()).toBeTruthy();
});