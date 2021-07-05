# rocket-preset-slide-decks

Slide Decks in HTML and Markdown for Rocket. Uses [slidem](https://github.com/ruphin/slidem) web components.

## Configuration

Add the preset to your `rocket.config.js`, and configure it with a collections object. `collections` is a record of collection names to tab types. For example, if you want code tabs which switch between install commands for `npm`, `yarn`, and `pnpm`, add the following:

```js
import { slideDecks } from 'rocket-preset-slide-decks';

export default {
  presets: [
    slideDecks(),
  ]
}
```

## Usage

Add an `index.md` page with the `layout-deck` layout

`docs/decks/example-deck/index.md`

~~~markdown
---
layout: layout-deck
title: Test
---
~~~

Add more files in the `slides` subdir, and a `slides.json` to that same dir (**IMPORTANT**!)

`docs/decks/example-deck/slides/slides.json`
```json
{
  "permalink": false,
  "tags": ["slide"]
}
```

`docs/decks/example-deck/slides/00-intro.md`

~~~markdown
---
name: intro
attrs: slide-out center
---

<p center>Test Slide</p>

<small id="keys-legend" center font-size="5vw">

(Space, <kbd>H</kbd><kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> or <kbd>→</kbd><kbd>←</kbd> Keys to Navigate)

(<kbd>F</kbd> for Fullscreen)

</small>
~~~

`docs/decks/example-deck/slides/01-first-slide.md`

~~~markdown
---
name: first-slide
attrs: slide-out
---

<h2 fit uppercase color="--primary">First Slide</h2>

Has some content
~~~
