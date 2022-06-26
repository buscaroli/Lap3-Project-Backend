const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

// app.get('/', (req, res) => {
//   res.send('<h1>Welcome and have fun!</h1>')
// })

// SOCKET.IO
// socket.io requires a raw server to be able to work, that's why
// we need to manually create one using the http module
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a player just connected')
})

module.exports = server
