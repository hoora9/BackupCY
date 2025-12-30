import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { missionContent, pageBackgrounds } from '../data/mock';

const emblemUrl = 'https://customer-assets.emergentagent.com/job_climatefinance/artifacts/knu1eee2_EMB.png';

const MissionPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.mission} className="mission-page">
      <Navigation />
      
      {/* Blue Box - Background layer, slides from top-left */}
      <div className="mission-blue-box">
        <div className="mission-blue-content">
          <h1 className="mission-heading">
            <img src={emblemUrl} alt="" className="emblem-quote left" />
            <span>MISSION</span>
            <img src={emblemUrl} alt="" className="emblem-quote right" />
          </h1>
          <p>{missionContent.blocks[0]}</p>
          <p>{missionContent.blocks[1]}</p>
        </div>
      </div>
      
      {/* Green Box - Foreground layer, slides from right */}
      <div className="mission-green-box">
        <div className="mission-green-content">
          <p>{missionContent.blocks[2]}</p>
          <p>{missionContent.blocks[3]}</p>
        </div>
      </div>
    </PageBackground>
  );
};

export default MissionPage;
