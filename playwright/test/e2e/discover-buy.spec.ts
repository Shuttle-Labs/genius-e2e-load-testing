// @ts-nocheck
import { test, expect } from '../fixtures/wallet.fixtures';
import { DiscoverPage } from '../pages/discover.page';
import { MessagesPage } from '../pages/common/messages.page';

test('Buy token on Discover page', async ({ dapp }) => {
    const discover = new DiscoverPage(dapp);
    const messages = new MessagesPage(dapp);
    const tokenValue = '0.001';

    await discover.fillQuickBuy(tokenValue);
    await discover.clickFirstToken(tokenValue);
    await messages.verifySuccessMessage();
    await messages.openNotifications();
    await messages.verifyLastNotificationDisplayed()
    await messages.openLastNotification();
    await messages.checkTransactionStatus("Success");
});
