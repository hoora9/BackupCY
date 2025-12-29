import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { expertiseContent, pageBackgrounds } from '../data/mock';

const ExpertisePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="expertise-page">
      <Navigation />
      
      <div className="page-inner-content scrollable">
        <h1 className="page-heading fade-slide-up">{expertiseContent.heading}</h1>
        
        <div className="values-grid fade-slide-up" style={{ animationDelay: '0.3s' }}>
          {expertiseContent.values.map((value, index) => (
            <div key={index} className="value-item">
              <h3 className="value-label">{value.label}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className="team-section">
          <h2 className="section-heading fade-slide-up" style={{ animationDelay: '0.5s' }}>
            {expertiseContent.teamHeading}
          </h2>
          <p className="team-subheading fade-slide-up" style={{ animationDelay: '0.6s' }}>
            {expertiseContent.teamSubheading}
          </p>
          
          <div className="team-grid fade-slide-up" style={{ animationDelay: '0.7s' }}>
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
    </PageBackground>
  );
};

export default ExpertisePage;
