const express = require('express')
const messageRouter = require('./message/router')

const app = express()

const port = 4000

app.get(
  '/',
  (request, response) => {
    response.send('hello')
  }
)

app.use(messageRouter)

app.listen(
  port,
  () => {
    console.log(
      `Listening on :${port}`
    )
  }
)
