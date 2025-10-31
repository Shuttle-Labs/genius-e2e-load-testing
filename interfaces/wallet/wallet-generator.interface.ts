export interface IWalletGenerator {
  generateWallet(index: number): Promise<WalletData>;
}

export interface WalletData {
  index: number;
  mnemonic: string;
  publicKey: string;
  privateKey: string;
  environment: string;
}
