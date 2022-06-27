const { Server } = require('socket.io')
const server = require('./server')
const io = new Server(server)
const Player = require('./models/player')
const Game = require('./models/game')

// fakeData - to be removed once DB Up and Running
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
// Currently getting hardcoded data
const getTopX = (data, n) => {
  const newArray = data.sort((a, b) => b.score - a.score).slice(0, n)
  return newArray
}

// creating an instance of the Game object
let game

io.on('connection', (socket) => {
  // limiting the number of players to a maximum of 'connectionsLimit'
  if (io.engine.clientsCount > Game.maxPlayers) {
    socket.emit('err', {
      message: `reached the limit of ${Game.maxPlayers} connections`,
    })
    socket.disconnect()
    console.log(`Client ${socket.id} has been disconnected`)
    return
  }

  console.log('a player just connected')
  console.log('clientid: ', socket.id)
  console.log('socket -> ', socket.handshake.query.name)

  // console.log('top 5', getTopX(results, 5))
  // save the connection Id and the player Name
  const playerId = socket.id
  const playerName = socket.handshake.query.name

  // create a new player and add them to the Game static array
  const player = new Player(playerId, playerName)
  Game.players.push(player)
  console.log('players: ', Game.players)

  socket.on('disconnect', () => {
    console.log('player disconnected, socket.id', socket.id)

    // remove player from list of players
    Game.removePlayerFromList(socket.id)

    // send notification so client can hide player that has left
    socket.emit('playerLeft', Game.players)
    console.log('player left, remaining players: ', Game.players)
  })

  // when the start button is pressed on the client;
  // 1. create the game object based on the client's options
  // 2. fetch the questions (async)
  // 3. send the first question to every client
  socket.on('start', async ({ category, difficulty, questionsAmount }) => {
    try {
      game = new Game(category, questionsAmount, difficulty)
      await game.fetchQuestions()
      const question = game.nextQuestion()

      console.log('***********', game.questionsList)
      console.log(`question is `, question)

      socket.emit('ready', question)
    } catch (err) {
      console.log('Error retrieving quizzes: ', err)
    }
  })

  // client asks for the next question (while sending the score for the previous Question eg 0, -1, +2)
  // if there are no more questions server should return
  // the local score and the top scores from the DB (to be implemented)
  socket.on('retrieveQuestion', ({ questionScore }) => {
    console.log('socket.js - questionScore -> ', questionScore)
    player.updatePlayerScore({ questionScore })
    console.log('playerScore ')
    const question = game.nextQuestion()
    if (question) {
      socket.emit('ready', question)
    } else {
      console.log('No questions left')
      // add player's details to the DB
      // Game.addScoreToDatabase(player)

      // tell the clients that there are no questions left
      // and return their score for the current game
      socket.emit('noQuestionsLeft', { score: player.getPlayerScore() })

      //reset the player's score in case they are staying for another game without disconnecting/reconnecting
      player.resetPlayerScore()
    }
  })

  //
  // won't be used, kept just for debugging
  socket.on('chat message', (msg) => {
    console.log('message: ', msg)
  })
})
