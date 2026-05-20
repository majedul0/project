import React, { useState } from 'react';
import './TopAppBar.css';
import logoImg from '../../assets/logo/it-servicer logo bg remov.png';

const TopAppBar = ({ onMenuClick, showNavLinks = true }) => {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__left">
        <button className="top-app-bar__menu-btn" onClick={onMenuClick}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="top-app-bar__logo">
          <img
            src={logoImg}
            alt="IT Servicer Logo"
            className="top-app-bar__logo-img"
          />
        </div>
      </div>
      
      {showNavLinks && (
        <nav className="top-app-bar__nav">
          <a href="#" className="top-app-bar__nav-link top-app-bar__nav-link--active">System</a>
          <a href="#services" className="top-app-bar__nav-link">Modules</a>
          <a href="#stack" className="top-app-bar__nav-link">Stack</a>
          <a href="#" className="top-app-bar__nav-link">Uplink</a>
        </nav>
      )}
      
      <div className="top-app-bar__right">
        <span className="material-symbols-outlined top-app-bar__icon">sensors</span>
      </div>
    </header>
  );
};

export default TopAppBar;
