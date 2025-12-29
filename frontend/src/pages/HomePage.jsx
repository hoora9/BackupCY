import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, homeContent, pageBackgrounds } from '../data/mock';

const HomePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.home} className="home-page">
      <Navigation transparent />
      
      <div className="home-content">
        {/* Tagline - centered vertically, left aligned */}
        <div className="tagline">
          <span className="tagline-text">{brandAssets.tagline}</span>
        </div>
        
        {/* Bottom: textbox 1 | textbox 2 | emblem */}
        <div className="home-bottom-content">
          <div className="content-boxes-row">
            {homeContent.blocks.map((block, index) => (
              <div key={index} className="content-box">
                <div className="box-tab-left">
                  <div className="box-large">{block.large}</div>
                </div>
                <div className="box-tab-right">
                  <div className="box-small">{block.small}</div>
                </div>
              </div>
            ))}
            {/* Emblem at end */}
            <div className="emblem-box">
              <img src={brandAssets.emblem} alt="Climate Yield" className="emblem-img" />
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default HomePage;
