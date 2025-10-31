import { test as base, BrowserContext } from "@playwright/test";
import { BrowserContextUtil } from "../../utils/browser-context.util";
import { WalletConnectorService } from "../../services/wallet/wallet-connector.service";
import { WalletReaderService } from "../../services/wallet/wallet-reader.service";
import { WalletImporterService } from "../../services/wallet/wallet-importer.service";


export const test = base.extend<{
  contextWithWallet: BrowserContext;
  connectWallet: () => Promise<string>;
  importTestWallet: (index?: number) => Promise<void>;
  getTestWallet: (index?: number) => Promise<any>;
}>({
  contextWithWallet: async ({}, use) => {
    const context = await BrowserContextUtil.createContextWithWallet();
    await use(context);
    await context.close();
  },

  connectWallet: async ({ context, page }, use) => {
    const walletConnector = new WalletConnectorService(context, page);
    await use(() => walletConnector.connect());
  },

  importTestWallet: async ({ page }, use) => {
    const walletReader = new WalletReaderService();
    const walletImporter = new WalletImporterService(page, walletReader);
    await use((index: number = 0) => walletImporter.import(index));
  },

  getTestWallet: async ({}, use) => {
    const walletReader = new WalletReaderService();
    await use((index: number = 0) => walletReader.getWallet(index));
  },
});

export { expect } from "@playwright/test";
