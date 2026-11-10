*English · [Deutsch](README.de.md)*

# 13 · Storage and offline with a Service Worker

The cart should survive a reload, and offline the shop should at least show the most recently loaded products. For that, you need two things: robust storage for small data and a deliberate cache strategy in the Service Worker.

## Task

1. Make `createCartStorage(storage, key)` save the cart as `{ version: 1, items }`. `load()` returns `[]` for missing data, broken JSON, or a different version. `save()` returns `false` instead of throwing when the storage is full.
2. Write `cacheFirst(request, cache, fetchFn)`: return hits from the cache, otherwise load and cache only successful responses.
3. Write `networkFirst(request, cache, fetchFn)`: load and cache; if the network is unavailable, return the last state from the cache.
4. Complete `start/sw.js`: cache the App Shell on `install`, delete old caches on `activate`, answer `/api/` with `networkFirst` and everything else with `cacheFirst`.
5. Try it at `npm start`: DevTools → Application → Service Workers, then select “Offline” in the Network tab and reload.

## Check

```bash
npm run test:start -- exercises/13-storage-offline
```

The tests check the storage and the strategies with the real Cache API in the browser. You check the Service Worker itself in the browser.
