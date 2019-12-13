const express = require(
  'express'
)
const Message = require('./model')

const { Router } = express

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

    const messages = await Message
      .findAll()

    response.send(messages)
  }
)

router.post('/message',
  async (request, response, next) => {
    const message = await Message
      .create(request.body)

    response.send(message)
  }
)

module.exports = router
