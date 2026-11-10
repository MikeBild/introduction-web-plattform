// @ts-check
// In the browser, the Import Map resolves “shop/” to ./lib/. No bundler needed.
import { addItem, totalCents } from 'shop/cart.js'
import { formatCents, products } from '../../shop.js'

const [hammer, zange] = products
if (hammer && zange) {
  const cart = addItem(addItem([], hammer, 2), zange)
  const output = document.querySelector('#total')
  if (output) output.textContent = formatCents(totalCents(cart))
}
