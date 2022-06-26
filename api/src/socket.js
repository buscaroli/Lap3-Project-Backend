const { Server } = require('socket.io')
const server = require('./server')
const io = new Server(server)

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

// returns the users in the topX (top5: getTopX(results, 5))
const getTopX = (data, n) => {
  const newArray = data.sort((a, b) => b.score - a.score).slice(0, n)
  return newArray
}

const connectionsLimit = 3

io.on('connection', (socket) => {
  // limiting the number of players to a maximum of 'connectionsLimit'
  if (io.engine.clientsCount > connectionsLimit) {
    socket.emit('err', {
      message: `reached the limit of ${connectionsLimit} connections`,
    })
    socket.disconnect()
    console.log(`Client ${socket.id} has been disconnected`)
    return
  }

  console.log('a player just connected')
  console.log('clientid: ', socket.id)
  console.log('top 5', getTopX(results, 5))

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', (msg) => {
    console.log('message: ', msg)
  })
})
