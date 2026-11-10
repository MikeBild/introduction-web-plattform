// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import { connectStore } from './solution/cart-badge.js'
/** @import { CartBadge, CartStore } from './solution/cart-badge.js' */
/** @import { CartItem } from '../07-esm-browser/solution/lib/cart.js' */

/** Minimal store, as a React Context, a Knockout ViewModel, or vanilla JS might provide it. */
const createStore = (/** @type {CartItem[]} */ initial) => {
  let items = initial
  /** @type {Set<(items: CartItem[]) => void>} */
  const listeners = new Set()
  /** @type {CartStore & { listenerCount: () => number }} */
  const store = {
    getState: () => items,
    setState: (next) => {
      items = next
      for (const listener of listeners) listener(items)
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    listenerCount: () => listeners.size,
  }
  return store
}

const badge = () => /** @type {CartBadge} */ (document.querySelector('cart-badge'))
const text = () => badge().shadowRoot?.querySelector('[part="count"]')?.textContent

describe('Embedding a Web Component in other frameworks', () => {
  beforeEach(() => {
    document.body.innerHTML = '<cart-badge label="Im Korb"></cart-badge>'
  })

  it('accepts data as a property and shows the label', () => {
    badge().items = [{ productId: 'p-hammer', quantity: 2, priceCents: 1290 }]
    expect(text()).toBe('Im Korb: 2')
    badge().setAttribute('label', 'Warenkorb')
    expect(text()).toBe('Warenkorb: 2')
  })

  it('follows the store and reports changes back to it', () => {
    const store = createStore([{ productId: 'p-zange', quantity: 1, priceCents: 1890 }])
    connectStore(badge(), store)
    expect(text()).toBe('Im Korb: 1')
    store.setState([{ productId: 'p-zange', quantity: 3, priceCents: 1890 }])
    expect(text()).toBe('Im Korb: 3')
    const clear = /** @type {HTMLButtonElement} */ (badge().shadowRoot?.querySelector('[part="clear"]'))
    expect(clear.textContent).toBe('Warenkorb leeren')
    clear.click()
    expect(store.getState()).toEqual([])
    expect(text()).toBe('Im Korb: 0')
  })

  it('releases the connection as soon as the element leaves the DOM', () => {
    const store = createStore([])
    connectStore(badge(), store)
    expect(store.listenerCount()).toBe(1)
    badge().remove()
    expect(store.listenerCount()).toBe(0)
  })
})
