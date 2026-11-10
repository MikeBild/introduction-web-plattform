// @ts-check

/**
 * Runs a DOM change.
 * TODO: animate through document.startViewTransition; without the API and with
 * “prefers-reduced-motion: reduce”, run it immediately. Resolve as soon as the DOM is updated.
 * @param {() => void | Promise<void>} update
 * @returns {Promise<void>}
 */
export const transition = async (update) => {
  await update()
}

/**
 * TODO: give each card a unique view-transition-name: card-<data-product-id>.
 * @param {Iterable<HTMLElement>} cards elements with data-product-id
 */
export const nameCards = (cards) => {
  void cards
}
