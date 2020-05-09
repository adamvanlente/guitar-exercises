const NOTES = ['A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const MAJOR_SCALES = [
  {
    key: 'C',
    relative_minor: 'Am',
    modes: [],
    notes: []
  },
  {
    key: 'G',
    relative_minor: 'Em',
    modes: [],
    notes: []
  },
  {
    key: 'D',
    relative_minor: 'Bm',
    modes: [],
    notes: []
  },
  {
    key: 'A',
    relative_minor: 'F#m',
    modes: [],
    notes: []
  },
  {
    key: 'E',
    relative_minor: 'C#m',
    modes: [],
    notes: []
  },
  {
    key: 'B (C♭)',
    relative_minor: 'G#m',
    modes: [],
    notes: []
  },
  {
    key: 'G♭ (F#)',
    relative_minor: 'E♭m',
    modes: [],
    notes: []
  },
  {
    key: 'D♭ (C#)',
    relative_minor: 'B♭m',
    modes: [],
    notes: []
  },
  {
    key: 'A♭',
    relative_minor: 'Fm',
    modes: [],
    notes: []
  },
  {
    key: 'E♭',
    relative_minor: 'Cm',
    modes: [],
    notes: []
  },
  {
    key: 'B♭',
    relative_minor: 'Gm',
    modes: [],
    notes: []
  },
  {
    key: 'F',
    relative_minor: 'Dm',
    modes: [],
    notes: []
  }
]

const CAGED_POSITIONS = [
  'C', 'A', 'G', 'E', 'D'
]

const SCALE_TYPES = [
  'MAJOR', 'PENTATONIC'
]


const getRandomExercise = () => {
  let randomScale = MAJOR_SCALES[Math.floor(Math.random() * MAJOR_SCALES.length)]
  let randomShape = CAGED_POSITIONS[Math.floor(Math.random() * CAGED_POSITIONS.length)]
  let scaleType = SCALE_TYPES[Math.floor(Math.random() * SCALE_TYPES.length)]

  return {
    scale: randomScale,
    shape: randomShape,
    type: scaleType
  }
}

export default { getRandomExercise }
