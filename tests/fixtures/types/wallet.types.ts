export interface Wallet {
  index: string;
  mnemonic: string;
  publicKey: string;
  privateKey: string;
  environment: string;
}

export interface IWalletReader {
  getWallet(index?: number): Promise<Wallet>;
}

export interface IWalletConnector {
  connect(): Promise<string>;
}

export interface IWalletImporter {
  import(index?: number): Promise<void>;
}

export interface IExtensionValidator {
  validateExtension(): void;
  validateWallets(): void;
}
