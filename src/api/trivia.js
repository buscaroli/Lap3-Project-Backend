const axios = require('axios')

const getQuestions = async (category, difficulty, amount) => {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`

  try {
    const data = await axios(url)
    return data
  } catch (err) {
    throw new Error('Could not fetch Quiz Data.')
  }
}

module.exports = getQuestions

/*
Default
General Knowledge
Medium Difficulty
10 Questions

categories

0 General Knowledge
1 Books
2 Film
3 Music
5 television
6 videogames
8 Nature
9 Computers
12 sports
13 geography
14 history
22 manga and anime(for Romeo)


difficulty

easy
medium
hard

amount integer

Response Codes
0 Success
1 No Results
2 Invalid Parameter
3 Token not found
4 Token Empty
*/
