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
 * Loads the products. Aborts when the caller aborts or the time runs out.
 * @param {{ signal?: AbortSignal, timeoutMs?: number, fetchFn?: typeof fetch }} [options]
 * @returns {Promise<Product[]>}
 */
export const loadProducts = async ({ signal, timeoutMs = 5000, fetchFn = fetch } = {}) => {
  const timeout = AbortSignal.timeout(timeoutMs)
  const combined = signal ? AbortSignal.any([signal, timeout]) : timeout
  const url = '/api/products'
  const response = await fetchFn(url, { signal: combined, headers: { accept: 'application/json' } })
  if (!response.ok) throw new HttpError(response.status, url)
  return response.json()
}

/**
 * Returns a search function that aborts every previous search that is still running.
 * That way an old response never overtakes a new one.
 * @param {typeof fetch} [fetchFn]
 * @returns {(term: string) => Promise<Product[]>}
 */
export const createSearch = (fetchFn = fetch) => {
  /** @type {AbortController | undefined} */
  let current
  return async (term) => {
    current?.abort()
    const controller = new AbortController()
    current = controller
    const url = `/api/products?q=${encodeURIComponent(term)}`
    const response = await fetchFn(url, { signal: controller.signal })
    if (!response.ok) throw new HttpError(response.status, url)
    return response.json()
  }
}
