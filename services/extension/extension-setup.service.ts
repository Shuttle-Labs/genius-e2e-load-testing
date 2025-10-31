import { IExtensionSetupService } from "../../tests/shared/types/setup.types";
import { FileSystemService } from "../file-system-service";
import { MockExtensionCreator } from "./mock-extension-creator";
import { PhantomSetupOrchestrator } from "./phantom-setup-orchestrator";
import { RealExtensionDownloader } from "./real-extension-downloader";


export class ExtensionSetupService implements IExtensionSetupService {
  async setupExtension(): Promise<void> {
    const fileSystem = new FileSystemService();
    const realDownloader = new RealExtensionDownloader(fileSystem);
    const mockCreator = new MockExtensionCreator(fileSystem);

    const orchestrator = new PhantomSetupOrchestrator(realDownloader, mockCreator);
    await orchestrator.setup();
  }
}
