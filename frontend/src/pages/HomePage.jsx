import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, homeContent, pageBackgrounds } from '../data/mock';

const HomePage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.home} className="home-page">
      <Navigation />
      
      <div className="home-content">
        <div className="content-blocks">
          {homeContent.leftBlocks.map((block, index) => (
            <div key={index} className="content-block fade-slide-up" style={{ animationDelay: `${0.5 + index * 0.3}s` }}>
              <h2 className="block-large">{block.large}</h2>
              <p className="block-small">{block.small}</p>
            </div>
          ))}
        </div>
        
        <div className="tagline fade-slide-up" style={{ animationDelay: '1.2s' }}>
          <span>{brandAssets.tagline}</span>
        </div>
      </div>
    </PageBackground>
  );
};

export default HomePage;
