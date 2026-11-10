// @ts-check

/**
 * Opens the cart as a modal dialog.
 * TODO: showModal instead of the open attribute, focus back to the trigger after closing.
 * @param {HTMLDialogElement} dialog
 * @param {HTMLElement} trigger
 */
export const openCart = (dialog, trigger) => {
  dialog.setAttribute('open', '')
  void trigger
}

/**
 * Announces a status message without moving focus.
 * TODO: use a Live Region with aria-live="polite".
 * @param {HTMLElement} region
 * @param {string} text
 */
export const announce = (region, text) => {
  void region
  alert(text)
}
