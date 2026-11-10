// @ts-check
// TODO: load with an import of 'shop/cart.js' instead of through a global object.
import { addItem, totalCents } from './lib/cart.js'
import { formatCents, products } from '../../shop.js'

const [hammer, zange] = products
if (hammer && zange) {
  const cart = addItem(addItem([], hammer, 2), zange)
  const output = document.querySelector('#total')
  if (output) output.textContent = formatCents(totalCents(cart))
}
