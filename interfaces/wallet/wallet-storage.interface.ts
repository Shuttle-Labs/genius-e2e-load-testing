import { WalletData } from "./wallet-generator.interface.js";

export interface IWalletStorage {
  saveWallets(wallets: WalletData[]): Promise<void>;
}
