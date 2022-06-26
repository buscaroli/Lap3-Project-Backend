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
