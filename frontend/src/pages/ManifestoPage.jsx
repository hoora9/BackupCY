import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { brandAssets, manifestoContent, pageBackgrounds } from '../data/mock';

const ManifestoPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.manifesto} className="manifesto-page">
      <Navigation />
      
      <div className="page-inner-content">
        <h1 className="page-heading fade-slide-up">{manifestoContent.heading}</h1>
        
        <h2 className="page-subheading italic fade-slide-up" style={{ animationDelay: '0.3s' }}>
          {manifestoContent.subheading}
        </h2>
        
        <div className="content-blocks-vertical">
          {manifestoContent.blocks.map((block, index) => (
            <div 
              key={index} 
              className="content-overlay-box fade-slide-up" 
              style={{ animationDelay: `${0.45 + index * 0.15}s` }}
            >
              <p>{block}</p>
            </div>
          ))}
        </div>
        
        <div className="tagline-closing fade-slide-up" style={{ animationDelay: '1.1s' }}>
          <span>{brandAssets.tagline}</span>
        </div>
      </div>
    </PageBackground>
  );
};

export default ManifestoPage;
