const analyzer = text => {
  return {
    "textLength": {
      "withSpaces": lengthWithSpaces(text),
      "withoutSpaces": lengthWithoutSpaces(text)
    },
    "wordCount": wordCount(text),
    "characterCount": characterCount(text)
  }
}

const lengthWithSpaces = text => text.length
const lengthWithoutSpaces = text => textWithoutSpaces(text).length

const wordCount = text => {
  const trimmedText = text.replace(/[^0-9a-z\s]/gi, '').trim()
  return trimmedText.length > 0 
    ? trimmedText.split(/\W+/g).length
    : 0
}

const characterCount = text => {
  const characters = textWithoutSpaces(text)
    .replace(/[^a-z]+/gi, '')
    .split('')
    .sort()

  let countedCharacters = []
  
  let character = characters.length > 0 ? characters[0] : null
  let counter = 1
  // This way we need to push to the array maximum of 26 times regardless of the text's length
  for (let i = 1; i < characters.length; i++) {
    if (characters[i] === character) counter++
    else {
      countedCharacters.push({[character]: counter})
      character = characters[i]
      counter = 1
    }
  }
  if (character) countedCharacters.push({[character]: counter})

  return countedCharacters
}

const textWithoutSpaces = text => {
  return text
    .trim()
    .replace(/\s+/g, '')
}


module.exports = analyzer