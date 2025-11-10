import { WalletData } from "./wallet-generator.interface";

export interface IWalletStorage {
  saveWallets(wallets: WalletData[]): Promise<void>;
}
