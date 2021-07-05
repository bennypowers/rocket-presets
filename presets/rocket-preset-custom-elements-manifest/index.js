import footnotes from 'eleventy-plugin-footnotes';
import addWebComponentDefinitions from 'eleventy-plugin-add-web-component-definitions';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { customElementsManifestPlugin } from './eleventy/custom-elements-manifest.js';
import { bundle } from './lib/bundle.js';
import { getCustomElementsManifests } from './lib/getCustomElementsManifests.js';
import { markdownShortcodePlugin } from 'rocket-preset-markdown-directives';

const path = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function customElementsManifest(options) {
  const { typeLinks } = options ?? {};
  return {
    path,

    async before11ty() { await bundle({ path }); },

    setupEleventyPlugins: [

      addPlugin({ name: 'footnotes', plugin: footnotes }),

      addPlugin({ name: 'markdown-shortcode', plugin: markdownShortcodePlugin }),

      addPlugin({
        name: 'custom-elements-manifest',
        plugin: customElementsManifestPlugin,
        options: {
          typeLinks,
          path,
          imports: { keepExtension: false },
        },
      }),

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
          'type-doc': '/_merged_assets/_static/custom-elements-manifest/type-doc.js',
          'json-viewer': '/_merged_assets/_static/custom-elements-manifest/json-viewer.js',
        },
      })),

    ],

    setupEleventyComputedConfig: [
      addPlugin({
        name: 'cem',
        plugin: getCustomElementsManifests,
        options,
      }),
    ],

    setupBuildPlugins: [
      adjustPluginOptions('html', ({ exclude, ...options }) => ({ ...options, exclude: [
        ...Array.isArray(exclude) ? exclude : [exclude].filter(Boolean),
        '**/playground-service-worker-proxy.html',
      ] })),
    ],

  };
}
