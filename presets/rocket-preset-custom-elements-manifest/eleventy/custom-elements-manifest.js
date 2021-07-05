import { prettyJson } from './prettyJson.js';
import { linkToTypes } from './linkToTypes.js';
import { trace } from '../lib/fp.js';
import {
  getAttributes,
  getCssParts,
  getCssProperties,
  getDeclaration,
  getEvents,
  getExports,
  getFields,
  getGitHubURL,
  getHeadings,
  getMethods,
  getPrivateFields,
  getPrivateMethods,
  getSlots,
  getTypeString,
  isPrivate,
  manifestModuleImports,
  nonContent,
  sortByProp,
  sortClassMembers,
  split,
} from './filters.js';

export function customElementsManifestPlugin(eleventyConfig, options) {
  eleventyConfig.addFilter('linkToTypes', linkToTypes(options));

  eleventyConfig.addFilter('prettyJson', prettyJson);
  eleventyConfig.addFilter('split', split);
  eleventyConfig.addFilter('trace', trace);

  eleventyConfig.addFilter('getGitHubURL', getGitHubURL);
  eleventyConfig.addFilter('getDeclaration', getDeclaration);

  eleventyConfig.addFilter('getAttributes', getAttributes);
  eleventyConfig.addFilter('getCssParts', getCssParts);
  eleventyConfig.addFilter('getCssProperties', getCssProperties);
  eleventyConfig.addFilter('getEvents', getEvents);
  eleventyConfig.addFilter('getExports', getExports);
  eleventyConfig.addFilter('getFields', getFields);
  eleventyConfig.addFilter('getMethods', getMethods);
  eleventyConfig.addFilter('getPrivateFields', getPrivateFields);
  eleventyConfig.addFilter('getPrivateMethods', getPrivateMethods);
  eleventyConfig.addFilter('getSlots', getSlots);

  eleventyConfig.addFilter('getTypeString', getTypeString);
  eleventyConfig.addFilter('getHeadings', getHeadings);

  eleventyConfig.addFilter('sortByProp', sortByProp);
  eleventyConfig.addFilter('sortClassMembers', sortClassMembers);

  eleventyConfig.addFilter('isPrivate', isPrivate);

  eleventyConfig.addFilter('nonContent', nonContent);

  eleventyConfig.addPlugin(manifestModuleImports, options.imports);
}
