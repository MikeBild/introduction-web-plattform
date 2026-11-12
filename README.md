*English · [Deutsch](README.de.md)*

# Exercises: Modern web platform

Exercise repo for the workshop “Modern web platform without a framework”. Each exercise has a starting point, tests, and a reference solution. All exercises build on the same example, the workshop shop.

## What you learn

- Write semantic HTML, accessibility, and modern CSS without a framework
- Use forms, `fetch`, Streams, and ES Modules directly in the browser
- Implement Web Components, offline support, Core Web Vitals, and security with CSP

## Prerequisites

- **Node.js 26** – `nvm use` reads the version from [`.nvmrc`](.nvmrc).
- Git and an editor with JavaScript and TypeScript support, e.g. VS Code
- a current browser with DevTools

## Setup

```bash
git clone https://github.com/MikeBild/introduction-web-plattform.git
cd introduction-web-plattform
npm install
npx playwright install chromium   # once: Chromium for the tests
npm run typecheck                  # type check with TypeScript strict
npm test                           # all tests against the reference solutions in solution/
npm start                          # shop at http://localhost:3000
```

## How to work on an exercise

Each exercise has a folder `start/` (your starting point) and `solution/` (the reference solution). The test sits next to them, imports from `solution/`, and with `TARGET=start` checks your folder `start/` instead.

```bash
npm run test:start                 # all tests against your solutions in start/
npm run test:start -- exercises/06-forms   # only one exercise
```

## Exercises

| No. | Exercise | Topic |
| --- | --- | --- |
| 01 | [semantic-html](exercises/01-semantic-html) | Product list with landmarks, headings, lists, links, and buttons |
| 02 | [accessibility](exercises/02-accessibility) | Cart as a `<dialog>`, focus back to the trigger, Live Region |
| 03 | [css-cascade](exercises/03-css-cascade) | Custom Properties, Cascade Layers, and Nesting |
| 04 | [css-layout](exercises/04-css-layout) | Product grid with Grid, cart row with Flexbox |
| 05 | [container-has](exercises/05-container-has) | Container Queries, `:has()`, and `:user-invalid` |
| 06 | [forms](exercises/06-forms) | Checkout with native validation and `FormData` |
| 07 | [esm-browser](exercises/07-esm-browser) | ES Modules, Import Map, and `modulepreload` |
| 08 | [fetch-abort](exercises/08-fetch-abort) | `fetch` with timeout, abort, and error status |
| 09 | [streams](exercises/09-streams) | Read NDJSON from a stream |
| 10 | [custom-elements](exercises/10-custom-elements) | `<shop-price>` and `<add-to-cart>` as Custom Elements |
| 11 | [shadow-dom](exercises/11-shadow-dom) | `<product-card>` with template, Shadow DOM, slots, and `::part` |
| 12 | [view-transitions](exercises/12-view-transitions) | Sorting as a View Transition with fallback |
| 13 | [storage-offline](exercises/13-storage-offline) | Cart in `localStorage`, cache strategies in the Service Worker |
| 14 | [performance](exercises/14-performance) | Rate Core Web Vitals, observe LCP, mark up images |

### Extra chapters

| No. | Exercise | Topic |
| --- | --- | --- |
| 15 | [progressive-enhancement](exercises/15-progressive-enhancement) | Checkout that works without JavaScript and gets better with it |
| 16 | [components-integration](exercises/16-components-integration) | `<cart-badge>` with a store connection for React and Knockout |
| 17 | [csp](exercises/17-csp) | Security: strict Content Security Policy with a nonce |
| 18 | [trusted-types](exercises/18-trusted-types) | Security: reviews without DOM XSS, a policy for Trusted Types |

01 to 14 form the core of the workshop. 17 and 18 belong to the security block.

## The workshop shop

A small shop for workshop supplies: product list, cart, checkout. Shared data lives in [`exercises/shop.js`](exercises/shop.js): the type `Product` (`id`, `name`, `priceCents`, `stock`), four sample products, and `formatCents`. Money is always stored in whole cents; only the display turns it into euros.

In [`app/`](app), the reference solutions come together as the shop. Start it with `npm start` and try keyboard navigation, sorting, the cart, and ordering, also with JavaScript turned off.

## No build, still checked

- **Browser code** is JavaScript with JSDoc types and `// @ts-check`. `npm run typecheck` checks it with TypeScript in `strict` mode, without compiling anything.
- **Server** (`server.ts`) is TypeScript that Node.js 26 runs directly. It serves `app/` and `exercises/` and offers a small API: `GET /api/products`, `GET /api/products/stream` (NDJSON), `POST /api/orders` (JSON, form, or FormData). With `CSP=1`, it sends the policy from exercise 17 as Report-Only; with `CSP=enforce`, it enforces it.
- **Tests** run with Vitest in browser mode in a real Chromium. That way they check real CSS, Shadow DOM, View Transitions, and the Cache API.

Deliberately few dependencies, all for development only:

| Package | Purpose |
| --- | --- |
| `vitest` | Test runner |
| `@vitest/browser-playwright` | runs the tests in a real browser instead of a DOM emulation |
| `playwright` | provides Chromium for browser mode |
| `typescript` | checks JSDoc types and `server.ts` |
| `@types/node` | types for `server.ts` |

Vite is only used inside Vitest. The app itself has no build tool.

## Browser support as of October 2026

All features in the core are Baseline, so they run in the current versions of Chrome, Edge, Firefox, and Safari. Checked against MDN’s Baseline data (`web-features` 3.44).

- **Baseline for years:** Custom Properties, Grid, Flexbox, Cascade Layers, `<dialog>`, Constraint Validation, `fetch`, Streams, ES Modules, Import Maps, Custom Elements, Shadow DOM, Service Worker
- **Available in all browsers since 2026:** `:has()`, CSS Nesting, `:user-invalid`, Declarative Shadow DOM, `AbortSignal.any` and `AbortSignal.timeout`
- **Newly Baseline:** same-document View Transitions (October 2025), LCP and Event Timing API (December 2025), Trusted Types (February 2026), async iteration over streams (September 2026)
- **Not Baseline yet:** cross-document View Transitions (no Firefox), Layout Instability API for CLS (Chromium only), Sanitizer API

## Workshop and slides

- Workshop (held in German): [“Modern web platform without a framework”](https://workshops.mikebild.dev/w/web-plattform/remote/)
- Slides: [slides.mikebild.dev/introduction-web-plattform.en](https://slides.mikebild.dev/introduction-web-plattform.en.html)
- PDF: [introduction-web-plattform.en.pdf](https://objects.upraft.mikebild.info/site-media/mikebild/decks/introduction-web-plattform/introduction-web-plattform.en.pdf)

## Archive

The material from 2010 to 2016, from the time the repo was called “Introduction to HTML5, CSS3 & ECMA”, is in the folder [`archive/`](archive) (HTML5 APIs, CSS3, ECMAScript 2015) and, with local examples and slides, in the branch [`archiv-lokal`](https://github.com/MikeBild/introduction-web-plattform/tree/archiv-lokal) – as a comparison of then and now: Application Cache, XHR2 and `float` layouts then, Service Worker, `fetch` and Grid today.

## Report a bug

Did you find a bug or have an idea? Open an [issue](https://github.com/MikeBild/introduction-web-plattform/issues). Please don’t report security vulnerabilities publicly; use the contact form on [mikebild.dev](https://www.mikebild.dev) instead.

## License

[MIT](LICENSE)
