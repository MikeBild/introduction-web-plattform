*English · [Deutsch](README.de.md)*

# 09 · Streams instead of waiting

At `/api/products/stream`, the server delivers the products as NDJSON, that is, one JSON object per line, with a small delay. `start/ndjson.js` waits with `response.text()` until everything has arrived and trips over the empty last line.

## Task

1. Read `response.body` through `pipeThrough(new TextDecoderStream())` and `getReader()` in a loop.
2. Collect the text in a buffer, split it at `\n`, and keep the incomplete last line for the next chunk.
3. Deliver each object with `yield` as soon as its line is complete. Skip empty lines.
4. At the end, process the rest of the buffer in case the last line has no line break.
5. Release the reader in `finally` with `releaseLock()`.

Async iteration directly over `response.body` (`for await`) has been Baseline since September 2026. The loop with `getReader()` also runs in older browsers.

## Check

```bash
npm run test:start -- exercises/09-streams
```

In the browser: `npm start`, then in the console `for await (const p of readNdjson(await fetch('/api/products/stream'))) console.log(p)`.
