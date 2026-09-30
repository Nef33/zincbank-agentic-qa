import { Page, Locator } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly dashboardTab: Locator;
  readonly accountsTab: Locator;
  readonly moveMoneyTab: Locator;
  readonly transactionsTab: Locator;
  readonly cardsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    // Nav tabs render as <span class="hidden sm:inline">TabName</span> inside links.
    // Locators match docs/locators-navigation.md.
    this.dashboardTab = page.locator("span.hidden.sm\\:inline", { hasText: "Dashboard" });
    this.accountsTab = page.locator("span.hidden.sm\\:inline", { hasText: "Accounts" });
    this.moveMoneyTab = page.locator("span.hidden.sm\\:inline", { hasText: "Move Money" });
    this.transactionsTab = page.locator("span.hidden.sm\\:inline", { hasText: "Transactions" });
    this.cardsTab = page.locator("span.hidden.sm\\:inline", { hasText: "Cards" });
  }

  async open(): Promise<void> {
    await this.page.goto("https://zincbank.cydeo.io/dashboard");
  }

  async clickDashboard(): Promise<void> {
    await this.dashboardTab.click();
    // Navigation is a client-side route change (React Router-style pushState),
    // so wait on the URL rather than load state.
    await this.page.waitForURL(/\/dashboard/);
  }

  async clickAccounts(): Promise<void> {
    await this.accountsTab.click();
    await this.page.waitForURL(/\/accounts/);
  }

  async clickMoveMoney(): Promise<void> {
    await this.moveMoneyTab.click();
    await this.page.waitForURL(/\/move-money/);
  }

  async clickTransactions(): Promise<void> {
    await this.transactionsTab.click();
    await this.page.waitForURL(/\/transactions/);
  }

  async clickCards(): Promise<void> {
    await this.cardsTab.click();
    await this.page.waitForURL(/\/cards/);
  }

  async isOnDashboard(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/dashboard/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isOnAccounts(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/accounts/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isOnMoveMoney(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/move-money/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isOnTransactions(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/transactions/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isOnCards(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/cards/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }
}