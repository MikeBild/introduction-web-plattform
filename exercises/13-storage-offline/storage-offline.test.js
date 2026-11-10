// @ts-check
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cacheFirst, createCartStorage, networkFirst } from './solution/offline.js'

const item = { productId: 'p-hammer', quantity: 2, priceCents: 1290 }
const cacheName = 'test-werkstatt-shop'

afterEach(async () => {
  localStorage.clear()
  await caches.delete(cacheName)
})

describe('Cart in localStorage', () => {
  it('saves with a version and loads again', () => {
    const store = createCartStorage(localStorage, 'cart')
    expect(store.save([item])).toBe(true)
    expect(JSON.parse(localStorage.getItem('cart') ?? '')).toEqual({ version: 1, items: [item] })
    expect(store.load()).toEqual([item])
  })

  it('returns an empty cart for missing, broken, or old data', () => {
    const store = createCartStorage(localStorage, 'cart')
    expect(store.load()).toEqual([])
    localStorage.setItem('cart', '{kaputt')
    expect(store.load()).toEqual([])
    localStorage.setItem('cart', JSON.stringify([item]))
    expect(store.load()).toEqual([])
  })

  it('returns false when the storage is full', () => {
    const full = /** @type {Storage} */ (/** @type {unknown} */ ({
      getItem: () => null,
      setItem: () => {
        throw new DOMException('voll', 'QuotaExceededError')
      },
    }))
    expect(createCartStorage(full, 'cart').save([item])).toBe(false)
  })
})

describe('Cache strategies for the Service Worker', () => {
  const request = () => new Request(new URL('/assets/shop.css', location.origin))

  it('cacheFirst loads from the network once and from the cache after that', async () => {
    const cache = await caches.open(cacheName)
    const fetchFn = vi.fn(async () => new Response('body { color: black }'))
    expect(await (await cacheFirst(request(), cache, fetchFn)).text()).toBe('body { color: black }')
    expect(await (await cacheFirst(request(), cache, fetchFn)).text()).toBe('body { color: black }')
    expect(fetchFn).toHaveBeenCalledOnce()
  })

  it('cacheFirst does not store error responses in the cache', async () => {
    const cache = await caches.open(cacheName)
    const fetchFn = vi.fn(async () => new Response('fehlt', { status: 404 }))
    await cacheFirst(request(), cache, fetchFn)
    expect(await cache.match(request())).toBeUndefined()
  })

  it('networkFirst returns fresh data, and the last state when offline', async () => {
    const cache = await caches.open(cacheName)
    const api = () => new Request(new URL('/api/products', location.origin))
    const online = vi.fn(async () => Response.json([{ id: 'p-zange' }]))
    expect(await (await networkFirst(api(), cache, online)).json()).toEqual([{ id: 'p-zange' }])
    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    expect(await (await networkFirst(api(), cache, offline)).json()).toEqual([{ id: 'p-zange' }])
  })

  it('networkFirst throws when offline and nothing is in the cache', async () => {
    const cache = await caches.open(cacheName)
    const offline = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(networkFirst(request(), cache, offline)).rejects.toThrow('Failed to fetch')
  })
})
