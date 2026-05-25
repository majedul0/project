import React from 'react';
import './Footer.css';
import logoImg from '../../assets/logo/it-servicer logo bg remov.png';

const Footer = ({ withSideNav = false }) => {
  return (
    <footer className={`footer ${withSideNav ? 'footer--with-sidenav' : ''}`}>
      <div className="footer__scanline" aria-hidden="true" />
      <div className="footer__container">
        <div className="footer__logo-section footer__fade footer__fade--1">
          <img
            src={logoImg}
            alt="IT Servicer Logo"
            className="footer__logo"
          />
          <span className="footer__logo-text">IT SERVICER</span>
        </div>
        
        <div className="footer__links footer__fade footer__fade--2">
          <a href="/services" className="footer__link">Services</a>
          <a href="/blog" className="footer__link">Blog</a>
          <a href="/admin" className="footer__link">Admin</a>
        </div>
        
        <div className="footer__copyright footer__fade footer__fade--3">
          © 2024 IT SERVICER // NEURAL PROTOCOL
        </div>
      </div>
    </footer>
  );
};

export default Footer;
