*English · [Deutsch](README.de.md)*

# 10 · Custom Elements

Prices and cart buttons show up everywhere in the shop. Instead of formatting and wiring them by hand every time, they become HTML elements of their own: `<shop-price>` and `<add-to-cart>`. That works in any framework and without one.

## Task

1. Make `<shop-price cents="…">` react to changes: `static observedAttributes = ['cents']` and `attributeChangedCallback`.
2. Make `<add-to-cart>` render a real `<button type="button">In den Warenkorb</button>` (add to cart) if there is none inside yet.
3. Report a click as `CustomEvent('cart:add', { detail: { productId }, bubbles: true, composed: true })`.
4. Register the click listener in `connectedCallback` and remove it in `disconnectedCallback` so that a moved element does not report twice.

## Check

```bash
npm run test:start -- exercises/10-custom-elements
```
