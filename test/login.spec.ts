// @ts-nocheck
import { testWithSynpress } from '@synthetixio/synpress'
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright'
import basicSetup from './wallet.setup';

const test = testWithSynpress(metaMaskFixtures(basicSetup));

const { expect } = test

test('should connect wallet to the MetaMask Test Dapp', async ({
  context,
  page,
  metamaskPage,
  extensionId,
}): any => {
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId
  )

  await page.goto("");
  // await header.expectLogoVisible();
  await expect(page).toHaveTitle(/Genius Pro/i);
  await page.getByText(/Start Trading/).first().click();
  await page.getByText(/Sign In/).waitFor({ state: "visible", timeout: 15_000 });
  await page.getByText(/Sign In/).click();
  await metamask.connectToDapp();
  await page.waitForTimeout(50000);
})
