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
  // console.log('***** ***** *****', socket.handshake.query.name)
  if (Game.players.length === 0) {
    // if (socket.handshake.query.name === 'admin') {
    socket.emit('hostStatus', { hostStatus: true })
  } else {
    socket.emit('hostStatus', { hostStatus: false })
  }

  console.log('a player just connected')
  console.log('clientid: ', socket.id)
  console.log('socket -> ', socket.handshake.query.name)

  // save the connection Id and the player Name
  const playerId = socket.id
  const playerName = socket.handshake.query.name

  // create a new player and add them to the Game static array
  const player = new Player(playerId, playerName)
  Game.players.push(player)
  console.log('players: ', Game.players)

  socket.on('disconnect', () => {
    let hostId = Game.getHostId()
    let currentPlayerId = socket.id

    // console.log('player0 id: ', Game.players[0].id)
    console.log('socket.js player id: ', socket.id)

    // send notification that the host has left
    // if (currentPlayerId === hostId) {
    //   console.log('host Has Left')
    //   if (Game.players.length > 0) {
    //     console.log('newHost id: ', Game.players[0].id)
    //     socket.emit('hostHasLeft', { id: Game.players[0].id })
    //   }
    // } else {
    //   // send notification so client can hide player that have left
    //   socket.emit('playerHasLeft', Game.players)
    //   console.log('player left, remaining players: ', Game.players)
    // }

    // remove player from list of players
    Game.removePlayerFromList(socket.id)
  })

  // when the start button is pressed on the client;
  // 1. create the game object based on the client's options
  // 2. fetch the questions (async)
  // 3. send the first question to every client
  socket.on('start', async ({ category, difficulty, questionsAmount }) => {
    try {
      game = new Game(category, questionsAmount, difficulty)
      await game.fetchQuestions()

      console.log('***********', game.questionsList)
      io.emit('ready', { questions: game.questionsList, players: Game.players })
    } catch (err) {
      console.log('Error retrieving quizzes: ', err)
    }
  })

  // client asks for the next question (while sending the score for the previous Question eg 0, -1, +2)
  // if there are no more questions server should return
  // the local score and the top scores from the DB (to be implemented)
  // socket.on('retrieveQuestion', ({ questionScore }) => {
  //   console.log('socket.js - questionScore -> ', questionScore)

  //   player.updatePlayerScore({ questionScore, score: player.getPlayerScore() })
  //   console.log('playerScore ')
  //   // const question = game.nextQuestion()
  //   if (question) {
  //     io.emit('ready', { question, playersData: Game.players })
  //   } else {
  //     console.log('No questions left')
  //     // add player's details to the DB
  //     // comment out until DB setup properly
  //     console.log('*=*=* ', player)
  //     console.log('AAAAAAAA ', Game.players)
  //     Game.addScoreToDatabase(player)

  //     // tell the clients that there are no questions left
  //     // and return their score for the current game
  //     socket.emit('noQuestionsLeft', {
  //       score: player.getPlayerScore(),
  //       playersData: Game.players,
  //     })

  //     //reset the player's score in case they are staying for another game without disconnecting/reconnecting
  //     player.resetPlayerScore()
  //   }

  socket.on('name', ({ name }) => {
    console.log('getPlayersData -> ', Game.players)
    console.log('AAAAAA ', socket.id)
    console.log('BBBBBB', name)
    Game.updatePlayerName(socket.id, name)
    socket.emit('scoreBoard', Game.players)
  })

  socket.on('getPlayersData', ({ questionScore }) => {
    console.log('getPlayersData -> ', Game.players)
    console.log('** ** ', questionScore)
    player.updatePlayerScore({ questionScore })
    socket.emit('scoreBoard', Game.players)
  })

  socket.on('gameover', () => {
    console.log('gameover - player -> ', player)

    Game.addScoreToDatabase(player)

    socket.emit('scoreBoard', Game.players)

    console.log('resetting player score (BEFORE) :', player.getPlayerScore())
    player.resetPlayerScore()
    // console.log('resetting player score (AFTER) :', player.getPlayerScore())
  })
})
