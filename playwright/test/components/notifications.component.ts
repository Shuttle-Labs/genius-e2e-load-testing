import { Page, Locator, expect } from "@playwright/test";
import { MESSAGES } from "../constants/messages";

export class NotificationsComponent {
    readonly notificationButton: Locator;
    readonly notificationAmount: Locator;
    readonly notificationWindow: Locator;

    constructor(private readonly page: Page) {
        this.notificationButton = this.page.locator(".lucide-bell-dot");
        this.notificationAmount = this.page.locator('[data-sentry-component="ToastTx"]').first();
        this.notificationWindow = this.page.locator('[data-sentry-component="TransactionView"]');
    }

    async verifySuccessMessage(text: string = MESSAGES.CONFIRMED_MARKET_BUY): Promise<void> {
        const msg = this.page.locator("li", { hasText: text });
        await msg.waitFor({ state: "visible", timeout: 30_000 });
    }

    async openNotifications(): Promise<void> {
        await this.notificationButton.click();
    }

    async verifyLastNotificationDisplayed(): Promise<void> {
        await expect(this.notificationAmount).toBeVisible();
        await expect(this.notificationAmount).toContainText(MESSAGES.CONFIRMED);
    }

    async openLastNotification(): Promise<void> {
        await this.notificationAmount.click({ force: true });
    }

    async checkTransactionStatus(status: string): Promise<void> {
        await expect(this.notificationWindow).toContainText(status);
    }

    async verifyLastNotificationContainsToken(tokenLabel: string): Promise<void> {
        await expect(this.notificationAmount).toContainText(tokenLabel);
    }

    async verifyTransactionToken(tokenLabel: string): Promise<void> {
        await expect(this.notificationWindow).toContainText(tokenLabel);
    }
}