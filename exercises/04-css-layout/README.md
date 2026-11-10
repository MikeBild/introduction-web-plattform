*English · [Deutsch](README.de.md)*

# 04 · Grid and Flexbox

`start/layout.css` still builds the product grid with `float` and fixed percentage widths: on narrow screens the cards get tiny, on wide ones they stay at four. The cart row hangs on `float: right`.

## Task

1. Make `.products` a grid with `grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr))` and `gap: 1rem`. No media query at all.
2. Make `.cart-line` a flexbox: the name grows (`flex: 1`), the total sits at the right edge.
3. Remove all `float`s.
4. Try it in the browser: how many columns do you get at a width of 960, 500, and 230 pixels?

## Check

```bash
npm run test:start -- exercises/04-css-layout
```
