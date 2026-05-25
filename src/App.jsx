/**
 * Main App Component
 * ==================
 * Entry point for the application with routing setup.
 * Handles both public website routes and admin panel routes.
 * 
 * Public Routes:
 *   / - Homepage
 * 
 * Admin Routes:
 *   /admin - Login page
 *   /admin/dashboard - Admin dashboard (protected)
 *   /admin/services - Manage services (protected)
 *   /admin/services/new - Create service (protected)
 *   /admin/services/:serviceId - Edit service (protected)
 */

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// Public components
import TopAppBar from './components/TopAppBar/TopAppBar'
import HeroSection from './components/HeroSection/HeroSection'
import TechStack from './components/TechStack/TechStack'
import ServicesSection from './components/ServicesSection/ServicesSection'
import CTASection from './components/CTASection/CTASection'
import Footer from './components/Footer/Footer'
import MobileDrawer from './components/MobileDrawer/MobileDrawer'
import SupernovaBackground from './animations/supernova.jsx'

// Public pages
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'

// Admin components
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './Admin/Dashboard'
import ManageServices from './Admin/Manageservices'
import OrderList from './Admin/OrderList'
import ManageBlogs from './Admin/ManageBlogs'
import ChatHistory from './Admin/ChatHistory'

// Styles
import './styles/global.css'

/**
 * Public Homepage Component
 * Displays the main landing page
 */
function HomePage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="app-shell">
      <div className="app-shell__animation-layer" aria-hidden="true">
        <SupernovaBackground />
      </div>
      <div className="app-shell__ambient app-shell__ambient--primary" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--secondary" aria-hidden="true" />
      <TopAppBar onMenuClick={() => setIsDrawerOpen((isOpen) => !isOpen)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="app-shell__main">
        <HeroSection />
        <TechStack />
        <ServicesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}

/**
 * Main App Component
 * Sets up routing and authentication context
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services"
            element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services/new"
            element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/services/:serviceId"
            element={
              <ProtectedRoute>
                <ManageServices />
              </ProtectedRoute>
            }
          />
<Route path="/admin/orders" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
<Route path="/admin/blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />
<Route path="/admin/chats" element={<ProtectedRoute><ChatHistory /></ProtectedRoute>} />

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
