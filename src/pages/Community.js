import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../contexts/UserContext'
import '../styles/community.css'

function Community() {
  const [quizzes, setQuizzes] = useState([])
  const [categories, setCategories] = useState([])
  const [userScores, setUserScores] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { user } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const [currentPage, setCurrentPage] = useState(1)
  const quizzesPerPage = 8

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [categoriesRes, quizzesRes] = await Promise.all([
          axios.get('http://13.212.85.96:9500/api/categories'),
          axios.get(
            `http://13.212.85.96:9500/api/quizzes${
              selectedCategory ? `?category_id=${selectedCategory}` : ''
            }`
          ),
        ])

        console.log(categories.data)

        setCategories(
          Array.isArray(categoriesRes.data) ? categoriesRes.data : []
        )
        setQuizzes(Array.isArray(quizzesRes.data) ? quizzesRes.data : [])

        if (user?.user_id) {
          const scoresRes = await axios.get(
            `http://13.212.85.96:9500/api/user-scores?user_id=${user.user_id}`
          )
          const scoresMap = (scoresRes.data || []).reduce((map, score) => {
            map[score.quiz_id] = score.high_score
            return map
          }, {})
          setUserScores(scoresMap)
        }

        setCurrentPage(1) // Reset to the first page after fetching data
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory, user])

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz)
  }

  const handleStartQuiz = () => {
    navigate(`/quiz/${selectedQuiz?.quiz_id}`)
  }

  const handleClosePopup = () => {
    setSelectedQuiz(null)
  }

  const totalPages = Math.ceil(quizzes.length / quizzesPerPage)
  const currentQuizzes = quizzes.slice(
    (currentPage - 1) * quizzesPerPage,
    currentPage * quizzesPerPage
  )

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'next') return Math.min(prev + 1, totalPages)
      if (direction === 'prev') return Math.max(prev - 1, 1)
      return prev
    })
  }

  if (loading) {
    return <div className="loading">Loading quizzes and categories...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="community">
      <h1>Community Quizzes</h1>

      <div className="filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {(categories || []).map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name || 'Unknown'}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {currentQuizzes.map((quiz) => (
          <li key={quiz.quiz_id}>
            <button className="quiz-link" onClick={() => handleQuizClick(quiz)}>
              {quiz.quiz_name || 'Untitled Quiz'}
            </button>
            <span className="category">
              Category: {quiz.category_name || 'Unknown'}
            </span>
            {userScores[quiz.quiz_id] != null ? (
              <span className="score">
                Your Best Score: {userScores[quiz.quiz_id]}
              </span>
            ) : (
              <span className="score">Not Attempted</span>
            )}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Link to="/create" className="btn">
        Create Your Own Quiz
      </Link>

      {selectedQuiz && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedQuiz.quiz_name || 'Untitled Quiz'}</h2>
            <p>Category: {selectedQuiz.category_name || 'Unknown'}</p>
            <p>
              Your Best Score:{' '}
              {userScores[selectedQuiz.quiz_id] || 'Not Attempted'}
            </p>
            <p>Do you want to start this quiz?</p>
            <div className="popup-buttons">
              <button className="btn start-btn" onClick={handleStartQuiz}>
                Start Quiz
              </button>
              <button className="btn close-btn" onClick={handleClosePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community
