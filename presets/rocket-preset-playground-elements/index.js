import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { bundle } from './lib/bundle.js';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function playgroundElements({ importMap = undefined } = {}) {
  return {
    path,

    async before11ty() { await bundle({ path, importMap }); },

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
          'docs-playground': '/_merged_assets/_static/playground-elements/docs-playground.js',
        },
      })),

    ],

    setupUnifiedPlugins: [
      adjustPluginOptions('markdown-directives', {
        'playground': ([id, file]) => ({ tagName: 'docs-playground', attributes: { id, file } }),

        'playground-file': ([id, name], { page }) => ({
          tagName: 'template',
          attributes: {
            'data-playground-id': id,
            'data-filename': name,
            'data-lang': page.lang,
          },
        }),

        'playground-hidden-file': ([id, name], { page }) => ({
          tagName: 'template',
          attributes: {
            'data-playground-id': id,
            'data-filename': name,
            'data-hidden': true,
            'data-lang': page.lang,
          },
        }),

        'playground-import-map': ([id]) => ({
          tagName: 'template',
          attributes: {
            'data-import-map': id,
          },
        }),

      } ),
    ],

  };
}
