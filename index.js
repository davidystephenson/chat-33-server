const express = require('express')
const bodyParser = require(
  'body-parser'
)
const Sse = require('json-sse')

const Message = require('./message/model')
const messageRouterFactory = require('./message/router')

const app = express()

const port = 4000

const stream = new Sse()
const messageRouter = messageRouterFactory(stream)

app.get(
  '/',
  (request, response) => {
    stream.send('hi')

    response.send('hello')
  }
)

app.get(
  '/stream',
  async (request, response, next) => {
    try {
      // Get array out of database
      const messages = await Message.findAll()

      // Convert array into string - "serialize" it
      const string = JSON.stringify(messages)

      // Prepare string to be sent to the client right after they *connect*
      stream.updateInit(string)

      // *Connect* the user to the stream
      stream.init(request, response)
    } catch (error) {
      next(error) // handle any errors
    }
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
