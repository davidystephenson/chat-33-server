const express = require('express')
const bodyParser = require(
  'body-parser'
)

const messageRouter = require('./message/router')

const app = express()

const port = 4000

app.get(
  '/',
  (request, response) => {
    response.send('hello')
  }
)

const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(messageRouter)

app.listen(
  port,
  () => {
    console.log(
      `Listening on :${port}`
    )
  }
)
