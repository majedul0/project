import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import './ServicesSection.css';

const ServicesSection = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-section__header">
        <div className="services-section__header-left">
          <h2 className="services-section__title">Core Specializations</h2>
          <p className="services-section__subtitle">Accessing specialized system modules...</p>
        </div>
        <div className="services-section__header-divider"></div>
        <div className="services-section__header-dots">
          <div className="services-section__dot services-section__dot--primary"></div>
          <div className="services-section__dot services-section__dot--secondary"></div>
          <div className="services-section__dot services-section__dot--tertiary"></div>
        </div>
      </div>

      <div className="services-section__grid">
        <ServiceCard
          title="Web Development"
          icon="terminal"
          number="01"
          accent="primary"
          variant="featured"
          gridSpan="large"
          features={[
            ['Custom Business Websites', 'Static & Dynamic Platforms', 'Custom Web Applications'],
            ['E-commerce Architecture', 'Admin Panels & Dashboards', 'CMS Solutions']
          ]}
          tags={['Next.JS', 'React', 'Enterprise Grade']}
        />

        <ServiceCard
          title="UI/UX & Frontend"
          icon="palette"
          accent="secondary"
          gridSpan="medium"
          description="Modern responsive layouts, high-converting landing pages, and complete website redesigns focused on user experience."
        />

        <ServiceCard
          title="Backend & System"
          icon="database"
          accent="tertiary"
          gridSpan="medium"
          description="Secure REST API development, MongoDB database architecture, and robust JWT/role-based authentication systems."
        />

        <ServiceCard
          title="Deployment"
          icon="cloud_sync"
          accent="default"
          gridSpan="medium"
          description="VPS server setup, Docker containerization, CI/CD pipeline automation, and seamless website migration services."
        />

        <ServiceCard
          title="AI Era Services"
          icon="neurology"
          accent="primary"
          gridSpan="medium"
          description="High-value AI integration including custom chatbots, content generation systems, and business workflow automation."
          tags={['High Value']}
        />

        <div className="services-section__optimization-card">
          <div className="services-section__optimization-content">
            <h3 className="services-section__optimization-title">Optimization & Maintenance</h3>
            <div className="services-section__optimization-grid">
              <div>
                <h4 className="services-section__optimization-subtitle services-section__optimization-subtitle--primary">Optimization</h4>
                <p className="services-section__optimization-text">SEO, Core Web Vitals, image optimization, and full mobile responsiveness fixes.</p>
              </div>
              <div>
                <h4 className="services-section__optimization-subtitle services-section__optimization-subtitle--secondary">Maintenance</h4>
                <p className="services-section__optimization-text">24/7 monitoring, emergency bug fixes, technical support, and automated backups.</p>
              </div>
            </div>
          </div>
          <div className="services-section__optimization-icons">
            <div className="services-section__optimization-icon services-section__optimization-icon--primary">
              <span className="material-symbols-outlined">speed</span>
            </div>
            <div className="services-section__optimization-icon services-section__optimization-icon--secondary">
              <span className="material-symbols-outlined">build</span>
            </div>
            <div className="services-section__optimization-icon services-section__optimization-icon--tertiary">
              <span className="material-symbols-outlined">search</span>
            </div>
            <div className="services-section__optimization-icon services-section__optimization-icon--surface">
              <span className="material-symbols-outlined">security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
