import { Page, Locator } from '@playwright/test';

export class DappLoginPage {
    readonly startTradingBtn: Locator;
    readonly signInBtn: (dapp: Page) => Locator;
    readonly connectWalletBtn: (dapp: Page) => Locator;
    readonly metaMaskOption: (dapp: Page) => Locator;
    readonly closeModalBtn: (dapp: Page) => Locator;

    constructor(private readonly root: Page) {
        this.startTradingBtn = this.root.getByText(/Start Trading/i).first();

        this.signInBtn = (dapp: Page) =>
            dapp.locator('[aria-label="Sign In"]');

        this.connectWalletBtn = (dapp: Page) =>
            dapp.locator('[data-sentry-component="ConnectWalletButton"]').first();

        this.metaMaskOption = (dapp: Page) =>
            dapp.locator('button:has-text("MetaMask")').first();

        this.closeModalBtn = (dapp: Page) =>
            dapp.getByRole('button', { name: 'Close' });
    }

    async openDapp(ctx: any): Promise<Page> {
        const [dapp] = await Promise.all([
            ctx.waitForEvent('page'),
            this.startTradingBtn.click(),
        ]);
        return dapp;
    }

    async clickSignIn(dapp: Page) {
        await this.signInBtn(dapp).waitFor({ state: 'visible', timeout: 15000 });
        await this.signInBtn(dapp).click();
    }

    async clickConnectWallet(dapp: Page) {
        const btn = this.connectWalletBtn(dapp);

        await btn.click({ timeout: 15000 }).catch(async () => {
            await dapp.evaluate(() => {
                const el = document.querySelector(
                    '[data-sentry-component="ConnectWalletButton"]'
                ) as HTMLElement | null;
                el?.click();
            });
        });
    }

    async chooseMetaMask(dapp: Page) {
        const option = this.metaMaskOption(dapp);

        await option.scrollIntoViewIfNeeded();
        await option.waitFor({ state: 'visible', timeout: 60000 });
        await option.click({ timeout: 60000 });
    }

    async closeModal(dapp: Page) {
        await this.closeModalBtn(dapp).click();
    }
}

