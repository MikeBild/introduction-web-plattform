// @ts-check

/**
 * TODO: return 16 random bytes from crypto.getRandomValues as Base64, new for every response.
 * @returns {string}
 */
export const createNonce = () => 'abc123'

/**
 * The current policy allows inline scripts and eval – so it protects against almost nothing.
 * TODO: nonce with strict-dynamic, object-src 'none', base-uri 'none', frame-ancestors 'none',
 * require-trusted-types-for 'script'; no unsafe-inline, no unsafe-eval.
 * @param {{ nonce: string }} options
 * @returns {string} value for the Content-Security-Policy header
 */
export const buildCsp = ({ nonce }) => {
  void nonce
  return `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'`
}
