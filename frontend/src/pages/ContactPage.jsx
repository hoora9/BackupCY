import React from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { contactContent, pageBackgrounds } from '../data/mock';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const ContactPage = () => {
  return (
    <PageBackground imageUrl={pageBackgrounds.contact} className="contact-page">
      <Navigation light />
      
      <div className="contact-content">
        <div className="contact-info-box fade-slide-up">
          <h2 className="company-name">{contactContent.company}</h2>
          
          <div className="info-item">
            <MapPin className="info-icon" size={18} />
            <div className="info-text">
              {contactContent.address.map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>
          </div>
          
          <div className="info-item">
            <Phone className="info-icon" size={18} />
            <a href={`tel:${contactContent.phone}`} className="info-link">
              {contactContent.phone}
            </a>
          </div>
          
          <div className="info-item">
            <Mail className="info-icon" size={18} />
            <div className="info-text">
              {contactContent.emails.map((email, index) => (
                <a key={index} href={`mailto:${email}`} className="info-link">
                  {email}
                </a>
              ))}
            </div>
          </div>
          
          <div className="info-item">
            <Globe className="info-icon" size={18} />
            <a href={`https://${contactContent.website}`} className="info-link" target="_blank" rel="noopener noreferrer">
              {contactContent.website}
            </a>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ContactPage;
