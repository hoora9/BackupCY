import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';

const ServicesPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.services} className="services-page">
      <Navigation />
      
      <div className="page-inner-content">
        <h1 className="page-heading fade-slide-up">{servicesContent.heading}</h1>
        
        <div className="services-grid fade-slide-up" style={{ animationDelay: '0.3s' }}>
          {servicesContent.services.map((service, index) => (
            <div key={index} className="service-item">
              <h3 className="service-label">{service.label}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="content-overlay-box additional-text fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <p>{servicesContent.additionalText}</p>
        </div>
        
        <div className="content-overlay-box opportunity fade-slide-up" style={{ animationDelay: '0.65s' }}>
          <h3>The Opportunity</h3>
          <p>{servicesContent.opportunity}</p>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
