import { ethers } from 'ethers';
import { Wallet } from '../../models/wallet';
import { IWalletGenerator } from '../../interfaces/wallet/wallet-generator.interface';

export class EVMWalletGenerator implements IWalletGenerator {
  constructor(private readonly environment: string = "local") {}

  async generateWallet(index: number): Promise<any> {
    const wallet = ethers.Wallet.createRandom();

    return new Wallet(
      index,
      wallet.mnemonic!.phrase,
      wallet.address,
      wallet.privateKey,
      this.environment
    );
  }
}
