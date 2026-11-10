// @ts-check

/**
 * TODO: enhance the form instead of replacing it – intercept submit, send FormData through fetch to
 * form.action, show the result in the output, call form.submit() on a network error.
 * @param {HTMLFormElement} form
 * @param {typeof fetch} [fetchFn]
 * @returns {() => void} removes the enhancement again
 */
export const enhanceForm = (form, fetchFn = fetch) => {
  void form
  void fetchFn
  return () => {}
}
