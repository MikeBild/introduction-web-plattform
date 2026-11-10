*English · [Deutsch](README.de.md)*

# 07 · ES Modules in the browser without a build

`start/index.html` loads two classic scripts in a fixed order, and the cart hangs globally on `window`. All browsers have supported ES Modules for years, and with an Import Map you also get bare specifiers like `shop/cart.js` – without any bundler.

## Task

1. Make `addItem`, `removeItem`, and `totalCents` in `start/lib/cart.js` Pure Functions: they return a new cart and leave the old one unchanged. `addItem` increases the quantity if the product is already in the cart.
2. Load `main.js` in `start/index.html` with `<script type="module">`.
3. Create an Import Map that maps `shop/` to `./lib/`, and import from `'shop/cart.js'` in `main.js`.
4. Add `<link rel="modulepreload" href="./lib/cart.js">` so the browser loads the module early.
5. Open the page through `npm start` at `http://localhost:3000/exercises/07-esm-browser/start/` and look at the Network tab to see which files load when.

## Check

```bash
npm run test:start -- exercises/07-esm-browser
```
