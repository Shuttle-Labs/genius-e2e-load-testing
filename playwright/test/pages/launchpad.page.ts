import { Page, Locator } from '@playwright/test';
import { TableComponent } from '../components/common/table.component';

export class LaunchpadPage extends TableComponent {
    readonly launchpadsNav: Locator;
    readonly newPairsItem: Locator;
    readonly newPairsTokenText: Locator;

    constructor(page: Page) {
        super(page);
        this.launchpadsNav = this.page.getByText(/Launchpads/i);
        this.newPairsItem = this.page.locator('[data-sentry-component="AvancedLaunchpadsTable"] div.flex.flex-col.gap-2').first();
        this.newPairsTokenText = this.newPairsItem.locator(
            '[data-sentry-component="renderTokenText"]'
        );
    }

    async fillNewPairsValue(value: string): Promise<void> {
        await this.quickBuyInput.clear();
        await this.quickBuyInput.fill(value);
        await this.page.press('body', 'Enter');
        await this.page.waitForTimeout(4000); // Wait for the results to load available token
    }

    async getFirstTokenLabel(): Promise<string> {
        await this.newPairsItem.waitFor({ state: 'visible', timeout: 15_000 });

        const text = await this.newPairsTokenText.textContent();
        return text?.trim() ?? '';
    }

    async clickFirstItemTooltipValue(value: string): Promise<string> {
        const tokenLabel = await this.getFirstTokenLabel();
        await this.newPairsItem.hover({ force: true });

        const tooltip = this.page.locator(`[data-sentry-component="AdvancedQuickBuyButton"] div button:has-text("${value}")`).first();

        await tooltip.waitFor({
            state: "visible",
            timeout: 15000
        });

        await tooltip.click();
        return tokenLabel
    }

    async openLaunchpads(): Promise<void> {
        await this.launchpadsNav.hover();
        await this.launchpadsNav.click();
    }
}
