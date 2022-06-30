const get = (url) => {
  if (url.includes('fail')) {
    return { data: { results: [] } }
  }
  return {
    data: {
      results: [
        {
          category: 'Entertainment: Film',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'Daniel Radcliffe became a global star in the film industry due to his performance in which film franchise?',
          correct_answer: 'Harry Potter',
          incorrect_answers: ['Ted', 'Spy Kids', 'Pirates of the Caribbean '],
        },
        {
          category: 'Entertainment: Film',
          type: 'multiple',
          difficulty: 'easy',
          question:
            'Which movie contains the quote, &quot;Say hello to my little friend!&quot;?',
          correct_answer: 'Scarface',
          incorrect_answers: ['Reservoir Dogs', 'Heat', 'Goodfellas'],
        },
        {
          category: 'Geography',
          type: 'boolean',
          difficulty: 'easy',
          question: 'There are no deserts in Europe.',
          correct_answer: 'True',
          incorrect_answers: ['False'],
        },
      ],
    },
  }
}

module.exports = get
