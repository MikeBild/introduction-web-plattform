// @ts-check
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import css from './solution/card.css?raw'

/** @type {HTMLStyleElement} */
let sheet

/** @param {string} selector */
const style = (selector) => getComputedStyle(/** @type {Element} */ (document.querySelector(selector)))

describe('Container Queries and :has()', () => {
  beforeEach(() => {
    sheet = document.createElement('style')
    sheet.textContent = `html { font-size: 16px } ${css}`
    document.head.append(sheet)
    document.body.style.width = '1200px'
    document.body.innerHTML = `
      <ul class="cards">
        <li style="width: 300px"><article class="card" id="narrow"><h2>Kombizange</h2><p>18,90 €</p></article></li>
        <li style="width: 600px"><article class="card" id="wide"><h2>Akku-Schrauber</h2><p>89,90 €</p></article></li>
        <li style="width: 600px"><article class="card" id="sold"><h2>Bit-Satz</h2><span class="sold-out">Ausverkauft</span></article></li>
      </ul>`
  })

  afterEach(() => {
    sheet.remove()
    document.body.style.width = ''
  })

  it('lays out the card by the width of its container, not the viewport', () => {
    expect(style('#narrow').flexDirection).toBe('column')
    expect(style('#wide').flexDirection).toBe('row')
  })

  it('dims sold-out cards through :has() without an extra class', () => {
    expect(style('#sold').opacity).toBe('0.6')
    expect(style('#wide').opacity).toBe('1')
  })

  it('shows the error summary through :has(:user-invalid)', () => {
    const selectors = [...sheet.sheet?.cssRules ?? []]
      .filter((rule) => rule instanceof CSSStyleRule)
      .map((rule) => rule.selectorText)
    expect(selectors.some((selector) => selector.includes(':has(:user-invalid)'))).toBe(true)
    expect(css).not.toMatch(/@media/)
  })
})
