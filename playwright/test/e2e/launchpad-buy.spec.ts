// @ts-nocheck
import { test } from "../fixtures/wallet.fixtures";
import { LaunchpadPage } from "../pages/launchpad.page";
import { NotificationsComponent } from "../components/notifications.component";
import { TOKEN } from '../constants/token';
import { MESSAGES } from '../constants/messages';

test("Buy token on Solana Launchpad", async ({ dapp, page }) => {
  const launchpad = new LaunchpadPage(dapp);
  const notifications = new NotificationsComponent(dapp);

  await launchpad.openLaunchpads();
  await launchpad.fillNewPairsValue(TOKEN.TEST_VALUE);

  const tokenLabel = await launchpad.clickFirstItemTooltipValue(TOKEN.TEST_VALUE);

  await notifications.verifySuccessMessage();
  await notifications.openNotifications();
  await notifications.verifyLastNotificationDisplayed()
  await notifications.openLastNotification();
  await notifications.checkTransactionStatus(MESSAGES.SUCCESS);
  await notifications.verifyLastNotificationContainsToken(tokenLabel);
  await notifications.verifyTransactionToken(tokenLabel);
});
