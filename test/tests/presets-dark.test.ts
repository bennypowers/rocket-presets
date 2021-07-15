import { test } from '@playwright/test';
import { tests } from './presets';

test.describe('Dark Mode', () => {
  test.use({
    javaScriptEnabled: true,
    colorScheme: 'dark',
  });

  for (const [name, t] of Object.entries(tests))
    test(name, t);
});
