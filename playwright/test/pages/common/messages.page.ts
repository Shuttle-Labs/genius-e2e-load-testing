import { Page, Locator, expect } from "@playwright/test";

export class MessagesPage {
  readonly successMessage: Locator;
  readonly notificationButton: Locator;
  readonly notificationAmount: Locator;
  readonly notificationWindow: Locator;

  constructor(private readonly page: Page) {
    this.successMessage = this.page.locator("li").filter({ hasText: "ConfirmedMarket Buy" });
    this.notificationButton = this.page.locator(".lucide-bell-dot");
    this.notificationAmount = this.page.locator('[data-sentry-component="ToastTx"]').first();
    this.notificationWindow = this.page.locator('[data-sentry-component="TransactionView"]');
  }

  async verifySuccessMessage(text: string = "ConfirmedMarket Buy"): Promise<void> {
    const msg = this.page.locator("li", { hasText: text });
    await msg.waitFor({ state: "visible", timeout: 15_000 });
  }

  async openNotifications(): Promise<void> {
    await this.notificationButton.click();
  }

  async verifyLastNotificationDisplayed(): Promise<void> {
    await expect(this.notificationAmount).toBeVisible();
    await expect(this.notificationAmount).toContainText("Confirmed");
  }

  async openLastNotification(): Promise<void> {
    await this.notificationAmount.click({ force: true });
  }

  async checkTransactionStatus(status: string): Promise<void> {
    await expect(this.notificationWindow).toContainText(status);
  }
}
