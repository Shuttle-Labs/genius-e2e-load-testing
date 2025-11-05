declare module "@synthetixio/synpress-phantom/playwright" {
  export const phantomFixtures: any;
  export const getExtensionIdPhantom: any;
  
  export class Phantom {
    constructor(context: any, page: any, password: string, extensionId?: string);
    importWallet(seed: string): Promise<void>;
    connectToDapp(account?: string): Promise<void>;
    unlock(): Promise<void>;
    lock(): Promise<void>;
    getAccountAddress(network?: string): Promise<string>;
  }
}
