import { getRandomKey } from './notes'
import { getAllScalesForAllKeys } from './scales'

const ARPEGGIO_TYPES = [
  {
    name: '7th, 1-7 Arpeggio',
    symbol: '7',
    notes: [0, 4, 7, 10]
  },
  {
    name: 'maj7th, 1-7 Arpeggio',
    symbol: 'maj7',
    notes: [0, 4, 7, 11]
  },
  {
    name: 'm7th, 1-7 Arpeggio',
    symbol: 'm7',
    notes: [0, 3, 7, 10]
  },
  {
    name: '7th, 3-9 Arpeggio',
    symbol: '7',
    notes: [2, 4, 7, 10]
  },
  {
    name: 'maj7th, 3-9 Arpeggio',
    symbol: 'maj7',
    notes: [2, 4, 7, 11]
  },
  {
    name: 'm7th, 3-9 Arpeggio',
    symbol: 'm7',
    notes: [2, 3, 7, 10]
  }
]

const getStringsToFocusOn = () => {
 const stringsToStartFrom = [6, 5, 4, 3]
 const index = Math.floor(Math.random() * stringsToStartFrom.length)
 const startingString = stringsToStartFrom[index]

 return [ startingString, startingString - 1, startingString -2 ]
}

const getRandomArpeggios = () => {
  let key = getRandomKey()

  let chordIndex = Math.floor(Math.random() * ARPEGGIO_TYPES.length)
  let chord = ARPEGGIO_TYPES[chordIndex]
  let chordNotes = []
  chord.notes.forEach(noteIndex => {
    let note = key[noteIndex]
    chordNotes.push(note)
  })



  return {
    key: key[0],
    chord: chord,
    notes: chordNotes,
    strings: getStringsToFocusOn()
  }
}

export { getRandomArpeggios }
