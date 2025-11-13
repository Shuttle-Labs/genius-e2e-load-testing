export class WalletModel {
  constructor(
    public readonly index: string,
    public readonly mnemonic: string,
    public readonly publicKey: string,
    public readonly privateKey: string,
    public readonly environment: string
  ) {}

  static fromCsvRow(headers: string[], row: string[]): WalletModel {
    const walletData: Record<string, string> = {};
    headers.forEach((header, i) => {
      walletData[header] = row[i] ? row[i].trim() : "";
    });

    return new WalletModel(
      walletData.index,
      walletData.mnemonic,
      walletData.publicKey,
      walletData.privateKey,
      walletData.environment
    );
  }

  getShortAddress(): string {
    if (this.publicKey.length <= 16) return this.publicKey;
    return `${this.publicKey.slice(0, 8)}...${this.publicKey.slice(-8)}`;
  }
}
