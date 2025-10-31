export interface IFileSystem {
  existsSync(path: string): boolean;
  mkdirSync(path: string, options?: { recursive: boolean }): void;
  writeFileSync(path: string, data: string): void;
  unlinkSync(path: string): void;
  createWriteStream(path: string): any;
}
