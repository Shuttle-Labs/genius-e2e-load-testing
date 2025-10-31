import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { ICleanupService } from "../tests/shared/types/setup.types";
import { SetupConfig } from "../config/setup/setup-config";


export class CleanupService implements ICleanupService {
  async cleanup(): Promise<void> {
    console.log("🧼 Global teardown started...");

    this.removePhantomState();
    this.removeTmpUserDataDirs();

    if (SetupConfig.CLEAN_WALLETS_ENABLED) {
      this.removeWallets();
    }

    if (SetupConfig.CLEAN_EXTENSIONS_ENABLED) {
      this.removeExtensions();
    }

    console.log("✅ Global teardown completed");
  }

  private removePhantomState(): void {
    this.safeRemove(SetupConfig.PHANTOM_STATE_PATH);
  }

  private removeWallets(): void {
    this.safeRemove(SetupConfig.WALLETS_DIR);
  }

  private removeExtensions(): void {
    this.safeRemove(SetupConfig.PHANTOM_DIR);
  }

  private removeTmpUserDataDirs(): void {
    const tmpDir = os.tmpdir();
    try {
      const entries = fs.readdirSync(tmpDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith("pw-phantom-")) {
          this.safeRemove(path.join(tmpDir, entry.name));
        }
      }
    } catch (error: any) {
      console.warn(`⚠️ Failed to scan tmp dirs: ${error?.message ?? error}`);
    }
  }

  private safeRemove(targetPath: string): void {
    try {
      if (fs.existsSync(targetPath)) {
        const stat = fs.statSync(targetPath);
        if (stat.isDirectory()) {
          fs.rmSync(targetPath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(targetPath);
        }
        console.log(`🧹 Removed: ${targetPath}`);
      }
    } catch (error: any) {
      console.warn(`⚠️ Failed to remove ${targetPath}: ${error?.message ?? error}`);
    }
  }
}
