import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { missionContent, pageBackgrounds } from '../data/mock';

const MissionPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.mission} className="mission-page">
      <Navigation />
      
      {/* Blue Box - Background layer, slides from top-left */}
      <div className="mission-blue-box">
        <div className="mission-blue-content">
          <div className="branded-quote-block">
            <h1 className="mission-heading">MISSION</h1>
          </div>
          {missionContent.leftContent.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
      
      {/* Green Box - Foreground layer, slides from right */}
      <div className="mission-green-box">
        <div className="mission-green-content">
          {missionContent.rightContent.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </PageBackground>
  );
};

export default MissionPage;
