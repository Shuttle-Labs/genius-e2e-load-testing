// @ts-nocheck
import { test } from "../fixtures/wallet.fixtures";
import { LaunchpadPage } from "../pages/launchpad.page";
import { HoldingsPage } from '../pages/holdings.page';
import { TOKEN } from '../constants/token';
import { MESSAGES } from '../constants/messages';

test("Buy token on Solana Launchpad", async ({ dapp }) => {
  const launchpad = new LaunchpadPage(dapp);

  await launchpad.openLaunchpads();
  await launchpad.fillNewPairsValue(TOKEN.TEST_VALUE_0_001);

  const tokenLabel = await launchpad.clickFirstItemTooltipValue(TOKEN.TEST_VALUE_0_001);

  await launchpad.notificationsComponent.verifySuccessMessage();
  await launchpad.notificationsComponent.openNotifications();
  await launchpad.notificationsComponent.verifyLastNotificationDisplayed()
  await launchpad.notificationsComponent.openLastNotification();
  await launchpad.notificationsComponent.checkTransactionStatus(MESSAGES.SUCCESS);
  await launchpad.notificationsComponent.verifyLastNotificationContainsToken(tokenLabel);
  await launchpad.notificationsComponent.verifyTransactionToken(tokenLabel);
});

test("Buy token and Sell - Launchpad/Holdings page", async ({ dapp }) => {
  const launchpad = new LaunchpadPage(dapp);
  const holdings = new HoldingsPage(dapp);

  await launchpad.openLaunchpads();
  await launchpad.fillNewPairsValue(TOKEN.TEST_VALUE_0_01);

  const tokenLabel = await launchpad.clickFirstItemTooltipValue(TOKEN.TEST_VALUE_0_01);

  await launchpad.notificationsComponent.verifySuccessMessage();
  await holdings.openHoldings();
  await holdings.clickSwitchButton();
  await holdings.clickSellAll(tokenLabel);
  await launchpad.notificationsComponent.openNotifications();
  await launchpad.notificationsComponent.verifyLastNotificationDisplayed()
  await launchpad.notificationsComponent.openLastNotification();
  await launchpad.notificationsComponent.checkTransactionStatus(MESSAGES.SUCCESS);
  await launchpad.notificationsComponent.verifyLastNotificationContainsToken(tokenLabel);
  await launchpad.notificationsComponent.verifyTransactionToken(tokenLabel);
});
