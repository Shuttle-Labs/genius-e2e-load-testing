import { BrowserContext, Page as PlaywrightPage } from '@playwright/test';
declare module "@synthetixio/synpress/playwright" {
  export const metaMaskFixtures: (walletSetup: any, slowMo?: number) => any;
  export function getExtensionId(context: BrowserContext, name: string): Promise<string>;
  export class MetaMask {
    constructor(
      context: BrowserContext,
      page: PlaywrightPage,
      password: string,
      extensionId?: string
    );
    importWallet(seed: string): Promise<void>;
    connectToDapp(account?: string): Promise<void>;
    unlock(): Promise<void>;
    lock(): Promise<void>;
    getAccountAddress(network?: string): Promise<string>;
    confirmSignature(): Promise<void>;
  }
}
declare module "@synthetixio/synpress-metamask/playwright" {
  export * from "@synthetixio/synpress/playwright";
}
