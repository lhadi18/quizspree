import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'

import scienceImage from '../assets/images/science.jpg'
import generalKnowledgeImage from '../assets/images/general-knowledge.jpg'
import mathsImage from '../assets/images/maths.jpg'
import englishImage from '../assets/images/english.jpg'
import geographyImage from '../assets/images/geography.jpg'
import historyImage from '../assets/images/history.jpeg'

function Home() {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryId) => {
    navigate(`/community?category_id=${categoryId}`)
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to QuizSpree!</h1>
        <p>
          Challenge yourself, test your knowledge, and climb the leaderboard!
        </p>
        <Link to="/community" className="btn btn-primary">
          Explore Community Quizzes
        </Link>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Choose a Category</h2>
        <div className="categories-scroll">
          <div className="categories">
            {/* History */}
            <div className="category-card">
              <img src={historyImage} alt="History" />
              <Link to="/community?category_id=1">History</Link>
            </div>

            {/* Geography */}
            <div className="category-card">
              <img src={geographyImage} alt="Geography" />
              <Link to="/community?category_id=5">Geography</Link>
            </div>

            {/* English */}
            <div className="category-card">
              <img src={englishImage} alt="English" />
              <Link to="/community?category_id=6">English</Link>
            </div>

            {/* Maths */}
            <div className="category-card">
              <img src={mathsImage} alt="Maths" />
              <Link to="/community?category_id=4">Maths</Link>
            </div>

            {/* Science */}
            <div className="category-card">
              <img src={scienceImage} alt="Science" />
              <Link to="/community?category_id=2">Science</Link>
            </div>

            {/* General Knowledge */}
            <div className="category-card">
              <img src={generalKnowledgeImage} alt="General Knowledge" />
              <Link to="/community?category_id=3">General Knowledge</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose QuizSpree?</h2>
        <ul>
          <li>📈 Track your progress and climb the leaderboard.</li>
          <li>🌍 Join a global community of quiz enthusiasts.</li>
          <li>📚 Learn and have fun at the same time!</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
