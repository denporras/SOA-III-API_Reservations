const express = require('express')
const router = express.Router()
const authenticate = require('../../auth')
const Room = require('../../models/room')
const Reservation = require('../../models/reservation')

const getReservation = async (name, dates, username) => {
  const rooms = await Room.find({ name })
  let canReserve = false
  let reservation = ''
  for (const room of rooms) {
    const { code } = room

    let isFree = true
    for (const dateReserve of dates) {
      const { day, month, year } = dateReserve
      const reservationDate = await Reservation.find({ code, day, month, year })
      if (reservationDate.length != 0) {
        isFree = false
        break
      }
    }

    if (isFree) {
      reservation = code
      canReserve = true
      break
    }
  }
  if (canReserve) {
    await dates.map(async dateReserve => {
      const { day, month, year } = dateReserve
      await Reservation.create({
        code: reservation,
        day: day,
        month: month,
        year: year,
        username: username
      })
    })
    reservation = {
      success: true,
      reservation: reservation
    }
    return reservation
  } else {
    reservation = {
      success: false,
      message: 'Error: Room not available'
    }
    return reservation
  }
}

router.get('/reservations', (req, res) => {
  const username = req.header('User')
  const token = req.header('Token')
  authenticate(username, token).then(isLogged => {
    if (isLogged) {
      Reservation.find({username}).then(result => {
        res.send(result)
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

router.post('/reservations', (req, res) => {
  const username = req.header('User')
  const token = req.header('Token')
  authenticate(username, token).then(isLogged => {
    if (isLogged) {
      const { name, dates } = req.body
      getReservation(name, dates, username).then(reservation => {
        res.send(reservation)
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
