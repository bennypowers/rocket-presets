import { rocketLaunch } from '@rocket/launch';

import { codeTabs } from 'rocket-preset-code-tabs';
import { customElementsManifest } from 'rocket-preset-custom-elements-manifest';
import { playgroundElements } from 'rocket-preset-playground-elements';
import { slideDecks } from 'rocket-preset-slide-decks';
import { webcomponentsDev } from 'rocket-preset-webcomponents-dev';
import { mdDirectives } from 'rocket-preset-markdown-directives';

import { adjustPluginOptions } from 'plugins-manager';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// EXPECT tabs to display with script on, and have icons
const collections = {
  packageManagers: {
    npm: { label: 'NPM', iconHref: '/_merged_assets/_static/brand-logos/npm.svg' },
    yarn: { label: 'Yarn', iconHref: '/_merged_assets/_static/brand-logos/yarn.svg' },
    pnpm: { label: 'PNPM', iconHref: '/_merged_assets/_static/brand-logos/pnpm.svg' },
  },
};

// EXPECT HTMLElement to link to MDN
const typeLinks = {
  HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement',
};

// EXPECT rocket logo to be 40px high
const directives = {
  global: (_, { node }) => ({ tagName: 'style', textContent: node.value }),
};

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('@rocket/cli/dist-types/types/main').RocketCliOptions} */
export default ({
  outputDir: resolve(root, './_site'),
  outputDevDir: resolve(root, './_site-dev'),
  presets: [
    rocketLaunch(),

    codeTabs({ collections }),
    customElementsManifest({ typeLinks, root }),
    playgroundElements(),
    slideDecks(),
    webcomponentsDev(),
    mdDirectives({ directives }),
  ],

  setupBuildPlugins: [
    adjustPluginOptions('copy', {
      patterns: [
        '!(*.md|*.html)*',
        '_merged_assets/_static/**/*',
        '_merged_assets/brand-logos/**/*',
      ],
    }),
  ],

  eleventy(eleventyConfig) {
    // on account of not using them directly in the HTML
    eleventyConfig.addPassthroughCopy('_assets/brand-logos/*.svg');
    eleventyConfig.addTransform('fix-noscript', content =>
      content
        .replace(/&#x26;#x3C;(link|style)/g, '<$1')
        .replace(/&#x26;(link|style)/g, '<$1')
        .replace(/&#x3C;(link|style)/g, '<$1')
    );
  },
});
