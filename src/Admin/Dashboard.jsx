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
import { fetchAllServices, fetchOrders, fetchChatHistory } from '../services/api'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [stats, setStats] = useState({ services: 0, orders: 0, chats: 0 })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const servicesData = await fetchAllServices()
        const ordersData = await fetchOrders()
        const chatData = await fetchChatHistory()
        setStats({
          services: servicesData ? servicesData.length : 0,
          orders: ordersData && ordersData.orders ? ordersData.orders.length : 0,
          chats: chatData ? chatData.length : 0
        })
      } catch (err) {
        console.error('Failed to load stats', err)
      }
    }
    loadStats()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin', { replace: true })
  }

  const kpiCards = [
    {
      title: 'Total Services',
      value: stats.services.toLocaleString(),
      tone: 'primary',
    },
    {
      title: 'Total Orders',
      value: stats.orders.toLocaleString(),
      tone: 'success',
    },
    {
      title: 'Support Chats',
      value: stats.chats.toLocaleString(),
      tone: 'neutral',
    }
  ]

  return (
    <AdminLayout>
      <main className="admin-dashboard-page">
        <section className="admin-dashboard-hero">
          <div className="dashboard-hero-content" style={{width: '100%'}}>
            <h1 style={{fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a1a'}}>System Overview</h1>
            <section className="dashboard-grid dashboard-grid-hero" aria-label="Admin stats">
              {kpiCards.map((card) => (
                <article key={card.title} className={`dashboard-card dashboard-card-${card.tone}`}>
                  <h2>{card.title}</h2>
                  <p>{card.value}</p>
                </article>
              ))}
            </section>
          </div>
          <button className="admin-logout-btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </section>

        <section className="dashboard-action-grid" aria-label="Admin workflows">
          <article className="dashboard-actions" aria-label="Admin actions">
            <h2>Catalog Management</h2>
            <p style={{marginBottom: '1rem'}}>Add, update, or remove services in your catalog.</p>
            <Link className="admin-primary-link" to="/admin/services">
              Manage Services
            </Link>
          </article>

          <article className="dashboard-actions" aria-label="Order actions">
            <h2>Order Management</h2>
            <p style={{marginBottom: '1rem'}}>Track customer orders and update shipping status.</p>
            <Link className="admin-primary-link" to="/admin/orders">
              View Order List
            </Link>
          </article>

          <article className="dashboard-actions" aria-label="Chat analytics actions">
            <h2>Agent X Analytics</h2>
            <p style={{marginBottom: '1rem'}}>Review AI assistant conversation history.</p>
            <Link className="admin-primary-link" to="/admin/chats">
              View Chat History
            </Link>
          </article>
        </section>

        <section className="dashboard-footnote" aria-label="System status">
          <p>System Status: All core admin tools are available and online.</p>
        </section>
      </main>
    </AdminLayout>
  )
}

export default Dashboard
