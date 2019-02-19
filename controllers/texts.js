const textsRouter = require('express').Router()
const analyzer = require('../utils/analyzer')

textsRouter.post('/', (request, response, next) => {
  if (!('text' in request.body)) {
    response.status(400).send({error: 'No text field found'})
  }

  // Since analyzer is case sensitive, we convert the text to lowercase
  response.json(analyzer(request.body.text.toLowerCase()))
})

module.exports = textsRouter