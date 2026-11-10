// @ts-check
import { beforeEach, describe, expect, it } from 'vitest'
import markup from './solution/products.html?raw'

/** @param {string} selector */
const all = (selector) => [...document.body.querySelectorAll(selector)]

describe('Product list with semantic HTML', () => {
  beforeEach(() => {
    document.body.innerHTML = markup
  })

  it('has landmarks: header, nav, main, and footer', () => {
    expect(all('header')).toHaveLength(1)
    expect(all('nav')).toHaveLength(1)
    expect(all('main')).toHaveLength(1)
    expect(all('footer')).toHaveLength(1)
  })

  it('has exactly one h1 and one h2 per product', () => {
    expect(all('h1')).toHaveLength(1)
    const articles = all('main ul > li > article')
    expect(articles).toHaveLength(3)
    for (const article of articles) expect(article.querySelector('h2')?.textContent).toBeTruthy()
  })

  it('uses links for navigation and buttons for actions', () => {
    expect(all('[onclick]')).toHaveLength(0)
    expect(all('nav a[href]').length).toBeGreaterThanOrEqual(2)
    const buttons = all('main button')
    expect(buttons).toHaveLength(3)
    for (const button of buttons) expect(button.getAttribute('type')).toBe('button')
  })

  it('gives every image an alt text', () => {
    const images = all('img')
    expect(images.length).toBeGreaterThan(0)
    for (const image of images) expect(image.getAttribute('alt')?.trim()).toBeTruthy()
  })
})
