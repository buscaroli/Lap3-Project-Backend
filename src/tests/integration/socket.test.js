const { createServer } = require('http')
const { Server } = require('socket.io')
const Client = require('socket.io-client')

const Game = require('../../models/game')
const Player = require('../../models/player')

describe('socket.io', () => {
  let io, serverSocket, clientSocket

  beforeAll((done) => {
    const httpServer = createServer()
    io = new Server(httpServer)
    httpServer.listen(() => {
      const port = httpServer.address().port
      clientSocket = new Client(`http://localhost:${port}`)
      io.on('connection', (socket) => {
        serverSocket = socket
      })
      clientSocket.on('connect', done)
    })
  })

  afterAll(() => {
    io.close()
    clientSocket.close()
  })

  it('tests the server receives data on start message', (done) => {
    serverSocket.on('start', (data) => {
      expect(data.category).toBe(11)
      done()
    })
    clientSocket.emit('start', {
      category: 11,
      difficulty: 'medium',
      questionsAmount: 12,
    })
  })

  // it('tests the server receives the socket id on connection', (done) => {
  //   serverSocket.on('connection', (abc) => {
  //     console.log('=*=*= ', abc)
  //     expect(abc).toEqual('socket msg')
  //     done()
  //   })
  //   clientSocket.emit('connection', 'socket msg')
  // })

  test('should create a player', (done) => {
    serverSocket.on('connection', (data) => {
      const player = new Player(data.id, data.name)
      expect(player.name).toBe('John')
      done()
    })
    clientSocket.emit('connection', { id: 'qwe123', name: 'John' })
  })
})
