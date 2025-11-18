import { Page } from '@playwright/test';

export class BasePage {
    constructor(public readonly page: Page) {}

    async waitForTimeout(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }
}