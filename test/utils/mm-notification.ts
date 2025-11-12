// @ts-nocheck
import type { BrowserContext, Page } from '@playwright/test';

export async function confirmSignatureNotification(context: BrowserContext) {
    const notif = await context.waitForEvent('page', {
        timeout: 20_000,
        predicate: (p: Page) =>
            /chrome-extension:\/\//.test(p.url()) && /notification/i.test(p.url()),
    }).catch(() => null);

    if (!notif) return;

    await notif.bringToFront();
    await notif.waitForLoadState('domcontentloaded');

    const nextBtn = notif.getByRole('button', { name: /Next/i });
    if (await nextBtn.isVisible().catch(() => false)) {
        await nextBtn.click().catch(() => { });
    }

    const signBtn = notif.getByRole('button', { name: /Sign|Approve|Confirm/i }).first();
    await signBtn.click({ timeout: 10_000 }).catch(() => { });

    await notif.waitForEvent('close', { timeout: 10_000 }).catch(() => { });
}
