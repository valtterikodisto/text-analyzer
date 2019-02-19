const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('data is received and parsed correctly', async () => {
  test('data is received in json', async () => {
    await api
      .post('/analyze')
      .send({"text": ""})
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('text with letters, numbers and spaces is parsed correctly', async () => {
    const expected = {
      "textLength":{"withSpaces":15,"withoutSpaces":11},
      "wordCount":3,
      "characterCount":[{"e":2},{"h":1},{"i":1},{"l":2},{"m":1},{"o":1},{"s":1},{"t":1}]
    }
    const response = await api
      .post('/analyze')
      .send({"text": "hello 2 times  "})
    
      expect(response.body).toEqual(expected)
  })

  test('text that includes special characters is parsed correctly', async () => {
    const expected = {
      "textLength":{"withSpaces":13,"withoutSpaces":10},
      "wordCount":3,
      "characterCount":[{"H":1},{"U":1},{"e":1},{"l":2},{"o":1}]
    }
    const response = await api
      .post('/analyze')
      .send({"text": "#) Hello 2 U!"})
    
    expect(response.body).toEqual(expected)
  })

  test('text that includes only one character is parsed correctly', async () => {
    const expected = {
      "textLength":{"withSpaces":3,"withoutSpaces":1},
      "wordCount":1,
      "characterCount":[{"h": 1}]
    }
    const response = await api
      .post('/analyze')
      .send({"text": " h "})
    
    expect(response.body).toEqual(expected)
  })

  test('an empty text is parsed correctly', async () => {
    const expected = {
      "textLength":{"withSpaces":1,"withoutSpaces":0},
      "wordCount":0,
      "characterCount":[]
    }
    const response = await api
      .post('/analyze')
      .send({"text": " "})
    
    expect(response.body).toEqual(expected)
  })

  test('data without text field is handled correctly', async () => {
    await api
      .post('/analyze')
      .send({"notText": "There will be no text field"})
      .expect(400)
  })
})