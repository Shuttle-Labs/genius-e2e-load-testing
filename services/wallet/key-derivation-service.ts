import { Keypair } from "@solana/web3.js";
import * as ed from 'ed25519-hd-key';
import * as bip39 from 'bip39';
import bs58 from 'bs58';

export class KeyDerivationService {
  deriveKeyPairFromMnemonic(mnemonic: string): Keypair {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const derived = ed.derivePath("m/44'/501'/0'/0'", seed.toString('hex'));
    return Keypair.fromSeed(derived.key);
  }

  encodePrivateKey(keyPair: Keypair): string {
    return bs58.encode(Buffer.from(keyPair.secretKey));
  }
}
