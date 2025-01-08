import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import '../styles/community.css'

function Community() {
  const navigate = useNavigate()

  // Updated categories
  const categories = [
    { category_id: '1', category_name: 'English' },
    { category_id: '2', category_name: 'History' },
    { category_id: '3', category_name: 'Geography' },
    { category_id: '4', category_name: 'Maths' },
    { category_id: '5', category_name: 'Science' },
  ]

  // Updated quizzes
  const quizzes = [
    {
      quiz_id: '101',
      quiz_name: 'Grammar Essentials',
      category_name: 'English',
    },
    {
      quiz_id: '102',
      quiz_name: 'World War II Trivia',
      category_name: 'History',
    },
    {
      quiz_id: '103',
      quiz_name: 'Capitals of the World',
      category_name: 'Geography',
    },
    { quiz_id: '104', quiz_name: 'Basic Algebra', category_name: 'Maths' },
    { quiz_id: '105', quiz_name: 'Physics Basics', category_name: 'Science' },
  ]

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const quizzesPerPage = 8

  const filteredQuizzes = selectedCategory
    ? quizzes.filter((quiz) => quiz.category_name === selectedCategory)
    : quizzes

  const totalPages = Math.ceil(filteredQuizzes.length / quizzesPerPage)
  const currentQuizzes = filteredQuizzes.slice(
    (currentPage - 1) * quizzesPerPage,
    currentPage * quizzesPerPage
  )

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz)
  }

  const handleClosePopup = () => {
    setSelectedQuiz(null)
  }

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'next') return Math.min(prev + 1, totalPages)
      if (direction === 'prev') return Math.max(prev - 1, 1)
      return prev
    })
  }

  return (
    <div className="community">
      <h1>Quizzes</h1>

      <div className="filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_name}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {currentQuizzes.map((quiz) => (
          <li key={quiz.quiz_id}>
            <button
              className="quiz-link"
              onClick={() => navigate(`/quiz/${quiz.quiz_id}`)}
            >
              {quiz.quiz_name}
            </button>

            <span className="category">Category: {quiz.category_name}</span>
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

      {selectedQuiz && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedQuiz.quiz_name}</h2>
            <p>Category: {selectedQuiz.category_name}</p>
            <p>Do you want to start this quiz?</p>
            <div className="popup-buttons">
              <button className="btn start-btn">Start Quiz</button>
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
