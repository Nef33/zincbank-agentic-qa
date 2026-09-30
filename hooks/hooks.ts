import 'dotenv/config';
import { Before, After } from "@cucumber/cucumber";
import { Page } from "@playwright/test";
import { BrowserDriver } from "../drivers/BrowserDriver";

// Shared instances exposed for step definitions.
export const browserDriver = new BrowserDriver();
export let page: Page;

Before({ timeout: 15000 }, async function () {
  await browserDriver.launch();
  page = browserDriver.getPage();
});

After({ timeout: 15000 }, async function () {
  await browserDriver.close();
});
