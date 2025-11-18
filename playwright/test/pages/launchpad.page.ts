import { Page, Locator } from '@playwright/test';

export class LaunchpadPage {
    readonly launchpadsNav: Locator;
    readonly newPairsInput: Locator;
    readonly newPairsItem: Locator;

    constructor(private readonly page: Page) {
        this.launchpadsNav = this.page.getByText(/Launchpads/i);
        this.newPairsInput = this.page.locator('input.text-genius-cream').first();
        this.newPairsItem = this.page.locator('[data-sentry-component="AvancedLaunchpadsTable"] div.flex.flex-col.gap-2').first();
    }

    async fillNewPairsValue(value: string): Promise<void> {
        await this.newPairsInput.clear();
        await this.newPairsInput.fill(value);
        await this.page.press('body', 'Enter');
    }

    async clickFirstItemTooltipValue(value: string): Promise<void> {
        await this.newPairsItem.hover({ force: true });

        const tooltip = this.page.locator(`[data-sentry-component="AdvancedQuickBuyButton"] div button:has-text("${value}")`).first();

        await tooltip.waitFor({
            state: "visible",
            timeout: 15000
        });

        await tooltip.click();
    }


    async openLaunchpads(): Promise<void> {
        await this.launchpadsNav.hover();
        await this.launchpadsNav.click();
    }
}
