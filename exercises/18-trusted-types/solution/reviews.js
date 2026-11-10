// @ts-check

/**
 * @typedef {object} Review
 * @property {string} author
 * @property {string} text
 */

/**
 * Shows a review. Untrusted text only reaches the DOM through textContent,
 * never through innerHTML – that way “<img onerror=…>” just becomes text.
 * @param {HTMLElement} element
 * @param {Review} review
 */
export const renderReview = (element, review) => {
  const quote = document.createElement('blockquote')
  quote.textContent = review.text
  const author = document.createElement('p')
  author.textContent = `– ${review.author}`
  element.replaceChildren(quote, author)
}

/** @param {string} value */
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

/**
 * @typedef {object} HtmlPolicy
 * @property {(input: string) => TrustedHTML | string} createHTML
 */

/**
 * Creates the only place where a string may become HTML.
 * Under require-trusted-types-for 'script', innerHTML and friends only accept TrustedHTML.
 * @param {TrustedTypePolicyFactory | undefined} factory window.trustedTypes, if available
 * @returns {HtmlPolicy}
 */
export const createShopPolicy = (factory) => {
  if (!factory) return { createHTML: escapeHtml }
  return factory.createPolicy('shop', { createHTML: escapeHtml })
}
