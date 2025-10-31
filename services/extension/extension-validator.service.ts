import * as fs from "fs";
import { IExtensionValidator } from "../../tests/fixtures/types/wallet.types";
import { TestConfig } from "../../config/test/test-config";


export class ExtensionValidatorService implements IExtensionValidator {
  validateExtension(): void {
    if (!fs.existsSync(TestConfig.EXTENSION_PATH)) {
      throw new Error("Phantom extension not found. Run: npm run setup:phantom");
    }
  }

  validateWallets(): void {
    if (!fs.existsSync(TestConfig.WALLETS_CSV_PATH)) {
      throw new Error(
        `Wallets file not found: ${TestConfig.WALLETS_CSV_PATH}. Run: npm run generate:wallets`
      );
    }
  }
}
