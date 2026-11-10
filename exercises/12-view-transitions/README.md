*English · [Deutsch](README.de.md)*

# 12 · View Transitions

When you sort the product list by price or filter it, the cards jump to their new place without a transition. With the View Transition API, the browser animates from the old to the new state: you only change the DOM, and it takes care of the rest. Same-document View Transitions have been Baseline since October 2025.

## Task

1. Make `transition(update)` run the change through `document.startViewTransition(update)` and wait for `updateCallbackDone`.
2. Run `update` directly if the browser does not know the API or `prefers-reduced-motion: reduce` is set.
3. Make `nameCards(cards)` give each card the `view-transition-name` `card-<data-product-id>`. Each name may appear only once on the page.
4. Try the sorting in the shop at `npm start` and slow down the animation in DevTools (Animations panel).

## Check

```bash
npm run test:start -- exercises/12-view-transitions
```
