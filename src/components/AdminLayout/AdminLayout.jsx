/**
 * Admin Layout Component
 * ======================
 * Provides the common layout structure for all admin pages.
 * Includes navigation bar and sidebar navigation.
 * 
 * Features:
 *   - Main navigation
 *   - Sidebar with menu items
 *   - Responsive design
 */

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './AdminLayout.css'

const AdminLayout = ({ children }) => {
  // State for sidebar toggle on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Get current location to highlight active menu item
  const location = useLocation()

  /**
   * Check if current route matches menu item
   * @param {string} path - Menu item path
   * @returns {boolean} True if current location matches
   */
  const isActive = (path) => location.pathname === path

  /**
   * Close sidebar on small screens
   */
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="admin-layout">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          {/* Logo/Brand */}
          <Link to="/admin/dashboard" className="admin-logo">
            IT Servicer
          </Link>

          {/* Hamburger menu for mobile */}
          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main container */}
      <div className="admin-container">
        {/* Sidebar navigation */}
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="admin-nav">
            {/* Dashboard link */}
            <Link
              to="/admin/dashboard"
              className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </Link>

            {/* Services management link */}
            <Link
              to="/admin/services"
              className={`nav-item ${isActive('/admin/services') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">🔧</span>
              <span className="nav-text">Services</span>
            </Link>

            {/* Divider */}
            <div className="nav-divider"></div>

            {/* Help/Documentation section */}
            <div className="nav-section">
              <p className="nav-section-title">Help</p>
              <a
                href="#documentation"
                className="nav-item"
                onClick={handleMenuClick}
              >
                <span className="nav-icon">📚</span>
                <span className="nav-text">Documentation</span>
              </a>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
