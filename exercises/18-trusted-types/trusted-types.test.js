// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import { createShopPolicy, renderReview } from './solution/reviews.js'

const attack = '<img src="x" onerror="window.__pwned = true">Super Zange'

describe('Reviews without DOM XSS', () => {
  beforeEach(() => {
    document.body.innerHTML = '<section id="review"></section>'
  })

  it('shows untrusted text as text, not as HTML', () => {
    const section = /** @type {HTMLElement} */ (document.querySelector('#review'))
    renderReview(section, { author: 'Ada', text: attack })
    expect(section.querySelector('img')).toBeNull()
    expect(section.querySelector('blockquote')?.textContent).toBe(attack)
    expect(section.textContent).toContain('Ada')
  })

  it('creates a Trusted Types policy that escapes HTML', () => {
    expect(window.trustedTypes).toBeDefined()
    const policy = createShopPolicy(window.trustedTypes)
    const html = policy.createHTML(attack)
    expect(window.trustedTypes?.isHTML(html)).toBe(true)
    expect(String(html)).toBe('&#60;img src=&#34;x&#34; onerror=&#34;window.__pwned = true&#34;&#62;Super Zange')
  })

  it('escapes even without Trusted Types in the browser', () => {
    const policy = createShopPolicy(undefined)
    expect(policy.createHTML(`<b>"A&B"</b>`)).toBe('&#60;b&#62;&#34;A&#38;B&#34;&#60;/b&#62;')
  })
})
