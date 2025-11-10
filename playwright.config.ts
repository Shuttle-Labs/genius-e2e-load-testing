import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { register } from 'ts-node';

register({ transpileOnly: true });

dotenv.config();

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './test',
  timeout: 300_000,
  expect: { timeout: 30_000 },
  retries: isCI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: process.env.BASE_URL || 'https://example-staging.com',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 1000
    }
  },

  workers: isCI ? 1 : undefined,

  globalSetup: './setup/global/global-setup.ts',
  globalTeardown: './setup/global/global-teardown.ts',

  projects: [
    {
      name: 'chromium-metamask',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
  ],
});

