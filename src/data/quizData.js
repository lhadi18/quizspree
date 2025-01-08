const quizData = {
  101: {
    quiz_name: 'Grammar Essentials',
    questions: [
      {
        question_text: 'Which word is a noun?',
        answers: [
          { answer_text: 'Run', is_correct: false },
          { answer_text: 'Happiness', is_correct: true },
          { answer_text: 'Quickly', is_correct: false },
          { answer_text: 'Bright', is_correct: false },
        ],
      },
      {
        question_text: 'Which is a verb?',
        answers: [
          { answer_text: 'Table', is_correct: false },
          { answer_text: 'Eat', is_correct: true },
          { answer_text: 'Blue', is_correct: false },
          { answer_text: 'Soft', is_correct: false },
        ],
      },
      {
        question_text: 'What is the plural of "child"?',
        answers: [
          { answer_text: 'Childs', is_correct: false },
          { answer_text: 'Children', is_correct: true },
          { answer_text: 'Childes', is_correct: false },
          { answer_text: 'Childern', is_correct: false },
        ],
      },
      {
        question_text: 'Which of the following is a pronoun?',
        answers: [
          { answer_text: 'She', is_correct: true },
          { answer_text: 'Run', is_correct: false },
          { answer_text: 'Happy', is_correct: false },
          { answer_text: 'Car', is_correct: false },
        ],
      },
    ],
  },
  102: {
    quiz_name: 'World War II Trivia',
    questions: [
      {
        question_text: 'When did World War II end?',
        answers: [
          { answer_text: '1939', is_correct: false },
          { answer_text: '1945', is_correct: true },
          { answer_text: '1918', is_correct: false },
          { answer_text: '1950', is_correct: false },
        ],
      },
      {
        question_text: 'Who was the leader of Nazi Germany?',
        answers: [
          { answer_text: 'Adolf Hitler', is_correct: true },
          { answer_text: 'Winston Churchill', is_correct: false },
          { answer_text: 'Joseph Stalin', is_correct: false },
          { answer_text: 'Franklin D. Roosevelt', is_correct: false },
        ],
      },
      {
        question_text: 'Which battle was the turning point of the Pacific War?',
        answers: [
          { answer_text: 'Battle of the Bulge', is_correct: false },
          { answer_text: 'Battle of Stalingrad', is_correct: false },
          { answer_text: 'Battle of Midway', is_correct: true },
          { answer_text: 'Battle of Britain', is_correct: false },
        ],
      },
      {
        question_text:
          "What event triggered the United States' entry into World War II?",
        answers: [
          { answer_text: 'The attack on Pearl Harbor', is_correct: true },
          { answer_text: 'The invasion of Poland', is_correct: false },
          { answer_text: 'The bombing of Hiroshima', is_correct: false },
          { answer_text: 'The Battle of Normandy', is_correct: false },
        ],
      },
    ],
  },
  103: {
    quiz_name: 'Capitals of the World',
    questions: [
      {
        question_text: 'What is the capital of Japan?',
        answers: [
          { answer_text: 'Tokyo', is_correct: true },
          { answer_text: 'Osaka', is_correct: false },
          { answer_text: 'Seoul', is_correct: false },
          { answer_text: 'Kyoto', is_correct: false },
        ],
      },
      {
        question_text: 'What is the capital of Canada?',
        answers: [
          { answer_text: 'Ottawa', is_correct: true },
          { answer_text: 'Toronto', is_correct: false },
          { answer_text: 'Vancouver', is_correct: false },
          { answer_text: 'Montreal', is_correct: false },
        ],
      },
      {
        question_text: 'What is the capital of Australia?',
        answers: [
          { answer_text: 'Sydney', is_correct: false },
          { answer_text: 'Canberra', is_correct: true },
          { answer_text: 'Melbourne', is_correct: false },
          { answer_text: 'Brisbane', is_correct: false },
        ],
      },
      {
        question_text: 'What is the capital of Brazil?',
        answers: [
          { answer_text: 'Brasilia', is_correct: true },
          { answer_text: 'Sao Paulo', is_correct: false },
          { answer_text: 'Rio de Janeiro', is_correct: false },
          { answer_text: 'Buenos Aires', is_correct: false },
        ],
      },
    ],
  },
  104: {
    quiz_name: 'Basic Algebra',
    questions: [
      {
        question_text: 'What is 5 + 3?',
        answers: [
          { answer_text: '7', is_correct: false },
          { answer_text: '8', is_correct: true },
          { answer_text: '9', is_correct: false },
          { answer_text: '10', is_correct: false },
        ],
      },
      {
        question_text: 'What is 12 - 4?',
        answers: [
          { answer_text: '6', is_correct: false },
          { answer_text: '7', is_correct: false },
          { answer_text: '8', is_correct: true },
          { answer_text: '9', is_correct: false },
        ],
      },
      {
        question_text: 'What is 6 * 7?',
        answers: [
          { answer_text: '36', is_correct: false },
          { answer_text: '42', is_correct: true },
          { answer_text: '48', is_correct: false },
          { answer_text: '56', is_correct: false },
        ],
      },
      {
        question_text: 'What is 18 ÷ 3?',
        answers: [
          { answer_text: '4', is_correct: false },
          { answer_text: '5', is_correct: false },
          { answer_text: '6', is_correct: true },
          { answer_text: '7', is_correct: false },
        ],
      },
    ],
  },
  105: {
    quiz_name: 'Physics Basics',
    questions: [
      {
        question_text: 'What is the speed of light?',
        answers: [
          { answer_text: '300,000 km/s', is_correct: true },
          { answer_text: '150,000 km/s', is_correct: false },
          { answer_text: '600,000 km/s', is_correct: false },
          { answer_text: '100,000 km/s', is_correct: false },
        ],
      },
      {
        question_text: "What is Newton's First Law of Motion?",
        answers: [
          {
            answer_text:
              'An object in motion stays in motion unless acted upon by an external force',
            is_correct: true,
          },
          {
            answer_text: 'Force equals mass times acceleration',
            is_correct: false,
          },
          {
            answer_text:
              'For every action, there is an equal and opposite reaction',
            is_correct: false,
          },
          {
            answer_text: 'Energy cannot be created or destroyed',
            is_correct: false,
          },
        ],
      },
      {
        question_text: 'What is the unit of force?',
        answers: [
          { answer_text: 'Joule', is_correct: false },
          { answer_text: 'Newton', is_correct: true },
          { answer_text: 'Watt', is_correct: false },
          { answer_text: 'Pascal', is_correct: false },
        ],
      },
      {
        question_text: 'What is the formula for kinetic energy?',
        answers: [
          { answer_text: 'KE = 1/2 * m * v^2', is_correct: true },
          { answer_text: 'KE = m * v^2', is_correct: false },
          { answer_text: 'KE = m * v', is_correct: false },
          { answer_text: 'KE = 1/2 * v^2', is_correct: false },
        ],
      },
    ],
  },
  // Add more quizzes and questions as needed
}

export default quizData
