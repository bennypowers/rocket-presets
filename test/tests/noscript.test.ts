import { test, expect } from '@playwright/test';

test.describe('noscript', () => {
  test.use({ javaScriptEnabled: false });

  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}`);
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
  });

  test('rocket-preset-code-tabs', async ({ page }) => {
    await page.click('[href="/tests/code-tabs/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await (await page.$('code-tabs')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('initial-page-load.png');
  });

  test('rocket-preset-custom-elements-manifest', async ({ page }) => {
    await page.click('[href="/tests/custom-elements-manifest/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-index.png');
    await page.click('[href="/tests/custom-elements-manifest/custom-element/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-module.png');
    await page.click('#private-api-toggle');
    await (await page.$('rocket-navigation')).waitForElementState('stable');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-private.png');
  });

  test('rocket-preset-playground-elements', async ({ page }) => {
    await page.click('[href="/tests/playground-elements/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await (await page.$('docs-playground')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('playground-elements-initial.png');
  });

  test('rocket-preset-webcomponents-dev', async ({ page }) => {
    await page.click('[href="/tests/webcomponents-dev/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await (await page.$('wcd-snippet')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('webcomponents-dev-initial.png');
  });
});
