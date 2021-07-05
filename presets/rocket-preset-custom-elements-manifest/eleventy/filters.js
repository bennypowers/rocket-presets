import githubUrl from 'get-github-url';

import { join } from 'path';
import { and, compose, isLengthy, not, propIs } from '../lib/fp.js';

/** @typedef {import('custom-elements-manifest/schema').Module} Module */
/** @typedef {import('custom-elements-manifest/schema').ClassMember} ClassMember */
/** @typedef {import('custom-elements-manifest/schema').Declaration} Declaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionDeclaration} FunctionDeclaration */
/** @typedef {import('custom-elements-manifest/schema').FunctionLike} FunctionLike */
/** @typedef {import('custom-elements-manifest/schema').ClassDeclaration} ClassDeclaration */
/** @typedef {import('custom-elements-manifest/schema').ClassMethod} ClassMethod */
/** @typedef {import('custom-elements-manifest/schema').Parameter} Parameter */
/** @typedef {import('custom-elements-manifest/schema').Type} Type */

const isMixin = d => d.kind === 'mixin';

const kindIs = propIs('kind');

const nameIs = propIs('name');

export const isPrivate = x =>
  x.privacy === 'protected' || x.privacy === 'private';

export const split = (x, d) => !x ? '' : x.split(d ?? ' ');

export const filterMembersBy = p => declaration =>
  (declaration?.members ?? []).filter(p);

export const getDeclaration = (moduleData, declaration) =>
  (moduleData?.declarations ?? []).find(nameIs(declaration));

export const getAllFields = filterMembersBy(kindIs('field'));

export const getAllMethods = filterMembersBy(kindIs('method'));

export const getFields = filterMembersBy(and(kindIs('field'), not(isPrivate)));

export const getMethods = filterMembersBy(and(kindIs('method'), not(isPrivate)));

export const getPrivateFields = filterMembersBy(and(kindIs('field'), isPrivate));

export const getPrivateMethods = filterMembersBy(and(kindIs('method'), isPrivate));

export const getExports = m => m.exports;

export const getAttributes = declaration =>
  (declaration?.attributes ?? []).filter(attribute =>
    !getAllFields(declaration).some(f =>
      f.name === attribute.fieldName));

export const getCssProperties = declaration =>
  declaration?.cssProperties ?? [];

export const getCssParts = declaration =>
  declaration?.cssParts ?? [];

export const getSlots = declaration =>
  declaration?.slots ?? [];

export const getEvents = declaration =>
  declaration?.events ?? [];

export const getGitHubURL = ({ repository: { url = '', directory = '' } = {} } = {}) =>
  !url ? '' : `${githubUrl(url)}${directory ? `/tree/master/${directory}` : ''}`;

export function getHeadings(module) {
  const { exports = [], declarations = [] } = module ?? {};
  return Object.entries({
    'Exports': exports.length,
    'Signature': declarations.some(isMixin),
    'Properties': declarations.some(compose(isLengthy, getFields)),
    'Attributes': declarations.some(compose(isLengthy, getAttributes)),
    'Methods': declarations.some(compose(isLengthy, getMethods)),
    'Slots': declarations.some(compose(isLengthy, getSlots)),
    'CSS Custom Properties': declarations.some(compose(isLengthy, getCssProperties)),
    'CSS Shadow Parts': declarations.some(compose(isLengthy, getCssParts)),
    'Events': declarations.some(compose(isLengthy, getEvents)),
  }).filter(([, v]) => !!v).map(([k]) => k);
}

export function sortByProp(list = [], prop = '') {
  return list.sort((a, b) => (a[prop] ?? '').localeCompare((b[prop] ?? '')));
}

/**
 * Sort a list of custom-element.json `ClassMember`s
 * @param  {import("custom-elements-manifest/schema").ClassMember[]}  [list=[]]
 * @return {import("custom-elements-manifest/schema").ClassMember[]}
 */
export function sortClassMembers(list = []) {
  return sortByProp(list, 'name')
    .sort((a, b) => (a.inheritedFrom && b.inheritedFrom) ? 0 : a.inheritedFrom ? 1 : -1)
    .sort((a, b) => (a.static && b.static) ? 0 : a.static ? -1 : 1);
}

/**
 * Get the non-content blocks from a _joiningBlocks directory
 * @param  {Record<string, string>} blocks Object with keys blockname (file name) and values block include path
 * @return {Record<string, string>} blocks Object with keys blockname (file name) and values block include path
 */
export function nonContent(blocks) {
  return Object.fromEntries(Object.entries(blocks).filter(([k]) => k !== '10-content.njk'));
}

export function manifestModuleImports(eleventyConfig, configOptions) {
  eleventyConfig.addFilter('manifestModuleImports', function(moduleData, callSiteOpts = {}) {
    if (!moduleData) return '';

    const { path, exports } = moduleData;

    const {
      packageName = '',
      keepExtension = false,
      max = 100,
    } = { ...configOptions, ...callSiteOpts };

    const resolved = !packageName ? path : join(packageName, path);
    const names = exports.filter(x=> x.kind === 'js').map(x => x.name);
    const sideEffects = exports.filter(x => x.kind === 'custom-element-definition');

    const specifier = (
        keepExtension ? resolved
      : resolved.replace(/\.(\w+)$/, '').replace(/\/index(\.\w+)?$/, '')
    );

    const namedOneLiner = (names.length ? `import { ${names.join(', ')} } from '${specifier}';` : '');

    const sideEffectImports = (sideEffects.length && `import '${specifier}';`);

    const namedImports = (namedOneLiner && namedOneLiner.length <= max) ? namedOneLiner
      : namedOneLiner
        .replace(/{ /, '{\n  ')
        .replace(/(\w), (\w)/g, '$1,\n  $2')
        .replace(/ }/, '\n}')
        .replace(', }', ' }');

    return [sideEffectImports, namedImports].filter(Boolean).join('\n');
  });
}

/**
 * @param  {string|Type} stringOrTypeDescriptor
 * @return {string}
 */
export function getTypeString(stringOrTypeDescriptor) {
  if (!stringOrTypeDescriptor) return '';
  return typeof stringOrTypeDescriptor === 'string' ? stringOrTypeDescriptor
  : stringOrTypeDescriptor.text ?? '';
}
