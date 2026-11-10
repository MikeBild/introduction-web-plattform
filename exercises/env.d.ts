// Vite delivers files with ?raw as text. Only the tests use this, not the browser code.
declare module '*?raw' {
  const content: string
  export default content
}

// Trusted Types are still missing from the TypeScript DOM types. Just the minimum that exercise 18 uses.
interface TrustedHTML {
  readonly __brand: 'TrustedHTML'
  toString(): string
}

interface TrustedTypePolicy {
  readonly name: string
  createHTML(input: string): TrustedHTML
}

interface TrustedTypePolicyFactory {
  createPolicy(name: string, rules: { createHTML?: (input: string) => string }): TrustedTypePolicy
  isHTML(value: unknown): value is TrustedHTML
}

interface Window {
  trustedTypes?: TrustedTypePolicyFactory
}
