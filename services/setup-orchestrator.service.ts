import { ISetupService } from "../tests/shared/types/setup.types.ts";
import { WalletFundingService } from "./wallet/wallet-funding.service.ts";
import { WalletGenerationService } from "./wallet/wallet-generation.service.ts";



export class SetupOrchestratorService implements ISetupService {
  constructor(
    private readonly walletGeneration: WalletGenerationService,
    private readonly walletFunding: WalletFundingService
  ) {}

  async setup(): Promise<void> {
    console.log("🚀 Starting global setup...");

    // 2) Generate wallets
    await this.walletGeneration.setup();

    // 3) Optional airdrop (only if explicitly enabled and in real mode)
    await this.walletFunding.fundWalletsIfNeeded();

    console.log("✅ Global setup completed");
  }
}
