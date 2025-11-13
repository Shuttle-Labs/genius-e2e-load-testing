import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './test',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://example-staging.com',
    headless: false,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--disable-dev-shm-usage', '--disable-gpu'],
      slowMo: 250,
    },
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'chromium-metamask',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

