/* eslint-env node */
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const root =
  join(dirname(new URL(import.meta.url).pathname), '../');

try {
  const header = readFileSync(join(root, '/README.head.md'));
  const manifest = JSON.parse(readFileSync(join(root, '/custom-elements.json'), 'utf8'));
  const markdown = customElementsManifestToMarkdown(manifest, { headingOffset: 1 });

  writeFileSync(join(root, '/README.md'), `${header}\n\n${markdown}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
