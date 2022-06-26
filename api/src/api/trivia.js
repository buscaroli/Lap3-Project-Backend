const axios = require('axios')

const hardcodedData = [
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which essential condiment is also known as Japanese horseradish?',
    correct_answer: 'Wasabi ',
    incorrect_answers: ['Mentsuyu', 'Karashi', 'Ponzu'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'In 2013 how much money was lost by Nigerian scams?',
    correct_answer: '$12.7 Billion',
    incorrect_answers: ['$95 Million', '$956 Million', '$2.7 Billion'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the unit of currency in Laos?',
    correct_answer: 'Kip',
    incorrect_answers: ['Ruble', 'Konra', 'Dollar'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which of the following buildings is example of a structure primarily built in the Art Deco architectural style?',
    correct_answer: 'Niagara Mohawk Building',
    incorrect_answers: ['Taipei 101', 'One Detroit Center', 'Westendstrasse 1'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What alcoholic drink is mainly made from juniper berries?',
    correct_answer: 'Gin',
    incorrect_answers: ['Vodka', 'Rum', 'Tequila'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'What did the Spanish autonomous community of Catalonia ban in 2010, that took effect in 2012?',
    correct_answer: 'Bullfighting',
    incorrect_answers: ['Fiestas', 'Flamenco', 'Mariachi'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'The new One World Trade Center in Manhattan, New York City was designed by which architect? ',
    correct_answer: 'David Childs',
    incorrect_answers: ['Bjarke Ingels', 'Michael Arad', 'Fumihiko Maki'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What was Mountain Dew&#039;s original slogan?',
    correct_answer: 'Yahoo! Mountain Dew... It&#039;ll tickle your innards!',
    incorrect_answers: [
      'Give Me A Dew',
      'Do The Dew',
      'Get&#039; that barefoot feelin&#039; drinkin&#039; Mountain Dew',
    ],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is a Burgee?',
    correct_answer: 'A flag',
    incorrect_answers: ['A rope', 'A window', 'A type of food'],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which American manufactured submachine gun was informally known by the American soldiers that used it as &quot;Grease Gun&quot;?',
    correct_answer: 'M3',
    incorrect_answers: ['Colt 9mm', 'Thompson', 'MAC-10'],
  },
]

const getQuestions = async (
  category = '0',
  difficulty = 'medium',
  amount = '10'
) => {
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
