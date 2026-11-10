// @ts-check

/** @typedef {'LCP' | 'INP' | 'CLS'} VitalName */
/** @typedef {'good' | 'needs-improvement' | 'poor'} Rating */

/** Core Web Vitals thresholds: up to “good”, up to “needs-improvement”, above that “poor” */
const thresholds = /** @type {const} */ ({
  LCP: [2500, 4000], // milliseconds
  INP: [200, 500], // milliseconds
  CLS: [0.1, 0.25], // unitless
})

/**
 * @param {VitalName} name
 * @param {number} value
 * @returns {Rating}
 */
export const rate = (name, value) => {
  const [good, poor] = thresholds[name]
  if (value <= good) return 'good'
  if (value <= poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Reports every new LCP candidate. buffered: true also delivers entries
 * that were created before the call.
 * @param {(metric: { name: 'LCP', value: number, rating: Rating }) => void} report
 * @returns {() => void} ends the observation
 */
export const observeLcp = (report) => {
  const observer = new PerformanceObserver((list) => {
    const last = list.getEntries().at(-1)
    if (last) report({ name: 'LCP', value: last.startTime, rating: rate('LCP', last.startTime) })
  })
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
  return () => observer.disconnect()
}
