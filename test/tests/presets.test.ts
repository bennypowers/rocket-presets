import { test, expect } from '@playwright/test';

test.describe('JavaScript enabled', () => {
  test.use({ javaScriptEnabled: true });

  test('rocket-preset-code-tabs', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/code-tabs/`, { waitUntil: 'networkidle' });
    await (await page.$('code-tabs')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('code-tabs-initial.png');
    await page.click('code-tabs #tabs [data-id="yarn"]');
    await page.waitForSelector('code-tab[data-id="yarn"]');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('code-tabs-after-switching.png');
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
    await page.click('docs-playground [part="button"]');
    await page.waitForLoadState('networkidle');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('playground-elements-after-loaded.png');
  });

  test('rocket-preset-webcomponents-dev', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/webcomponents-dev/`, { waitUntil: 'networkidle' });
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

  test('rocket-preset-webcomponents-dev-shortcode', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/webcomponents-dev/shortcode/`, { waitUntil: 'networkidle' });
    await (await page.$('wcd-snippet')).scrollIntoViewIfNeeded();
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('webcomponents-dev-shortcode-initial.png');
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
      .toMatchSnapshot('webcomponents-dev-shortcode-after-loaded.png');
  });

  test('rocket-preset-slide-decks', async ({ page }) => {
    await page.goto(`http://localhost:${process.env.SERVER_PORT}/tests/slide-decks/test/`, { waitUntil: 'networkidle' });
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('slide-decks-initial.png');
    await page.press('slidem-deck', 'j');
    for (const el of await page.$$('slidem-slide'))
      await el.waitForElementState('stable');
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('slide-decks-next.png');
  });
});
