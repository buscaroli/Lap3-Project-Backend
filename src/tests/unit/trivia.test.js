// jest.mock('../../api/trivia')
const getQuestions = require('../../api/trivia')

describe('trivia', () => {
  it('tests the getQuestion function returns data', async () => {
    const res = await getQuestions(11, 'medium', 10)
    console.log('**** ', res)

    expect(res.data.results.length).toBe(3)
  })

  it('expects the fetch call to return an empty array if passing unsupported data', async () => {
    const res = await getQuestions('fail', 'killer', 10000)
    // console.log('---------------', res)
    expect(res.data.results.length).toBe(0)
  })
})
