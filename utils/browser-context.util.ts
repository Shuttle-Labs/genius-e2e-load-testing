import { chromium, BrowserContext } from "@playwright/test";
import * as fs from "fs";
import { TestConfig } from "../config/test/test-config";
import { ExtensionValidatorService } from "../services/extension/extension-validator.service";

export class BrowserContextUtil {
  static async createContextWithWallet(): Promise<BrowserContext> {
    const extensionValidator = new ExtensionValidatorService();
    extensionValidator.validateExtension();

    const userDataDir = fs.mkdtempSync(TestConfig.getTempUserDataDir());

    return await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: TestConfig.getBrowserArgs(),
    });
  }
}
