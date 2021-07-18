# Code Tabs || 10

<style>
#b-copy {
  display: flex;
  min-height: 40px;
  justify-content: end;
  align-items: center;
}

#demos {
  --code-tabs-min-height: 505px;
}

#demos #default-tab {
  display: grid;
  grid-template-columns: min-content max-content;
  justify-content: center;
  height: var(--code-tabs-min-height);
  gap: 20px;
  align-items: center;
}

#demos #default-tab svg {
  fill: currentColor;
  width: 100px;
  transform: rotate(30deg);
}

#demos #default-tab p {
  font-size: 48px;
}

</style>

<script type="module">
  const copy = document.getElementById('b-copy');
  copy.host = document.getElementById('elsewhere');
</script>

## Defined Collections

<code-tabs collection="package-managers" default-tab="npm">

  ```bash tab npm
  npm i -S rocket-preset-code-tabs
  ```

  ```bash tab yarn
  yarn add rocket-preset-code-tabs
  ```

  ```bash tab pnpm
  pnpm i -S rocket-preset-code-tabs
  ```

</code-tabs>

### End Aligned

<code-tabs collection="package-managers" default-tab="npm" align="end">

  ```bash tab npm
  npm i -S rocket-preset-code-tabs
  ```

  ```bash tab yarn
  yarn add rocket-preset-code-tabs
  ```

  ```bash tab pnpm
  pnpm i -S rocket-preset-code-tabs
  ```

</code-tabs>

## Ad-hoc Tabs

<code-tabs default-tab="ad-hoc.md">

  ```md tab ad-hoc.md
  Ad hoc tabs don't need a collection name
  ```

  ```md tab no-icon.md
  They also don't have icons
  ```

</code-tabs>

# Default Content

<code-tabs id="demos" collection="frameworks">
  <article id="default-tab" slot="default">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.794 39.794">
      <path d="M32.901 39.794a3.32 3.32 0 01-1.933-.604L10.182 24.344l-6.001 6a.998.998 0 01-1.703-.622L.004 1.086A1 1 0 011.086.004l28.638 2.475a1 1 0 01.622 1.703l-6 6 14.847 20.786c.926 1.297.769 3.197-.359 4.325l-3.539 3.539c-.637.635-1.516.962-2.394.962zM10.075 22.038c.202 0 .406.061.581.186l21.475 15.339c.499.357 1.315.288 1.748-.146l3.539-3.539c.433-.434.501-1.25.146-1.749l-15.34-21.474a1 1 0 01.107-1.288l5.081-5.081L2.098 2.098l2.188 25.314 5.081-5.081a.999.999 0 01.708-.293z"/>
    </svg>
    <p>Click a tab to view the demo</p>
  </article>
  <code-tab no-copy
        data-id="angular"
        data-label="Angular"
        data-icon-href="{{ '/_assets/_static/brand-logos/angular.svg' | asset | url }}">
    <p>It's a demo for Angular</p>
  </code-tab>
  <code-tab no-copy
        data-id="preact"
        data-label="Preact"
        data-icon-href="{{ '/_assets/_static/brand-logos/preact.svg' | asset | url }}">
    <p>It's a demo for Preact</p>
  </code-tab>
  <code-tab no-copy
        data-id="svelte"
        data-label="Svelte"
        data-icon-href="{{ '/_assets/_static/brand-logos/svelte.svg' | asset | url }}">
    <p>It's a demo for Svelte</p>
  </code-tab>
  <code-tab no-copy
        data-id="react"
        data-label="React"
        data-icon-href="{{ '/_assets/_static/brand-logos/react.svg' | asset | url }}">
    <p>It's a demo for React</p>
  </code-tab>
  <code-tab no-copy
        data-id="vue"
        data-label="Vue"
        data-icon-href="{{ '/_assets/_static/brand-logos/vue.svg' | asset | url }}">
    <p>It's a demo for Vue</p>
  </code-tab>
</code-tabs>


## Code Copy

```html copy
A
```

<div id="elsewhere">

```html
B
```

</div>
<code-copy id="b-copy">Copy the above code</code-copy>
