import { IWalletGenerator } from "../../interfaces/wallet/wallet-generator.interface";
import { IWalletStorage } from "../../interfaces/wallet/wallet-storage.interface";
import { WalletData } from "../../interfaces/wallet/wallet-generator.interface";

export class WalletGenerationOrchestrator {
  constructor(
    private readonly generator: IWalletGenerator,
    private readonly storage: IWalletStorage,
    private readonly logger: Console = console
  ) {}

  async generateWallets(count: number = 1): Promise<void> {
    const wallets: WalletData[] = [];

    for (let i = 0; i < count; i++) {
      const wallet = await this.generator.generateWallet(i);
      wallets.push(wallet);
      this.logger.log(`✅ Generated wallet ${i}: ${wallet.publicKey}`);
    }

    await this.storage.saveWallets(wallets);
    this.logger.log(`🎉 Generated ${count} wallets`);
  }
}
