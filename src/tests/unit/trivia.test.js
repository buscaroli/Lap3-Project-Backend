jest.mock('axios')
const getQuestions = require('../../api/trivia')

describe('trivia', () => {
  it('tests the getQuestion function returns data', async () => {
    const res = await getQuestions(11, 'medium', 10)
    console.log('**** ', res)

    expect(res.data.results.length).toBe(3)
  })

  it('tests the function returns an empty array if passing unsupported data', async () => {
    const res = await getQuestions('fail', 'killer', 10000)
    // console.log('---------------', res)
    expect(res.data.results.length).toBe(0)
  })

  // it('tests that the function can catch the error if the API server is down', () => {

  //   expect(async () => {
  //     await getQuestions('error', 'hi', 100)
  //   }).toThrow()
  // })
})
