import { FullConfig } from '@playwright/test';
import { WalletGenerationService } from '../../services/wallet/wallet-generation.service.ts';
import { WalletFundingService } from '../../services/wallet/wallet-funding.service.ts';

export default async function globalSetup(config: FullConfig) {
  const walletGeneration = new WalletGenerationService();
  await walletGeneration.setup();

  const walletFunding = new WalletFundingService();
  try {
    await walletFunding.fundWalletsIfNeeded();
  } catch {
    // optional: ignore funding errors
  }
}
