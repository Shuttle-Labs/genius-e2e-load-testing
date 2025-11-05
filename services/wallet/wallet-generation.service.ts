import * as fs from "fs";
import { ISetupService } from "../../tests/shared/types/setup.types.ts";
import { SetupConfig } from "../../config/setup/setup-config.ts";
import { WalletServiceFactory } from "../../factories/wallet/wallet-service-factory.ts";
import { WalletGenerationOrchestrator } from "./wallet-generation-orchestrator.ts";


export class WalletGenerationService implements ISetupService {
  async setup(): Promise<void> {
    if (fs.existsSync(SetupConfig.WALLETS_CSV_PATH)) {
      console.log("✅ Test wallets already exist");
      return;
    }

    console.log("👛 Generating test wallets...");

    const { generator, storage } = WalletServiceFactory.create();
    const orchestrator = new WalletGenerationOrchestrator(generator, storage);

    await orchestrator.generateWallets(SetupConfig.WALLET_COUNT);
  }
}
