import { test, expect } from '@playwright/test';

test.describe('JavaScript enabled', () => {
  test.use({ javaScriptEnabled: true });
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
      .toMatchSnapshot('code-tabs-initial.png');
    await page.click('code-tabs #tabs [data-id="yarn"]');
    await page.waitForSelector('code-tab[data-id="yarn"]');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('code-tabs-after-switching.png');
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
    await page.click('docs-playground [part="button"]');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('playground-elements-after-loaded.png');
  });

  test('rocket-preset-webcomponents-dev', async ({ page }) => {
    await page.click('[href="/tests/webcomponents-dev/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    await (await page.$('wcd-snippet')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('webcomponents-dev-initial.png');
    await page.click('wcd-snippet [part="button"]');
    await page.waitForLoadState('networkidle');
    const iframe = await page.$('wcd-snippet iframe');
    const content = await iframe.contentFrame();
    await content.waitForLoadState('networkidle');
    await content.waitForSelector('#workshop-container iframe');
    const preview = await (await content.$('#workshop-container iframe')).contentFrame();
    await preview.waitForLoadState('networkidle');
    await iframe.waitForElementState('stable');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('webcomponents-dev-after-loaded.png');
  });

  test('rocket-preset-slide-decks', async ({ page }) => {
    await page.click('[href="/tests/slide-decks/test/"]');
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('slide-decks-initial.png');
    await page.press('slidem-deck', 'j');
    for (const el of await page.$$('slidem-slide'))
      await el.waitForElementState('stable');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('slide-decks-next.png');
  });
});
