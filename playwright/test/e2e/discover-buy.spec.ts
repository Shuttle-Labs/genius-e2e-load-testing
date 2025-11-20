// @ts-nocheck
import { test, expect } from '../fixtures/wallet.fixtures';
import { DiscoverPage } from '../pages/discover.page';
import { HoldingsPage } from '../pages/holdings.page';
import { TOKEN } from '../constants/token';
import { MESSAGES } from '../constants/messages';

test('Buy token on Discover page and verify details', async ({ dapp }) => {
    const discover = new DiscoverPage(dapp);

    await discover.fillQuickBuy(TOKEN.TEST_VALUE_0_001);

    const tokenLabel = await discover.clickFirstToken(TOKEN.TEST_VALUE_0_001);

    await discover.notificationsComponent.verifySuccessMessage();
    await discover.notificationsComponent.openNotifications();
    await discover.notificationsComponent.verifyLastNotificationDisplayed()
    await discover.notificationsComponent.openLastNotification();
    await discover.notificationsComponent.checkTransactionStatus(MESSAGES.SUCCESS);
    await discover.notificationsComponent.verifyLastNotificationContainsToken(tokenLabel);
    await discover.notificationsComponent.verifyTransactionToken(tokenLabel);
});

test('Buy token and Sell - Discover/Holdings page', async ({ dapp }) => {
    const discover = new DiscoverPage(dapp);
    const holdings = new HoldingsPage(dapp);

    await discover.fillQuickBuy(TOKEN.TEST_VALUE_0_01);

    const tokenLabel = await discover.clickFirstToken(TOKEN.TEST_VALUE_0_01);

    await discover.notificationsComponent.verifySuccessMessage();
    await holdings.openHoldings();
    await holdings.clickSwitchButton();
    await holdings.clickSellAll(tokenLabel);
    await discover.notificationsComponent.verifySuccessMessage();
    await discover.notificationsComponent.openNotifications();
    await discover.notificationsComponent.verifyLastNotificationDisplayed()
    await discover.notificationsComponent.openLastNotification();
    await discover.notificationsComponent.checkTransactionStatus(MESSAGES.SUCCESS);
    await discover.notificationsComponent.verifyLastNotificationContainsToken(tokenLabel);
    await discover.notificationsComponent.verifyTransactionToken(tokenLabel);
});
