const express = require('express')
const cors = require('cors')

const server = express()
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.send('Welcome and have fun!')
})

module.exports = server
