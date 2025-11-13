import { IWalletGenerator } from "@/k6/interfaces/wallet/wallet/wallet-generator.interface";
import { IWalletStorage } from "@/k6/interfaces/wallet/wallet/wallet-storage.interface";
import { CsvWalletStorage } from "@/k6/storage/csv-wallet-storage";
import { EVMWalletGenerator } from "@/k6/services/wallet/evm-wallet-generator";
import { MnemonicService } from "@/k6/services/wallet/mnemonic-service";
import path from "path";


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
