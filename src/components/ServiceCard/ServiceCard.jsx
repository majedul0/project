import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  features = [], 
  tags = [], 
  variant = 'default',
  number,
  accent = 'primary',
  gridSpan = 'default'
}) => {
  const getAccentClass = () => {
    switch (accent) {
      case 'secondary':
        return 'service-card--secondary';
      case 'tertiary':
        return 'service-card--tertiary';
      default:
        return 'service-card--primary';
    }
  };

  const getGridSpanClass = () => {
    switch (gridSpan) {
      case 'large':
        return 'service-card--grid-large';
      case 'medium':
        return 'service-card--grid-medium';
      default:
        return '';
    }
  };

  const getIconStyle = () => {
    return icon ? { fontVariationSettings: "'FILL' 1" } : {};
  };

  return (
    <div className={`service-card ${getAccentClass()} service-card--${variant} ${getGridSpanClass()}`}>
      <div className="service-card__header">
        <div className="service-card__icon-wrapper">
          {icon && <span className="material-symbols-outlined service-card__icon" style={getIconStyle()}>{icon}</span>}
          <h3 className="service-card__title">{title}</h3>
        </div>
        {number && <span className="service-card__number">{number}</span>}
      </div>
      
      {description && <p className="service-card__description">{description}</p>}
      
      {features.length > 0 && (
        <div className="service-card__features">
          {Array.isArray(features[0]) ? (
            features.map((column, colIndex) => (
              <ul key={colIndex} className="service-card__feature-list">
                {column.map((feature, index) => (
                  <li key={index} className="service-card__feature-item">
                    <span className="service-card__feature-dot"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            ))
          ) : (
            <ul className="service-card__feature-list">
              {features.map((feature, index) => (
                <li key={index} className="service-card__feature-item">
                  <span className="service-card__feature-dot"></span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {tags.length > 0 && (
        <div className="service-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="service-card__tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
