import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../contexts/UserContext'
import '../styles/quiz.css'

function QuizPage() {
  const { quiz_id } = useParams()
  const { user } = useUser()
  const navigate = useNavigate()
  const [quizDetails, setQuizDetails] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userAnswers, setUserAnswers] = useState([]) // Track user answers
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0) // Review state

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const res = await axios.get(
          `https://7783-2402-1980-828b-9014-30bf-4572-ca56-5f1b.ngrok-free.app/api/quizzes/${quiz_id}`
        )
        setQuizDetails(res.data)
      } catch (err) {
        console.error('Error fetching quiz details:', err)
      }
    }

    fetchQuizDetails()
  }, [quiz_id])

  const handleAnswerClick = (isCorrect, selectedAnswer) => {
    const currentQuestion = quizDetails.questions[currentQuestionIndex]
    const answerDetails = {
      question: currentQuestion.question_text,
      selectedAnswer,
      correctAnswer: currentQuestion.answers.find((ans) => ans.is_correct)
        .answer_text,
      explanation: currentQuestion.answers.find((ans) => ans.is_correct)
        .explanation,
      isCorrect,
    }

    setUserAnswers((prev) => [...prev, answerDetails])

    if (isCorrect) setScore((prev) => prev + 1)

    if (currentQuestionIndex < quizDetails.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
      submitScore(score + (isCorrect ? 1 : 0))
    }
  }

  const submitScore = async (finalScore) => {
    try {
      setLoading(true)
      await axios.post(
        `https://7783-2402-1980-828b-9014-30bf-4572-ca56-5f1b.ngrok-free.app/api/scores`,
        {
          quiz_id,
          user_id: user.user_id,
          score: finalScore,
        }
      )
      setLoading(false)
    } catch (err) {
      console.error('Error submitting score:', err)
      setLoading(false)
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
    setUserAnswers([])
    setReviewQuestionIndex(0)
  }

  const handleNextReview = () => {
    if (reviewQuestionIndex < userAnswers.length - 1) {
      setReviewQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevReview = () => {
    if (reviewQuestionIndex > 0) {
      setReviewQuestionIndex((prev) => prev - 1)
    }
  }

  const handleGoToCommunity = () => {
    navigate('/community')
  }

  return (
    <div className="quiz-page">
      {loading && <p>Submitting score...</p>}
      {quizDetails ? (
        !showResults ? (
          <div>
            <h1>{quizDetails.quiz_name}</h1>
            <div className="question-section">
              <h2>
                Question {currentQuestionIndex + 1} of{' '}
                {quizDetails.questions.length}
              </h2>
              <p>{quizDetails.questions[currentQuestionIndex].question_text}</p>
              <div className="answers">
                {quizDetails.questions[currentQuestionIndex].answers.map(
                  (answer) => (
                    <button
                      key={answer.answer_id}
                      className="answer-btn"
                      onClick={() =>
                        handleAnswerClick(answer.is_correct, answer.answer_text)
                      }
                    >
                      {answer.answer_text}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="results">
            <h1>Quiz Review</h1>
            <div className="review-section">
              <p>
                <strong>Question {reviewQuestionIndex + 1}:</strong>{' '}
                {userAnswers[reviewQuestionIndex].question}
              </p>
              <p>
                Your Answer:{' '}
                <span
                  className={
                    userAnswers[reviewQuestionIndex].isCorrect
                      ? 'correct'
                      : 'incorrect'
                  }
                >
                  {userAnswers[reviewQuestionIndex].selectedAnswer}
                </span>
              </p>
              {!userAnswers[reviewQuestionIndex].isCorrect && (
                <p>
                  Correct Answer:{' '}
                  <strong>
                    {userAnswers[reviewQuestionIndex].correctAnswer}
                  </strong>
                </p>
              )}
              <p className="explanation">
                Explanation: {userAnswers[reviewQuestionIndex].explanation}
              </p>
            </div>

            <div className="navigation-buttons">
              <button
                className="nav-btn"
                onClick={handlePrevReview}
                disabled={reviewQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className="nav-btn"
                onClick={handleNextReview}
                disabled={reviewQuestionIndex === userAnswers.length - 1}
              >
                Next
              </button>
            </div>

            {reviewQuestionIndex === userAnswers.length - 1 && (
              <div className="results-actions">
                <button className="retry-btn" onClick={handleRetry}>
                  Retry Quiz
                </button>
                <button className="community-btn" onClick={handleGoToCommunity}>
                  Back to Community
                </button>
              </div>
            )}
          </div>
        )
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  )
}

export default QuizPage
