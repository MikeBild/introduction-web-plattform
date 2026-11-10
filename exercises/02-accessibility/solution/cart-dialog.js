// @ts-check

/**
 * Opens the cart as a modal dialog. showModal moves focus into the dialog,
 * makes the rest of the page inert, and closes on Escape.
 * @param {HTMLDialogElement} dialog
 * @param {HTMLElement} trigger
 */
export const openCart = (dialog, trigger) => {
  dialog.addEventListener('close', () => trigger.focus(), { once: true })
  dialog.showModal()
}

/**
 * Announces a status message without moving focus.
 * @param {HTMLElement} region
 * @param {string} text
 */
export const announce = (region, text) => {
  if (region.getAttribute('aria-live') !== 'polite') region.setAttribute('aria-live', 'polite')
  region.textContent = text
}
