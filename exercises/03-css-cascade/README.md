*English · [Deutsch](README.de.md)*

# 03 · Custom Properties, Cascade Layers, Nesting

In `start/shop.css`, the reset with `#app button` wins against every class: the “Kaufen” (buy) button stays colorless. The usual way out would be `!important` or an even longer selector chain. Cascade Layers solve this differently: the order of the layers beats specificity.

## Task

1. Write `@layer reset, base, components, utilities;` as the first rule.
2. Store the colors, the radius, and the spacing as Custom Properties in `:root` (layer `base`), at least `--color-accent: #1d4ed8`.
3. Put the reset in `@layer reset`, `.button` in `@layer components`, and `.hidden` in `@layer utilities`.
4. Nest `:hover` and `.toolbar &` into the rule for `.button` with CSS Nesting.
5. Do without `!important`.

## Check

```bash
npm run test:start -- exercises/03-css-cascade
```
