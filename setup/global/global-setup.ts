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

  const csvData = fs.readFileSync(evmWalletPath, 'utf-8').trim();
  const [headerLine, firstRow] = csvData.split('\n');
  const headers = headerLine.split(',').map(h => h.trim());
  const row = firstRow.split(',').map(v => v.trim());
  const mnemonicIdx = headers.indexOf('mnemonic');

  if (mnemonicIdx < 0) {
    throw new Error('mnemonic column not found in wallets CSV');
  }

  const firstWalletMnemonic = row[mnemonicIdx];
  if (!firstWalletMnemonic) {
    throw new Error('mnemonic is empty in wallets CSV');
  }

  process.env.WALLET_MNEMONIC = firstWalletMnemonic;
  console.log("✅ MetaMask setup completed");
}

