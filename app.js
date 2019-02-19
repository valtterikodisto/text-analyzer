const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const textsRouter = require('./controllers/texts')

app.use(bodyParser.json())
app.use('/analyze', textsRouter)

module.exports = app