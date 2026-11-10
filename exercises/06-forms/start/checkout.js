// @ts-check

/**
 * @typedef {object} Checkout
 * @property {string} name
 * @property {string} email
 * @property {string} postalCode
 * @property {number} quantity
 */

/**
 * Tells the browser when the quantity exceeds the stock.
 * TODO: setCustomValidity with a message, an empty string when everything is fine.
 * @param {HTMLInputElement} input
 * @param {number} stock
 */
export const checkQuantity = (input, stock) => {
  void input
  void stock
}

/**
 * Reads the checkout form.
 * TODO: FormData instead of separate querySelector calls, quantity as a number.
 * @param {HTMLFormElement} form
 * @returns {Checkout}
 */
export const readCheckout = (form) => {
  void form
  throw new Error('Noch nicht umgesetzt: readCheckout')
}
