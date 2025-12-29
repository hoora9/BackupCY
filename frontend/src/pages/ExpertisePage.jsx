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
          <h1 className="page-heading animate-slide-up">{expertiseContent.heading}</h1>
          
          <div className="values-grid animate-slide-up delay-1">
            {expertiseContent.values.map((value, index) => (
              <div key={index} className="value-item">
                <h3 className="value-label">{value.label}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
          
          <div className="team-section">
            <h2 className="section-heading animate-slide-up delay-2">
              {expertiseContent.teamHeading}
            </h2>
            <p className="team-subheading animate-slide-up delay-3">
              {expertiseContent.teamSubheading}
            </p>
            
            <div className="team-grid animate-slide-up delay-4">
              {expertiseContent.team.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-photo">
                    <img src={member.photo} alt={member.name} />
                  </div>
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-title">{member.title}</p>
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
