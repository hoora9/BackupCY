import React, { useRef, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { servicesContent, pageBackgrounds } from '../data/mock';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const ServicesPage = () => {
  const [openAccordion, setOpenAccordion] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
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

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
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
      
      {/* Right Box - Teal Background with Video Container */}
      <div className="services-box-right services-video-box" data-testid="services-video-box">
        {/* Video Container - Max 500px */}
        <div className="services-video-container">
          <video
            ref={videoRef}
            className="services-video"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            data-testid="services-video"
          >
            <source 
              src="https://customer-assets.emergentagent.com/job_b44059d0-0a5d-456f-a0da-c88e865f455e/artifacts/ntai7yt3_Untitled%20%281%29.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
          
          {/* Audio Toggle Button */}
          <button 
            className="audio-toggle-btn"
            onClick={toggleAudio}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            data-testid="audio-toggle"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </PageBackground>
  );
};

export default ServicesPage;
