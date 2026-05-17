import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const technologies = [
    'MONGODB',
    'EXPRESS.JS',
    'REACT.JS',
    'NODE.JS',
    'NEXT.JS',
    'DOCKER',
    'VPS'
  ];

  return (
    <section className="tech-stack" id="stack">
      <div className="tech-stack__container">
        <div className="tech-stack__list">
          {technologies.map((tech, index) => (
            <span key={index} className="tech-stack__item">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
