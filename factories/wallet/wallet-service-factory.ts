import path from "path";
import { IWalletGenerator } from "../../interfaces/wallet/wallet-generator.interface";
import { IWalletStorage } from "../../interfaces/wallet/wallet-storage.interface";
import { EVMWalletGenerator } from "../../services/wallet/evm-wallet-generator";
import { CsvWalletStorage } from "../../storage/csv-wallet-storage";
import { MnemonicService } from "../../services/wallet/mnemonic-service";

export class WalletServiceFactory {
  static create(): {
    generator: IWalletGenerator;
    storage: IWalletStorage;
  } {
    const environment = process.env.CI ? "ci" : "local";

    const mnemonicService = new MnemonicService(process.env.WALLET_SEED?.trim());

    const generator = new EVMWalletGenerator(environment);
    const storage = new CsvWalletStorage(path.join(process.cwd(), "wallets", "evm-wallets.csv"));

    return { generator, storage };
  }
}
