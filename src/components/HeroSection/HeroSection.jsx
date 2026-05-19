import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-section__background">
        <div className="hero-section__grid" aria-hidden="true" />
        <div className="hero-section__glow hero-section__glow--primary"></div>
        <div className="hero-section__glow hero-section__glow--secondary"></div>
        <div className="hero-section__orb hero-section__orb--left" aria-hidden="true" />
        <div className="hero-section__orb hero-section__orb--right" aria-hidden="true" />
      </div>
      
      <div className="hero-section__content">
        <div className="hero-section__badge hero-section__reveal hero-section__reveal--1">
          <span className="hero-section__badge-dot"></span>
          <span className="hero-section__badge-text">Protocol 04-X Active</span>
        </div>
        
        <h1 className="hero-section__title hero-section__reveal hero-section__reveal--2">
          <span className="hero-section__title-text">Powering the </span>
          <span className="hero-section__title-accent hero-section__title-accent--primary">Future</span>
          <span className="hero-section__title-text"> of </span>
          <span className="hero-section__title-accent hero-section__title-accent--secondary">Code</span>
        </h1>
        
        <p className="hero-section__description hero-section__reveal hero-section__reveal--3">
          Harnessing the raw energy of the digital grid to deliver high-performance solutions for the next generation of tech-driven businesses.
        </p>
        
        <div className="hero-section__actions hero-section__reveal hero-section__reveal--4">
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
