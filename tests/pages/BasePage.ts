import { Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async waitForVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: "visible" });
  }

  async expectUrlContains(part: string) {
    await expect(this.page).toHaveURL(new RegExp(part));
  }
}
