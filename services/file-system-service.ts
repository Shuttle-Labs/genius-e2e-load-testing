import * as fs from "fs";
import { IFileSystem } from "../interfaces/file-system.interface";

export class FileSystemService implements IFileSystem {
  existsSync(path: string): boolean {
    return fs.existsSync(path);
  }

  mkdirSync(path: string, options?: { recursive: boolean }): void {
    fs.mkdirSync(path, options);
  }

  writeFileSync(path: string, data: string): void {
    fs.writeFileSync(path, data);
  }

  unlinkSync(path: string): void {
    fs.unlinkSync(path);
  }

  createWriteStream(path: string): any {
    return fs.createWriteStream(path);
  }
}
