import { getRandomKey } from './notes'
import { getAllScalesForAllKeys } from './scales'

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
    name: 'MAJOR 7',
    symbol: 'maj7',
    notes: [0, 4, 7, 11]
  },
  {
    name: 'MINOR 7',
    symbol: 'm7',
    notes: [0, 3, 7, 11]
  },
  // {
  //   name: 'add9',
  //   symbol: 'add9',
  //   notes: [0, 4, 7, 2]
  // },
  {
    name: '9',
    symbol: '9',
    notes: [0, 4, 7, 10, 2]
  },
  {
    name: 'MINOR 9',
    symbol: 'm9',
    notes: [0, 3, 7, 10, 2]
  },
  {
    name: '11',
    symbol: '11',
    notes: [0, 4, 7, 10, 2, 5]
  },
  {
    name: 'MINOR 11',
    symbol: 'm11',
    notes: [0, 3, 7, 10, 2, 5]
  },
  {
    name: '13',
    symbol: '13',
    notes: [0, 10, 2, 5, 9]
  }
]

const CHORD_PROGRESSIONS = [
  {
    name: 'I-V-vi-IV',
    chordIndices: [0, 4, 5, 3]
  },
  {
    name: 'I-IV-V',
    chordIndices: [0, 3, 5]
  },
  {
    name: 'I-vi-IV-V',
    chordIndices: [0, 5, 3, 4]
  },
  {
    name: 'vi-IV-I-V',
    chordIndices: [5, 3, 0, 4]
  },
  {
    name: 'I-IV-vi-V',
    chordIndices: [0, 3, 5, 4]
  },
  {
    name: 'II-V-I',
    chordIndices: [1, 4, 0]
  },
  {
    name: 'II-V-I',
    chordIndices: [1, 4, 0]
  },
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

  let relatedProgressions = relatedChordProgressions(key[0], chord)

  return {
    key: key[0],
    chord: chord,
    shape: getRandomShape(),
    notes: chordNotes,
    progressions: relatedProgressions
  }
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

const relatedChordProgressions = (key, chord) => {
  let matchValue = `${key}${chord.symbol}`
  let allScales = getAllScalesForAllKeys()
  let keyScales = []

  allScales.forEach(scale => {
    let chords = scale.chords
    if (chords) {
      for (let series in chords) {
        let chordSeries = chords[series]
        if (chordSeries.indexOf(matchValue) != -1) {
          keyScales.push(chordSeries)
        }
      }
    }
  })

  let keyProgressions = []
  let progressions = JSON.parse(JSON.stringify(CHORD_PROGRESSIONS))
  progressions.forEach((prog) => {
    keyScales.forEach((scale) => {

      let chords = []
      prog.chordIndices.forEach((chordIndex) => {
        chords.push(scale[chordIndex])
      })

      let chordProgression = {
        name: `${prog.name} in key of ${scale[0]}`,
        chords: chords
      }

      keyProgressions.push(chordProgression)
    })
  })

  const validProgressions = keyProgressions.filter(prog => prog.chords.indexOf(matchValue) != -1);
  shuffleArray(validProgressions)
  let sampleSet = validProgressions.splice(0, 3);

  return sampleSet
}

export { getRandomChord }
