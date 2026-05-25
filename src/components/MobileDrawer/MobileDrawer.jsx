import { NavLink } from 'react-router-dom'
import './MobileDrawer.css'

const MobileDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="mobile-drawer">
      <div className="mobile-drawer__header">
        <span className="mobile-drawer__title">SYSTEM MENU</span>
        <button type="button" className="mobile-drawer__close-btn" onClick={onClose} aria-label="Close menu">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="mobile-drawer__nav">
        <NavLink to="/" end className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/services" className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">hub</span>
          <span>Services</span>
        </NavLink>
        <NavLink to="/blog" className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">article</span>
          <span>Blog</span>
        </NavLink>
        <a href="/#stack" className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">layers</span>
          <span>Tech Stack</span>
        </a>
      </nav>

      <div className="mobile-drawer__status">
        <div className="mobile-drawer__status-box">
          SYSTEM STATUS: OPTIMAL
          <br />
          ENCRYPTION: AES-256
          <br />
          UPLINK: ACTIVE
        </div>
      </div>
    </div>
  )
}

export default MobileDrawer
