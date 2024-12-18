import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  const handleHiddenClick = () => {
    navigate('/tribute')
  }

  return (
    <footer className="footer" onClick={handleHiddenClick}>
      <p className="footer-text">
        © 2024 QuizSpree. All Rights Reserved.
        <span className="hidden-hint">👀</span>
      </p>
    </footer>
  )
}

export default Footer
