import path from "path";
import { Wallet } from "../models/wallet.ts";
import { IWalletStorage } from "../interfaces/wallet/wallet-storage.interface.ts";
import * as fs from "fs";

export class CsvWalletStorage implements IWalletStorage {
  constructor(
    private readonly filePath: string,
    private readonly fsModule: typeof fs = fs
  ) {}

  async saveWallets(wallets: Wallet[]): Promise<void> {
    const rows: string[][] = [["index", "mnemonic", "publicKey", "privateKey", "environment"]];

    wallets.forEach((wallet) => {
      rows.push(wallet.toCsvRow());
    });

    this.ensureDirectoryExists();
    this.fsModule.writeFileSync(this.filePath, rows.map((r) => r.join(",")).join("\n"));
  }

  private ensureDirectoryExists(): void {
    const dir = path.dirname(this.filePath);
    if (!this.fsModule.existsSync(dir)) {
      this.fsModule.mkdirSync(dir, { recursive: true });
    }
  }
}
