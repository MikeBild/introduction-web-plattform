*English · [Deutsch](README.de.md)*

# 05 · Container Queries and :has()

The product card in `start/card.css` switches to landscape at a viewport width of 40rem, no matter whether it sits in the wide list or in the narrow sidebar. For “sold out” and “form has errors”, JavaScript sets classes.

## Task

1. Make each list slot `.cards > li` a container with `container-type: inline-size`.
2. Replace the media query with `@container (inline-size >= 28rem)`.
3. Dim cards with `.card:has(.sold-out)` instead of the class `.is-sold-out`.
4. Show `.error-summary` with `form:has(:user-invalid)`, that is, only after someone has filled in a field incorrectly.
5. In your head, delete the JavaScript that used to set the classes as well: it is no longer needed.

## Check

```bash
npm run test:start -- exercises/05-container-has
```
