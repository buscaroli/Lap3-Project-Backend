const Player = require('../../models/player')

describe('player', () => {
  let james = new Player('qwe123', 'James')
  beforeEach(() => {
    james.score = 0
  })

  it('creates a player when not given a score and the score should be 0', () => {
    const john = new Player('123', 'John')
    expect(john.score).toBe(0)
  })

  it('creates a player with a score of 0 even when a score is passed', () => {
    const sally = new Player('123', 'Sally', 20)
    expect(sally.score).toBe(0)
  })

  it('tests it is possible to get the player score', () => {
    james.score = 20
    const jamesScore = james.getPlayerScore()
    expect(jamesScore).toBe(20)
  })

  it('tests the player score can be reset', () => {
    james.score = 20
    james.resetPlayerScore()
    expect(james.getPlayerScore()).toBe(0)
  })

  it('tests the player score can be updated', () => {
    james.updatePlayerScore({ questionScore: 35 })
    expect(james.getPlayerScore()).toBe(35)
  })
})
