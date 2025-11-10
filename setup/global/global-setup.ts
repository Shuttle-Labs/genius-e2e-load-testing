import { WalletServiceFactory } from "../../factories/wallet/wallet-service-factory";
import { WalletGenerationOrchestrator } from "../../services/wallet/wallet-generation-orchestrator";
import * as fs from 'fs';
import * as path from 'path';

export default async function() {
  console.log("🚀 Starting MetaMask wallet setup...");

  const evmWalletPath = path.join(process.cwd(), "wallets", "evm-wallets.csv");

  if (!fs.existsSync(evmWalletPath)) {
    const { generator, storage } = WalletServiceFactory.create();
    const orchestrator = new WalletGenerationOrchestrator(generator, storage);
    await orchestrator.generateWallets(1);
  }

  const csvData = fs.readFileSync(evmWalletPath, 'utf-8');
  const lines = csvData.trim().split('\n');
  const firstWalletMnemonic = lines[1].split(',')[1];

  process.env.WALLET_MNEMONIC = firstWalletMnemonic;
  console.log("✅ MetaMask setup completed");
}
