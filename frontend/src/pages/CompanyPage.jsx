import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { companyContent, pageBackgrounds } from '../data/mock';

const CompanyPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.company} className="company-page">
      <Navigation />
      
      <div className="page-inner-content">
        <h1 className="page-heading fade-slide-up">{companyContent.heading}</h1>
        
        <div className="content-overlay-box fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="subheading">{companyContent.subheading}</h2>
          
          <div className="body-text">
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
    </PageBackground>
  );
};

export default CompanyPage;
