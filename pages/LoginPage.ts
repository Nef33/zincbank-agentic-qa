import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly openAccountLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("you@example.com");
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.openAccountLink = page.getByRole("link", { name: "Open an account" });
    this.errorMessage = page.getByText("Invalid email or password.");
  }

  async open(): Promise<void> {
    await this.page.goto("https://zincbank.cydeo.io/login");
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async clickOpenAccount(): Promise<void> {
    await this.openAccountLink.click();
    // "Open an account" is a same-tab, client-side route change (React Router-style
    // pushState, not a full page load), so wait on the URL rather than load state.
    await this.page.waitForURL(/\/apply/);
  }

  async isAccountAccessGranted(): Promise<boolean> {
    return await this.page
      .waitForURL(/\/dashboard/, { timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.errorMessage
      .waitFor({ state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.url().includes("/login");
  }

  async isOnApplyPage(): Promise<boolean> {
    return this.page.url().includes("/apply");
  }
}
