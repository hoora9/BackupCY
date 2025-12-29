import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { companyContent, pageBackgrounds } from '../data/mock';

const CompanyPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.company} className="company-page">
      <Navigation />
      
      <div className="page-inner-content">
        <div className="bottom-overlay-section">
          <h1 className="page-heading animate-slide-up">{companyContent.heading}</h1>
          
          <div className="overlay-box animate-slide-up delay-1">
            <h2 className="overlay-subheading">{companyContent.subheading}</h2>
            
            <div className="overlay-body">
              {companyContent.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <ul className="key-points">
              {companyContent.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default CompanyPage;
