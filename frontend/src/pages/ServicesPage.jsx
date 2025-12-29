import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';

const ServicesPage = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <PageBackground imageUrl={pageBackgrounds.services} className="services-page">
      <Navigation />
      
      {/* Blue Box - Background layer, slides from top-left */}
      <div className="services-blue-box">
        <div className="services-blue-content">
          <h1 className="services-heading">{servicesContent.heading}</h1>
          
          {/* Accordion */}
          <div className="services-accordion">
            {servicesContent.services.map((service, index) => (
              <div 
                key={index} 
                className={`accordion-item ${openAccordion === index ? 'open' : ''}`}
              >
                <button 
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="accordion-title">{service.label}</span>
                  <ChevronDown className={`accordion-icon ${openAccordion === index ? 'rotate' : ''}`} size={20} />
                </button>
                <div className="accordion-content">
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Green Box - Foreground layer, slides from right */}
      <div className="services-green-box">
        <div className="services-green-content">
          <p className="services-additional">{servicesContent.additionalText}</p>
          
          <div className="services-opportunity">
            <h3>The Opportunity</h3>
            <p>{servicesContent.opportunity}</p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
