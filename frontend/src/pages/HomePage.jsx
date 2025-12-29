import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, homeContent, pageBackgrounds } from '../data/mock';

const HomePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.home} className="home-page">
      <Navigation transparent />
      
      <div className="home-content">
        {/* Bottom positioned content - Tikehau style transparent boxes */}
        <div className="home-bottom-content">
          <div className="content-boxes">
            {homeContent.blocks.map((block, index) => (
              <div key={index} className="content-box">
                <div className="box-large">{block.large}</div>
                <div className="box-small">{block.small}</div>
              </div>
            ))}
          </div>
          
          <div className="tagline">
            <span className="tagline-text">{brandAssets.tagline}</span>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default HomePage;
