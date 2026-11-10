// @ts-check
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import css from './solution/shop.css?raw'

/** @param {string} selector */
const style = (selector) => getComputedStyle(/** @type {Element} */ (document.querySelector(selector)))

/** @type {HTMLStyleElement} */
let sheet

describe('Custom Properties, Cascade Layers, and Nesting', () => {
  beforeEach(() => {
    sheet = document.createElement('style')
    sheet.textContent = css
    document.head.append(sheet)
    document.body.innerHTML = `
      <div id="app">
        <div class="toolbar">
          <button class="button" id="buy">Kaufen</button>
          <button class="button hidden" id="secret">Versteckt</button>
        </div>
      </div>`
  })

  afterEach(() => sheet.remove())

  it('defines the accent color as a Custom Property', () => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    expect(accent).toBe('#1d4ed8')
  })

  it('declares the layer order at the start', () => {
    expect(css.trimStart()).toMatch(/^(\/\*[\s\S]*?\*\/\s*)?@layer reset, base, components, utilities;/)
    expect(css).not.toContain('!important')
  })

  it('lets the component win against the reset even though the reset uses an ID', () => {
    expect(style('#buy').backgroundColor).toBe('rgb(29, 78, 216)')
    expect(style('#buy').display).toBe('inline-flex')
  })

  it('lets utilities win against components', () => {
    expect(style('#secret').display).toBe('none')
  })

  it('nests the hover state into the rule for .button', () => {
    const rules = [...sheet.sheet?.cssRules ?? []]
      .flatMap((rule) => (rule instanceof CSSLayerBlockRule ? [...rule.cssRules] : []))
      .filter((rule) => rule instanceof CSSStyleRule && rule.selectorText === '.button')
    const button = /** @type {CSSStyleRule | undefined} */ (rules[0])
    expect(button).toBeDefined()
    expect([...button?.cssRules ?? []].some((rule) => rule instanceof CSSStyleRule && rule.selectorText.includes(':hover'))).toBe(true)
  })
})
