# rocket-preset-webcomponents-dev

Add tab elements for code blocks

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { webcomponentsDev } from 'rocket-preset-webcomponents-dev';

export default {
  presets: [
    webcomponentsDev(),
  ]
}
```

## Usage

Now, to add an interactive [webcomponents.dev](https://webcomponents.dev) demo to your page, use the `wcd` shortcode.

```markdown
{% wcd 'ZCUsvyx06Au5j0yZzgG7', 'src/index.js' %}
```

To customize the preview code block, use the `wcd` markdown directive instead.

~~~markdown
```js wcd ZCUsvyx06Au5j0yZzgG7 src/index.js
const template = document.createElement('template');
template.innerHTML = `...`;
class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.getElementById('inc').onclick = () => this.inc();
    this.shadowRoot.getElementById('dec').onclick = () => this.dec();
    this.update(this.count);
  }

  inc() {
    this.update(++this.count);
  }

  dec() {
    this.update(--this.count);
  }

  update(count) {
    this.shadowRoot.getElementById('count').innerHTML = count;
  }
}

customElements.define('my-counter', MyCounter);
```
~~~

## API Docs


### `rocket-preset-webcomponents-dev.js`:

#### Functions

| Name             | Description | Parameters | Return |
| ---------------- | ----------- | ---------- | ------ |
| webcomponentsDev |             |            |        |

<hr/>

#### Exports

| Kind | Name             | Declaration      | Module                             | Package |
| ---- | ---------------- | ---------------- | ---------------------------------- | ------- |
| js   | webcomponentsDev | webcomponentsDev | rocket-preset-webcomponents-dev.js |         |

### `eleventy/wcdShortcode.js`:

#### Functions

| Name               | Description | Parameters       | Return |
| ------------------ | ----------- | ---------------- | ------ |
| wcdShortcodePlugin |             | `eleventyConfig` |        |

<hr/>

#### Exports

| Kind | Name               | Declaration        | Module                   | Package |
| ---- | ------------------ | ------------------ | ------------------------ | ------- |
| js   | wcdShortcodePlugin | wcdShortcodePlugin | eleventy/wcdShortcode.js |         |

### `components/wcd-snippet/wcd-snippet.ts`:

#### class: `WcdSnippet`, `wcd-snippet`

##### Superclass

| Name        | Module | Package |
| ----------- | ------ | ------- |
| HTMLElement |        |         |

##### Fields

| Name   | Privacy | Type                | Default                                   | Description | Inherited From |
| ------ | ------- | ------------------- | ----------------------------------------- | ----------- | -------------- |
| iframe |         | `HTMLIFrameElement` | `this.shadowRoot.querySelector('iframe')` |             |                |
| button |         | `HTMLButtonElement` | `this.shadowRoot.querySelector('button')` |             |                |
| url    |         | `URL`               |                                           |             |                |
| show   |         |                     |                                           |             |                |

##### Methods

| Name | Privacy | Description | Parameters | Return | Inherited From |
| ---- | ------- | ----------- | ---------- | ------ | -------------- |
| show |         |             |            | `void` |                |
| load |         |             |            | `void` |                |

##### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| live    |       |                |
| data-id |       |                |
| file    |       |                |

<hr/>

#### Exports

| Kind                      | Name        | Declaration | Module                                | Package |
| ------------------------- | ----------- | ----------- | ------------------------------------- | ------- |
| js                        | WcdSnippet  | WcdSnippet  | components/wcd-snippet/wcd-snippet.ts |         |
| custom-element-definition | wcd-snippet | WcdSnippet  | components/wcd-snippet/wcd-snippet.ts |         |
