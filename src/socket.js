const server = require('./server')
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
// https://about-time.netlify.app/
const Player = require('./models/player')
const Game = require('./models/game')

// creating an instance of the Game object
let game
Game.players = []

io.on('connection', (socket) => {
  // limiting the number of players to a maximum of 'connectionsLimit'
  if (io.engine.clientsCount > Game.maxPlayers) {
    socket.emit('err', {
      message: `reached the limit of ${Game.maxPlayers} connections`,
    })
    socket.emit('hostStatus', { hostStatus: false })
    socket.disconnect()
    console.log(`Client ${socket.id} has been disconnected`)
    return
  }

  if (Game.players.length === 0) {
    socket.emit('hostStatus', { hostStatus: true })
  } else {
    socket.emit('hostStatus', { hostStatus: false })
  }

  console.log('a player just connected')
  console.log('Players: ', Game.players)

  // save the connection Id and the player Name
  const playerId = socket.id
  const playerName = socket.handshake.query.name

  // create a new player and add them to the Game static array
  const player = new Player(playerId, playerName)
  Game.players.push(player)

  socket.on('disconnect', () => {
    Game.removePlayerFromList(socket.id)
  })

  // when the start button is pressed on the client;
  // 1. create the game object based on the client's options
  // 2. fetch the questions (async)
  // 3. send the questions to every client
  socket.on('start', async ({ category, difficulty, questionsAmount }) => {
    try {
      game = new Game(category, questionsAmount, difficulty)
      await game.fetchQuestions()

      console.log('Questions: \n', game.questionsList)
      io.emit('ready', { questions: game.questionsList, players: Game.players })
    } catch (err) {
      console.log('Error retrieving quizzes: ', err)
    }
  })

  socket.on('name', ({ name }) => {
    player.updatePlayerName(name)
    socket.emit('scoreBoard', Game.players)

    const firstPlayer = Game.players[0]
    const firstPlayerId = firstPlayer.id
    const currentPlayerId = socket.id

    if (currentPlayerId === firstPlayerId) {
      socket.emit('hostStatus', { hostStatus: true })
    }
  })

  socket.on('getPlayersData', ({ questionScore }) => {
    player.updatePlayerScore({ questionScore })
    socket.emit('scoreBoard', Game.players)

    const firstPlayer = Game.players[0]
    const firstPlayerId = firstPlayer.id
    const currentPlayerId = socket.id

    if (currentPlayerId === firstPlayerId) {
      socket.emit('hostStatus', { hostStatus: true })
    }
  })

  socket.on('gameover', () => {
    console.log('***** gameover - player -> ', player)

    Game.addScoreToDatabase(player)
    socket.disconnect()
    player.resetPlayerScore()

    Game.removePlayerFromList(socket.id)
  })
})
