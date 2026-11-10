// @ts-check
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nameCards, transition } from './solution/transition.js'

/** @param {boolean} reduce */
const stubReducedMotion = (reduce) =>
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) => /** @type {MediaQueryList} */ ({ matches: reduce && query.includes('reduce'), media: query }),
  )

describe('View Transitions with fallback', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    // @ts-expect-error remove the custom property from the fallback test again
    delete document.startViewTransition
  })

  it('uses startViewTransition and waits until the DOM is updated', async () => {
    stubReducedMotion(false)
    const start = vi.spyOn(document, 'startViewTransition')
    document.body.innerHTML = '<p id="sort">Preis aufsteigend</p>'
    await transition(() => {
      const sort = document.querySelector('#sort')
      if (sort) sort.textContent = 'Preis absteigend'
    })
    expect(start).toHaveBeenCalledOnce()
    expect(document.querySelector('#sort')?.textContent).toBe('Preis absteigend')
  })

  it('changes the DOM immediately when the browser does not support View Transitions', async () => {
    stubReducedMotion(false)
    Object.defineProperty(document, 'startViewTransition', { value: undefined, configurable: true })
    const update = vi.fn()
    await transition(update)
    expect(update).toHaveBeenCalledOnce()
  })

  it('skips the animation with prefers-reduced-motion', async () => {
    stubReducedMotion(true)
    const start = vi.spyOn(document, 'startViewTransition')
    const update = vi.fn()
    await transition(update)
    expect(update).toHaveBeenCalledOnce()
    expect(start).not.toHaveBeenCalled()
  })

  it('gives each card a unique view-transition-name', () => {
    document.body.innerHTML = `
      <article class="card" data-product-id="p-hammer"></article>
      <article class="card" data-product-id="p-zange"></article>`
    nameCards(document.querySelectorAll('.card'))
    const names = [...document.querySelectorAll('.card')].map((card) => getComputedStyle(card).viewTransitionName)
    expect(names).toEqual(['card-p-hammer', 'card-p-zange'])
  })
})
