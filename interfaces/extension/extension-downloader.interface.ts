export interface IExtensionDownloader {
  downloadAndSetup(): Promise<void>;
}
