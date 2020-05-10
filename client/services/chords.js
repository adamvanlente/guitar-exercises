import { getRandomKey } from './notes'

const CHORD_TYPES = [
  {
    name: 'MAJOR',
    symbol: '',
    notes: [0, 4, 7]
  },
  {
    name: 'MINOR',
    symbol: 'm',
    notes: [0, 3, 7]
  },
  {
    name: '7',
    symbol: '7',
    notes: [0, 4, 7, 10]
  },
  {
    name: 'MAJ7',
    symbol: 'MAJ7',
    notes: [0, 4, 7, 11]
  },
  {
    name: 'add9',
    symbol: 'add9',
    notes: [0, 4, 7, 2]
  },
  {
    name: '9',
    symbol: '9',
    notes: [0, 4, 7, 10, 2]
  },
  {
    name: '11',
    symbol: '11',
    notes: [0, 4, 7, 10, 2, 5]
  },
  {
    name: '13',
    symbol: '13',
    notes: [0, 10, 2, 5, 9]
  }
]

const CAGED_POSITIONS = [ 'C', 'A', 'G', 'E', 'D' ]
const getRandomShape = () => CAGED_POSITIONS[Math.floor(Math.random() * CAGED_POSITIONS.length)]

const getRandomChord = () => {
  let key = getRandomKey()

  let chordIndex = Math.floor(Math.random() * CHORD_TYPES.length)
  let chord = CHORD_TYPES[chordIndex]
  let chordNotes = []
  chord.notes.forEach(noteIndex => {
    let note = key[noteIndex]
    chordNotes.push(note)
  })

  return {
    key: key[0],
    chord: chord,
    shape: getRandomShape(),
    notes: chordNotes
  }
}

export { getRandomChord }
