import path from "path";
import { IWalletGenerator } from "../../interfaces/wallet/wallet-generator.interface.js";
import { IWalletStorage } from "../../interfaces/wallet/wallet-storage.interface.js";
import { SolanaWalletGenerator } from "../../services/wallet/solana-wallet-generator.js";
import { CsvWalletStorage } from "../../storage/csv-wallet-storage.js";
import { MnemonicService } from "../../services/wallet/mnemonic-service.js";
import { KeyDerivationService } from "../../services/wallet/key-derivation-service.js";

export class WalletServiceFactory {
  static create(): {
    generator: IWalletGenerator;
    storage: IWalletStorage;
  } {
    const environment = process.env.CI ? "ci" : "local";
    const mnemonicService = new MnemonicService(process.env.WALLET_SEED?.trim());
    const keyDerivationService = new KeyDerivationService();

    const generator = new SolanaWalletGenerator(mnemonicService, keyDerivationService, environment);

    const storage = new CsvWalletStorage(path.join(process.cwd(), "wallets", "sol-wallets.csv"));

    return { generator, storage };
  }
}
