import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { companyContent, pageBackgrounds } from '../data/mock';

const CompanyPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.company} className="company-page-new">
      <Navigation />
      
      {/* Who We Are Section */}
      <div className="company-section-who">
        {/* Left Box - Teal background */}
        <div className="company-box-left">
          <div className="company-left-content">
            <div className="branded-quote-block">
              <h1 className="company-heading-new">WHO WE ARE</h1>
            </div>
            {companyContent.leftContent.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
        
        {/* Right Box - Navy background */}
        <div className="company-box-right">
          <div className="company-right-content">
            <p className="intro-text">{companyContent.rightContent.intro}</p>
            <ul className="company-points">
              {companyContent.rightContent.keyPoints.map((point, index) => (
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
