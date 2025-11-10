import * as fs from "fs";
import { IWalletFundingService } from "../../tests/shared/types/setup.types";
import { SetupConfig } from "../../config/setup/setup-config";


export class WalletFundingService implements IWalletFundingService {
  private web3: any = null;

  async fundWalletsIfNeeded(): Promise<void> {
    if (!SetupConfig.SOLANA_AIRDROP_ENABLED) {
      return;
    }

    await this.ensureWeb3Loaded();

    if (!fs.existsSync(SetupConfig.WALLETS_CSV_PATH)) {
      console.warn("⚠️ wallets/sol-wallets.csv not found; skipping airdrop");
      return;
    }

    const wallets = this.readWalletsFromCsv();
    await this.fundWallets(wallets);
  }

  private async ensureWeb3Loaded(): Promise<void> {
    try {
      this.web3 = await import("@solana/web3.js");
    } catch {
      console.warn("⚠️ @solana/web3.js is not installed; skipping airdrop");
      throw new Error("Web3.js not available");
    }
  }

  private readWalletsFromCsv(): string[] {
    const csv = fs.readFileSync(SetupConfig.WALLETS_CSV_PATH, "utf-8");
    const [header, ...rows] = csv.trim().split("\n");

    if (!rows.length) return [];

    const headers = header.split(",").map(s => s.trim());
    const publicKeyIndex = headers.indexOf("publicKey");

    if (publicKeyIndex < 0) {
      console.warn("⚠️ No publicKey column in wallets CSV; skipping airdrop");
      return [];
    }

    return rows
      .map(row => row.split(",")[publicKeyIndex]?.trim())
      .filter(Boolean);
  }

  private async fundWallets(publicKeys: string[]): Promise<void> {
    const connection = new this.web3.Connection(SetupConfig.SOLANA_RPC, "confirmed");

    for (const publicKey of publicKeys) {
      try {
        const pubKey = new this.web3.PublicKey(publicKey);
        const signature = await connection.requestAirdrop(pubKey, 2 * this.web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(signature, "confirmed");
        console.log(`💧 Airdropped 2 SOL to ${publicKey}`);
      } catch (error: any) {
        console.warn(`⚠️ Airdrop failed for ${publicKey}: ${error?.message ?? error}`);
      }
    }
  }
}
