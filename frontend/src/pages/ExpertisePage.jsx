import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';
import { Linkedin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExpertisePage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navigation hide on scroll
      const nav = document.querySelector('.navigation');
      if (nav) {
        ScrollTrigger.create({
          start: 'top -80',
          end: 99999,
          onUpdate: (self) => {
            if (self.direction === 1) {
              // Scrolling down - hide nav
              gsap.to(nav, { 
                opacity: 0, 
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power2.out'
              });
            } else {
              // Scrolling up - show nav
              gsap.to(nav, { 
                opacity: 1, 
                pointerEvents: 'auto',
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          }
        });
        
        // Show nav when at very top
        ScrollTrigger.create({
          start: 'top top',
          end: 'top -50',
          onEnter: () => {
            gsap.to(nav, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(nav, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
      <div ref={containerRef}>
        <Navigation />
        
        <div className="page-inner-content scrollable">
          <div className="bottom-overlay-section expertise-layout">
            {/* Team Section */}
            <div className="team-section-overlay animate-slide-up delay-1">
              {/* Branded Heading - Same style as Mission with CSS emblems */}
              <div className="branded-quote-block team-heading-spacing">
                <h2 className="team-heading-mission-style">
                  {expertiseContent.teamHeading}
                </h2>
              </div>
              
              <div className="team-grid-overlay team-grid-3">
                {expertiseContent.team.map((member, index) => (
                  <div key={index} className={`team-member-box animate-slide-up delay-${index + 2}`}>
                    <div className="member-photo-overlay">
                      <img src={member.photo} alt={member.name} />
                    </div>
                    <div className="member-info">
                      <h4 className="member-name">{member.name}</h4>
                      <p className="member-title">{member.title}</p>
                      {member.linkedin && (
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="member-linkedin"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Values Section - Bento Boxes with Teal Background */}
            <div className="values-bento-section" data-testid="values-bento-section">
              <div className="branded-quote-block values-heading-block">
                <h3 className="values-section-heading">Our Values</h3>
              </div>
              
              {/* Bento Box Grid */}
              <div className="values-bento-grid" data-testid="values-bento-grid">
                {expertiseContent.values.map((value, index) => (
                  <div 
                    key={index} 
                    className="value-bento-box value-bento-teal"
                    data-testid={`value-box-${index}`}
                  >
                    <div className="value-bento-content">
                      <span className="value-bento-label">{value.label}</span>
                      <span className="value-bento-description">{value.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ExpertisePage;
