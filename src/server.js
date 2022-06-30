const express = require('express')
const cors = require('cors')
const http = require('http')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

// serving the main page through express' static method
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

// serving the route for the leaderboard
const scoreRoutes = require('./controllers/scores')
app.use('/scores', scoreRoutes)

app.get('*', (req, res) => {
  res.send(
    '<h1>404</h1><h4>Page Not Found</h4><style>body{ margin: 30% 30%;}h1,h4{color: red;}h1{font-size: 6rem;}h4{font-size:3rem}</style>'
  )
})

const server = http.createServer(app)

module.exports = server
