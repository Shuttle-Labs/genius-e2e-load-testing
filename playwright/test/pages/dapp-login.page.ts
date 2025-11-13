import type { Page } from '@playwright/test';

export class DappLoginPage {
    constructor(private readonly root: Page) { }

    async openDapp(ctx: any): Promise<Page> {
        const [dapp] = await Promise.all([
            ctx.waitForEvent('page'),
            this.root.getByText(/Start Trading/i).first().click(),
        ]);
        return dapp;
    }

    async clickSignIn(dapp: Page) {
        await dapp.locator('[aria-label="Sign In"]').waitFor({ state: 'visible', timeout: 15_000 });
        await dapp.locator('[aria-label="Sign In"]').click();
    }

    async clickConnectWallet(dapp: Page) {
        const connectBtn = dapp.locator('[data-sentry-component="ConnectWalletButton"]').first();
        await connectBtn.click({ timeout: 15_000 }).catch(async () => {
            await dapp.evaluate(() => {
                const el = document.querySelector('[data-sentry-component="ConnectWalletButton"]');
                el && (el as HTMLElement).click();
            });
        });
    }

    async chooseMetaMask(dapp: Page) {
        const metaMaskOption = dapp.locator('button:has-text("MetaMask")').first();
        await metaMaskOption.scrollIntoViewIfNeeded();
        await metaMaskOption.waitFor({ state: 'visible', timeout: 60_000 });
        await metaMaskOption.click({ timeout: 60_000 });
    }
}
