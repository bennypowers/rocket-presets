import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'test/tests',
  retries: 3,
  globalSetup: require.resolve('./test/tests/global-setup') };

export default config;
