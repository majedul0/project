/**
 * Protected Route Component
 * =========================
 * Wrapper component that ensures only authenticated users can access admin routes.
 * Redirects unauthenticated users to the login page.
 * 
 * Usage:
 *   <ProtectedRoute>
 *     <AdminDashboard />
 *   </ProtectedRoute>
 */

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * ProtectedRoute Component
 * Checks if user is authenticated before rendering children
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Protected component
 * @returns {React.ReactNode} Either protected component or redirect to login
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '16px',
        color: '#667eea',
        fontWeight: '600'
      }}>
        Loading...
      </div>
    )
  }

  // If not authenticated, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/admin" replace />
  }

  // If authenticated, render the protected component
  return children
}

export default ProtectedRoute
