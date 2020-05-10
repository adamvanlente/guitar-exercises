import { getRandomKey } from './notes'

const SCALE_TYPES = [
  {
    name: 'MAJOR',
    type: 'Standard',
    notes: [0, 2, 4, 5, 7, 9, 11],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MINOR',
    type: 'Standard',
    notes: [0, 2, 3, 5, 7, 8, 10],
    relative: {
      name: 'Major',
      index: 3
    }
  },
  {
    name: 'MAJOR',
    type: 'Pentatonic',
    notes: [0, 2, 4, 7, 9],
    relative: {
      name: 'Minor Pentatonic',
      index: 9
    }
  },
  {
    name: 'MINOR',
    type: 'Pentatonic',
    notes: [0, 3, 5, 7, 10],
    relative: {
      name: 'Major Pentatonic',
      index: 3
    }
  }
]

const CAGED_POSITIONS = [ 'C', 'A', 'G', 'E', 'D' ]
const getRandomShape = () => CAGED_POSITIONS[Math.floor(Math.random() * CAGED_POSITIONS.length)]

const getRandomScale = () => {
  let key = getRandomKey()

  let scaleIndex = Math.floor(Math.random() * SCALE_TYPES.length)
  let scale = SCALE_TYPES[scaleIndex]

  let scaleNotes = []
  scale.notes.forEach(noteIndex => {
    let note = key[noteIndex]
    scaleNotes.push(note)
  })

  let keyName = key[0]
  if (scale.name === 'MINOR') keyName = `${keyName}m`

  return {
    key: keyName,
    name: scale.name,
    type: scale.type,
    shape: getRandomShape(),
    notes: scaleNotes,
    relative: scale.relative
  }
}

export { getRandomScale }
