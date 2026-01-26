import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';

const ServicesPage = () => {
  const [openAccordion, setOpenAccordion] = useState(-1); // -1 means all closed

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <PageBackground imageUrl={pageBackgrounds.services} className="services-page-new">
      <Navigation />
      
      {/* Left Box - Navy/Dark background */}
      <div className="services-box-left">
        <div className="services-left-content">
          <div className="branded-quote-block">
            <h1 className="services-heading-new">SERVICES</h1>
          </div>
          
          {/* Accordion */}
          <div className="services-accordion-new">
            {servicesContent.services.map((service, index) => (
              <div 
                key={index} 
                className={`accordion-item-new ${openAccordion === index ? 'open' : ''}`}
              >
                <button 
                  className="accordion-header-new"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="accordion-number-new">0{index + 1}</span>
                  <span className="accordion-title-new">{service.label}</span>
                  <ChevronDown className={`accordion-icon-new ${openAccordion === index ? 'rotate' : ''}`} size={20} />
                </button>
                <div className="accordion-content-new">
                  {service.subtitle && (
                    <p className="accordion-subtitle">{service.subtitle}</p>
                  )}
                  <div className="accordion-description">
                    {service.description.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Box - Teal Background with Expertise Text */}
      <div className="services-box-right services-text-box" data-testid="services-text-box">
        <div className="services-expertise-content">
          <div className="expertise-highlight">
            <span className="expertise-number">10+</span>
            <span className="expertise-label">Years of Expertise</span>
          </div>
          <p className="expertise-description">
            10+ years of experience at the intersection of infrastructure and environmental markets. Climate Yield applies deep regulatory and market expertise to structure low-carbon infrastructure projects through dedicated project companies, robust governance, and clearly defined operational and revenue frameworks.
          </p>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
