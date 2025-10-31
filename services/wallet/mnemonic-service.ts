import * as bip39 from 'bip39';

export class MnemonicService {
  constructor(
    private readonly seedEntropy?: string
  ) {}

  generateMnemonic(): string {
    return this.seedEntropy
      ? bip39.entropyToMnemonic(this.seedEntropy)
      : bip39.generateMnemonic(128);
  }

  validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
  }
}
