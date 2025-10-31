import { test } from "../../fixtures/wallet.fixture";
import { expect } from "@playwright/test";

test.describe("Wallet Integration", () => {
  test("should connect Phantom wallet", async ({ page, context, connectWallet }) => {
    await page.goto("/");


    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.getByText("Start Trading").first().click(),
    ]);

    await newPage.waitForLoadState("domcontentloaded");
    await newPage.bringToFront();

    await expect(newPage).toHaveURL(/asset/);
    await newPage.locator('button[aria-label="Sign In"]').click();
    await newPage.locator('#wallet-auth-button').click({timeout: 10000});
    const walletAddress = await connectWallet();

    await expect(page.locator('[data-testid="wallet-connected"], text=Connected')).toBeVisible();
    if (walletAddress) {
      await expect(
        page.locator('[data-testid="wallet-address"], text=' + walletAddress.slice(0, 8))
      ).toBeVisible();
    }
  });

  test("should import and use test wallet", async ({ page, importTestWallet }) => {
    await page.goto("/wallet/import");
    await importTestWallet(0);
    await expect(page.locator("text=Balance:")).toBeVisible();
  });

  test("should perform trade with connected wallet", async ({ page, connectWallet }) => {
    await page.goto("/");
    await connectWallet();

    await page.getByRole("button", { name: /Buy/i }).click();
    await page.fill('input[type="number"]', "0.1");
    await page.getByRole("button", { name: /Confirm/i }).click();

    await expect(page.locator("text=Transaction confirmed")).toBeVisible({ timeout: 30000 });
  });
});
