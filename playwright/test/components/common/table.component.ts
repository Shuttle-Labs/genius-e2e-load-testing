import { Page, Locator } from "@playwright/test";

export class TableComponent  {
    readonly quickBuyInput: Locator;

    constructor(page: Page) {
        this.quickBuyInput = page.locator('input.text-genius-cream').first();
    }
}