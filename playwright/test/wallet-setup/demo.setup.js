const { defineWalletSetup } = require('@synthetixio/synpress');
const { MetaMask } = require('@synthetixio/synpress/playwright');

const SEED_PHRASE = (process.env.SEED_PHRASE || 'test test test test test test test test test test test junk').trim();
const PASSWORD = (process.env.METAMASK_PASSWORD || 'Tester@1234').trim();

const setup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);
  await metamask.importWallet(SEED_PHRASE);
});

module.exports = setup;
module.exports.walletPassword = PASSWORD;
