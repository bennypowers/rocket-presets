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

| Name               | Description | Parameters                  | Return                  |
| ------------------ | ----------- | --------------------------- | ----------------------- |
| playgroundElements |             | `{ importMap = undefined }` | `Partial<RocketPreset>` |

<hr/>

#### Exports

| Kind | Name               | Declaration        | Module                               | Package |
| ---- | ------------------ | ------------------ | ------------------------------------ | ------- |
| js   | playgroundElements | playgroundElements | rocket-preset-playground-elements.js |         |

### `components/docs-playground/docs-playground.ts`:

#### class: `DocsPlayground`

##### Superclass

| Name        | Module | Package |
| ----------- | ------ | ------- |
| HTMLElement |        |         |

##### Fields

| Name          | Privacy | Type                | Default                                                       | Description | Inherited From |
| ------------- | ------- | ------------------- | ------------------------------------------------------------- | ----------- | -------------- |
| is            |         | `'docs-playground'` |                                                               |             |                |
| playgroundIde |         | `PlaygroundIde`     |                                                               |             |                |
| button        |         | `HTMLButtonElement` |                                                               |             |                |
| file          |         | `string`            |                                                               |             |                |
| playgroundUrl |         | `string`            | `'/_merged_assets/_static/playground-elements/playground.js'` |             |                |
| show          |         |                     |                                                               |             |                |

##### Methods

| Name             | Privacy | Description | Parameters                | Return                | Inherited From |
| ---------------- | ------- | ----------- | ------------------------- | --------------------- | -------------- |
| makePreview      |         |             | `content: string`         | `string`              |                |
| $                |         |             | `x: string`               | `HTMLElement \| null` |                |
| fetchScript      |         |             | `url: string`             | `Promise<string>`     |                |
| init             |         |             | `config: ProjectManifest` | `void`                |                |
| importPlayground |         |             |                           | `Promise<void>`       |                |
| show             |         |             |                           | `Promise<void>`       |                |
| load             |         |             |                           | `void`                |                |

##### Attributes

| Name           | Field | Inherited From |
| -------------- | ----- | -------------- |
| show           |       |                |
| playground-url |       |                |

<hr/>

#### Exports

| Kind                      | Name           | Declaration    | Module                                        | Package |
| ------------------------- | -------------- | -------------- | --------------------------------------------- | ------- |
| js                        | DocsPlayground | DocsPlayground | components/docs-playground/docs-playground.ts |         |
| custom-element-definition |                | DocsPlayground | components/docs-playground/docs-playground.ts |         |
