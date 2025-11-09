import { Page } from "@playwright/test";

export class PageActions {
  constructor(private readonly page: Page) {}

  async clickByTestIdOrText(testId: string, textFallback: string): Promise<void> {
    const byTestId = this.page.locator(`[data-testid="${testId}"]`);

    if (await byTestId.first().isVisible().catch(() => false)) {
      await byTestId.first().click();
      return;
    }

    await this.page.getByRole("button", { name: textFallback }).click();
  }

  async waitForConnection(timeout: number = 15000): Promise<void> {
    const connectedLocator = this.page.locator(
      '[data-testid="wallet-connected"], text=Connected'
    );
    await connectedLocator.waitFor({ timeout });
  }

  async getWalletAddress(): Promise<string> {
    const addressEl = this.page.locator('[data-testid="wallet-address"]');
    const addressText = await addressEl.textContent().then(text => text?.trim() || "");

    if (addressText) return addressText;

    return await this.page
      .locator("css=[data-wallet-address]")
      .first()
      .getAttribute("data-wallet-address")
      .then(attr => attr || "");
  }
}
