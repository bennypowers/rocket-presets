import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { markdownDirectives } from 'rocket-preset-markdown-directives';
import { createTab } from './lib/createTab.js';
import { bundle } from './lib/bundle.js';

const dash = str => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function codeTabs({ collections }) {
  const collectionMap = new Map(Object.entries(collections).map(([k, v]) => [
    dash(k),
    new Map(Object.entries(v).map(([k, v]) => [k, { id: k, ...v }])),
  ]));

  return {
    path,
    async before11ty() { await bundle({ path }); },
    setupEleventyPlugins: [
      addPlugin({
        name: 'auto-import-custom-elements',
        plugin: addWebComponentDefinitions,
        location: 'bottom',
        options: {
          quiet: true,
          singleScript: true,
        },
      }),

      adjustPluginOptions('auto-import-custom-elements', options => ({
        ...options,
        specifiers: {
          ...options.specifiers,
          'code-copy': '/_merged_assets/_static/code-tabs/code-copy.js',
          'code-tabs': '/_merged_assets/_static/code-tabs/code-tabs.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        copy: () => ({ tagName: 'code-copy' }),
        tab: ([tab], opts) => createTab(tab, collectionMap, opts),
      }),
    ],

  };
}
