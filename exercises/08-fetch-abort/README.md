*English · [Deutsch](README.de.md)*

# 08 · fetch with AbortController

`start/products-api.js` waits forever if it has to, ignores error statuses like 503, and lets an old search overtake a new one. Every request needs an end: a timeout, an abort by the caller, and a clear error message.

## Task

1. In `loadProducts({ signal, timeoutMs, fetchFn })`, combine the caller’s signal with `AbortSignal.timeout(timeoutMs)` through `AbortSignal.any` and pass it on to `fetch`.
2. Throw `HttpError` with the status when `response.ok` is false. `fetch` itself does not throw on 404 or 503.
3. Make the function from `createSearch(fetchFn)` abort every previous search that is still running with an `AbortController`.
4. `fetchFn` is only there for the tests; in the browser it stays `fetch`.

## Check

```bash
npm run test:start -- exercises/08-fetch-abort
```
