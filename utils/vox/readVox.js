import { groupArray } from './groupArray'
import { readRiffFile } from './readRiffFile'
import { parseVoxChunk } from './parseVoxChunk'
import { removeRiffStructure } from './removeRiffStructure'

export const readVox = (buffer) => {
  const BLOCK_SIZE = 4
  const OFFSET = 8 // VOX <space> 150 0 0 0

  const data = [...buffer] // convert buffer to array
  const tokens = groupArray(data, BLOCK_SIZE)

  const riffData = readRiffFile(data, OFFSET, parseVoxChunk)
  riffData.children = riffData.children.map((chunk, index) => ({
    ...chunk,
    index,
  }))
  return removeRiffStructure(riffData)
}
