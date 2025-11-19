import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HoldingsPage extends BasePage {
    readonly holdingsNav: Locator;

    constructor(page: Page) {
        super(page);
        this.holdingsNav = this.page.getByText(/Holdings/i);
    }

    async openHoldings(): Promise<void> {
        await this.holdingsNav.hover();
        await this.holdingsNav.click();
    }

    getRow(tokenLabel: string): Locator {
        return this.page
            .locator('div[style*="overflow: hidden auto"] >> nth=1')
            .filter({ hasText: tokenLabel })
            .first();
    }

    async clickSellAll(tokenLabel: string): Promise<void> {
        const row = this.getRow(tokenLabel);

        await row.waitFor({ state: 'visible', timeout: 10000 });

        await row.getByRole('button', { name: /Sell All/i }).click();
    }
}