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
