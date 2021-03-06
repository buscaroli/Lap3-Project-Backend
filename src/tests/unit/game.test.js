jest.mock('axios')
const Game = require('../../models/game')
const Player = require('../../models/player')

describe('game', () => {
  let game = new Game()
  let player

  beforeEach(() => {
    game.questionsList = [
      {
        category: 'Entertainment: Film',
        type: 'multiple',
        difficulty: 'medium',
        question:
          'What does TIE stand for in reference to the TIE Fighter in &quot;Star Wars&quot;?',
        correct_answer: 'Twin Ion Engine',
        incorrect_answers: [
          'Twin Iron Engine',
          'Twin Intercepter Engine',
          'Twin Inception Engine',
        ],
      },
      {
        category: 'Test',
        type: 'multiple',
        difficulty: 'medium',
        question: 'When was Tesla founded?',
        correct_answer: '2003',
        incorrect_answers: ['2008', '2005', '2007'],
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'medium',
        question:
          'In what year was the video game company Electronic Arts founded?',
        correct_answer: '1982',
        incorrect_answers: ['1999', '1981', '2005'],
      },
    ]
    player = new Player('qwe123', 'James')
    Game.players.push(player)
  })

  afterEach(() => {
    Game.players = []
  })

  it('tests it can remove a player from the players list', () => {
    const playersNumberBefore = Game.players.length

    Game.removePlayerFromList('qwe123')
    const playersNumberAfter = Game.players.length

    expect(playersNumberAfter).toBe(playersNumberBefore - 1)
  })

  it('tests it can get the id of the host', () => {
    expect(Game.getHostId()).toBe('qwe123')
  })

  it('tests it can get the host id after deleting the previous host', () => {
    const mark = new Player('asd456', 'Mark')
    Game.players.push(mark)
    Game.removePlayerFromList('qwe123')

    expect(Game.getHostId()).toBe('asd456')
  })

  it('tests it can get the next question', () => {
    game.nextQuestion()
    expect(game.nextQuestion().category).toBe('Test')
  })

  it('tests the username can be updated', () => {
    Game.updatePlayerName({ id: 'qwe123', name: 'John' })

    expect(Game.players[0].name).toBe('John')
  })

  it('tests it throws when adding a new player after finishing the game id data is not correct', () => {})
})
