*English · [Deutsch](README.de.md)*

# 15 · Progressive Enhancement

The checkout in `start/checkout.html` only works with JavaScript: a link with `onclick`, no `form`, no `action`. If the script does not load, because the network is flaky or an error stops everything, nobody can order. Progressive Enhancement turns this around: first it works with HTML, then JavaScript makes it better.

## Task

1. Build a real `<form method="post" action="/api/orders">` with labels, `name` attributes, `<button type="submit">`, and an `<output role="status">`.
2. Check at `npm start` with JavaScript turned off: the server accepts the order and responds with a page.
3. Make `enhanceForm(form, fetchFn)` intercept the submit and send the `FormData` to `form.action` with `fetch`. Show the result in the `output`.
4. On an error response, name the next step.
5. On a network error, call `form.submit()` and so fall back to the path without JavaScript.

## Check

```bash
npm run test:start -- exercises/15-progressive-enhancement
```
