const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B']

const getRandomKey = () => {
  let notes = JSON.parse(JSON.stringify(ALL_NOTES))
  let randomIndex = Math.floor(Math.random() * notes.length)
  let splitArray = notes.splice(0, randomIndex);

  return notes.concat(splitArray)
}

const getAllKeys = () => {
  let keys = []
  ALL_NOTES.forEach((note, index) => {
    let notes = JSON.parse(JSON.stringify(ALL_NOTES))
    let splitArray = notes.splice(0, index);
    keys.push(notes.concat(splitArray))
  })

  return keys
}

export { getRandomKey, getAllKeys }
