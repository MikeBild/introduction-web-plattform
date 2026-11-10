// @ts-check
import { formatCents } from '../../shop.js'

/** Shows a price in cents as a euro amount: <shop-price cents="1290"></shop-price> */
export class ShopPrice extends HTMLElement {
  static observedAttributes = ['cents']

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  render() {
    const cents = Number(this.getAttribute('cents'))
    this.textContent = Number.isFinite(cents) ? formatCents(cents) : ''
  }
}

/**
 * Button that adds a product to the cart: <add-to-cart product-id="p-hammer"></add-to-cart>
 * Reports this with the CustomEvent “cart:add”, which bubbles up to the document.
 */
export class AddToCart extends HTMLElement {
  connectedCallback() {
    if (!this.querySelector('button')) {
      const button = document.createElement('button')
      button.type = 'button'
      button.textContent = 'In den Warenkorb'
      this.append(button)
    }
    this.addEventListener('click', this.#onClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick)
  }

  #onClick = () => {
    const productId = this.getAttribute('product-id')
    if (!productId) return
    this.dispatchEvent(new CustomEvent('cart:add', { detail: { productId }, bubbles: true, composed: true }))
  }
}

if (!customElements.get('shop-price')) customElements.define('shop-price', ShopPrice)
if (!customElements.get('add-to-cart')) customElements.define('add-to-cart', AddToCart)
