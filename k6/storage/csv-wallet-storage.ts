import path from "path";

import * as fs from "fs";
import { IWalletStorage } from "../interfaces/wallet/wallet/wallet-storage.interface";
import { Wallet } from "../models/models/wallet";

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
