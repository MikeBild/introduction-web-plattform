// @ts-check

/**
 * Enhances a working form: with JavaScript, the order goes out through fetch
 * and the page stays put. If the network fails, the regular submit of the browser takes over.
 * @param {HTMLFormElement} form
 * @param {typeof fetch} [fetchFn]
 * @returns {() => void} removes the enhancement again
 */
export const enhanceForm = (form, fetchFn = fetch) => {
  const status = form.querySelector('output')

  /** @param {SubmitEvent} event */
  const onSubmit = async (event) => {
    event.preventDefault()
    const button = form.querySelector('button[type="submit"]')
    button?.setAttribute('disabled', '')
    try {
      const response = await fetchFn(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { accept: 'application/json' },
      })
      if (!response.ok) {
        if (status) status.textContent = 'Die Bestellung ließ sich nicht abschließen. Prüf deine Angaben und versuch es noch einmal.'
        return
      }
      const order = await response.json()
      if (status) status.textContent = `Danke, deine Bestellung ${order.id} ist eingegangen.`
      form.reset()
    } catch {
      // Network error: fall back to the path without JavaScript
      form.submit()
    } finally {
      button?.removeAttribute('disabled')
    }
  }

  form.addEventListener('submit', onSubmit)
  return () => form.removeEventListener('submit', onSubmit)
}
