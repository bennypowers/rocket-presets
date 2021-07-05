import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { markdownDirectives } from 'rocket-preset-markdown-directives';

import { bundle } from './lib/bundle.js';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

export function webcomponentsDev() {
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
        ...options ?? {},
        specifiers: {
          ...options?.specifiers,
          'wcd-snippet': '/_merged_assets/_static/webcomponents-dev/wcd-snippet.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', {
        'wcd': ([id, file]) => ({ tagName: 'wcd-snippet', attributes: { 'data-id': id, file } }),
      }),
    ],

  };
}
