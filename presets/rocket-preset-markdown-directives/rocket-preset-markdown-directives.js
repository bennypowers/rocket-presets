import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { markdownDirectives } from './lib/markdownDirectives.js';
import { addPlugin, adjustPluginOptions } from 'plugins-manager';
import { markdownShortcodePlugin } from './eleventy/markdownShortcode.js';

export function mdDirectives({ directives }) {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),

    setupEleventyPlugins: [
      addPlugin({ name: 'markdown-shortcode', plugin: markdownShortcodePlugin }),
    ],

    setupUnifiedPlugins: [
      addPlugin({ name: 'markdown-directives', plugin: markdownDirectives, location: 'top' }),
      adjustPluginOptions('markdown-directives', directives),
    ],

  };
}

export { markdownDirectives, markdownShortcodePlugin };

/** @typedef {import('./lib/types.src').Config} Config */
/** @typedef {import('./lib/types.src').Options} Options */
/** @typedef {import('./lib/types.src').TransformerResult} TransformerResult */
/** @typedef {import('./lib/types.src').TransformerOptions} TransformerOptions */
