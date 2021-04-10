import { getRandomKey, getAllKeys } from './notes'

// Index to note
// 0 - 1
// 1 - Flat 2nd
// 2 - 2
// 3 - Flat or Minor Third
// 4 - 3
// 5 - 4
// 6 - Flat 5th/ #4
// 7 - 5
// 8 - Sharp 5th
// 9 - 6
// 10  - Flat or Minor 7th
// 11 - 7

const SCALE_TYPES = [
  {
    name: 'MAJ',
    type: 'IONIAN',
    notes: [0, 4, 7],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ 6th',
    type: 'IONIAN',
    notes: [0, 4, 7, 9],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ 7th',
    type: 'IONIAN',
    notes: [0, 4, 7, 11],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ 6/9',
    type: 'IONIAN',
    notes: [0, 2, 4, 7, 9],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ 7b5',
    type: 'Lydian',
    notes: [0, 4, 6, 11],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ 7#5',
    type: 'Lydian',
    notes: [0, 4, 8, 11],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MAJ add 9',
    type: 'IONIAN',
    notes: [0, 2, 4, 7],
    relative: {
      name: 'Minor',
      index: 9
    }
  },

  {
    name: 'MAJ 9th',
    type: 'IONIAN',
    notes: [0, 4, 7, 11, 2],
    relative: {
      name: 'Minor',
      index: 9
    }
  },
]

const CAGED_POSITIONS = [ 'C', 'A', 'G', 'E', 'D' ]
const getRandomShape = () => CAGED_POSITIONS[Math.floor(Math.random() * CAGED_POSITIONS.length)]

const getRandomArpeggiosIndex = () => Math.floor(Math.random() * SCALE_TYPES.length)

const getRandomArpeggios = (selectedArpeggios) => {
  return getScale(selectedArpeggios)
}

const getAllScaleNames = () => {
  let arr = []
  SCALE_TYPES.forEach(scale => {
    arr.push(scale.name)
  })

  return arr
}

const getSelectedScaleTypes = (selectedArpeggios) => {
  if (!selectedArpeggios) return SCALE_TYPES

  let arr = []
  SCALE_TYPES.forEach(scale => {
    let index = selectedArpeggios.indexOf(scale.name)
    if (index !== -1) {
      arr.push(scale)
    }
  })

  return arr
}

const getScale = (selectedArpeggios) => {

  let key = getRandomKey()
  let scaleTypes = getSelectedScaleTypes(selectedArpeggios)
  let index = Math.floor(Math.random() * scaleTypes.length)
  let scale = scaleTypes[index]

  let scaleNotes = []
  let scaleChords = {}

  scale.notes.forEach((noteIndex, index) => {
    let note = key[noteIndex]
    scaleNotes.push(note)
  })

  let relative = {}
  if (scale.relative) {
    relative.name = scale.relative.name
    relative.note = key[scale.relative.index]
  }

  let keyName = key[0]
  if (scale.name === 'MINOR') keyName = `${keyName}m`

  return {
    key: keyName,
    name: scale.name,
    type: scale.type,
    shape: getRandomShape(),
    notes: scaleNotes,
    chords: scaleChords,
    relative: relative
  }
}

export { getRandomArpeggios, getAllScaleNames }
