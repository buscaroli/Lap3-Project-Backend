class Player {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.score = 0
  }

  getPlayerScore() {
    return this.score
  }

  updatePlayerScore({ questionScore }) {
    this.score += questionScore
  }

  resetPlayerScore() {
    this.score = 0
  }

  updatePlayerName(name) {
    this.name = name
  }
}

module.exports = Player
