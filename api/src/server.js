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

// fakeData

const results = [
  { name: 'Mark', score: 58 },
  { name: 'Sue', score: 90 },
  { name: 'John', score: 80 },
  { name: 'George', score: 75 },
  { name: 'Manny', score: 85 },
  { name: 'Maurice', score: 100 },
  { name: 'Jenn', score: 80 },
  { name: 'Roy', score: 82 },
  { name: 'Monty', score: 74 },
  { name: 'James', score: 65 },
  { name: 'Claire', score: 78 },
  { name: 'Amanda', score: 92 },
  { name: 'Sarah', score: 66 },
]

const getTopX = (data, n) => {
  const newArray = data.sort((a, b) => b.score - a.score).slice(0, n)
  return newArray
}

// SOCKET.IO
// socket.io requires a raw server to be able to work, that's why
// we need to manually create one using the http module
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a player just connected')

  console.log('top 5', getTopX(results, 5))
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (msg) => {
    console.log('message: ', msg)
  })
})

module.exports = server
