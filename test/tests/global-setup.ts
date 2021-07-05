import type { AddressInfo } from 'net';

import { createServer } from 'http';
import { createReadStream } from 'fs';
import { join, resolve } from 'path';
import { URL } from 'url';
import { lookup } from 'mime-types';

const root = resolve(__dirname, '..', '_site');

export default async function globalSetup(): Promise<() => Promise<void>> {
  const server = createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://whate.er');
    const filepath = join(root, pathname.endsWith('/') ? `${pathname}index.html` : pathname);
    res.writeHead(200, { 'content-type': lookup(filepath) });
    createReadStream(filepath).pipe(res);
  });

  await new Promise(done => server.listen(done));

  process.env.SERVER_PORT = String((server.address() as AddressInfo).port);

  return async () => {
    await new Promise(done => server.close(done));
  };
}
