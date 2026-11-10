// @ts-check

/**
 * Reads an NDJSON response (one JSON object per line) and yields each object
 * as soon as its line is complete – not only at the end.
 * @param {Response} response
 * @returns {AsyncGenerator<unknown, void, undefined>}
 */
export async function* readNdjson(response) {
  if (!response.body) return
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
  let buffer = ''
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += value
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) if (line.trim()) yield JSON.parse(line)
    }
    if (buffer.trim()) yield JSON.parse(buffer)
  } finally {
    reader.releaseLock()
  }
}
