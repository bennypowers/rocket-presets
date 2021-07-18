# Code Tabs || 10

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

<style>
#b-copy {
  display: flex;
  min-height: 40px;
  justify-content: end;
  align-items: center;
}
</style>

<script type="module">
  const copy = document.getElementById('b-copy');
  copy.host = document.getElementById('elsewhere');
</script>
