import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate fields
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      // Send data to the backend
      const response = await axios.post(
        'http://13.212.85.96:9500/api/auth/register',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      )

      // If successful, show success message and navigate to login page
      setSuccess(response.data.message)
      setError('') // Clear any previous errors
      setTimeout(() => navigate('/login'), 2000) // Redirect after 2 seconds
    } catch (err) {
      // Handle errors from the server
      setError(err.response?.data?.message || 'An error occurred.')
      setSuccess('')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter your username"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm your password"
            />
          </label>
          <button type="submit" className="btn login-btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account?{' '}
              <span className="login-text" onClick={() => navigate('/login')}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
