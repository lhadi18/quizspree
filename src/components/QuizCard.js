import React from 'react'
import { Link } from 'react-router-dom'

function QuizCard({ id, title, category }) {
  return (
    <div className="quiz-card">
      <h2>{title}</h2>
      <p>Category: {category}</p>
      <Link to={`/quiz/${id}`}>Take Quiz</Link>
    </div>
  )
}

export default QuizCard
