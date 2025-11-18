import { Page, Locator } from '@playwright/test';

export class MessagesPage {
    readonly successMessage: Locator;

    constructor(private readonly page: Page) {
        this.successMessage = this.page.locator('li').filter({ hasText: 'ConfirmedMarket Buy' })
    }

    async verifySuccessMessage(text: string = 'ConfirmedMarket Buy'): Promise<void> {
        const msg = this.page.locator('li', { hasText: text });
        await msg.waitFor({ state: 'visible', timeout: 15_000 });
    }
}