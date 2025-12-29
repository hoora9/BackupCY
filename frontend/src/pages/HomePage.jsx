import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, homeContent, pageBackgrounds } from '../data/mock';

const HomePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.home} className="home-page">
      <Navigation transparent />
      
      <div className="home-content">
        {/* Bottom positioned content boxes - Tikehau style */}
        <div className="home-bottom-content">
          <div className="content-boxes">
            {homeContent.blocks.map((block, index) => (
              <div key={index} className="content-box">
                <h2 className="box-large">{block.large}</h2>
                <p className="box-small">{block.small}</p>
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
