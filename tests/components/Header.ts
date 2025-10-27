import { Locator, Page, expect } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly profileMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('[class="logo__image"]').first();
    this.profileMenu = page.getByRole("button", { name: /profile|account/i });
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
  }
}
