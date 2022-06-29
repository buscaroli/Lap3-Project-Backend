const getQuestions = require('../../api/trivia')

describe('trivia', () => {
  it('tests the getQuestion function returns data', async () => {
    const res = await getQuestions(11, 'medium', 10)
    console.log('**** ', res.status)

    expect(res.status).toBe(200)
  })

  it('expects the fetch call to return an empty array if passing unsupported data', () => {
    const throwing = async () => {
      const res = await getQuestions(234, 'killer', 10000)
      console.log('***** throwing * ', res.data)
    }
    expect(throwing).toThrow()
    document()
  })
})
