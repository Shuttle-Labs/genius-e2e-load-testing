import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress-metamask/playwright';
import metamaskSetup from '../../test/wallet.setup';

export const test = testWithSynpress(metaMaskFixtures(metamaskSetup));
export const expect = test.expect;




