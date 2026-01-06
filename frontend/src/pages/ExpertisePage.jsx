import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

const ExpertisePage = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const splitRef = useRef(null);
  
  const scrollToValues = () => {
    const valuesSection = document.querySelector('.values-section');
    if (valuesSection) {
      valuesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (headingRef.current && !splitRef.current) {
      // Initialize Splitting on the heading
      splitRef.current = Splitting({
        target: headingRef.current,
        by: 'chars',
        whitespace: true
      });
      
      // Update function for responsive scaling
      const update = () => {
        const container = containerRef.current;
        const el = headingRef.current;
        
        if (!container || !el) return;
        
        const originalPathWidth = el.clientWidth;
        const m = container.clientWidth / originalPathWidth;
        
        // If same width, do nothing
        if (m === 1) return;
        
        // Scale
        el.style.setProperty('--x', m);
        
        // Set transform origin
        if (container.clientWidth < originalPathWidth) {
          el.style.setProperty('--o', 'left');
        } else {
          el.style.setProperty('--o', 'center');
        }
      };
      
      // Set up ResizeObserver
      const observer = new ResizeObserver(update);
      observer.observe(containerRef.current);
      
      // Initial update
      update();
      
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
      <Navigation />
      
      <div className="page-inner-content scrollable">
        <div className="bottom-overlay-section expertise-layout">
          <h1 className="page-heading animate-slide-up">{expertiseContent.heading}</h1>
          
          {/* Team Section FIRST - with overlay animation */}
          <div className="team-section-overlay animate-slide-up delay-1">
            <h2 className="section-heading">
              {expertiseContent.teamHeading}
            </h2>
            <p className="team-subheading">
              {expertiseContent.teamSubheading}
            </p>
            
            <div className="team-grid-overlay">
              {expertiseContent.team.map((member, index) => (
                <div key={index} className={`team-member-box animate-slide-up delay-${index + 2}`}>
                  <div className="member-photo-overlay">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <div className="member-info">
                    <h4 className="member-name">{member.name}</h4>
                    <p className="member-title">{member.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll Down Arrow */}
            <div className="scroll-indicator" onClick={scrollToValues}>
              <span className="scroll-text">Scroll Down</span>
              <div className="scroll-arrow">
                <ChevronDown size={28} />
              </div>
            </div>
          </div>
          
          {/* Animated "CLIMATE YIELD VALUES" text */}
          <div className="splitting-container" ref={containerRef}>
            <h2 className="splitting-heading" ref={headingRef} data-splitting>
              CLIMATE YIELD VALUES
            </h2>
          </div>
          
          {/* Values Grid AFTER team */}
          <div className="values-section animate-slide-up delay-6">
            <div className="values-grid">
              {expertiseContent.values.map((value, index) => (
                <div key={index} className="value-item">
                  <h3 className="value-label">{value.label}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ExpertisePage;
