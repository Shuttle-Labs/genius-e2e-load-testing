import * as path from "path";

export class SetupConfig {
  static readonly WALLET_COUNT = Number(process.env.WALLET_COUNT ?? 3);
  static readonly WALLETS_DIR = path.join(process.cwd(), "wallets");
  static readonly WALLETS_CSV_PATH = path.join(this.WALLETS_DIR, "sol-wallets.csv");
  static readonly TMP_DIR = path.join(process.cwd(), "tmp");

  static readonly SOLANA_RPC = process.env.SOLANA_RPC ?? "http://127.0.0.1:8899";
  static readonly SOLANA_AIRDROP_ENABLED = process.env.SOLANA_AIRDROP === "1";
  static readonly CLEAN_WALLETS_ENABLED = process.env.CLEAN_WALLETS === "1";
}

