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

module.exports = router
