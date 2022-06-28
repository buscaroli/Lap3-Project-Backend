describe('scores', () => {
  let api

  // beforeEach(async () => {
  //   await resetTestDB()
  // })

  beforeAll(async () => {
    api = app.listen(6000, () =>
      console.log('Test server running on port 6000...')
    )
  })

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

  it('receives an HTTP status od 200 when connecting to the server', () => {
    const res = await request(api).get('/scores')
    expect(res.status).toBe(200)
  })

  it('should return list of 10 scores', async () => {
    const res = await request(api).get('/scores')
    expect(res.body.rows).toHaveLength(10)
  })
})
