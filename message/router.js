const express = require(
  'express'
)
const Message = require('./model')

const { Router } = express

function factory (stream) {
  const router = new Router()

  router.get(
    '/message',
    async (request, response, next) => {
      // Message
      //   .findAll()
      //   .then(messages => {
      //     response.send(messages)
      //   })
      //   .catch(next)

      try {
        const messages = await Message
          .findAll()

        response.send(messages)
      } catch (error) {
        next(error)
      }
    }
  )

  // router.post(
  //   '/message',
  //   async (request, response, next) => {
  //     try {
  //       const message = await Message
  //         .create(request.body)
  //
  //       response.send(message)
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  // )

  async function onPost (
    request, response, next
  ) {
    try {
      const message = await Message
        .create(request.body)
      
      const action = {
        type: 'NEW_MESSAGE',
        payload: message
      }

      const string = JSON.stringify(action)
      stream.send(string)

      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  router.post('/message', onPost)

  return router
}

module.exports = factory
