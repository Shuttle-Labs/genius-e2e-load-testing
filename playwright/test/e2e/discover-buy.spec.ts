// @ts-nocheck
import { test, expect } from '../fixtures/wallet.fixtures';
import { DiscoverPage } from '../pages/discover.page';
import { NotificationsComponent } from '../components/notifications.component';
import { TOKEN } from '../constants/token';
import { MESSAGES } from '../constants/messages';

test('Buy token on Discover page', async ({ dapp, page }) => {
    const discover = new DiscoverPage(dapp);
    const notifications = new NotificationsComponent(dapp);

    await discover.fillQuickBuy(TOKEN.TEST_VALUE);

    const tokenLabel = await discover.clickFirstToken(TOKEN.TEST_VALUE);

    await notifications.verifySuccessMessage();
    await notifications.openNotifications();
    await notifications.verifyLastNotificationDisplayed()
    await notifications.openLastNotification();
    await notifications.checkTransactionStatus(MESSAGES.SUCCESS);
    await notifications.verifyLastNotificationContainsToken(tokenLabel);
  await notifications.verifyTransactionToken(tokenLabel);
});
