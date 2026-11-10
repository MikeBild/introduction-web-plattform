// @ts-check

/**
 * Runs a DOM change as a View Transition. Without the API or with
 * “prefers-reduced-motion: reduce”, the change runs immediately and without animation.
 * The promise resolves as soon as the DOM is updated.
 * @param {() => void | Promise<void>} update
 * @returns {Promise<void>}
 */
export const transition = async (update) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typeof document.startViewTransition !== 'function' || reduceMotion) {
    await update()
    return
  }
  await document.startViewTransition(update).updateCallbackDone
}

/**
 * Gives each card a unique view-transition-name so that the browser
 * can match them between the old and the new state.
 * @param {Iterable<HTMLElement>} cards elements with data-product-id
 */
export const nameCards = (cards) => {
  for (const card of cards) card.style.viewTransitionName = `card-${card.dataset.productId}`
}
