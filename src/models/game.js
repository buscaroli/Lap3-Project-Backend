const db = require('../dbConfig')
const getQuestions = require('../api/trivia')

class Game {
  constructor(category = 0, questionsAmount = 10, difficulty = 'medium') {
    this.category = category
    this.questionsAmount = questionsAmount
    this.difficulty = difficulty
    this.questionsList = []
    this.counter = 0
  }

  static maxPlayers = 4
  static players = []

  static removePlayerFromList(id) {
    const newArray = Game.players.filter((player) => player.id !== id)
    Game.players = newArray
  }

  static addScoreToDatabase({ id, name, score }) {
    return new Promise(async (resolve, reject) => {
      try {
        const now = new Date()
        const nowString = now.toString().slice(0, 16).trim()
        const newPlayerData = await db.query(
          `INSERT INTO scores (id, name, score, time) VALUES ($1, $2, $3, $4) RETURNING *;`,
          [id, name, score, nowString]
        )

        const newPlayer = new Player(newPlayerData.rows[0])
        resolve(newPlayer)
      } catch (err) {
        reject('Unable to add the score.')
      }
    })
  }

  nextQuestion() {
    if (this.questionsList.length > 0 && this.counter < this.questionsAmount) {
      const question = this.questionsList[this.counter]
      this.counter++
      console.log('game.js -> nextQuestion -> ', question)
      return question
    } else {
      return null
    }
  }

  async fetchQuestions(category, difficulty, questionsAmount) {
    try {
      const data = await getQuestions(category, difficulty, questionsAmount)
      this.questionsList = data.data.results
    } catch (err) {
      console.log('Error: ', err)
    }
  }
}

module.exports = Game