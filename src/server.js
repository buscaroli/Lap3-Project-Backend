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

const server = http.createServer(app)

module.exports = server
