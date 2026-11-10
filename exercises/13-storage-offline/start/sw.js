// @ts-check
/// <reference lib="webworker" />
// Service Worker of the workshop shop. Register it with:
// navigator.serviceWorker.register('./sw.js', { type: 'module' })
import { cacheFirst, networkFirst } from './offline.js'

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self))
const CACHE = 'werkstatt-shop-v1'

// TODO: install – precache the App Shell; activate – delete old caches;
// fetch – answer /api/ with networkFirst and everything else with cacheFirst.
sw.addEventListener('fetch', (event) => {
  void event
  void CACHE
  void cacheFirst
  void networkFirst
})
