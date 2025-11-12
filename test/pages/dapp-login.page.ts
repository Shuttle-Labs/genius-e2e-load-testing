// @ts-nocheck
import { Page, Locator } from '@playwright/test';

export class DappLoginPage {
    constructor(private readonly root: Page) { }

    startTrading(): Locator {
        return this.root.getByText(/Start Trading/i).first();
    }

    signInBtn(p: Page): Locator {
        return p.locator('[aria-label="Sign In"]');
    }

    connectWalletBtn(p: Page): Locator {
        return p.locator('[data-sentry-component="ConnectWalletButton"]').first();
    }

    metaMaskOption(p: Page): Locator {
        return p.locator('button:has-text("MetaMask")');
    }

    userImage(p: Page): Locator {
        return p.locator('[data-sentry-component="UserCog"]');
    }

    async openDapp(): Promise<Page> {
        const [dapp] = await Promise.all([
            this.root.context().waitForEvent('page'),
            this.startTrading().click(),
        ]);
        return dapp;
    }

    async clickSignIn(dapp: Page) {
        await this.signInBtn(dapp).waitFor({ state: 'visible', timeout: 40_000 });
        await this.signInBtn(dapp).click();
    }

    async clickConnectWallet(dapp: Page) {
        const connectBtn = this.connectWalletBtn(dapp);
        await connectBtn.click({ timeout: 40_000 }).catch(async () => {
            await dapp.evaluate(() => {
                const el = document.querySelector('[data-sentry-component="ConnectWalletButton"]') as HTMLButtonElement | null;
                el?.click();
            });
        });
    }

    async chooseMetaMask(dapp: Page) {
        const metaMaskOption = this.metaMaskOption(dapp);
        await metaMaskOption.scrollIntoViewIfNeeded();
        await metaMaskOption.waitFor({ state: 'visible', timeout: 60_000 });
        await metaMaskOption.click({ timeout: 60_000 });
    }

    async verifyUserLoggedIn(dapp: Page) {
        await dapp.waitForTimeout(60000);
        await this.userImage(dapp).waitFor({ state: 'visible', timeout: 40_000 });
    } 
}