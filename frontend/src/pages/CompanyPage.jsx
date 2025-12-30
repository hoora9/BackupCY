import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { companyContent, pageBackgrounds, brandAssets } from '../data/mock';

const emblemUrl = 'https://customer-assets.emergentagent.com/job_climatefinance/artifacts/knu1eee2_EMB.png';

const CompanyPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.company} className="company-page">
      <Navigation />
      
      {/* Blue Box - Background layer, slides from top-left */}
      <div className="company-blue-box">
        <div className="company-blue-content">
          <h1 className="company-heading">
            <img src={emblemUrl} alt="" className="emblem-quote left" />
            <span>WHO WE ARE</span>
            <img src={emblemUrl} alt="" className="emblem-quote right" />
          </h1>
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
