import { IExtensionDownloader } from "../../interfaces/extension/extension-downloader.interface";
import { IExtensionCreator } from "../../interfaces/extension/extension-creator.interface";
import { PhantomConfig } from "../../config/phantom/phantom-config";

export class PhantomSetupOrchestrator {
  constructor(
    private readonly realDownloader: IExtensionDownloader,
    private readonly mockCreator: IExtensionCreator,
    private readonly logger: Console = console
  ) {}

  async setup(): Promise<void> {
    if (this.extensionAlreadyExists()) {
      this.logger.log("✅ Phantom extension already exists");
      return;
    }

    this.logger.log(`📥 Setting up Phantom extension for testing (mode: ${PhantomConfig.MODE})...`);

    if (PhantomConfig.MODE === "real") {
      await this.setupRealExtension();
    } else {
      await this.setupMockExtension();
    }
  }

  private extensionAlreadyExists(): boolean {
    // This would use the file system, but we'll keep it simple
    // In a real implementation, you'd inject file system dependency
    const fs = require("fs");
    return fs.existsSync(PhantomConfig.PHANTOM_DIR);
  }

  private async setupRealExtension(): Promise<void> {
    try {
      await this.realDownloader.downloadAndSetup();
      this.logger.log("✅ Phantom extension downloaded");
    } catch (error) {
      this.logger.error("❌ Failed to download real Phantom extension:", (error as Error).message);
      throw new Error("PHANTOM_MODE=real but Phantom extension download failed.");
    }
  }

  private async setupMockExtension(): Promise<void> {
    try {
      await this.mockCreator.createMockExtension();
      this.logger.log("✅ Mock Phantom extension created");
    } catch (error) {
      this.logger.error("❌ Failed to create mock extension:", (error as Error).message);
      throw error;
    }
  }
}
