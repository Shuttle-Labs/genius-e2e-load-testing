import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask } from '@synthetixio/synpress/playwright'

const SEED_PHRASE = process.env.SEED_PHRASE?.trim() ||
  'test test test test test test test test test test test junk'
const PASSWORD = process.env.METAMASK_PASSWORD?.trim() || 'Tester@1234'

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD)
  await metamask.importWallet(SEED_PHRASE)
})

export const walletPassword = PASSWORD
