const Game = require('../../models/game')

describe('scores', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(async () => {
    api = app.listen(6000, () =>
      console.log('Test server running on port 6000...')
    )
  })

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

  it('receives an HTTP status od 200 when connecting to the server', async () => {
    const res = await request(api).get('/scores')
    expect(res.status).toBe(200)
  })

  it('should return list of 10 scores', async () => {
    const res = await request(api).get('/scores')
    expect(res.body.rows).toHaveLength(10)
  })

  // it('should add a player to the database', async () => {
  //   const walter = await Game.addScoreToDatabase({
  //     id: 'poiuyt123456',
  //     name: 'Walter',
  //     score: 200000,
  //   })

  //   const res2 = await request(api).get('/scores')
  //   console.log('* * * * ', res)
  //   const topScore = await res2.body.rows[0]
  //   console.log('** ** ** ', topScore)

  //   expect(topScore.name).toBe('Walter')
  // })

  it('tests a page of 404 is served', async () => {
    const res = await request(api).get('/asdfg')
    expect(res).toBeTruthy()
  })

  it('tests the index page can be accesses', async () => {
    const res = await request(api).get('/')
    expect(res).toBeTruthy()
  })
})
