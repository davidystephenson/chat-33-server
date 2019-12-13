const express = require(
  'express'
)
const Message = require('./model')

const { Router } = express

const router = new Router()

router.get(
  '/message',
  (request, response, next) => {
    Message
      .findAll()
      .then(messages => {
        response.send(messages)
      })
      .catch(next)
  }
)

router.post('/message',
  (request, response, next) => {
    Message
      .create(request.body)
      .then(message => {
        response.send(message)
      })
      .catch(next)
  }
)

module.exports = router
