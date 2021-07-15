import { test } from '@playwright/test';
import { tests } from './presets';

test.describe('Light Mode', () => {
  test.use({
    javaScriptEnabled: true,
    colorScheme: 'light',
  });

  for (const [name, t] of Object.entries(tests))
    test(name, t);
});
