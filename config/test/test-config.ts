import * as path from "path";
import * as os from "os";

export class TestConfig {
  static readonly WALLETS_CSV_PATH = path.join(process.cwd(), "wallets", "sol-wallets.csv");
  static readonly EXTENSION_PATH = path.join(process.cwd(), "extensions", "phantom");

  static getTempUserDataDir(): string {
    return path.join(os.tmpdir(), "pw-phantom-");
  }

  static getBrowserArgs(): string[] {
    return [
      `--disable-extensions-except=${this.EXTENSION_PATH}`,
      `--load-extension=${this.EXTENSION_PATH}`,
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ];
  }
}
