// @ts-check

/**
 * Creates a nonce: 16 random bytes as Base64, new for every response.
 * @returns {string}
 */
export const createNonce = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...bytes))
}

/**
 * Builds a strict Content Security Policy based on a nonce.
 * Only scripts with this nonce run; whatever they load inherits the trust (strict-dynamic).
 * @param {{ nonce: string }} options
 * @returns {string} value for the Content-Security-Policy header
 */
export const buildCsp = ({ nonce }) =>
  [
    `default-src 'self'`,
    `script-src 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self'`,
    `img-src 'self' data:`,
    `object-src 'none'`,
    `base-uri 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `require-trusted-types-for 'script'`,
  ].join('; ')
