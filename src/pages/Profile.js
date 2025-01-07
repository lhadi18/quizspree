import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/profile.css'
import { useUser } from '../contexts/UserContext'

function Profile() {
  const { user, login } = useUser() // Access user and login function from context
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://13.212.85.96:9500/api/auth/${user.user_id}`
        )
        const { email, username } = response.data
        setFormData({
          email: email || '',
          username: username || '',
          password: '',
          confirmPassword: '',
        })
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        setLoading(false)
      }
    }

    fetchUser()
  }, [user.user_id])

  if (!user) {
    return <Navigate to="/login" />
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.username) newErrors.username = 'Username is required'
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      const { password, confirmPassword, ...updatedData } = formData
      if (password) updatedData.password = password // Include password if provided

      const response = await axios.put(
        `http://13.212.85.96:9500/api/auth/${user.user_id}`,
        updatedData
      )
      login(response.data.user) // Update user data in context
      setEditMode(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      setErrors({ server: 'Failed to update profile. Please try again.' })
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setErrors({})
    setFormData({
      email: user.email || '',
      username: user.username || '',
      password: '',
      confirmPassword: '',
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="profile-page-wrapper">
      <div className="profile">
        <h1>Your Profile</h1>
        <div className="profile-details">
          <label>
            <strong>Email:</strong>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.email}</span>
            )}
            {errors.email && <small className="error">{errors.email}</small>}
          </label>
          <label>
            <strong>Username:</strong>
            {editMode ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.username}</span>
            )}
            {errors.username && (
              <small className="error">{errors.username}</small>
            )}
          </label>

          {editMode && (
            <>
              <label>
                <strong>Password:</strong>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                {errors.password && (
                  <small className="error">{errors.password}</small>
                )}
              </label>
              <label>
                <strong>Confirm Password:</strong>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <small className="error">{errors.confirmPassword}</small>
                )}
              </label>
            </>
          )}
          {errors.server && <div className="error">{errors.server}</div>}
          <div className="profile-actions">
            {editMode ? (
              <>
                <button className="btn save" onClick={handleSave}>
                  Save
                </button>
                <button className="btn cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn edit" onClick={() => setEditMode(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
