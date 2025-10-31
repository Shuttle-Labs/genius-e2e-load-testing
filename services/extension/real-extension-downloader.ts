import * as https from "https";
import * as path from "path";
import extract from "extract-zip";
import { IExtensionDownloader } from "../../interfaces/extension/extension-downloader.interface";
import { IFileSystem } from "../../interfaces/file-system.interface";
import { PhantomConfig } from "../../config/phantom/phantom-config";

export class RealExtensionDownloader implements IExtensionDownloader {
  constructor(
    private readonly fileSystem: IFileSystem,
    private readonly httpClient: typeof https = https
  ) {}

  async downloadAndSetup(): Promise<void> {
    let lastError: Error | null = null;

    for (const url of PhantomConfig.DOWNLOAD_SOURCES) {
      try {
        console.log(`🔄 Trying: ${url}`);
        await this.downloadAndExtract(url);
        return;
      } catch (error) {
        lastError = error as Error;
        console.log(`❌ Failed: ${url}`);
      }
    }

    throw lastError ?? new Error("All download sources failed");
  }

  private async downloadAndExtract(url: string): Promise<void> {
    const tempZip = path.join(PhantomConfig.EXTENSIONS_DIR, "phantom-temp.zip");

    this.ensureExtensionsDirExists();
    await this.downloadFile(url, tempZip);
    await extract(tempZip, { dir: PhantomConfig.PHANTOM_DIR });
    this.fileSystem.unlinkSync(tempZip);
  }

  private downloadFile(url: string, destination: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const file = this.fileSystem.createWriteStream(destination);

      this.httpClient
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        })
        .on("error", (error) => {
          this.fileSystem.unlinkSync(destination);
          reject(error);
        });
    });
  }

  private ensureExtensionsDirExists(): void {
    if (!this.fileSystem.existsSync(PhantomConfig.EXTENSIONS_DIR)) {
      this.fileSystem.mkdirSync(PhantomConfig.EXTENSIONS_DIR, { recursive: true });
    }
  }
}
