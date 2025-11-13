export class Wallet {
  constructor(
    public readonly index: number,
    public readonly mnemonic: string,
    public readonly publicKey: string,
    public readonly privateKey: string,
    public readonly environment: string
  ) {}

  toCsvRow(): string[] {
    return [
      String(this.index),
      this.mnemonic,
      this.publicKey,
      this.privateKey,
      this.environment
    ];
  }
}
