import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, homeContent, pageBackgrounds } from '../data/mock';

const HomePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.home} className="home-page">
      <Navigation transparent />
      
      <div className="home-content">
        {/* Tagline - centered */}
        <div className="tagline tagline-centered">
          <span className="tagline-text">Structured for Trust. Built for Results.</span>
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
