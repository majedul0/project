import React from 'react';
import './Footer.css';

const Footer = ({ withSideNav = false }) => {
  return (
    <footer className={`footer ${withSideNav ? 'footer--with-sidenav' : ''}`}>
      <div className="footer__container">
        <div className="footer__logo-section">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHVLDf3R9E9LZHA5t-YZnmvnMbapn114Sv9TFs3HnOPbFRBfxwDyEQn58Mei5jgzfkQx8G6azdnei9Vc9yJWSYS029GIC9H2vEaIBY93MNNoM5jzbgamVbfCRz0Yvw_eGpbmKoI8C0YcrheNnNE_ZUoD2XYtyQ1d60W1-JwHTAx0bauX1WRrikqPBg90StXlBExPkt7QdDETyAyjyOaVi0gkavS9-q1Yw6Lct5XOISAvO-YR6pY6XpkAlVB2_Ztcr1Tlt2sIpmVE0"
            alt="IT Servicer Logo"
            className="footer__logo"
          />
          <span className="footer__logo-text">IT SERVICER</span>
        </div>
        
        <div className="footer__links">
          <a href="#" className="footer__link">Terms</a>
          <a href="#" className="footer__link">Privacy</a>
          <a href="#" className="footer__link">Support</a>
        </div>
        
        <div className="footer__copyright">
          © 2024 IT SERVICER // NEURAL PROTOCOL
        </div>
      </div>
    </footer>
  );
};

export default Footer;
