import React, { useState } from 'react';
import './MobileDrawer.css';

const MobileDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-drawer">
      <div className="mobile-drawer__header">
        <span className="mobile-drawer__title">SYSTEM MENU</span>
        <button className="mobile-drawer__close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <nav className="mobile-drawer__nav">
        <a href="#" className="mobile-drawer__nav-item mobile-drawer__nav-item--active">
          <span className="material-symbols-outlined">grid_view</span>
          <span>System</span>
        </a>
        <a href="#services" className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">hub</span>
          <span>Modules</span>
        </a>
        <a href="#stack" className="mobile-drawer__nav-item" onClick={onClose}>
          <span className="material-symbols-outlined">layers</span>
          <span>Tech Stack</span>
        </a>
        <a href="#" className="mobile-drawer__nav-item">
          <span className="material-symbols-outlined">sensors</span>
          <span>Uplink</span>
        </a>
      </nav>
      
      <div className="mobile-drawer__status">
        <div className="mobile-drawer__status-box">
          SYSTEM STATUS: OPTIMAL<br />
          ENCRYPTION: AES-256<br />
          UPLINK: ACTIVE
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
