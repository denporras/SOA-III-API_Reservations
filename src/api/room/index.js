const express = require('express')
const router = express.Router()
const authenticate = require('../../auth')
const Room = require('../../models/room')

router.get('/rooms', (req, res) => {
  const username = req.header('User')
  const token = req.header('Token')
  authenticate(username, token).then(isLogged => {
    if (isLogged) {
      Room.find({}).then(result => {
        res.send({
          success: true,
          result
        })
      })
    } else {
      res.send({
        success: false,
        error: 'Error: Invalid Token!'
      })
    }
  }).catch((error) => {
    res.send({
      success: false,
      error: 'Error: Cant authenticate!'
    })
  })
})

router.post('/rooms', (req, res) => {
  const username = req.header('User')
  const token = req.header('Token')
  authenticate(username, token).then(isLogged => {
    if (isLogged) {
      const { name, code, floor } = req.body
      Room.create({
        name: name,
        code: code,
        floor, floor
      }).then(response => {
        res.send({
          success: true,
          response
        })
      })
    } else {
      res.send({
        success: false,
        error: 'Error: Invalid Token!'
      })
    }
  }).catch((error) => {
    res.send({
      success: false,
      error: 'Error: Cant authenticate!'
    })
  })
})

module.exports = router
