const axios = require('axios')

const axiosInstance = axios.default.create({
  baseURL: 'https://myAPI.com/questions',
})

module.exports = axiosInstance
