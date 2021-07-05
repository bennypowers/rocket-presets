import { propIs } from './fp.js';

const pathIs = propIs('path');

export const isPrivate = x =>
  x.privacy === 'protected' || x.privacy === 'private';

export const filterMembersBy = p => declaration =>
  (declaration?.members ?? []).filter(p);

export const getModule = (manifest, path) => {
  if (!manifest)
    return undefined;
  if (typeof manifest === 'string')
    manifest = JSON.parse(manifest);

  return (manifest.modules ?? []).find(pathIs(path));
};
