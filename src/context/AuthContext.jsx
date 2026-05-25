/**
 * Authentication Context
 * =======================
 * Manages admin authentication state globally across the application.
 * Provides login/logout functionality with hardcoded credentials for admin panel.
 * 
 * Credentials configured in: src/config/adminConfig.js
 * 
 * Usage:
 *   import { useAuth } from '@/context/AuthContext'
 *   const { isLoggedIn, login, logout } = useAuth()
 */

import { createContext, useContext, useState, useEffect } from 'react'
import { ADMIN_CONFIG, isSessionExpired } from '../config/adminConfig'

// Create authentication context
const AuthContext = createContext(null)

/**
 * Authentication Provider Component
 * Wraps the app to provide authentication state and methods
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  // State management for login status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check localStorage on component mount to persist login state
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedSession = localStorage.getItem('admin_session')
        if (savedSession) {
          const session = JSON.parse(savedSession)
          // Validate session is not expired
          if (!isSessionExpired(session.timestamp)) {
            setUser(session.user)
            setIsLoggedIn(true)
          } else {
            // Session expired - clear storage
            localStorage.removeItem('admin_session')
          }
        }
      } catch (error) {
        console.error('Error checking session:', error)
        localStorage.removeItem('admin_session')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  /**
   * Admin login function
   * Validates credentials against configured admin account
   * @param {string} username - Admin username
   * @param {string} password - Admin password
   * @returns {Promise<boolean>} True if login successful
   * @throws {Error} If credentials are invalid
   */
  const login = async (username, password) => {
    try {
      setLoading(true)

      // Get credentials from config
      const ADMIN_USERNAME = ADMIN_CONFIG.CREDENTIALS.USERNAME
      const ADMIN_PASSWORD = ADMIN_CONFIG.CREDENTIALS.PASSWORD

      // Validate credentials
      if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        throw new Error(ADMIN_CONFIG.MESSAGES.LOGIN_INVALID)
      }

      // Create user object
      const userData = {
        username: ADMIN_USERNAME,
        role: 'admin',
        loginTime: new Date().toISOString(),
      }

      // Save session to localStorage with timestamp
      const session = {
        user: userData,
        timestamp: Date.now(),
      }
      localStorage.setItem('admin_session', JSON.stringify(session))

      // Update state
      setUser(userData)
      setIsLoggedIn(true)

      return true
    } catch (error) {
      console.error('Login error:', error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  /**
   * Admin logout function
   * Clears session from localStorage and resets state
   */
  const logout = () => {
    try {
      // Clear localStorage session
      localStorage.removeItem('admin_session')

      // Reset state
      setUser(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Context value object
  const value = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If hook is used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
