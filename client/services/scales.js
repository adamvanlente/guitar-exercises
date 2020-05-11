import { getRandomKey, getAllKeys } from './notes'

const SCALE_TYPES = [
  {
    name: 'MAJOR',
    type: 'Standard',
    notes: [0, 2, 4, 5, 7, 9, 11],
    chords: {
      standard: ['', 'm', 'm', '', '', 'm', 'm' ],
      seven: ['maj7', 'm7', 'm7', '7', '7', 'm7', 'm7' ],
      nine: ['9', 'm9', 'm9', '9', '9', 'm9', 'm9' ],
      eleven: ['11', 'm11', 'm11', '11', '11', 'm11', 'm11' ],
      thirteen: ['13', 'm13', 'm13', '13', '13', 'm13', 'm13' ]
    },
    relative: {
      name: 'Minor',
      index: 9
    }
  },
  {
    name: 'MINOR',
    type: 'Standard',
    notes: [0, 2, 3, 5, 7, 8, 10],
    chords: {
      standard: ['m', 'm', '', 'm', 'm', '', '' ],
      seven: ['m7', 'm7', 'maj7', 'm7', 'm7', '7', '7' ],
      nine: ['m9', 'm9', '9', 'm9', 'm9', '9', '9' ],
      eleven: ['m11', 'm11', '11', 'm11', 'm11', '11', '11' ],
      thirteen: ['m13', 'm13', '13', 'm13', 'm13', '13', '13' ]
    },
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

const getRandomScaleIndex = () => Math.floor(Math.random() * SCALE_TYPES.length)

const getRandomScale = () => {
  let index = getRandomScaleIndex()
  return getScale(index)
}

const getScale = (index, key) => {
  key = key || getRandomKey()
  let scale = SCALE_TYPES[index]

  let scaleNotes = []
  let scaleChords = {}

  scale.notes.forEach((noteIndex, index) => {
    let note = key[noteIndex]
    scaleNotes.push(note)

    if (scale.chords) {
      for (let chordType in scale.chords) {

        let chordArray = scale.chords[chordType]
        let chord = chordArray[index]

        if (!scaleChords[chordType]) scaleChords[chordType] = []
        scaleChords[chordType].push(`${note}${chord}`)
      }
    }

  })

  let keyName = key[0]
  if (scale.name === 'MINOR') keyName = `${keyName}m`

  return {
    key: keyName,
    name: scale.name,
    type: scale.type,
    shape: getRandomShape(),
    notes: scaleNotes,
    chords: scaleChords,
    relative: scale.relative
  }
}

const getAllScalesForAllKeys = () => {
  let allScalesAndKeys = []
  let allKeys = getAllKeys()
  allKeys.forEach((key, keyIndex) => {
    SCALE_TYPES.forEach((item, scaleIndex) => {
      if (item.type == 'Standard') {
        let scale = getScale(scaleIndex, key)
        allScalesAndKeys.push(scale)
      }
    })
  })

  return allScalesAndKeys
}

export { getRandomScale, getAllScalesForAllKeys }
