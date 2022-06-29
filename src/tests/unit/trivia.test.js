const getQuestions = require('../../api/trivia')

describe('trivia', () => {
  it('tests the getQuestion function returns data', async () => {
    const res = await getQuestions(11, 'medium', 10)
    console.log('**** ', res.status)

    expect(res.status).toBe(200)
  })
})
