import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { missionContent, pageBackgrounds } from '../data/mock';

const MissionPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.mission} className="mission-page">
      <Navigation />
      
      <div className="page-inner-content">
        <div className="bottom-overlay-section">
          <h1 className="page-heading animate-slide-up">{missionContent.heading}</h1>
          
          <div className="content-columns">
            {missionContent.blocks.map((block, index) => (
              <div 
                key={index} 
                className={`overlay-box animate-slide-up delay-${index + 1}`}
              >
                <p>{block}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default MissionPage;
