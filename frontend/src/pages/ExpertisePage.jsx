import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';

const ExpertisePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page" overlay={false}>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Values Section - Bento Boxes */}
          <div className="values-bento-section" data-testid="values-bento-section">
            <div className="branded-quote-block values-heading-block">
              <h3 className="values-section-heading">Our Values</h3>
            </div>
            
            {/* Bento Box Grid */}
            <div className="values-bento-grid" data-testid="values-bento-grid">
              {expertiseContent.values.map((value, index) => (
                <div 
                  key={index} 
                  className="value-bento-box"
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
    </PageBackground>
  );
};

export default ExpertisePage;
