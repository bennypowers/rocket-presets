# rocket-preset-custom-elements-manifest

Documents code generation for JavaScript libraries, particularly custom elements.

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { customElementsManifest } from 'rocket-preset-custom-elements-manifest';

export default {
  presets: [
    customElementsManifest()
  ]
}
```

### Options

| Option          | Type      | Description | Default |
| --------------- | --------- | ----------- | ------- |
| typeLinks       | `object`  | Object mapping from type name to URL | |
| typeLinksNewTab | `boolean` | Whether to open type links in a new tab | |
| root            | `string`  | Absolute path to glob from | The path above the `node_modules` dir the preset is in |
| package         | `string`  | relative path (with or without leading `./`) to a single package.json file. Takes precedence over `packages` | |
| packages        | `string`  | glob pattern for multiple package.json files | `'packages/*/package.json'` |
| imports         | `object`  | Options for rendering imports | `{ keepExtension: false }` |

## Usage

Because every package is different, this preset does not _create_ docs pages for you, but it does _fill_ the docs pages you create with API documentation.

### Documenting packages

API pages document package indexes or their modules. To add a page to your documentation, create a markdown file with the `layout-api` or `layou-api-index` layout, a `package` field, and a `module` or `modules` field

`docs/api/my/index.md`

~~~markdown
---
layout: layout-api-index
package: '@my/custom-element'
module: index.js
---

# Custom Elements Manifest

This page documents the `index.js` file in `@my/custom-element`
~~~

`docs/api/my/custom-element/index.md`

~~~markdown
---
layout: layout-api
package: '@my/custom-element'
module: custom-element.js
---

# Custom Elements Manifest >> custom-element

This page documents the `custom-element.js` file in `@my/custom-element`
~~~

### Type Links
If your custom-elements manifest contains type information, and you'd like to link particular types to other pages, pass the `typeLinks` option to the preset. All instances of the keys of the passed object found in type strings will get wrapped in links to the value for that key. For example, to link `HTMLElement` to MDN and `WickedGoodBaseClass` to a local docs page, and to have those links open in a new tab, use the following config:

```js
import { customElementsManifest } from 'rocket-preset-custom-elements-manifest';

export default {
  presets: [
    customElementsManifest({
      typeLinksNewTab: true,
      typeLinks: {
        HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement',
        WickedGoodBaseClass: '/api/lib/base-class/',
      }
    })
  ]
}
```

## Results

With JavaScript enabled, users will be able to pick their preferred 'flavour', which persists across page loads via local storage.

![Example showing docs for "custom-element"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-custom-elements-manifest/custom-elements-manifest-module.png)

### `<noscript>`

Content is king! Users with JavaScript disabled get a gracefully degraded experience

![Example showing noscript docs for "custom-element"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-custom-elements-manifest/custom-elements-manifest-module-noscript.png)

## Styling

Enjoy consistent site-wide theming by setting `--markdown-syntax-background-color` and `--markdown-table-row-odd-background-color`

## API Docs


### `custom-elements-manifest.js`:

#### Functions

| Name                     | Description | Parameters                      | Return                  |
| ------------------------ | ----------- | ------------------------------- | ----------------------- |
| `customElementsManifest` |             | `options: Options & CEMOptions` | `Partial<RocketPreset>` |

<hr/>

#### Exports

| Kind | Name                     | Declaration            | Module                      | Package |
| ---- | ------------------------ | ---------------------- | --------------------------- | ------- |
| `js` | `customElementsManifest` | customElementsManifest | custom-elements-manifest.js |         |

### `eleventy/custom-elements-manifest.js`:

#### Functions

| Name                           | Description | Parameters                               | Return |
| ------------------------------ | ----------- | ---------------------------------------- | ------ |
| `customElementsManifestPlugin` |             | `eleventyConfig: *, options: CEMOptions` |        |

<hr/>

#### Exports

| Kind | Name                           | Declaration                  | Module                               | Package |
| ---- | ------------------------------ | ---------------------------- | ------------------------------------ | ------- |
| `js` | `customElementsManifestPlugin` | customElementsManifestPlugin | eleventy/custom-elements-manifest.js |         |

### `eleventy/filters.js`:

#### Variables

| Name                | Description | Type |
| ------------------- | ----------- | ---- |
| `getAllFields`      |             |      |
| `getAllMethods`     |             |      |
| `getFields`         |             |      |
| `getMethods`        |             |      |
| `getPrivateFields`  |             |      |
| `getPrivateMethods` |             |      |

<hr/>

#### Functions

| Name                    | Description                                                | Parameters                                          | Return                   |
| ----------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| `isPrivate`             |                                                            | `x`                                                 |                          |
| `split`                 |                                                            | `x, d`                                              |                          |
| `filterMembersBy`       |                                                            | `p`                                                 |                          |
| `getDeclaration`        |                                                            | `moduleData, declaration`                           |                          |
| `getExports`            |                                                            | `m`                                                 |                          |
| `getAttributes`         |                                                            | `declaration`                                       |                          |
| `getCssProperties`      |                                                            | `declaration`                                       |                          |
| `getCssParts`           |                                                            | `declaration`                                       |                          |
| `getSlots`              |                                                            | `declaration`                                       |                          |
| `getEvents`             |                                                            | `declaration`                                       |                          |
| `getGitHubURL`          |                                                            | `{ repository: { url = '', directory = '' } = {} }` |                          |
| `getHeadings`           |                                                            | `module`                                            |                          |
| `sortByProp`            |                                                            | `list, prop`                                        |                          |
| `sortClassMembers`      | Sort a list of custom-element.json `ClassMember`s          | `list: ClassMember[]`                               | `ClassMember[]`          |
| `nonContent`            | Get the non-content blocks from a _joiningBlocks directory | `blocks: Record<string, string>`                    | `Record<string, string>` |
| `manifestModuleImports` |                                                            | `eleventyConfig, configOptions`                     |                          |
| `getTypeString`         |                                                            | `input: string\|Type`                               | `string`                 |

<hr/>

#### Exports

| Kind | Name                    | Declaration           | Module              | Package |
| ---- | ----------------------- | --------------------- | ------------------- | ------- |
| `js` | `isPrivate`             | isPrivate             | eleventy/filters.js |         |
| `js` | `split`                 | split                 | eleventy/filters.js |         |
| `js` | `filterMembersBy`       | filterMembersBy       | eleventy/filters.js |         |
| `js` | `getDeclaration`        | getDeclaration        | eleventy/filters.js |         |
| `js` | `getAllFields`          | getAllFields          | eleventy/filters.js |         |
| `js` | `getAllMethods`         | getAllMethods         | eleventy/filters.js |         |
| `js` | `getFields`             | getFields             | eleventy/filters.js |         |
| `js` | `getMethods`            | getMethods            | eleventy/filters.js |         |
| `js` | `getPrivateFields`      | getPrivateFields      | eleventy/filters.js |         |
| `js` | `getPrivateMethods`     | getPrivateMethods     | eleventy/filters.js |         |
| `js` | `getExports`            | getExports            | eleventy/filters.js |         |
| `js` | `getAttributes`         | getAttributes         | eleventy/filters.js |         |
| `js` | `getCssProperties`      | getCssProperties      | eleventy/filters.js |         |
| `js` | `getCssParts`           | getCssParts           | eleventy/filters.js |         |
| `js` | `getSlots`              | getSlots              | eleventy/filters.js |         |
| `js` | `getEvents`             | getEvents             | eleventy/filters.js |         |
| `js` | `getGitHubURL`          | getGitHubURL          | eleventy/filters.js |         |
| `js` | `getHeadings`           | getHeadings           | eleventy/filters.js |         |
| `js` | `sortByProp`            | sortByProp            | eleventy/filters.js |         |
| `js` | `sortClassMembers`      | sortClassMembers      | eleventy/filters.js |         |
| `js` | `nonContent`            | nonContent            | eleventy/filters.js |         |
| `js` | `manifestModuleImports` | manifestModuleImports | eleventy/filters.js |         |
| `js` | `getTypeString`         | getTypeString         | eleventy/filters.js |         |

### `eleventy/linkToTypes.js`:

#### Functions

| Name          | Description | Parameters | Return |
| ------------- | ----------- | ---------- | ------ |
| `linkToTypes` |             | `options`  |        |

<hr/>

#### Exports

| Kind | Name          | Declaration | Module                  | Package |
| ---- | ------------- | ----------- | ----------------------- | ------- |
| `js` | `linkToTypes` | linkToTypes | eleventy/linkToTypes.js |         |

### `eleventy/prettyJson.js`:

#### Functions

| Name         | Description | Parameters | Return |
| ------------ | ----------- | ---------- | ------ |
| `prettyJson` |             | `content`  |        |

<hr/>

#### Exports

| Kind | Name         | Declaration | Module                 | Package |
| ---- | ------------ | ----------- | ---------------------- | ------- |
| `js` | `prettyJson` | prettyJson  | eleventy/prettyJson.js |         |

### `components/css-value-doc/css-value-doc.ts`:

#### class: `CssValueDoc`

##### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

##### Static Fields

| Name     | Privacy | Type    | Default   | Description | Inherited From |
| -------- | ------- | ------- | --------- | ----------- | -------------- |
| `styles` |         | `array` | `[style]` |             |                |

##### Fields

| Name        | Privacy | Type      | Default                                         | Description | Inherited From |
| ----------- | ------- | --------- | ----------------------------------------------- | ----------- | -------------- |
| `emptyBody` |         | `boolean` | `false`                                         |             |                |
| `color`     |         | `string`  |                                                 |             |                |
| `mo`        |         |           | `new MutationObserver(() => this.onMutation())` |             |                |

##### Methods

| Name         | Privacy | Description | Parameters | Return           | Inherited From |
| ------------ | ------- | ----------- | ---------- | ---------------- | -------------- |
| `render`     |         |             |            | `TemplateResult` |                |
| `onMutation` |         |             |            | `void`           |                |

<hr/>

#### Exports

| Kind | Name          | Declaration | Module                                    | Package |
| ---- | ------------- | ----------- | ----------------------------------------- | ------- |
| `js` | `CssValueDoc` | CssValueDoc | components/css-value-doc/css-value-doc.ts |         |

### `components/type-doc/type-doc.ts`:

#### class: `TypeDoc`

##### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

##### Static Fields

| Name     | Privacy | Type    | Default   | Description | Inherited From |
| -------- | ------- | ------- | --------- | ----------- | -------------- |
| `styles` |         | `array` | `[style]` |             |                |

##### Fields

| Name        | Privacy | Type      | Default | Description | Inherited From |
| ----------- | ------- | --------- | ------- | ----------- | -------------- |
| `expanded`  |         | `boolean` | `false` |             |                |
| `emptyBody` |         | `boolean` | `false` |             |                |

##### Methods

| Name           | Privacy | Description | Parameters | Return           | Inherited From |
| -------------- | ------- | ----------- | ---------- | ---------------- | -------------- |
| `render`       |         |             |            | `TemplateResult` |                |
| `firstUpdated` |         |             |            | `void`           |                |

##### CSS Properties

| Name                            | Default                                                   | Description                            |
| ------------------------------- | --------------------------------------------------------- | -------------------------------------- |
| `--type-doc-header-background`  | `var(--markdown-table-row-odd-background-color, #f6f8fa)` | background colour for type doc headers |
| `--type-doc-background`         | `var(--markdown-syntax-background-color)`                 | type doc body background               |
| `--type-doc-header-font-family` |                                                           | font family for headers                |

<details><summary>Private API</summary>

##### Methods

| Name              | Privacy | Description | Parameters | Return | Inherited From |
| ----------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `cloneHeading`    | private |             |            |        |                |
| `toggleInherited` | private |             |            |        |                |

</details>

<hr/>

#### Exports

| Kind | Name      | Declaration | Module                          | Package |
| ---- | --------- | ----------- | ------------------------------- | ------- |
| `js` | `TypeDoc` | TypeDoc     | components/type-doc/type-doc.ts |         |
