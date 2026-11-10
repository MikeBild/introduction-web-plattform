// @ts-check
import { beforeEach, describe, expect, it, vi } from 'vitest'
import markup from './solution/checkout.html?raw'
import { enhanceForm } from './solution/enhance.js'

const form = () => /** @type {HTMLFormElement} */ (document.querySelector('form#checkout'))
const status = () => form().querySelector('output')?.textContent

describe('Checkout with Progressive Enhancement', () => {
  beforeEach(() => {
    document.body.innerHTML = markup
    const email = /** @type {HTMLInputElement | null} */ (document.querySelector('#email'))
    if (email) email.value = 'ada@example.org'
    // Guard for the test: a real submit would leave the test page
    form()?.addEventListener('submit', (event) => event.preventDefault())
  })

  it('works without JavaScript as a regular POST form', () => {
    expect(form()).not.toBeNull()
    expect(form().getAttribute('method')).toBe('post')
    expect(form().getAttribute('action')).toBe('/api/orders')
    expect(form().querySelector('button[type="submit"]')).not.toBeNull()
    expect(form().querySelector('output')).not.toBeNull()
  })

  it('sends the order with JavaScript through fetch and shows the result', async () => {
    const fetchFn = vi.fn(async () => Response.json({ id: 'o-42' }, { status: 201 }))
    enhanceForm(form(), fetchFn)
    form().requestSubmit()
    await vi.waitFor(() => expect(status()).toContain('o-42'))
    const [url, init] = /** @type {[string, RequestInit]} */ (/** @type {unknown} */ (fetchFn.mock.calls[0]))
    expect(new URL(url).pathname).toBe('/api/orders')
    expect(init.method).toBe('post')
    expect(init.body).toBeInstanceOf(FormData)
    expect(/** @type {FormData} */ (init.body).get('email')).toBe('ada@example.org')
  })

  it('names the next step on error responses', async () => {
    const fetchFn = vi.fn(async () => Response.json({ error: 'invalid' }, { status: 422 }))
    enhanceForm(form(), fetchFn)
    form().requestSubmit()
    await vi.waitFor(() => expect(status()).toMatch(/versuch es noch einmal/))
  })

  it('falls back to the regular submit on network errors', async () => {
    const submit = vi.spyOn(form(), 'submit').mockImplementation(() => {})
    const fetchFn = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })
    enhanceForm(form(), fetchFn)
    form().requestSubmit()
    await vi.waitFor(() => expect(submit).toHaveBeenCalledOnce())
  })
})
