import { Page, Locator } from "@playwright/test";
import { BasePage } from '../../pages/base.page';

export class TableComponent extends BasePage {
    readonly quickBuyInput: Locator;

    constructor(page: Page) {
        super(page);
        this.quickBuyInput = this.page.locator('input.text-genius-cream').first();
    }
}