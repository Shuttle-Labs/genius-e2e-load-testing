import * as path from "path";

export class PhantomConfig {
  static readonly EXTENSIONS_DIR = path.join(process.cwd(), "extensions");
  static readonly PHANTOM_DIR = path.join(this.EXTENSIONS_DIR, "phantom");
  static readonly MODE = (process.env.PHANTOM_MODE ?? "mock").toLowerCase();

  static readonly DOWNLOAD_SOURCES = [
    "https://github.com/phantom/browser-extension/releases/latest/download/phantom-chrome.zip",
  ];
}
