import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, manifestoContent, pageBackgrounds } from '../data/mock';

const ManifestoPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.manifesto} className="manifesto-page">
      <Navigation />
      
      <div className="page-inner-content">
        <div className="bottom-overlay-section">
          <h1 className="page-heading animate-slide-up">{manifestoContent.heading}</h1>
          
          <h2 className="page-subheading italic animate-slide-up delay-1">
            {manifestoContent.subheading}
          </h2>
          
          <div className="content-columns">
            {manifestoContent.blocks.map((block, index) => (
              <div 
                key={index} 
                className={`overlay-box animate-slide-up delay-${index + 2}`}
              >
                <p>{block}</p>
              </div>
            ))}
          </div>
          
          <div className="tagline-closing animate-slide-up delay-6">
            <span>{brandAssets.tagline}</span>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ManifestoPage;
