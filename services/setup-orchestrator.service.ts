import { ISetupService } from "../tests/shared/types/setup.types";
import { ExtensionSetupService } from "./extension/extension-setup.service";
import { WalletFundingService } from "./wallet/wallet-funding.service";
import { WalletGenerationService } from "./wallet/wallet-generation.service";


export class SetupOrchestratorService implements ISetupService {
  constructor(
    private readonly extensionSetup: ExtensionSetupService,
    private readonly walletGeneration: WalletGenerationService,
    private readonly walletFunding: WalletFundingService
  ) {}

  async setup(): Promise<void> {
    console.log("🚀 Starting global setup...");

    // 1) Setup extension
    await this.extensionSetup.setupExtension();

    // 2) Generate wallets
    await this.walletGeneration.setup();

    // 3) Optional airdrop (only if explicitly enabled and in real mode)
    await this.walletFunding.fundWalletsIfNeeded();

    console.log("✅ Global setup completed");
  }
}
