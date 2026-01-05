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
                  <ul className="accordion-list-new">
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
      
      {/* Right Box - Teal background */}
      <div className="services-box-right">
        <div className="services-right-content">
          <div className="services-highlight-new">
            <span className="highlight-number-new">{servicesContent.highlightNumber}</span>
            <span className="highlight-label-new">{servicesContent.highlightLabel}</span>
          </div>
          
          <div className="services-side-text-new">
            <p>{servicesContent.sideText}</p>
          </div>
          
          <div className="services-accent-line-new"></div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
