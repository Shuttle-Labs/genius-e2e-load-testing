// @ts-nocheck
import { test, expect } from '../fixtures/wallet.fixtures';
import { LaunchpadPage } from '../pages/launchpad.page';

test('Buy token on Solana Launchpad', async ({ dapp }) => {
  const launchpad = new LaunchpadPage(dapp);
  const pairsValue = '0.0000000015';

  await launchpad.openLaunchpads();
  await launchpad.fillNewPairsValue(pairsValue);
  await launchpad.clickFirstItemTooltipValue(pairsValue);
});
