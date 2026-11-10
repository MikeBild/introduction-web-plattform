// @ts-check
import { describe, expect, it } from 'vitest'
import { readNdjson } from './solution/ndjson.js'

const encoder = new TextEncoder()

/** @param {string[]} chunks */
const responseFrom = (chunks) =>
  new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(encoder.encode(chunk))
        controller.close()
      },
    }),
  )

/** @param {AsyncIterable<unknown>} items */
const collect = async (items) => {
  const result = []
  for await (const item of items) result.push(item)
  return result
}

describe('Reading NDJSON from a stream', () => {
  it('yields one object per line, even when lines are split across chunks', async () => {
    const response = responseFrom(['{"id":"p-ham', 'mer"}\n{"id":', '"p-zange"}\n'])
    expect(await collect(readNdjson(response))).toEqual([{ id: 'p-hammer' }, { id: 'p-zange' }])
  })

  it('reads the last line even without a line break and skips empty lines', async () => {
    const response = responseFrom(['{"id":"p-bits"}\n\n', '{"id":"p-akku"}'])
    expect(await collect(readNdjson(response))).toEqual([{ id: 'p-bits' }, { id: 'p-akku' }])
  })

  it('yields the first object before the stream is done', async () => {
    /** @type {TransformStream<Uint8Array, Uint8Array>} */
    const pipe = new TransformStream()
    const writer = pipe.writable.getWriter()
    const items = readNdjson(new Response(pipe.readable))
    void writer.write(encoder.encode('{"id":"p-hammer"}\n'))
    const tooLate = new Promise((resolve) => setTimeout(() => resolve('zu spät'), 300))
    const first = await Promise.race([items.next(), tooLate])
    expect(first).toEqual({ value: { id: 'p-hammer' }, done: false })
    void writer.close()
    await items.return(undefined)
  })
})
