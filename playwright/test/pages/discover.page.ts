import { Page, Locator } from '@playwright/test';
import { TableComponent } from '../components/common/table.component';
import { BasePage } from './base.page';
import { NotificationsComponent } from '../components/notifications.component';

export class DiscoverPage extends BasePage {
    readonly firstTableElement: Locator;
    readonly firstTokenText: Locator;
    readonly tableComponent: TableComponent;
    readonly notificationsComponent: NotificationsComponent;
    
    constructor(page: Page) {
        super(page);
        this.firstTableElement = page.locator('[data-sentry-component="AdvancedMemesTable"] > div:nth-of-type(2) > div > div > div > div').first();
        this.firstTokenText = this.firstTableElement.locator('.text-md.text-genius-cream');

        this.tableComponent = new TableComponent(page);
        this.notificationsComponent = new NotificationsComponent(page);
    }

    async fillQuickBuy(value: string): Promise<void> {
        await this.tableComponent.quickBuyInput.clear();
        await this.tableComponent.quickBuyInput.fill(value);
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