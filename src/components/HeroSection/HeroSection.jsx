import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__background">
        <div className="hero-section__glow hero-section__glow--primary"></div>
        <div className="hero-section__glow hero-section__glow--secondary"></div>
      </div>
      
      <div className="hero-section__content">
        <div className="hero-section__badge">
          <span className="hero-section__badge-dot"></span>
          <span className="hero-section__badge-text">Protocol 04-X Active</span>
        </div>
        
        <h1 className="hero-section__title">
          <span className="hero-section__title-text">Powering the </span>
          <span className="hero-section__title-accent hero-section__title-accent--primary">Future</span>
          <span className="hero-section__title-text"> of </span>
          <span className="hero-section__title-accent hero-section__title-accent--secondary">Code</span>
        </h1>
        
        <p className="hero-section__description">
          Harnessing the raw energy of the digital grid to deliver high-performance solutions for the next generation of tech-driven businesses.
        </p>
        
        <div className="hero-section__actions">
          <button className="hero-section__btn hero-section__btn--primary">
            Initiate Project
          </button>
          <button className="hero-section__btn hero-section__btn--secondary">
            View Network
          </button>
        </div>
      </div>
      
      <div className="hero-section__gradient"></div>
    </section>
  );
};

export default HeroSection;
