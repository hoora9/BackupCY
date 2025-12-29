import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { missionContent, pageBackgrounds } from '../data/mock';

const MissionPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.mission} className="mission-page">
      <Navigation />
      
      <div className="page-inner-content">
        <h1 className="page-heading fade-slide-up">{missionContent.heading}</h1>
        
        <div className="content-blocks-vertical">
          {missionContent.blocks.map((block, index) => (
            <div 
              key={index} 
              className="content-overlay-box fade-slide-up" 
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              <p>{block}</p>
            </div>
          ))}
        </div>
      </div>
    </PageBackground>
  );
};

export default MissionPage;
