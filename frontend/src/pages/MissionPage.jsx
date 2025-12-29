import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { missionContent, pageBackgrounds } from '../data/mock';

const MissionPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.mission} className="mission-page">
      <Navigation />
      
      {/* Fullscreen flex overlay - two boxes side by side */}
      <div className="mission-overlay">
        {/* Left box - slides in from left */}
        <div className="mission-box mission-box-left">
          <h1 className="mission-heading">{missionContent.heading}</h1>
          <div className="mission-content">
            <p>{missionContent.blocks[0]}</p>
            <p>{missionContent.blocks[1]}</p>
          </div>
        </div>
        
        {/* Right box - slides in from right */}
        <div className="mission-box mission-box-right">
          <div className="mission-content">
            <p>{missionContent.blocks[2]}</p>
            <p>{missionContent.blocks[3]}</p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default MissionPage;
