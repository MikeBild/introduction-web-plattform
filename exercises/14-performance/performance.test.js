// @ts-check
import { afterEach, describe, expect, it, vi } from 'vitest'
import html from './solution/index.html?raw'
import { observeLcp, rate } from './solution/vitals.js'

const page = new DOMParser().parseFromString(html, 'text/html')

describe('Rating Core Web Vitals', () => {
  it.each([
    ['LCP', 2500, 'good'],
    ['LCP', 2501, 'needs-improvement'],
    ['LCP', 4001, 'poor'],
    ['INP', 200, 'good'],
    ['INP', 350, 'needs-improvement'],
    ['INP', 501, 'poor'],
    ['CLS', 0.05, 'good'],
    ['CLS', 0.2, 'needs-improvement'],
    ['CLS', 0.3, 'poor'],
  ])('%s %d is %s', (name, value, expected) => {
    expect(rate(/** @type {'LCP' | 'INP' | 'CLS'} */ (name), value)).toBe(expected)
  })
})

describe('Observing LCP', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('observes largest-contentful-paint with buffering and reports the latest candidate', () => {
    /** @type {PerformanceObserverCallback | undefined} */
    let callback
    const observe = vi.fn()
    const disconnect = vi.fn()
    vi.stubGlobal(
      'PerformanceObserver',
      class {
        /** @param {PerformanceObserverCallback} cb */
        constructor(cb) {
          callback = cb
        }
        observe = observe
        disconnect = disconnect
      },
    )
    const report = vi.fn()
    const stop = observeLcp(report)
    expect(observe).toHaveBeenCalledWith({ type: 'largest-contentful-paint', buffered: true })
    const entries = [{ startTime: 800 }, { startTime: 3100 }]
    callback?.(/** @type {PerformanceObserverEntryList} */ (/** @type {unknown} */ ({ getEntries: () => entries })), /** @type {PerformanceObserver} */ ({}))
    expect(report).toHaveBeenLastCalledWith({ name: 'LCP', value: 3100, rating: 'needs-improvement' })
    stop()
    expect(disconnect).toHaveBeenCalledOnce()
  })
})

describe('Marking up images for good scores', () => {
  it('loads the hero image right away with high priority and reserves its space', () => {
    const hero = /** @type {HTMLImageElement} */ (page.querySelector('img.hero'))
    expect(hero.getAttribute('fetchpriority')).toBe('high')
    expect(hero.getAttribute('loading')).not.toBe('lazy')
    expect(hero.getAttribute('width')).toBeTruthy()
    expect(hero.getAttribute('height')).toBeTruthy()
  })

  it('loads product images lazily and with fixed dimensions against layout shifts', () => {
    const images = [...page.querySelectorAll('.products img')]
    expect(images.length).toBeGreaterThan(0)
    for (const image of images) {
      expect(image.getAttribute('loading')).toBe('lazy')
      expect(image.getAttribute('width')).toBeTruthy()
      expect(image.getAttribute('height')).toBeTruthy()
    }
  })
})
