const express = require('express')
const bodyParser = require(
  'body-parser'
)
const cors = require('cors')
const Sse = require('json-sse')

const Message = require('./message/model')
const messageRouterFactory = require('./message/router')

const app = express()

const port = 4000

const corsMiddleware = cors()
app.use(corsMiddleware)

const jsonParser = bodyParser.json()
app.use(jsonParser)

const stream = new Sse()
const messageRouter = messageRouterFactory(stream)
app.use(messageRouter)

app.get(
  '/stream',
  async (request, response, next) => {
    try {
      // Get array out of database
      const messages = await Message.findAll()

      const action = {
        type: 'ALL_MESSAGES',
        payload: messages
      }

      // Convert array into string - "serialize" it
      const string = JSON.stringify(action)

      // Prepare string to be sent to the client right after they *connect*
      stream.updateInit(string)

      // *Connect* the user to the stream
      stream.init(request, response)
    } catch (error) {
      next(error) // handle any errors
    }
  }
)

app.get(
  '/',
  (request, response) => {
    response.send('hello')
  }
)

app.listen(
  port,
  () => {
    console.log(
      `Listening on :${port}`
    )
  }
)
