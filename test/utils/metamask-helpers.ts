// @ts-nocheck
import type { BrowserContext, Page } from '@playwright/test'
import type { MetaMask } from '@synthetixio/synpress/playwright'

// закриваємо всі старі вікна MetaMask notification
export async function closeAllMetaMaskNotifications(context: BrowserContext) {
  for (const p of context.pages()) {
    const u = p.url()
    if (/chrome-extension:\/\//.test(u) && /notification/i.test(u)) {
      await p.close().catch(() => {})
    }
  }
}

// системні попапи типу clipboard не дають клікнути по UI
export async function dismissChromePermissionPopups(p: Page) {
  await p.getByRole('button', { name: /Allow|Block|Close/i })
    .click({ timeout: 1000 })
    .catch(() => {})
}

// фолбек: якщо Synpress не побачив notification, підтвердимо вручну
export async function manualConfirmConnection(context: BrowserContext) {
  const notif = await context.waitForEvent('page', {
    timeout: 15_000,
    predicate: (p) => /chrome-extension:\/\//.test(p.url()) && /notification/i.test(p.url()),
  }).catch(() => null)

  if (!notif) return

  await notif.waitForLoadState('domcontentloaded')
  // інколи є крок "Next"
  const nextBtn = notif.getByRole('button', { name: /Next/i })
  if (await nextBtn.isVisible().catch(() => false)) {
    await nextBtn.click().catch(() => {})
  }
  // основна кнопка
  await notif.getByRole('button', { name: /Connect|Confirm|Approve/i })
    .first()
    .click({ timeout: 10_000 })
    .catch(() => {})

  // дочекайся закриття
  await notif.waitForEvent('close', { timeout: 10_000 }).catch(() => {})
}

// ретрай конекту: чистимо нотифікації → пробуємо Synpress → фолбек вручну
export async function connectWithRetry(
  context: BrowserContext,
  metamask: MetaMask,
  { retries = 2, confirmSignature = false }: { retries?: number; confirmSignature?: boolean } = {}
) {
  let lastErr: any
  for (let i = 0; i <= retries; i++) {
    try {
      await closeAllMetaMaskNotifications(context)
      await metamask.connectToDapp()

      if (confirmSignature && typeof (metamask as any).confirmSignature === 'function') {
        await (metamask as any).confirmSignature().catch(() => {})
      }
      return
    } catch (e) {
      // спробуємо вручну підтвердити, раптом Synpress не спіймав вікно
      await manualConfirmConnection(context).catch(() => {})
      lastErr = e
      await new Promise(r => setTimeout(r, 1200))
    }
  }
  throw lastErr
}
