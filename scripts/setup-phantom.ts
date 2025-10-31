import { PhantomSetupOrchestrator } from "../services/extension/phantom-setup-orchestrator";
import { RealExtensionDownloader } from "../services/extension/real-extension-downloader";
import { MockExtensionCreator } from "../services/extension/mock-extension-creator";
import { FileSystemService } from "../services/file-system-service";

async function main(): Promise<void> {
  const fileSystem = new FileSystemService();
  const realDownloader = new RealExtensionDownloader(fileSystem);
  const mockCreator = new MockExtensionCreator(fileSystem);

  const orchestrator = new PhantomSetupOrchestrator(realDownloader, mockCreator);
  await orchestrator.setup();
}

main().catch(console.error);
