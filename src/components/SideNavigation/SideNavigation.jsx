import React from 'react';
import './SideNavigation.css';

const SideNavigation = () => {
  return (
    <nav className="side-navigation">
      <div className="side-navigation__logo">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHVLDf3R9E9LZHA5t-YZnmvnMbapn114Sv9TFs3HnOPbFRBfxwDyEQn58Mei5jgzfkQx8G6azdnei9Vc9yJWSYS029GIC9H2vEaIBY93MNNoM5jzbgamVbfCRz0Yvw_eGpbmKoI8C0YcrheNnNE_ZUoD2XYtyQ1d60W1-JwHTAx0bauX1WRrikqPBg90StXlBExPkt7QdDETyAyjyOaVi0gkavS9-q1Yw6Lct5XOISAvO-YR6pY6XpkAlVB2_Ztcr1Tlt2sIpmVE0"
          alt="IT Servicer Logo"
          className="side-navigation__logo-img"
        />
      </div>
      
      <div className="side-navigation__links">
        <a href="#" className="side-navigation__link side-navigation__link--active">
          <span className="material-symbols-outlined">grid_view</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className="side-navigation__link">
          <span className="material-symbols-outlined">hub</span>
          <span>Neural</span>
        </a>
        <a href="#" className="side-navigation__link">
          <span className="material-symbols-outlined">sync</span>
          <span>Sync</span>
        </a>
        <a href="#" className="side-navigation__link">
          <span className="material-symbols-outlined">security</span>
          <span>Security</span>
        </a>
      </div>
      
      <div className="side-navigation__settings">
        <span className="material-symbols-outlined side-navigation__settings-icon">settings</span>
      </div>
    </nav>
  );
};

export default SideNavigation;
