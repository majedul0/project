/**
 * Admin Dashboard Page
 * ====================
 * Main dashboard displaying overview and statistics about services.
 * Shows total services count, quick actions, and navigation to management pages.
 * 
 * Features:
 *   - Display service statistics
 *   - Quick action buttons
 *   - Navigation to service management
 *   - Logout functionality
 */

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchAllServices } from '../services/servicesApi'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import './AdminDashboard.css'

const AdminDashboard = () => {
  // State management
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Hooks for navigation and authentication
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  /**
   * Fetch services on component mount
   */
  useEffect(() => {
    loadServices()
  }, [])

  /**
   * Load services from database
   */
  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await fetchAllServices()
      setServices(data)
    } catch (err) {
      console.error('Failed to load services:', err)
      setError('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle logout action
   */
  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <AdminLayout>
      <main className="admin-dashboard">
        {/* Header section with greeting and logout */}
        <section className="dashboard-header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.username}! 👋</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </section>

        {/* Statistics section */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Services</h3>
            <p className="stat-number">{services.length}</p>
            <p className="stat-description">Active services in system</p>
          </div>

          <div className="stat-card">
            <h3>Status</h3>
            <p className="stat-status">Active ✓</p>
            <p className="stat-description">System is running smoothly</p>
          </div>

          <div className="stat-card">
            <h3>Last Updated</h3>
            <p className="stat-number">
              {services.length > 0
                ? new Date(services[0]?.created_at).toLocaleDateString()
                : 'N/A'}
            </p>
            <p className="stat-description">Latest service update</p>
          </div>
        </section>

        {/* Quick actions section */}
        <section className="actions-section">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/services" className="action-btn action-btn-primary">
              <span className="btn-icon">📋</span>
              <span className="btn-text">Manage Services</span>
            </Link>
            <Link to="/admin/services/new" className="action-btn action-btn-success">
              <span className="btn-icon">➕</span>
              <span className="btn-text">Add New Service</span>
            </Link>
          </div>
        </section>

        {/* Recent services list */}
        {loading ? (
          <div className="loading">Loading services...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : services.length > 0 ? (
          <section className="recent-services">
            <h2>Recent Services</h2>
            <div className="services-list">
              {services.slice(0, 5).map((service) => (
                <div key={service.id} className="service-item">
                  <div className="service-info">
                    <h4>{service.title}</h4>
                    <p>{service.description.substring(0, 100)}...</p>
                    <span className="service-category">{service.category}</span>
                  </div>
                  <div className="service-actions">
                    <Link
                      to={`/admin/services/${service.id}`}
                      className="link-btn"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="empty-state">
            <p>No services found. Create your first service!</p>
            <Link to="/admin/services/new" className="action-btn action-btn-success">
              Create Service
            </Link>
          </section>
        )}
      </main>
    </AdminLayout>
  )
}

export default AdminDashboard
