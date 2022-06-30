const axios = require('axios')

const getQuestions = async (category, difficulty, amount) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

  try {
    const data = await axios(url, {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      },
    })
    return data
  } catch (err) {
    throw new Error('Could not fetch Quiz Data.')
  }
}

module.exports = getQuestions
