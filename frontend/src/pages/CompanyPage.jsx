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
      
      {/* Manifesto Section - underneath */}
      <div className="manifesto-section">
        <div className="manifesto-header">
          <div className="branded-quote-block manifesto-quote">
            <h2 className="manifesto-heading">{companyContent.manifesto.heading}</h2>
          </div>
          <p className="manifesto-subheading">{companyContent.manifesto.subheading}</p>
        </div>
        
        <div className="manifesto-grid">
          {companyContent.manifesto.sections.map((section, index) => (
            <div key={index} className="manifesto-item">
              <span className="manifesto-number">{section.number}</span>
              <h3 className="manifesto-title">{section.title}</h3>
              <p className="manifesto-text">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </PageBackground>
  );
};

export default CompanyPage;
