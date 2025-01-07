import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import '../styles/login.css'

function Login() {
  const { login } = useUser() // Access login function from context
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate inputs
    if (!credentials.username || !credentials.password) {
      setError('Both fields are required.')
      return
    }

    try {
      setLoading(true) // Show loading state
      setError('') // Clear any previous errors

      // Send login request to backend
      const response = await fetch('http://13.212.85.96:9500/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle server-side errors
        setError(data.message || 'Login failed.')
        setLoading(false)
        return
      }

      // Login successful: Update global user state
      login(data.user)
      navigate('/') // Redirect to homepage
    } catch (err) {
      console.error('Error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              placeholder="Enter your username"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" className="btn login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="register-link">
          <p>
            Don&apos;t have an account?{' '}
            <span
              className="register-text"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
