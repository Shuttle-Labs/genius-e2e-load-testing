import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HoldingsPage extends BasePage {
    readonly holdingsNav: Locator;
    readonly switchButton: Locator;
    readonly sellAllButton: Locator;
    readonly mostRecentButton: Locator;

    constructor(page: Page) {
        super(page);
        this.holdingsNav = this.page.getByText(/Holdings/i);
        this.switchButton = this.page.locator('[data-sentry-component="DesktopPorfolioPage"] [aria-label="Toggle degen"]');
        this.sellAllButton = this.page.locator('[data-sentry-source-file="AdvancedPositionTable.tsx"] div .flex-row.w-full');
        this.mostRecentButton = this.page.locator('[data-sentry-source-file="AdvancedPositionTable.tsx"] [class="lucide lucide-clock cursor-pointer transition-colors text-genius-cream"]').first();
    }

    async openHoldings(): Promise<void> {
        await this.holdingsNav.hover();
        await this.holdingsNav.click();
    }

    async clickSwitchButton(): Promise<void> {
        await this.switchButton.click();
    }

    async clickSellAll(tokenLabel: string): Promise<void> {
        const row = this.page.locator(
            '[data-sentry-source-file="AdvancedPositionTable.tsx"] div.flex-row.w-full'
        ).filter({ hasText: tokenLabel });

        await row.locator('button').click();

    }
}