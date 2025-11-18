import { Page, Locator } from '@playwright/test';
import { TableComponent } from '../components/common/table.component';

export class DiscoverPage extends TableComponent {
    readonly firstTableElement: Locator;
    readonly firstTokenText: Locator;
    constructor(page: Page) {
        super(page);
        this.firstTableElement = page.locator('[data-sentry-component="AdvancedMemesTable"] > div:nth-of-type(2) > div > div > div > div').first();
        this.firstTokenText = this.firstTableElement.locator('.text-md.text-genius-cream');
    }

    async fillQuickBuy(value: string): Promise<void> {
        await this.quickBuyInput.clear();
        await this.quickBuyInput.fill(value);
        await this.page.press('body', 'Enter');
    }

    async getFirstTokenLabel(): Promise<string> {
    await this.firstTableElement.waitFor({ state: 'visible', timeout: 15_000 });

    const text = await this.firstTokenText.textContent();
    return text?.trim() ?? '';
  }

    async clickFirstToken(value: string): Promise<string> {
        const tokenLabel = await this.getFirstTokenLabel();

        const button = this.page.locator(`button.bg-genius-pink:has-text("${value}")`).first();

        await button.waitFor({
            state: "visible",
            timeout: 15000
        });

        await button.click();
        return tokenLabel;
    }
}