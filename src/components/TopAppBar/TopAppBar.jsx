import { NavLink } from 'react-router-dom'
import './TopAppBar.css'
import logoImg from '../../assets/logo/it-servicer logo bg remov.png'

const TopAppBar = ({ onMenuClick, showNavLinks = true }) => {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__left">
        <button type="button" className="top-app-bar__menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <NavLink to="/" className="top-app-bar__logo">
          <img src={logoImg} alt="IT Servicer Logo" className="top-app-bar__logo-img" />
        </NavLink>
      </div>

      {showNavLinks && (
        <nav className="top-app-bar__nav">
          <NavLink to="/" end className="top-app-bar__nav-link">
            Home
          </NavLink>
          <NavLink to="/services" className="top-app-bar__nav-link">
            Services
          </NavLink>
          <NavLink to="/blog" className="top-app-bar__nav-link">
            Blog
          </NavLink>
          <a href="/#stack" className="top-app-bar__nav-link">
            Stack
          </a>
        </nav>
      )}

      <div className="top-app-bar__right">
        <span className="material-symbols-outlined top-app-bar__icon">sensors</span>
      </div>
    </header>
  )
}

export default TopAppBar
