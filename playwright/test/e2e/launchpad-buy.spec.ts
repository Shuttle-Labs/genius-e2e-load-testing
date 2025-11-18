// @ts-nocheck
import { test, expect } from '../fixtures/wallet.fixtures';
import { LaunchpadPage } from '../pages/launchpad.page';
import { MessagesPage } from '../pages/common/messages.page';

test('Buy token on Solana Launchpad', async ({ dapp }) => {
  const launchpad = new LaunchpadPage(dapp);
  const messages = new MessagesPage(dapp);
  const pairsValue = '0.001';

  await launchpad.openLaunchpads();
  await launchpad.fillNewPairsValue(pairsValue);
  await launchpad.clickFirstItemTooltipValue(pairsValue);
  await messages.verifySuccessMessage();
});