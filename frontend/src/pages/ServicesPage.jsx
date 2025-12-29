import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';

const ServicesPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.services} className="services-page">
      <Navigation />
      
      <div className="page-inner-content">
        <div className="bottom-overlay-section">
          <h1 className="page-heading animate-slide-up">{servicesContent.heading}</h1>
          
          <div className="services-grid animate-slide-up delay-1">
            {servicesContent.services.map((service, index) => (
              <div key={index} className="service-item">
                <h3 className="service-label">{service.label}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="overlay-box additional-text animate-slide-up delay-2">
            <p>{servicesContent.additionalText}</p>
          </div>
          
          <div className="overlay-box opportunity animate-slide-up delay-3">
            <h3>The Opportunity</h3>
            <p>{servicesContent.opportunity}</p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
