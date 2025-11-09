import { defineWalletSetup } from '@synthetixio/synpress';
import { MetaMask, getExtensionId } from '@synthetixio/synpress-metamask/playwright';
import type { BrowserContext, Page } from '@playwright/test';

const PASSWORD = process.env.WALLET_PASSWORD ?? 'Test1234!';
const SEED =
  process.env.WALLET_MNEMONIC ??
  'test test test test test test test test test test test junk';

export default defineWalletSetup(
  PASSWORD,
  async (context: BrowserContext, walletPage: Page) => {
    const extensionId = await getExtensionId(context, 'MetaMask');
    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);
    await metamask.importWallet(SEED);
  }
);

