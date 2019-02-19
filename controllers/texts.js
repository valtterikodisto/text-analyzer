const textsRouter = require('express').Router()
const analyzer = require('../utils/analyzer')

textsRouter.post('/', (request, response, next) => {
  if (!('text' in request.body)) {
    response.status(400).send({error: 'No text field found'})
  }

  response.json(analyzer(request.body.text))
})

module.exports = textsRouter