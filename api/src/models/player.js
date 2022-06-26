class Player {
  constructor(id, name) {
    this.id = id
    this.name = name
    this.score = 0
  }

  getPlayerScore() {
    console.log('player.js - score -> ', this.score)
    return this.score
  }

  updatePlayerScore({ questionScore }) {
    console.log('player.js - score -> ', this.score)
    console.log('player.js - questionScore -> ', questionScore)
    this.score += questionScore
  }
}

module.exports = Player
