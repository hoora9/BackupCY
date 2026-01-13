import React, { useRef, useEffect } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';

const ServicesPage = () => {
  const [openAccordion, setOpenAccordion] = React.useState(0);
  const videoRef = useRef(null);

  // Autoplay video when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay was prevented:', error);
      });
    }
  }, []);

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
      
      {/* Right Box - Video Background */}
      <div className="services-box-right services-video-box" data-testid="services-video-box">
        <video
          ref={videoRef}
          className="services-video"
          autoPlay
          muted
          loop
          playsInline
          data-testid="services-video"
        >
          <source 
            src="https://customer-assets.emergentagent.com/job_b44059d0-0a5d-456f-a0da-c88e865f455e/artifacts/0qr8xanp_Services%20video%20%281%29.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
