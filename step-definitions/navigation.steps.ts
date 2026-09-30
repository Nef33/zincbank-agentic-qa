import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { page } from '../hooks/hooks';

let navigationPage: NavigationPage;

Given('I am on the ZincBank home page', async function () {
  navigationPage = new NavigationPage(page);
  await navigationPage.open();
});

When('I click the "Dashboard" tab', async function () {
  await navigationPage.clickDashboard();
});

Then('I am on the Dashboard page, confirmed by URL', async function () {
  expect(await navigationPage.isOnDashboard()).toBeTruthy();
});

When('I click the "Accounts" tab', async function () {
  await navigationPage.clickAccounts();
});

Then('I am on the Accounts page, confirmed by URL', async function () {
  expect(await navigationPage.isOnAccounts()).toBeTruthy();
});

When('I click the "Move Money" tab', async function () {
  await navigationPage.clickMoveMoney();
});

Then('I am on the Move Money page, confirmed by URL', async function () {
  expect(await navigationPage.isOnMoveMoney()).toBeTruthy();
});

When('I click the "Transactions" tab', async function () {
  await navigationPage.clickTransactions();
});

Then('I am on the Transactions page, confirmed by URL', async function () {
  expect(await navigationPage.isOnTransactions()).toBeTruthy();
});

When('I click the "Cards" tab', async function () {
  await navigationPage.clickCards();
});

Then('I am on the Cards page, confirmed by URL', async function () {
  expect(await navigationPage.isOnCards()).toBeTruthy();
});