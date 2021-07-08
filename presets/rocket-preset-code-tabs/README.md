# rocket-preset-code-tabs

Add tab elements for code blocks

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { codeTabs } from 'rocket-preset-code-tabs';

export default {
  presets: [
    codeTabs({
      collections: {
        packageManagers: {
          npm: { label: 'NPM', iconHref: '/_merged_assets/brand-logos/npm.svg' },
          yarn: { label: 'Yarn', iconHref: '/_merged_assets/brand-logos/yarn.svg' },
          pnpm: { label: 'PNPM', iconHref: '/_merged_assets/brand-logos/pnpm.svg' },
        },
      }
    })
  ]
}
```

## Usage

Now, to add a tab switcher to a page, write code blocks with the `tab ${id}` directive, and wrap the set of tabs in a `<code-tabs collection="package-managers" default-tab="npm">` element. You can indent the code blocks by one two spaces, but no more.

~~~markdown
<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S rocket-preset-code-tabs
  ```

  ```bash tab yarn
  yarn add rocket-preset-code-tabs
  ```

  ```bash tab pnpm
  pnpm add rocket-preset-code-tabs
  ```

</code-tabs>
~~~

### Ad-Hoc Tabs

If you omit the `collection` attribute, you can create an ad-hoc tab group by passing the tab name as the first argument to the tab directive

~~~markdown
<code-tabs default-tab="my-element.js">

  ```js tab my-element.js
  class MyElement extends HTMLElement {
    static is = 'my-element';
  }

  customElements.define(MyElement.is, MyElement);
  ```

  ```json tab custom-elements.json
  {
    "schemaVersion": "1.0.0",
    "readme": "",
    "modules": [
      {
        "kind": "javascript-module",
        "path": "my-element.js",
        "declarations": [
          {
            "kind": "class",
            "description": "",
            "name": "MyElement",
            "tagName": "my-element",
            "members": [
              {
                "kind": "field",
                "name": "is",
                "default": "'my-element'",
                "static": true
              }
            ],
            "superclass": {
              "name": "HTMLElement"
            }
          }
        ]
      }
    ]
  }

  ```

</code-tabs>
~~~
## Results

With JavaScript enabled, users will be able to pick their preferred 'flavour', which persists across page loads via local storage.

![Example showing interactive tab picker for "package-managers"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-code-tabs/example-js.png)

### `<noscript>`

Content is king! Users with JavaScript disabled get a gracefully degraded experience

![Example showing noninteractive listing of all tabs for "package-managers"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-code-tabs/example-noscript.png)

## Styling

Enjoy consistent site-wide theming by setting `--markdown-syntax-background-color` and `--markdown-table-row-odd-background-color`


# `rocket-preset-code-tabs.js`:

## Functions
      
  | name | description | parameters | return |
  |------|-------------|------------|--------|
  |codeTabs |Set up code tabs rocket preset |options CodeTabsOptions |RocketPreset |
<hr/>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |codeTabs |codeTabs | rocket-preset-code-tabs.js |  |[object Object] | | |
# `components/code-copy.ts`:

## class: `CodeCopy` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | |lit |


### Fields

| name | privacy | type | default | description | inheritedFrom |
|------|---------|------|---------|-------------|---------------|
|is | |`string` |`'code-copy'` | | | |
|styles | |`array` |`[ButtonStyles, CopyStyles]` | | | |
|copyButtonText | |`string` |`'Copy'` | | | |


### Methods

| name | privacy | description | parameters | return | inheritedFrom |
|------|---------|-------------|------------|--------|---------------|
|render | | | |TemplateResult | | |
|onCopy | | | |Promise<void> | | |


<hr></hr>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |CodeCopy |CodeCopy | components/code-copy.ts |  |[object Object] | | |
# `components/code-tabs.ts`:

## class: `CodeTabs` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | |lit |


### Mixins

| name | module    | package |
|------|-----------|---------|
|SelectMixin | |@pwrs/mixins/select/select-mixin |


### Fields

| name | privacy | type | default | description | inheritedFrom |
|------|---------|------|---------|-------------|---------------|
|allowedChildren | |`array` |`['code-tab']` | | | |
|styles | |`array` |`[ButtonStyles, TabsStyles]` | | | |
|labels |private | |`new Map<string, Tab>()` | | | |
|tabs | |`NodeListOf<HTMLButtonElement>` | |The tab buttons. | | |
|defaultTab | |`string` | |Which tab name to treat as default, in case the use has not yet made a selection. | | |
|collection | |`string` | |Which tab collection to use. | | |
|initialSelectedIndex |protected |`number` |`0` | | | |
|onClickTab | | | | | | |


### Methods

| name | privacy | description | parameters | return | inheritedFrom |
|------|---------|-------------|------------|--------|---------------|
|firstUpdated | | |changed PropertyValues<this> |Promise<void> | | |
|updated | | |changed PropertyValues<this> |void | | |
|getInitialSelectedIndex |protected | | |Promise<number> | | |
|initCollection |private | | | | | |
|render | | | |TemplateResult | | |
|selectId |public | |idToSelect string |void | | |
|onSelect |private | | |void | | |
|onClickTab |private | |event Event & { target: HTMLButtonElement } | | | |
|getLabel |private | |tag string | | | |
|initLabels |protected | |event Event |void | | |


### CSS Properties

| name | description |
|------|-----------|
|--code-tabs-icon-height |size of the tab icon |
|--code-tabs-tabs-background |background for the tablist |
|--code-tabs-justify-tabs |flex justification for tab buttons |
|--code-tabs-background |content and selected button background |
|--code-tabs-tabpanel-background |tabpanel background |
|--code-tabs-min-height |tabpanel minimum height |
|--code-tabs-selected-highlight-color |color for selected tab highlight |


<hr></hr>

## class: `CodeTab` 
  
  ### Superclass
  
  | name | module | package |
  |------|--------|---------|
  |LitElement | |lit |


### Fields

| name | privacy | type | default | description | inheritedFrom |
|------|---------|------|---------|-------------|---------------|
|styles | |`array` |`[TabStyles]` | | | |
|tab | |`string` | | | | |
|noCopy | |`boolean` |`false` | | | |


### Methods

| name | privacy | description | parameters | return | inheritedFrom |
|------|---------|-------------|------------|--------|---------------|
|render | | | |TemplateResult | | |


<hr></hr>
  
## Exports

| kind | name      | declaration | module | package |
|------|-----------|-------------|--------|---------|
|js |CodeTabs |CodeTabs | components/code-tabs.ts |  |[object Object] | | |
|js |CodeTab |CodeTab | components/code-tabs.ts |  |[object Object] | | |
