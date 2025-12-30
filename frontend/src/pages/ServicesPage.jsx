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
          <div className="branded-quote-block">
            <h1 className="services-heading">SERVICES</h1>
          </div>
          
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
                  <span className="accordion-number">0{index + 1}</span>
                  <span className="accordion-title">{service.label}</span>
                  <ChevronDown className={`accordion-icon ${openAccordion === index ? 'rotate' : ''}`} size={20} />
                </button>
                <div className="accordion-content">
                  <ul className="accordion-list">
                    {service.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Green Box - Foreground layer, slides from right */}
      <div className="services-green-box">
        <div className="services-green-content">
          <div className="services-highlight">
            <span className="highlight-number">{servicesContent.highlightNumber}</span>
            <span className="highlight-label">{servicesContent.highlightLabel}</span>
          </div>
          
          <div className="services-side-text">
            <p>{servicesContent.sideText}</p>
          </div>
          
          <div className="services-accent-line"></div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
