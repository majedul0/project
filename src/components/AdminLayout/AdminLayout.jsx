import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminLayout.css'
import '../../styles/admin-theme.css'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)

  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="header-content">
          <Link to="/admin/dashboard" className="admin-logo">
            IT Servicer Admin
          </Link>
          <div className="admin-header-actions">
            <Link to="/" className="admin-view-site-link" target="_blank" rel="noreferrer">
              View site
            </Link>
            <button type="button" className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button
              type="button"
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} role="presentation" />}

      <div className="admin-container">
        <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="admin-nav">
            <Link
              to="/admin/dashboard"
              className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </Link>

            <Link
              to="/admin/services"
              className={`nav-item ${isActive('/admin/services') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">🔧</span>
              <span className="nav-text">Services</span>
            </Link>

            <Link
              to="/admin/blogs"
              className={`nav-item ${isActive('/admin/blogs') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Blog</span>
            </Link>

            <Link
              to="/admin/orders"
              className={`nav-item ${isActive('/admin/orders') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-text">Orders</span>
            </Link>

            <Link
              to="/admin/chats"
              className={`nav-item ${isActive('/admin/chats') ? 'active' : ''}`}
              onClick={handleMenuClick}
            >
              <span className="nav-icon">💬</span>
              <span className="nav-text">Chats</span>
            </Link>

            <div className="nav-divider" />

            <div className="nav-section">
              <p className="nav-section-title">Client pages</p>
              <a href="/services" className="nav-item" target="_blank" rel="noreferrer" onClick={handleMenuClick}>
                <span className="nav-icon">🌐</span>
                <span className="nav-text">Services page</span>
              </a>
              <a href="/blog" className="nav-item" target="_blank" rel="noreferrer" onClick={handleMenuClick}>
                <span className="nav-icon">📰</span>
                <span className="nav-text">Blog page</span>
              </a>
            </div>
          </nav>
        </aside>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
