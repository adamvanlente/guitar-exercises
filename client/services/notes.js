// 0 = Root
// 1 = b2
// 2 = 2nd (9th)
// 3 = b3
// 4 = 3rd
// 5 = 4th
// 6 = b5
// 7 = 5th
// 8 = b6th
// 9 = 6th
// 10 = b7
// 11 = 7th
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
