// @ts-check
import { formatCents } from '../../shop.js'

/**
 * Shows a price in cents as a euro amount: <shop-price cents="1290"></shop-price>
 * TODO: react to changes of cents (observedAttributes, attributeChangedCallback).
 */
export class ShopPrice extends HTMLElement {
  connectedCallback() {
    this.textContent = formatCents(Number(this.getAttribute('cents')))
  }
}

/**
 * Button that adds a product to the cart: <add-to-cart product-id="p-hammer"></add-to-cart>
 * TODO: render a real button, event “cart:add” with detail.productId, bubbles and composed,
 * remove the listener in disconnectedCallback.
 */
export class AddToCart extends HTMLElement {
  connectedCallback() {
    this.textContent = 'In den Warenkorb'
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('add', { detail: this.getAttribute('product-id') }))
    })
  }
}

if (!customElements.get('shop-price')) customElements.define('shop-price', ShopPrice)
if (!customElements.get('add-to-cart')) customElements.define('add-to-cart', AddToCart)
