// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import markup from './solution/checkout.html?raw'
import { checkQuantity, readCheckout } from './solution/checkout.js'

const form = () => /** @type {HTMLFormElement} */ (document.querySelector('#checkout'))
/** @param {string} name */
const field = (name) => /** @type {HTMLInputElement} */ (form().elements.namedItem(name))

/** @param {Record<string, string>} values */
const fill = (values) => {
  for (const [name, value] of Object.entries(values)) field(name).value = value
}

describe('Checkout with native validation', () => {
  beforeEach(() => {
    document.body.innerHTML = markup
  })

  it('links every field to a label', () => {
    for (const name of ['name', 'email', 'postalCode', 'quantity']) {
      expect(field(name).labels?.length).toBe(1)
    }
    expect(form().querySelector('button[type="submit"]')).not.toBeNull()
  })

  it('rejects empty fields, an invalid email, and an invalid postal code', () => {
    expect(form().checkValidity()).toBe(false)
    fill({ name: 'Ada', email: 'ada-at-example', postalCode: '04109' })
    expect(field('email').validity.typeMismatch).toBe(true)
    fill({ email: 'ada@example.org', postalCode: '4109' })
    expect(field('postalCode').validity.patternMismatch).toBe(true)
    fill({ postalCode: '04109' })
    expect(form().checkValidity()).toBe(true)
  })

  it('reports through setCustomValidity when the quantity exceeds the stock', () => {
    fill({ name: 'Ada', email: 'ada@example.org', postalCode: '04109', quantity: '6' })
    checkQuantity(field('quantity'), 5)
    expect(field('quantity').validity.customError).toBe(true)
    expect(field('quantity').validationMessage).toContain('5')
    expect(form().checkValidity()).toBe(false)
    fill({ quantity: '2' })
    checkQuantity(field('quantity'), 5)
    expect(field('quantity').validity.valid).toBe(true)
  })

  it('reads the values through FormData, the quantity as a number', () => {
    fill({ name: ' Ada Lovelace ', email: 'ada@example.org', postalCode: '04109', quantity: '3' })
    expect(readCheckout(form())).toEqual({ name: 'Ada Lovelace', email: 'ada@example.org', postalCode: '04109', quantity: 3 })
  })
})
