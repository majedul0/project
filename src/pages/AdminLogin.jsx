/**
 * Admin Login Page
 * ================
 * Provides authentication interface for admin access.
 * Validates credentials and redirects to dashboard on successful login.
 * 
 * Credentials:
 *   Username: admin1971
 *   Password: admin1971
 * 
 * Features:
 *   - Form validation
 *   - Error handling and display
 *   - Loading state management
 *   - Session persistence
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './AdminLogin.css'

const AdminLogin = () => {
  // State management for form inputs and UI
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Hooks for navigation and authentication
  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * Handle form submission
   * Validates input and attempts login
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      // Validate form inputs
      if (!username.trim()) {
        setError('Username is required')
        return
      }

      if (!password) {
        setError('Password is required')
        return
      }

      // Show loading state
      setIsLoading(true)

      // Attempt login
      await login(username, password)

      // Redirect to dashboard on successful login
      navigate('/admin/dashboard')
    } catch (err) {
      // Display error message
      setError(err.message || 'Login failed. Please try again.')
      // Clear password field for security
      setPassword('')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handle input change for form fields
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'password') setPassword(value)
  }

  return (
    <div className="admin-login-container">
      {/* Login form card */}
      <div className="login-card">
        {/* Header section */}
        <div className="login-header">
          <h1>Admin Login</h1>
          <p>IT Servicer Management Panel</p>
        </div>

        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Enter username"
              disabled={isLoading}
              autoComplete="username"
              required
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Enter password"
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo credentials info */}
        <div className="demo-info">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Username: <code>admin1971</code></p>
          <p>Password: <code>admin1971</code></p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
