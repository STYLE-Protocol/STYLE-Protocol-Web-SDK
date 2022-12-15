import { readChunks } from './readChunks'

export const readRiffFile = (buffer, offset, parser) => {
  const dataWithoutOffset = buffer.slice(offset)
  const chunks = readChunks(dataWithoutOffset, parser)

  return chunks[0]
}
