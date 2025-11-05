import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress-metamask/playwright';
import metamaskSetup from '../../setup/wallet/metamask.setup.ts';

console.log('[fixtures] metaMask fixtures wired');

export const test = testWithSynpress(metaMaskFixtures(metamaskSetup));
export const expect = test.expect;






