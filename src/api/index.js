const express = require('express');
const router = express.Router()

const rooms = require('./room')
const reservation = require('./reservation')

router.use((req, res, next) => {
    next()
})

router.use(rooms)
router.use(reservation)

module.exports = router
