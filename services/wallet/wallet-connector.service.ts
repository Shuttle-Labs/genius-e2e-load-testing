import { BrowserContext, Page } from "@playwright/test";
import { IWalletConnector } from "../../tests/fixtures/types/wallet.types";
import { PageActions } from "../../utils/page-actions.util";


export class WalletConnectorService implements IWalletConnector {
  private pageActions: PageActions;

  constructor(
    private readonly context: BrowserContext,
    private readonly page: Page
  ) {
    this.pageActions = new PageActions(page);
  }

  async connect(): Promise<string> {
    console.log("🔗 Connecting wallet...");

    await this.pageActions.clickByTestIdOrText("wallet-connect", "Connect with Wallet");

    const phantomPage = await this.context.waitForEvent("page", { timeout: 10000 });
    await phantomPage.waitForLoadState("domcontentloaded");
    await phantomPage.bringToFront();

    await this.handlePhantomPopup(phantomPage);
    await this.page.bringToFront();

    await this.pageActions.waitForConnection();
    const address = await this.pageActions.getWalletAddress();

    console.log(`✅ Wallet connected: ${address}`);
    return address;
  }

  private async handlePhantomPopup(phantomPage: Page): Promise<void> {
    // Handle Continue/Next/Confirm button
    const continueBtn = phantomPage
      .locator('[data-testid="phantom-continue"], text=/Continue|Next|Confirm/i')
      .first();

    if (await continueBtn.isVisible().catch(() => false)) {
      await continueBtn.click();
    }

    // Handle Approve/Confirm/Connect button
    const approveBtn = phantomPage
      .locator('[data-testid="phantom-approve"], text=/Approve|Confirm|Connect/i')
      .first();

    await approveBtn.click();
  }
}
