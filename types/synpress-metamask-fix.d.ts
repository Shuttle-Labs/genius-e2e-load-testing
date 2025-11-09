declare module "@synthetixio/synpress-metamask/playwright" {
  export const metaMaskFixtures: (walletSetup: any, slowMo?: number) => any;

  export function getExtensionId(context: any, name: string): Promise<string>;

  export class MetaMask {
    constructor(context: any, page: any, password: string, extensionId?: string);
    importWallet(seed: string): Promise<void>;
    connectToDapp(account?: string): Promise<void>;
    unlock(): Promise<void>;
    lock(): Promise<void>;
    getAccountAddress(network?: string): Promise<string>;
  }
}
