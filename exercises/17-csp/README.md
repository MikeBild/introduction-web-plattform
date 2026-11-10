*English · [Deutsch](README.de.md)*

# 17 · Content Security Policy

The policy in `start/csp.js` allows `unsafe-inline` and `unsafe-eval`. That way every injected inline script runs, and the policy barely protects anything. A strict policy works with a nonce: only scripts that carry this random value may run.

## Task

1. Make `createNonce()` return 16 random bytes from `crypto.getRandomValues` as Base64.
2. Make `buildCsp({ nonce })` set `script-src 'nonce-…' 'strict-dynamic'`, without `unsafe-inline` and `unsafe-eval`.
3. Add `object-src 'none'`, `base-uri 'none'`, `frame-ancestors 'none'`, and `require-trusted-types-for 'script'`.
4. Start the server with `CSP=1 npm start`. It sends the policy from `solution/csp.js` as `Content-Security-Policy-Report-Only` and puts the nonce on every `<script>` of the shop page. That way the browser reports violations but blocks nothing – the usual first step with a new policy.
5. Open the console: which violations does the browser report? With `CSP=enforce npm start`, the server enforces the policy.

## Check

```bash
npm run test:start -- exercises/17-csp
```
