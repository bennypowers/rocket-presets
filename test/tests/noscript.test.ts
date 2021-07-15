import { test, expect } from '@playwright/test';

test.describe('noscript', () => {
  test.use({ javaScriptEnabled: false });

  test('rocket-preset-code-tabs', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/code-tabs/`, { waitUntil: 'networkidle' });
    await (await page.$('code-tabs')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('code-tabs-1.png');
  });

  test('rocket-preset-custom-elements-manifest', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/custom-elements-manifest/`, { waitUntil: 'networkidle' });
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-index.png');
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/custom-elements-manifest/custom-element/`, { waitUntil: 'networkidle' });
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-module.png');
    await page.click('#private-api-toggle');
    await (await page.$('rocket-navigation')).waitForElementState('stable');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('custom-elements-manifest-private.png');
  });

  test('rocket-preset-playground-elements', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/playground-elements/`, { waitUntil: 'networkidle' });
    await (await page.$('docs-playground')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('playground-elements-initial.png');
  });

  test('rocket-preset-webcomponents-dev', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/webcomponents-dev/`, { waitUntil: 'networkidle' });
    await (await page.$('wcd-snippet')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('webcomponents-dev-initial.png');
  });
});
