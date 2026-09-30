import { Browser, BrowserContext, Page, chromium } from "@playwright/test";

/**
 * BrowserDriver encapsulates the Playwright browser and page lifecycle.
 * Centralizes browser management so hooks and step definitions never
 * interact with Playwright browser APIs directly.
 */
export class BrowserDriver {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  /**
   * Launch the browser and create a fresh page/context.
   * Headless by default; set HEADLESS=false in the environment to watch it run.
   */
  async launch(): Promise<void> {
    const headless = process.env.HEADLESS !== "false";
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  /**
   * Return the active page. Throws if launch() hasn't been called yet.
   */
  getPage(): Page {
    if (!this.page) {
      throw new Error("BrowserDriver: page not initialized. Call launch() first.");
    }
    return this.page;
  }

  /**
   * Close the browser and reset all internal references.
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.context = null;
      this.page = null;
    }
  }
}
