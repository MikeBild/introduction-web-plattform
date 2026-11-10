*English · [Deutsch](README.de.md)*

# 18 · Trusted Types

`start/reviews.js` inserts customer reviews through `innerHTML`. A review with `<img onerror=…>` thus runs code in the shop: DOM-based cross-site scripting (DOM XSS). Trusted Types make such places visible. With `require-trusted-types-for 'script'` in the CSP, `innerHTML` and similar sinks only accept values from a policy. Trusted Types have been Baseline since February 2026.

## Task

1. Build `renderReview(element, review)` without `innerHTML`: create elements, set text through `textContent`, then `replaceChildren`.
2. With `createShopPolicy(factory)`, create the policy `shop` through `factory.createPolicy`. Its `createHTML` escapes `&`, `<`, `>`, `"`, and `'`.
3. Without `factory`, return an object with the same `createHTML` function.
4. Start the shop with `CSP=1 npm start` (Report-Only) and look for Trusted Types violations in the console. Which places still put strings into `innerHTML`?

## Check

```bash
npm run test:start -- exercises/18-trusted-types
```
