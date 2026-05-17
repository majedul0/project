import React from 'react';
import './CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-section__background"></div>
      <div className="cta-section__container">
        <h2 className="cta-section__title">
          Ready to <span className="cta-section__title-accent">Jack In</span>?
        </h2>
        <p className="cta-section__description">
          Connect with our lead architects and start building your presence on the grid.
        </p>
        <div className="cta-section__button-wrapper">
          <div className="cta-section__button-glow"></div>
          <a className="cta-section__button" href="mailto:admin@itservicer.net">
            Establish Connection
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
