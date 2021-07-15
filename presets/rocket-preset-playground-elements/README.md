# rocket-preset-playground-elements

Add tab elements for code blocks

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { playgroundElements } from 'rocket-preset-playground-elements';

export default {
  presets: [
    playgroundElements(),
  ]
}
```

### Options

| Option    | Type     | Description |
| --------- | -------- | ----------- |
| importMap | `object` | [Import Map config](https://github.com/PolymerLabs/playground-elements#module-resolution) for the playground |

## Usage

Now, to add interactive [playground-elements](https://github.com/PolymerLabs/playground-elements) to your page, add a playground directive with id and filename arguments

~~~markdown
```html playground my-playground index.html
<my-el>
  <p>This is the HTML</p>
</my-el>
<script type="module" src="my-el.js"></script>
```
~~~

Add more files to the playground with the `playground-file` and `playground-hidden-file` directives

~~~markdown
```css playground-hidden-file my-playground style.css
/* `style.css` is automatically added to the preview's head */
my-el { display: contents; }
```

```js playground-file my-playground my-el.js
customElements.define('my-el', class extends HTMLElement {/*...*/});
```
~~~

You must pass at least the `id` arg to the `playground(-*)` directives. See [markdown-directives](../markdown-directives/) for more information.

## API Docs


### `rocket-preset-playground-elements.js`:

#### Functions

| Name                 | Description | Parameters                  | Return                  |
| -------------------- | ----------- | --------------------------- | ----------------------- |
| `playgroundElements` |             | `{ importMap = undefined }` | `Partial<RocketPreset>` |

<hr/>

#### Exports

| Kind | Name                 | Declaration        | Module                               | Package |
| ---- | -------------------- | ------------------ | ------------------------------------ | ------- |
| `js` | `playgroundElements` | playgroundElements | rocket-preset-playground-elements.js |         |

### `components/docs-playground/docs-playground.ts`:

#### class: `DocsPlayground`

##### Superclass

| Name          | Module | Package |
| ------------- | ------ | ------- |
| `HTMLElement` |        |         |

##### Static Fields

| Name | Privacy | Type                | Default | Description | Inherited From |
| ---- | ------- | ------------------- | ------- | ----------- | -------------- |
| `is` |         | `'docs-playground'` |         |             |                |

##### Static Methods

| Name          | Privacy | Description | Parameters        | Return            | Inherited From |
| ------------- | ------- | ----------- | ----------------- | ----------------- | -------------- |
| `makePreview` |         |             | `content: string` | `string`          |                |
| `fetchScript` |         |             | `url: string`     | `Promise<string>` |                |

##### Fields

| Name            | Privacy | Type                | Default                                                       | Description | Inherited From |
| --------------- | ------- | ------------------- | ------------------------------------------------------------- | ----------- | -------------- |
| `playgroundIde` |         | `PlaygroundIde`     |                                                               |             |                |
| `button`        |         | `HTMLButtonElement` |                                                               |             |                |
| `file`          |         | `string`            |                                                               |             |                |
| `playgroundUrl` |         | `string`            | `'/_merged_assets/_static/playground-elements/playground.js'` |             |                |
| `show`          |         |                     |                                                               |             |                |

##### Methods

| Name               | Privacy | Description | Parameters                | Return                | Inherited From |
| ------------------ | ------- | ----------- | ------------------------- | --------------------- | -------------- |
| `$`                |         |             | `x: string`               | `HTMLElement \| null` |                |
| `init`             |         |             | `config: ProjectManifest` | `void`                |                |
| `importPlayground` |         |             |                           | `Promise<void>`       |                |
| `show`             |         |             |                           | `Promise<void>`       |                |
| `load`             |         |             |                           | `void`                |                |

##### Attributes

| Name             | Field | Inherited From |
| ---------------- | ----- | -------------- |
| `show`           |       |                |
| `playground-url` |       |                |

##### CSS Properties

| Name                                           | Default                                          | Description                               |
| ---------------------------------------------- | ------------------------------------------------ | ----------------------------------------- |
| `--playground-code-font-family`                | `monospace`                                      |                                           |
| `--playground-code-font-size`                  | `14px`                                           |                                           |
| `--playground-border`                          | `none`                                           |                                           |
| `--playground-ide-width`                       | `100%`                                           |                                           |
| `--playground-ide-height`                      | `100%`                                           |                                           |
| `--playground-snippet-border-radius`           | `6px`                                            |                                           |
| `--playground-snippet-border-color`            | `transparent`                                    |                                           |
| `--playground-snippet-button-background`       |                                                  |                                           |
| `--playground-snippet-outer-background-color`  | `white`                                          |                                           |
| `--playground-snippet-button-focus-color`      | `var(--code-button-focus-color)`                 |                                           |
| `--playground-snippet-button-focus-background` | `var(--code-button-focus-background)`            |                                           |
| `--code-button-active-color`                   |                                                  | button background when focused            |
| `--code-button-background`                     | `var(--markdown-table-row-odd-background-color)` | button background                         |
| `--code-button-color`                          | `inherit`                                        | button text color                         |
| `--code-button-focus-background`               | `var(--primary-lines-color)`                     | button background when focused            |
| `--code-button-focus-color`                    | `inherit`                                        | button text color when focused            |
| `--code-border-radius`                         | `6px`                                            | border radius for code-copy and code-tabs |

##### CSS Parts

| Name             | Description |
| ---------------- | ----------- |
| `button`         |             |
| `playground-ide` |             |

##### Slots

| Name     | Description |
| -------- | ----------- |
| `loader` |             |

<hr/>

#### Exports

| Kind                        | Name             | Declaration    | Module                                        | Package |
| --------------------------- | ---------------- | -------------- | --------------------------------------------- | ------- |
| `js`                        | `DocsPlayground` | DocsPlayground | components/docs-playground/docs-playground.ts |         |
| `custom-element-definition` |                  | DocsPlayground | components/docs-playground/docs-playground.ts |         |
