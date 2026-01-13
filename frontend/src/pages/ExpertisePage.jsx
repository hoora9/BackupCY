import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Values data with colors for first letter
const valuesData = [
  { label: 'Integrity', color: '#2a6cae' },      // Blue
  { label: 'Discipline', color: '#78a890' },     // Vert-doux
  { label: 'Agility', color: '#2a6cae' },        // Blue
  { label: 'Mastery', color: '#78a890' },        // Vert-doux
  { label: 'Real Impact', color: '#2a6cae' },    // Blue
  { label: 'Collaboration', color: '#78a890' }   // Vert-doux
];

const ExpertisePage = () => {
  const valuesRef = useRef(null);
  
  const scrollToValues = () => {
    const valuesSection = document.querySelector('.values-section-new');
    if (valuesSection) {
      valuesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate values on scroll
      gsap.utils.toArray('.value-word').forEach((word, i) => {
        gsap.from(word, {
          scrollTrigger: {
            trigger: '.values-section-new',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out'
        });
      });
    }, valuesRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
      <Navigation />
      
      <div className="page-inner-content scrollable" ref={valuesRef}>
        <div className="bottom-overlay-section expertise-layout">
          {/* Team Section */}
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
          
          {/* New Values Section - Imperative Style */}
          <div className="values-section-new">
            <div className="values-list">
              {valuesData.map((value, index) => (
                <div key={index} className="value-word-container">
                  <span className="value-word">
                    <span className="value-first-letter" style={{ color: value.color }}>
                      {value.label.charAt(0)}
                    </span>
                    <span className="value-rest">{value.label.slice(1)}</span>
                  </span>
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
