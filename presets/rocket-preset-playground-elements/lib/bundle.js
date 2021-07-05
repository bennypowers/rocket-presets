import esbuild from 'esbuild';
import chalk from 'chalk';
import hirestime from 'hirestime';

import { replace } from '@pwrs/esbuild-plugin-replace';
import { readFileSync } from 'fs';
import { copySync } from 'cpx';
import { join } from 'path';
import { createRequire } from 'module';

let shouldBundlePlayground = true;

export async function bundle({ path, importMap }) {
  console.log(chalk.yellow`[playground-elements] ${chalk.blue`Building ${chalk.bold`<docs-playground>`}${shouldBundlePlayground ? ` and ${chalk.bold`<playground-ide>`}` : ''}...`}`);
  const componentsDir = join(path, 'components', 'docs-playground');

  const ESBUILD_BUNDLED_PLAYGROUND_HTML =
    readFileSync(join(componentsDir, 'docs-playground.html'), 'utf8');

  const ESBUILD_BUNDLED_PLAYGROUND_PREVIEW =
    readFileSync(join(componentsDir, 'playground-preview.html'), 'utf8');

  const time = hirestime.default();

  await esbuild.build({
    bundle: true,
    minify: process.env.ELEVENTY_ENV === 'production',
    sourcemap: true,
    format: 'esm',
    target: 'es2020',
    outdir: 'docs/_merged_assets/_static/playground-elements',
    plugins: [
      replace({
        include: /docs-playground\.ts$/,
        ESBUILD_BUNDLED_IMPORT_MAP: JSON.stringify(importMap ?? {}),
        ESBUILD_BUNDLED_PLAYGROUND_HTML,
        ESBUILD_BUNDLED_PLAYGROUND_PREVIEW,
      }),
    ],
    entryPoints: {
      'docs-playground': join(componentsDir, 'docs-playground.ts'),
      ...shouldBundlePlayground && {
        'playground': 'playground-elements',
      },
    },
  }).catch(() => process.exit(1));

  shouldBundlePlayground = null;

  const require = createRequire(import.meta.url);
  const OUT = 'docs/_merged_assets/_static/playground-elements/';
  copySync(require.resolve('playground-elements/playground-service-worker-proxy.html'), OUT);
  copySync(require.resolve('playground-elements/playground-service-worker.js'), OUT);
  copySync(require.resolve('playground-elements/playground-typescript-worker.js'), OUT);

  console.log(chalk.yellow`[playground-elements] ${chalk.green`Done in ${time.seconds()}s`}`);
}
