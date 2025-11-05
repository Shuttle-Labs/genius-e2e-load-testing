import { test, expect } from '../../fixtures/testWithWallet.ts';
import type { Page } from '@playwright/test';
import type { MetaMask } from '@synthetixio/synpress-metamask/playwright';

test('login via wallet (MetaMask)', async (
  { page, metaMask }: { page: Page; metaMask: MetaMask }
) => {
  await page.goto(process.env.BASE_URL ?? '/');

  await page
    .getByTestId('wallet-connect')
    .or(page.getByRole('button', { name: /connect/i }))
    .click();

  await metaMask.connectToDapp();

  await expect(page.getByTestId('wallet-connected')).toBeVisible({ timeout: 15_000 });
});



