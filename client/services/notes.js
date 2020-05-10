const getRandomKey = () => {
  const notes = ['A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  let randomIndex = Math.floor(Math.random() * notes.length)
  let splitArray = notes.splice(0, randomIndex);

  return notes.concat(splitArray)
}

export { getRandomKey }
