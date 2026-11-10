// @ts-check
/** @import { Product } from '../../shop.js' */

/** Error for responses with a status outside 200 to 299. */
export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} url
   */
  constructor(status, url) {
    super(`HTTP ${status} für ${url}`)
    this.name = 'HttpError'
    this.status = status
  }
}

/**
 * Loads the products.
 * TODO: combine the signal of the caller and a timeout with AbortSignal.any, throw HttpError on !response.ok.
 * @param {{ signal?: AbortSignal, timeoutMs?: number, fetchFn?: typeof fetch }} [options]
 * @returns {Promise<Product[]>}
 */
export const loadProducts = async ({ fetchFn = fetch } = {}) => {
  const response = await fetchFn('/api/products')
  return response.json()
}

/**
 * Returns a search function.
 * TODO: abort every previous search that is still running with an AbortController.
 * @param {typeof fetch} [fetchFn]
 * @returns {(term: string) => Promise<Product[]>}
 */
export const createSearch = (fetchFn = fetch) => async (term) => {
  const response = await fetchFn(`/api/products?q=${encodeURIComponent(term)}`)
  return response.json()
}
