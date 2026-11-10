// @ts-check
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

// The tests import from ./solution/. With TARGET=start, this plugin redirects
// every such import to ./start/ – that way the same test checks your solution.
const target = process.env.TARGET === 'start' ? 'start' : 'solution'

/** @returns {import('vite').Plugin} */
const targetFolder = () => ({
  name: 'target-folder',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (target !== 'start' || !source.startsWith('./solution/')) return null
    return this.resolve(source.replace('./solution/', './start/'), importer, { ...options, skipSelf: true })
  },
})

export default defineConfig({
  plugins: [targetFolder()],
  test: {
    include: ['exercises/*/*.test.js'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      screenshotFailures: false,
    },
  },
})
