const { Server } = require('socket.io')
const server = require('./server')
const io = new Server(server)
const Player = require('./models/player')
const Game = require('./models/game')

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

// max number of players
const connectionsLimit = 4
let game
let playersIds = []
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
  console.log('socket -> ', socket.handshake.query.name)
  // console.log('top 5', getTopX(results, 5))
  // save the connection Id and the player Name
  const playerId = socket.id
  const playerName = socket.handshake.query.name

  // create a new player and add them to the Game static array
  const player = new Player(playerId, playerName)
  Game.players.push(player)

  socket.on('disconnect', () => {
    console.log('player disconnected')
    // send notification so client can hide player
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
      socket.emit('noQuestionsLeft', { score: player.getPlayerScore() })
    }
  })

  //
  // won't be used, kept just for debugging
  socket.on('chat message', (msg) => {
    console.log('message: ', msg)
  })
})
