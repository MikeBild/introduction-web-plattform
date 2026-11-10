*English · [Deutsch](README.de.md)*

# 11 · Shadow DOM, templates, and slots

`<product-card>` in `start/product-card.js` overwrites its content through `innerHTML`, and every global CSS rule for `button` colors its button too. Shadow DOM encapsulates markup and styles. Slots bring the page’s content back in on purpose, and `::part` opens individual elements for styling from outside.

## Task

1. Create a `<template>` with `<style>`, an `article`, the slots `name` and `price`, a default slot, and a button with `part="buy"`.
2. In the `constructor`, attach an open shadow root (`attachShadow({ mode: 'open' })`) and clone the template into it. The Light DOM stays untouched.
3. Report a click on the button as `cart:add` with `detail: { productId }`, `bubbles: true`, and `composed: true` so the event leaves the shadow root.
4. Style the button from outside only through `product-card::part(buy)`.

Bonus: write a card as Declarative Shadow DOM (`<template shadowrootmode="open">`) directly into the HTML. It renders before JavaScript loads.

## Check

```bash
npm run test:start -- exercises/11-shadow-dom
```
