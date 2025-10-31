import * as fs from "fs";
import { IWalletReader, Wallet } from "../../tests/fixtures/types/wallet.types";
import { TestConfig } from "../../config/test/test-config";
import { WalletModel } from "../../models/wallet.model";

export class WalletReaderService implements IWalletReader {
  async getWallet(index: number = 0): Promise<Wallet> {
    this.validateWalletsFile();

    const csvData = fs.readFileSync(TestConfig.WALLETS_CSV_PATH, "utf-8");
    const lines = csvData.trim().split("\n");

    if (lines.length <= index + 1) {
      throw new Error(`Wallet index ${index} not found. Available: ${lines.length - 1} wallets`);
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    const row = lines[index + 1].split(",");

    return WalletModel.fromCsvRow(headers, row);
  }

  private validateWalletsFile(): void {
    if (!fs.existsSync(TestConfig.WALLETS_CSV_PATH)) {
      throw new Error(
        `Wallets file not found: ${TestConfig.WALLETS_CSV_PATH}. Run: npm run generate:wallets`
      );
    }
  }
}
