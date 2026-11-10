// @ts-check

/**
 * Product card, so far without Shadow DOM: it overwrites its content with innerHTML,
 * and every global CSS rule reaches into it.
 * TODO: template, attachShadow({ mode: 'open' }), slots name and price plus a default slot,
 * part="buy" on the button, event cart:add with composed: true.
 */
export class ProductCard extends HTMLElement {
  connectedCallback() {
    const name = this.querySelector('[slot="name"]')?.textContent ?? 'Produkt'
    this.innerHTML = `<article><h2>${name}</h2><button>In den Warenkorb</button></article>`
  }
}

if (!customElements.get('product-card')) customElements.define('product-card', ProductCard)
