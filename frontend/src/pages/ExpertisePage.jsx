import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Values data with descriptions
const valuesData = [
  { 
    label: 'Integrity', 
    description: 'We uphold the highest standards of honesty and transparency in all our dealings, building trust with clients and partners.'
  },
  { 
    label: 'Discipline', 
    description: 'We maintain rigorous processes and methodologies, ensuring consistent quality and reliable outcomes.'
  },
  { 
    label: 'Agility', 
    description: 'We adapt quickly to changing market conditions and client needs, staying ahead of industry developments.'
  },
  { 
    label: 'Mastery', 
    description: 'We continuously deepen our expertise in carbon markets and low-carbon infrastructure, delivering superior insights.'
  },
  { 
    label: 'Real Impact', 
    description: 'We focus on tangible, measurable outcomes that drive genuine environmental and financial value.'
  },
  { 
    label: 'Collaboration', 
    description: 'We work closely with clients, partners, and stakeholders to achieve shared goals and maximize value creation.'
  }
];

const ExpertisePage = () => {
  const containerRef = useRef(null);
  const [openValue, setOpenValue] = useState(0);

  const toggleValue = (index) => {
    setOpenValue(openValue === index ? -1 : index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate wave to move UPWARD and reveal content below
      ScrollTrigger.create({
        trigger: '.values-wave-section',
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          // Move waves UPWARD (negative Y) to reveal content
          const waveContainer = document.querySelector('.wave-animation-container');
          if (waveContainer) {
            waveContainer.style.transform = `translateY(${-progress * 100}%)`;
            waveContainer.style.opacity = 1 - progress * 0.8;
          }
        }
      });

      // Animate values accordion on reveal
      gsap.utils.toArray('.value-accordion-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: '.values-content-area',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
      <Navigation />
      
      <div className="page-inner-content scrollable" ref={containerRef}>
        <div className="bottom-overlay-section expertise-layout">
          {/* Team Section */}
          <div className="team-section-overlay animate-slide-up delay-1">
            {/* Branded Heading - Same style as Mission with CSS emblems */}
            <div className="branded-quote-block">
              <h2 className="team-heading-mission-style">
                {expertiseContent.teamHeading}
              </h2>
            </div>
            <p className="team-subheading-bold">
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
          </div>
          
          {/* Values Section with Animated Waves OVER content */}
          <div className="values-wave-section" data-testid="values-wave-section">
            {/* Values Content - Underneath the waves */}
            <div className="values-content-area">
              <div className="branded-quote-block values-heading-block">
                <h3 className="values-section-heading">Our Values</h3>
              </div>
              
              {/* Values Accordion */}
              <div className="values-accordion" data-testid="values-accordion">
                {valuesData.map((value, index) => (
                  <div 
                    key={index} 
                    className={`value-accordion-item ${openValue === index ? 'open' : ''}`}
                    data-testid={`value-item-${index}`}
                  >
                    <button 
                      className="value-accordion-header"
                      onClick={() => toggleValue(index)}
                    >
                      <span className="value-number">0{index + 1}</span>
                      <span className="value-label">{value.label}</span>
                      <ChevronDown className={`value-icon ${openValue === index ? 'rotate' : ''}`} size={20} />
                    </button>
                    <div className="value-accordion-content">
                      <p>{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Wave Overlay - ON TOP, moves UP on scroll */}
            <div className="wave-animation-container">
              <svg viewBox="0 0 1320 500" className="wave-svg" preserveAspectRatio="none">
                <path 
                  className="wave-path wave-1"
                  fillOpacity="0.5" 
                  d="M0, 192 C220, 100, 440, 100, 660, 192 C880, 290, 1100, 290, 1320, 192 L1320 500 L0 500"
                  fill="#daaf61"
                />
                <path 
                  className="wave-path wave-2"
                  fillOpacity="0.5" 
                  d="M0, 192 C220, 100, 440, 100, 660, 192 C880, 290, 1100, 290, 1320, 192 L1320 500 L0 500"
                  fill="#f5f0db"
                />
                <path 
                  className="wave-path wave-3"
                  fillOpacity="0.5" 
                  d="M0, 192 C220, 100, 440, 100, 660, 192 C880, 290, 1100, 290, 1320, 192 L1320 500 L0 500"
                  fill="#546e4a"
                />
                <path 
                  className="wave-path wave-4"
                  fillOpacity="0.5" 
                  d="M0, 192 C220, 100, 440, 100, 660, 192 C880, 290, 1100, 290, 1320, 192 L1320 500 L0 500"
                  fill="#285831"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ExpertisePage;
