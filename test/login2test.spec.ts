// @ts-nocheck
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import demoSetup from './wallet-setup/demo.setup'

const test = testWithSynpress(metaMaskFixtures(demoSetup))
const { expect } = test

test('Login via wallet (MetaMask)', async ({ context, page, metamaskPage, extensionId }) => {
    const metamask = new MetaMask(context, metamaskPage, demoSetup.walletPassword, extensionId)

    await page.goto("")
    await expect(page).toHaveTitle(/Genius Pro/i);

    const [dapp] = await Promise.all([
        context.waitForEvent('page'),
        page.getByText(/Start Trading/i).first().click(),
    ])

    await dapp.locator('[aria-label="Sign In"]').waitFor({ state: 'visible', timeout: 15_000 })
    await dapp.locator('[aria-label="Sign In"]').click();
    const connectBtn = dapp.locator('[data-sentry-component="ConnectWalletButton"]').first()

    await connectBtn.click({ timeout: 15_000 }).catch(async () => {
        await dapp.evaluate(() => {
            const el = document.querySelector('[data-sentry-component="ConnectWalletButton"]') as HTMLButtonElement | null
            el?.click()
        })
    })
    const metaMaskOption = dapp.locator([
        'button:has-text("MetaMask")',
        '[data-testid*="wallet-option"]:has-text("MetaMask")',
        '[class*="wallet"][class*="option"]:has-text("MetaMask")'
    ].join(', ')).first();

    await metaMaskOption.scrollIntoViewIfNeeded();
    await metaMaskOption.waitFor({ state: 'visible', timeout: 30_000 });
    await metaMaskOption.click({ timeout: 20_000 });
    await metamask.connectToDapp()


    // await expect(dapp.getByText(/Connected/i)).toBeVisible({ timeout: 15_000 })
    await dapp.waitForTimeout(30000)
})

