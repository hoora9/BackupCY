import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { companyContent, pageBackgrounds } from '../data/mock';

const CompanyPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.company} className="company-page">
      <Navigation />
      
      {/* Blue Box - Background layer, slides from top-left */}
      <div className="company-blue-box">
        <div className="company-blue-content">
          <div className="branded-quote-block">
            <h1 className="company-heading">WHO WE ARE</h1>
          </div>
          <h2 className="company-subheading">{companyContent.subheading}</h2>
          <p>{companyContent.body[0]}</p>
        </div>
      </div>
      
      {/* Green Box - Foreground layer, slides from right */}
      <div className="company-green-box">
        <div className="company-green-content">
          <p>{companyContent.body[1]}</p>
          <ul className="company-key-points">
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
