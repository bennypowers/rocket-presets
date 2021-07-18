# Playground Elements || 30

```html playground testplayground index.html
<boop-snoot></boop-snoot>
<script src="boop-snoot.js"></script>
```

```js playground-file testplayground boop-snoot.js
customElements.define('boop-snoot', class BoopSnoot extends HTMLElement {
  constructor() {
    super().attachShadow({ mode: 'open' }).innerHTML = `
      <style>:host { background: hotpink; font-size: 36px; }</style>
      <i>🐶</i>
    `;
  }
});
```
