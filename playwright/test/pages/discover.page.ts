import { Page, Locator } from '@playwright/test';

export class DiscoverPage {
    readonly quickBuyInput: Locator;

    constructor(private readonly page: Page) {
        this.quickBuyInput = this.page.locator('input.text-genius-cream').first();
    }

    async fillQuickBuy(value: string): Promise<void> {
        await this.quickBuyInput.clear();
        await this.quickBuyInput.fill(value);
        await this.page.press('body', 'Enter');
    }

    async clickFirstToken(value: string): Promise<void> {
        const button = this.page.locator(`button.bg-genius-pink:has-text("${value}")`).first();

        await button.waitFor({
            state: "visible",
            timeout: 15000
        });

        await button.click();
    }
}