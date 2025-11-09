import { WalletServiceFactory } from "../factories/wallet/wallet-service-factory";
import { WalletGenerationOrchestrator } from "../services/wallet/wallet-generation-orchestrator";

async function main(): Promise<void> {
  const count = process.argv[2] ? parseInt(process.argv[2]) : 5;

  const { generator, storage } = WalletServiceFactory.create();
  const orchestrator = new WalletGenerationOrchestrator(generator, storage);

  await orchestrator.generateWallets(count);
}

main().catch(console.error);
