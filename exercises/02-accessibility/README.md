*English · [Deutsch](README.de.md)*

# 02 · Accessibility with keyboard and screen reader

The cart opens as an overlay. In `start/cart-dialog.js`, the code only sets the `open` attribute: focus stays behind the overlay, Escape does nothing, and after closing, nobody knows where they are. The confirmation comes as an `alert` and pulls everyone out of the flow.

## Task

1. Make `openCart(dialog, trigger)` open the dialog with `showModal()`. The browser moves focus into it (`autofocus`), makes the rest inert, and closes it on Escape.
2. Return focus to `trigger` on the `close` event.
3. Make `announce(region, text)` write the message into a Live Region with `aria-live="polite"` instead of calling `alert`.
4. Then use the page at `npm start` for five minutes with the keyboard only.

## Check

```bash
npm run test:start -- exercises/02-accessibility
```
