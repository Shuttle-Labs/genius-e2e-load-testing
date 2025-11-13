// @ts-nocheck
import { testWithSynpress } from '@synthetixio/synpress';
import { MetaMask, metaMaskFixtures } from '@synthetixio/synpress/playwright';

const demoSetup = require('./wallet-setup/demo.setup.js');
const walletPassword = demoSetup.walletPassword;

import { DappLoginPage } from './pages/dapp-login.page';
import { handleMetaMaskSignature } from './utils/mm-signature.util';

const test = testWithSynpress(metaMaskFixtures(demoSetup));
const { expect } = test;

test('Login via wallet (MetaMask)', async ({ context, page, metamaskPage, extensionId }) => {
    const metamask = new MetaMask(context, metamaskPage, walletPassword, extensionId);
    const dappLogin = new DappLoginPage(page);

    await page.goto(process.env.BASE_URL || '');
    await page.reload();
    await expect(page).toHaveTitle(/Genius Pro/i);

    const dapp = await dappLogin.openDapp(context);

    await dappLogin.clickSignIn(dapp);
    await dappLogin.clickConnectWallet(dapp);
    await dappLogin.chooseMetaMask(dapp);

    await metamask.connectToDapp();
    await handleMetaMaskSignature(context);
    await handleMetaMaskSignature(context);

    console.log('🕒 Waiting before closing the browser...');
    await page.pause();
});