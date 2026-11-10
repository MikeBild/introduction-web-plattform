*English · [Deutsch](README.de.md)*

# 06 · Forms and native validation

The checkout form in `start/checkout.html` has no labels, no types, and a “button” made of a `span` that calls its own validation function. The browser can do all of this itself: required fields, email format, patterns, and custom messages through the Constraint Validation API.

## Task

1. Give every field a `label` with `for` and a matching `id`.
2. Set `required`, `type="email"`, `pattern="\d{5}"` for the postal code, and `type="number" min="1"` for the quantity.
3. Replace the `span` with `<button type="submit">`.
4. Make `checkQuantity(input, stock)` report through `setCustomValidity` when the quantity exceeds the stock, and clear the message again with `''`.
5. Make `readCheckout(form)` read the values through `FormData`, trimmed, with the quantity as a number.

## Check

```bash
npm run test:start -- exercises/06-forms
```
