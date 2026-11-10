// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

/**
 * Saves the cart.
 * TODO: save as { version: 1, items }; broken JSON, other versions, and
 * missing data result in []; save returns false instead of throwing when the storage is full.
 * @param {Storage} storage e.g. localStorage
 * @param {string} key
 */
export const createCartStorage = (storage, key) => ({
  /** @returns {CartItem[]} */
  load() {
    return JSON.parse(storage.getItem(key) ?? '[]')
  },
  /**
   * @param {readonly CartItem[]} items
   * @returns {boolean}
   */
  save(items) {
    storage.setItem(key, JSON.stringify(items))
    return true
  },
})

/**
 * TODO: Cache first – return hits from the cache, otherwise load and cache successful responses.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const cacheFirst = async (request, cache, fetchFn = fetch) => {
  void cache
  return fetchFn(request)
}

/**
 * TODO: Network first – load and cache; if the network is unavailable, return from the cache.
 * @param {Request} request
 * @param {Cache} cache
 * @param {typeof fetch} [fetchFn]
 * @returns {Promise<Response>}
 */
export const networkFirst = async (request, cache, fetchFn = fetch) => {
  void cache
  return fetchFn(request)
}
