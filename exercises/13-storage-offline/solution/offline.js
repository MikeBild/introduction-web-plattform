// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

const VERSION = 1

/**
 * Saves the cart as versioned JSON. Broken or old data results in
 * an empty cart instead of an error.
 * @param {Storage} storage e.g. localStorage
 * @param {string} key
 */
export const createCartStorage = (storage, key) => ({
  /** @returns {CartItem[]} */
  load() {
    try {
      const data = JSON.parse(storage.getItem(key) ?? 'null')
      return data?.version === VERSION && Array.isArray(data.items) ? data.items : []
    } catch {
      return []
    }
  },
  /**
   * @param {readonly CartItem[]} items
   * @returns {boolean} false if the storage is full or blocked
   */
  save(items) {
    try {
      storage.setItem(key, JSON.stringify({ version: VERSION, items }))
      return true
    } catch {
      return false
    }
  },
})

/**
 * Cache first: for static files that only change with a new version.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const cacheFirst = async (request, cache, fetchFn = fetch) => {
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetchFn(request)
  if (response.ok) await cache.put(request, response.clone())
  return response
}

/**
 * Network first: for data like /api/products that should be up to date
 * but may come from the cache when offline.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const networkFirst = async (request, cache, fetchFn = fetch) => {
  try {
    const response = await fetchFn(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}
