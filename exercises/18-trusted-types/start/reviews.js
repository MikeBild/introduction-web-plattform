// @ts-check

/**
 * @typedef {object} Review
 * @property {string} author
 * @property {string} text
 */

/**
 * Shows a review.
 * TODO: insert text through textContent instead of innerHTML.
 * @param {HTMLElement} element
 * @param {Review} review
 */
export const renderReview = (element, review) => {
  element.innerHTML = `<blockquote>${review.text}</blockquote><p>– ${review.author}</p>`
}

/**
 * @typedef {object} HtmlPolicy
 * @property {(input: string) => TrustedHTML | string} createHTML
 */

/**
 * TODO: create the policy “shop” through factory.createPolicy; createHTML escapes &, <, >, " and '.
 * Without factory, return an object with the same createHTML function.
 * @param {TrustedTypePolicyFactory | undefined} factory window.trustedTypes, if available
 * @returns {HtmlPolicy}
 */
export const createShopPolicy = (factory) => {
  void factory
  return { createHTML: (input) => input }
}
