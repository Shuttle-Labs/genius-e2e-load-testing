// import { defineWalletSetup } from '@synthetixio/synpress'
// import { MetaMask } from '@synthetixio/synpress/playwright'

// const SEED_PHRASE = 'test test test test test test test test test test test junk'
// const PASSWORD = 'Tester@1234'

// export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
//   const metamask = new MetaMask(context, walletPage, PASSWORD)
//   await metamask.importWallet(SEED_PHRASE)
// })

// // Додаємо walletPassword для використання в тестах
// export const walletPassword = PASSWORD




import { defineWalletSetup } from '@synthetixio/synpress'
import { MetaMask } from '@synthetixio/synpress/playwright'

const PASSWORD = process.env.METAMASK_PASSWORD ?? 'Tester@1234'

const FALLBACK_MNEMONIC = 'test test test test test test test test test test test junk'
const MNEMONIC = (process.env.WALLET_MNEMONIC?.trim()?.length ? process.env.WALLET_MNEMONIC!.trim() : FALLBACK_MNEMONIC)

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD)
  await metamask.importWallet(MNEMONIC)

  // опційно: перемкнути мережу/додати RPC з env
  // if (process.env.METAMASK_RPC && process.env.METAMASK_CHAIN_ID) {
  //   await metamask.addNetwork({
  //     networkName: process.env.METAMASK_NET_NAME ?? 'Custom',
  //     rpc: process.env.METAMASK_RPC!,
  //     chainId: process.env.METAMASK_CHAIN_ID!,
  //     symbol: process.env.METAMASK_CURRENCY ?? 'ETH',
  //     explorer: process.env.METAMASK_EXPLORER ?? ''
  //   })
  //   await metamask.switchNetwork(process.env.METAMASK_NET_NAME ?? 'Custom')
  // }
})

export const walletPassword = PASSWORD
