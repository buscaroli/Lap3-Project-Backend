const express = require('express')
const router = express.Router()

const Game = require('../models/game')

router.get('/', async (req, res) => {
  try {
    const leaderboard = await Game.getLeaderboard()
    console.log('** Leaderboard ** ', leaderboard)
    res.send(leaderboard)
  } catch (err) {
    console.log({ err })
  }
})

module.exports = router
