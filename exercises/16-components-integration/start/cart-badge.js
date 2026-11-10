// @ts-check
/** @import { CartItem } from '../../07-esm-browser/solution/lib/cart.js' */

/**
 * @typedef {object} CartStore
 * @property {() => CartItem[]} getState
 * @property {(items: CartItem[]) => void} setState
 * @property {(listener: (items: CartItem[]) => void) => () => void} subscribe
 */

/**
 * Cart display. So far it reads the line items as JSON from an attribute.
 * TODO: property items (getter/setter) instead of an attribute, observe the attribute label,
 * button “Warenkorb leeren” (empty cart) dispatches cart-change with detail.items = [], addCleanup for disconnectedCallback.
 */
export class CartBadge extends HTMLElement {
  /** @type {CartItem[]} */
  items = []

  constructor() {
    super()
    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = `<span part="count"></span> <button type="button" part="clear">Warenkorb leeren</button>`
  }

  connectedCallback() {
    /** @type {CartItem[]} */
    const items = JSON.parse(this.getAttribute('items') ?? '[]')
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const output = this.shadowRoot?.querySelector('[part="count"]')
    if (output) output.textContent = `Warenkorb: ${count}`
  }

  /** @param {() => void} cleanup */
  addCleanup(cleanup) {
    void cleanup
  }
}

if (!customElements.get('cart-badge')) customElements.define('cart-badge', CartBadge)

/**
 * TODO: set items from the store, subscribe to changes, pass cart-change on to the store,
 * release everything when the element is removed.
 * @param {CartBadge} element
 * @param {CartStore} store
 * @returns {() => void}
 */
export const connectStore = (element, store) => {
  element.setAttribute('items', JSON.stringify(store.getState()))
  return () => {}
}
