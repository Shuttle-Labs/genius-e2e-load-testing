import { ExtensionSetupService } from "../../services/extension/extension-setup.service";
import { SetupOrchestratorService } from "../../services/setup-orchestrator.service";
import { WalletFundingService } from "../../services/wallet/wallet-funding.service";
import { WalletGenerationService } from "../../services/wallet/wallet-generation.service";


export default async function globalSetup(): Promise<void> {
  const extensionSetup = new ExtensionSetupService();
  const walletGeneration = new WalletGenerationService();
  const walletFunding = new WalletFundingService();

  const orchestrator = new SetupOrchestratorService(
    extensionSetup,
    walletGeneration,
    walletFunding
  );

  await orchestrator.setup();
}


