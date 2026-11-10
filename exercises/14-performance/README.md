*English · [Deutsch](README.de.md)*

# 14 · Measure Core Web Vitals

The start page in `start/index.html` loads the large hero image lazily, of all things, and none of the images has fixed dimensions. That worsens two of the three Core Web Vitals: Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). The third, Interaction to Next Paint (INP), measures how quickly the page responds to input.

## Task

1. Make `rate(name, value)` rate by the official thresholds: LCP good up to 2,500 ms, needs improvement up to 4,000 ms; INP 200 and 500 ms; CLS 0.1 and 0.25.
2. Make `observeLcp(report)` create a `PerformanceObserver` for `largest-contentful-paint` with `buffered: true` and report the latest entry each time. Return a function that ends the observation.
3. Load the hero image in `start/index.html` right away with `fetchpriority="high"` and give all images `width` and `height`.
4. Load the product images with `loading="lazy"`.
5. Measure the page at `npm start` in the DevTools Performance panel, before and after.

The LCP API has been Baseline since December 2025, and so has Event Timing for INP. The Layout Instability API for CLS exists only in Chromium. For measurements with real users, you therefore usually use the `web-vitals` library.

## Check

```bash
npm run test:start -- exercises/14-performance
```
