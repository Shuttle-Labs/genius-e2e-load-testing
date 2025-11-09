import * as path from "path";

export class TestConfig {
  static readonly WALLETS_CSV_PATH = path.join(process.cwd(), "wallets", "sol-wallets.csv");
}

