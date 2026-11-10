*English · [Deutsch](README.de.md)*

# 01 · Semantic HTML

The product list in `start/products.html` consists only of `div` and `span` with `onclick`. For screen readers, keyboards, and search engines, that is a wall without structure. The right elements bring role, focus, and keyboard operation for free.

## Task

1. Replace the header, main, and footer areas with `header`, `nav`, `main`, and `footer`.
2. Make “Werkzeug” (tools) the only `h1` and each product name an `h2`.
3. Present the products as a list: `ul > li > article`.
4. Turn navigation `span`s into real links (`a href`) and “In den Warenkorb” (add to cart) into a `button type="button"`. No more `onclick` in the markup.
5. Give every `img` a descriptive `alt` text.

## Check

```bash
npm run test:start -- exercises/01-semantic-html
```
