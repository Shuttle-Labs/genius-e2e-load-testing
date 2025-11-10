import { IWalletGenerator, WalletData } from "../../interfaces/wallet/wallet-generator.interface";
import { Wallet } from "../../models/wallet";
import { KeyDerivationService } from "./key-derivation-service";
import { MnemonicService } from "./mnemonic-service";

export class SolanaWalletGenerator implements IWalletGenerator {
  constructor(
    private readonly mnemonicService: MnemonicService,
    private readonly keyDerivationService: KeyDerivationService,
    private readonly environment: string = "local"
  ) {}

  async generateWallet(index: number): Promise<WalletData> {
    const mnemonic = this.mnemonicService.generateMnemonic();
    const keyPair = this.keyDerivationService.deriveKeyPairFromMnemonic(mnemonic);
    const privateKey = this.keyDerivationService.encodePrivateKey(keyPair);

    return new Wallet(index, mnemonic, keyPair.publicKey.toBase58(), privateKey, this.environment);
  }
}
