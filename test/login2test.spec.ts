// @ts-nocheck
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';
import demoSetup, { walletPassword } from './wallet-setup/demo.setup';
import { DappLoginPage } from './pages/dapp-login.page';
import { confirmSignatureNotification } from './utils/mm-notification';

const test = testWithSynpress(metaMaskFixtures(demoSetup));
const { expect } = test;

test('Login via wallet (MetaMask)', async ({ context, page, metamaskPage, extensionId }) => {
    const metamask = new MetaMask(context, metamaskPage, walletPassword, extensionId);
    const dappLogin = new DappLoginPage(page);

    await page.goto('');
    await expect(page).toHaveTitle(/Genius Pro/i);

    const dapp = await dappLogin.openDapp();

    await dappLogin.clickSignIn(dapp);
    await dappLogin.clickConnectWallet(dapp);
    await dappLogin.chooseMetaMask(dapp);

    await metamask.connectToDapp();
    await dappLogin.clickSignIn(dapp);
    await dappLogin.clickConnectWallet(dapp);
    await metamask.confirmSignature();

    // await (metamask as any).confirmSignature?.().catch(() => { });
    // await confirmSignatureNotification(context);

    await dappLogin.verifyUserLoggedIn(dapp);
});




