// @ts-check
import { describe, expect, it } from 'vitest'
import { products } from '../shop.js'
import html from './solution/index.html?raw'
import mainSource from './solution/main.js?raw'
import { addItem, removeItem, totalCents } from './solution/lib/cart.js'

const [hammer, zange] = /** @type {[import('../shop.js').Product, import('../shop.js').Product]} */ (products)
const page = new DOMParser().parseFromString(html, 'text/html')

describe('Cart as an ES Module', () => {
  it('adds products to the cart immutably', () => {
    /** @type {readonly import('./solution/lib/cart.js').CartItem[]} */
    const empty = Object.freeze([])
    const one = addItem(empty, hammer)
    const two = addItem(one, hammer, 2)
    expect(empty).toEqual([])
    expect(one).toEqual([{ productId: 'p-hammer', quantity: 1, priceCents: 1290 }])
    expect(two).toEqual([{ productId: 'p-hammer', quantity: 3, priceCents: 1290 }])
    expect(two).not.toBe(one)
  })

  it('removes line items and computes the total in cents', () => {
    const cart = addItem(addItem([], hammer, 2), zange)
    expect(totalCents(cart)).toBe(2 * 1290 + 1890)
    expect(removeItem(cart, 'p-hammer')).toEqual([{ productId: 'p-zange', quantity: 1, priceCents: 1890 }])
    expect(cart).toHaveLength(2)
  })

  it('loads main.js as a module with an Import Map and modulepreload', () => {
    const map = JSON.parse(page.querySelector('script[type="importmap"]')?.textContent ?? '{}')
    expect(map.imports?.['shop/']).toBe('./lib/')
    expect(page.querySelector('script[type="module"][src="./main.js"]')).not.toBeNull()
    expect(page.querySelector('link[rel="modulepreload"][href="./lib/cart.js"]')).not.toBeNull()
    expect(page.querySelectorAll('script[src]:not([type="module"])')).toHaveLength(0)
  })

  it('imports through the bare specifier from the Import Map', () => {
    expect(mainSource).toMatch(/from 'shop\/cart\.js'/)
  })
})
