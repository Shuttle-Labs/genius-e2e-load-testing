import { Page } from "@playwright/test";
import { IWalletImporter, IWalletReader } from "../../tests/fixtures/types/wallet.types";
import { PageActions } from "../../utils/page-actions.util";

export class WalletImporterService implements IWalletImporter {
  private pageActions: PageActions;

  constructor(
    private readonly page: Page,
    private readonly walletReader: IWalletReader
  ) {
    this.pageActions = new PageActions(page);
  }

  async import(index: number = 0): Promise<void> {
    console.log(`📥 Importing test wallet ${index}...`);

    const wallet = await this.walletReader.getWallet(index);

    await this.pageActions.clickByTestIdOrText("wallet-import-open", "Import Wallet");
    await this.page.fill('textarea, [data-testid="wallet-seed-input"]', wallet.mnemonic);
    await this.pageActions.clickByTestIdOrText("wallet-import-confirm", "Import");

    await this.page.waitForSelector("text=Wallet imported", { timeout: 10000 });
    console.log(`✅ Wallet ${index} imported successfully`);
  }
}
