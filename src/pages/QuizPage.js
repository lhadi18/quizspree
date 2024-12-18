import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function QuizPage() {
  const { category } = useParams()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  // Mock data (to be replaced with backend fetch)
  const mockQuestions = [
    {
      question: 'Who was the first President of the United States?',
      options: [
        'George Washington',
        'Abraham Lincoln',
        'Thomas Jefferson',
        'John Adams',
      ],
      correct: 0,
      explanation:
        'George Washington was the first President of the United States, serving from 1789 to 1797.',
    },
    // Add more questions...
  ]

  React.useEffect(() => {
    // Simulate fetch call
    setQuestions(mockQuestions)
  }, [])

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    setShowExplanation(false)
    setCurrentQuestion(currentQuestion + 1)
  }

  if (!questions.length) return <p>Loading...</p>

  return (
    <div className="quiz-page">
      <h2>Category: {category}</h2>
      {currentQuestion < questions.length ? (
        <div>
          <p>{questions[currentQuestion].question}</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)}>
                {option}
              </button>
            ))}
          </div>
          {showExplanation && (
            <div className="explanation">
              <p>{questions[currentQuestion].explanation}</p>
              <button onClick={nextQuestion}>Next</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>Quiz Complete!</h3>
          <p>
            Your score: {score}/{questions.length}
          </p>
        </div>
      )}
    </div>
  )
}

export default QuizPage
