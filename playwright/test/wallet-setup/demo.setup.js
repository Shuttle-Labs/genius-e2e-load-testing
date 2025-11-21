const { defineWalletSetup } = require('@synthetixio/synpress');
const { MetaMask } = require('@synthetixio/synpress/playwright');

const SEED_PHRASE = process.env.SEED_PHRASE?.trim();
const PASSWORD = process.env.METAMASK_PASSWORD?.trim() || 'Tester@1234';

if (!SEED_PHRASE) {
  throw new Error('SEED_PHRASE env variable is required');
}

const setup = defineWalletSetup(PASSWORD, async (context, walletPage) => {
  const metamask = new MetaMask(context, walletPage, PASSWORD);
  await metamask.importWallet(SEED_PHRASE);
});

module.exports = setup;
module.exports.walletPassword = PASSWORD;

