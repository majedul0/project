import React, { useState } from 'react';
import './TopAppBar.css';

const TopAppBar = ({ onMenuClick, showNavLinks = true }) => {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar__left">
        <button className="top-app-bar__menu-btn" onClick={onMenuClick}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="top-app-bar__logo">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHVLDf3R9E9LZHA5t-YZnmvnMbapn114Sv9TFs3HnOPbFRBfxwDyEQn58Mei5jgzfkQx8G6azdnei9Vc9yJWSYS029GIC9H2vEaIBY93MNNoM5jzbgamVbfCRz0Yvw_eGpbmKoI8C0YcrheNnNE_ZUoD2XYtyQ1d60W1-JwHTAx0bauX1WRrikqPBg90StXlBExPkt7QdDETyAyjyOaVi0gkavS9-q1Yw6Lct5XOISAvO-YR6pY6XpkAlVB2_Ztcr1Tlt2sIpmVE0"
            alt="IT Servicer Logo"
            className="top-app-bar__logo-img"
          />
          <span className="top-app-bar__logo-text">IT Servicer</span>
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
