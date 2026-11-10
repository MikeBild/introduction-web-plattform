// @ts-check
/// <reference lib="webworker" />
// Service Worker of the workshop shop. Register it with:
// navigator.serviceWorker.register('./sw.js', { type: 'module' })
import { cacheFirst, networkFirst } from './offline.js'

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self))
const CACHE = 'werkstatt-shop-v1'
const SHELL = ['./', './index.html', './offline.js']

sw.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)))
})

sw.addEventListener('activate', (event) => {
  // Clean up old cache versions
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))),
  )
})

sw.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const isApi = new URL(request.url).pathname.startsWith('/api/')
  event.respondWith(caches.open(CACHE).then((cache) => (isApi ? networkFirst(request, cache) : cacheFirst(request, cache))))
})
