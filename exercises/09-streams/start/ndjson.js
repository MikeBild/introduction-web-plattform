// @ts-check

/**
 * Reads an NDJSON response (one JSON object per line).
 * TODO: read the stream with TextDecoderStream and getReader, buffer lines,
 * yield each object as soon as its line is complete. Skip empty lines.
 * @param {Response} response
 * @returns {AsyncGenerator<unknown, void, undefined>}
 */
export async function* readNdjson(response) {
  const text = await response.text()
  for (const line of text.split('\n')) yield JSON.parse(line)
}
