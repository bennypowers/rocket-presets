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

## Results

With JavaScript enabled, users will be able to pick their preferred 'flavour', which persists across page loads via local storage.

![Example showing interactive tab picker for "package-managers"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-code-tabs/example-js.png)

### `<noscript>`

Content is king! Users with JavaScript disabled get a gracefully degraded experience

![Example showing noninteractive listing of all tabs for "package-managers"](https://raw.githubusercontent.com/bennypowers/rocket-presets/main/presets/rocket-preset-code-tabs/example-noscript.png)

## Styling

Enjoy consistent site-wide theming by setting `--markdown-syntax-background-color` and `--markdown-table-row-odd-background-color`
