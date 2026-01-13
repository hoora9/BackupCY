import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Values data
const valuesData = [
  'Integrity',
  'Discipline', 
  'Agility',
  'Mastery',
  'Real Impact',
  'Collaboration'
];

const ExpertisePage = () => {
  const waveContainerRef = useRef(null);
  const [visibleValues, setVisibleValues] = useState([]);
  const pathRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create scroll trigger for the wave section
      ScrollTrigger.create({
        trigger: '.topographic-wave-section',
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.3,
        onUpdate: (self) => {
          // Animate wave paths based on scroll
          const progress = self.progress;
          
          // Calculate which values should be visible (smoother progression)
          const numVisibleValues = Math.min(Math.ceil(progress * 6.5), 6);
          const newVisibleValues = valuesData.slice(0, numVisibleValues);
          setVisibleValues(newVisibleValues);
          
          // Animate wave paths - dramatic flowing movement
          pathRefs.current.forEach((path, index) => {
            if (path) {
              // Create flowing wave effect - alternating directions with phase offset
              const direction = index % 2 === 0 ? 1 : -1;
              const phaseOffset = index * 0.3;
              const yOffset = Math.sin(progress * Math.PI * 2 + phaseOffset) * 40 * direction;
              const xOffset = progress * 100 * direction;
              path.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            }
          });
        }
      });
    }, waveContainerRef);

    return () => ctx.revert();
  }, []);

  // Generate topographic wave paths (matching background aesthetic)
  const generateWavePaths = () => {
    const paths = [];
    const numLayers = 15; // More layers for richer effect
    
    for (let i = 0; i < numLayers; i++) {
      const yOffset = 30 + i * 30;
      const amplitude = 40 + Math.sin(i * 0.5) * 20;
      const frequency = 0.6 + (i % 3) * 0.15;
      
      // Create flowing wave path
      let d = `M -200 ${yOffset}`;
      for (let x = -200; x <= 2200; x += 40) {
        const y = yOffset + Math.sin(x * frequency * 0.01) * amplitude 
                  + Math.cos(x * 0.004 + i * 0.5) * (amplitude * 0.6);
        d += ` Q ${x + 20} ${y + amplitude * 0.4}, ${x + 40} ${y}`;
      }
      
      paths.push({
        d,
        opacity: 0.2 + (i % 4) * 0.1, // More visible
        strokeWidth: 1.5 + (i % 3) * 0.8,
        index: i
      });
    }
    return paths;
  };

  const wavePaths = generateWavePaths();

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
      <Navigation />
      
      <div className="page-inner-content scrollable" ref={waveContainerRef}>
        <div className="bottom-overlay-section expertise-layout">
          {/* Team Section */}
          <div className="team-section-overlay animate-slide-up delay-1">
            {/* Branded Heading with emblems - same style as Mission */}
            <div className="team-branded-heading">
              <div className="emblem-side">
                <img 
                  src="https://customer-assets.emergentagent.com/job_b30097b0-7b42-4a84-b144-4f0c8388eca4/artifacts/yy9ogq3b_EMB.png" 
                  alt="" 
                  className="heading-emblem" 
                />
              </div>
              <h2 className="team-main-heading">
                {expertiseContent.teamHeading}
              </h2>
              <div className="emblem-side">
                <img 
                  src="https://customer-assets.emergentagent.com/job_b30097b0-7b42-4a84-b144-4f0c8388eca4/artifacts/yy9ogq3b_EMB.png" 
                  alt="" 
                  className="heading-emblem flipped" 
                />
              </div>
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
          
          {/* Topographic Wave Values Section */}
          <div className="topographic-wave-section" data-testid="topographic-wave-section">
            {/* SVG Topographic Waves */}
            <svg 
              className="topographic-waves-svg"
              viewBox="0 0 1920 500"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* Gradient matching background colors */}
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2d5a3d" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a8cfb9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#d4c9a8" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a3d2f" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#78a890" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#e8e0c8" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              
              {wavePaths.map((path, idx) => (
                <path
                  key={idx}
                  ref={el => pathRefs.current[idx] = el}
                  d={path.d}
                  fill="none"
                  stroke={idx % 2 === 0 ? "url(#waveGradient1)" : "url(#waveGradient2)"}
                  strokeWidth={path.strokeWidth}
                  opacity={path.opacity}
                  className="wave-path"
                  style={{
                    transition: 'transform 0.3s ease-out'
                  }}
                />
              ))}
            </svg>
            
            {/* Values Display - Centered, Accumulating */}
            <div className="values-display-container" data-testid="values-display">
              {valuesData.map((value, index) => (
                <div
                  key={index}
                  className={`value-item ${visibleValues.includes(value) ? 'visible' : ''}`}
                  data-testid={`value-${value.toLowerCase().replace(' ', '-')}`}
                >
                  {value}
                </div>
              ))}
            </div>
            
            {/* Scroll hint */}
            {visibleValues.length === 0 && (
              <div className="wave-scroll-hint">
                <span>Scroll to reveal our values</span>
                <div className="scroll-arrow-wave">↓</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ExpertisePage;
