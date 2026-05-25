import { useState } from 'react'
import { Link } from 'react-router-dom'
import TopAppBar from '../TopAppBar/TopAppBar'
import MobileDrawer from '../MobileDrawer/MobileDrawer'
import Footer from '../Footer/Footer'
import SupernovaBackground from '../../animations/supernova.jsx'
import './ClientPageLayout.css'

const ClientPageLayout = ({ title, subtitle, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="app-shell">
      <div className="app-shell__animation-layer" aria-hidden="true">
        <SupernovaBackground />
      </div>
      <div className="app-shell__ambient app-shell__ambient--primary" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--secondary" aria-hidden="true" />
      <TopAppBar onMenuClick={() => setIsDrawerOpen((open) => !open)} />
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <main className="app-shell__main client-page">
        <div className="client-page__inner">
          <nav className="client-page__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="material-symbols-outlined">chevron_right</span>
            <span>{title}</span>
          </nav>
          <header className="client-page__header">
            <h1 className="client-page__title">{title}</h1>
            {subtitle ? <p className="client-page__subtitle">{subtitle}</p> : null}
          </header>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ClientPageLayout
