import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import logo from '../assets/images/logo.png'
import { useUser } from '../contexts/UserContext'

function Header() {
  const { user, logout } = useUser()

  return (
    <header className="header">
      {/* Left Section: Logo, Title, and Navigation */}
      <div className="header-left">
        <div className="logo-placeholder">
          <img src={logo} alt="Logo" />
        </div>
        <h1>
          <Link to="/">QuizSpree</Link>
        </h1>
        <nav className="header-center">
          <Link to="/community">Quizzes</Link>
          <Link to="/leaderboard">Mini Reads</Link>
          <Link to="/resources">Videos</Link>
          <Link to="/memorygame">Memory Game</Link>
          {user && (
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          )}
        </nav>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {user ? (
          <button onClick={logout} className="header-button">
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
    </header>
  )
}

export default Header
