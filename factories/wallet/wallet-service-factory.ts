import path from "path";
import { IWalletGenerator } from "../../interfaces/wallet/wallet-generator.interface";
import { IWalletStorage } from "../../interfaces/wallet/wallet-storage.interface";
import { KeyDerivationService } from "../../services/wallet/key-derivation-service";
import { MnemonicService } from "../../services/wallet/mnemonic-service";
import { SolanaWalletGenerator } from "../../services/wallet/solana-wallet-generator";
import { CsvWalletStorage } from "../../storage/csv-wallet-storage";

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
