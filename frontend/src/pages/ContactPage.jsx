import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { contactContent, pageBackgrounds } from '../data/mock';
import { MapPin, Globe, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Dropdown options
const contactTypeOptions = [
  'Government',
  'Investors',
  'Project Developers',
  'Other'
];

const subjectOptions = [
  'Explore a low-carbon infrastructure project',
  'Prepare my project for financing',
  'General enquiry'
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    contactType: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', contactType: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.response?.data?.detail || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground imageUrl={pageBackgrounds.contact} className="contact-page">
      <Navigation />
      
      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Info Box */}
          <div className="contact-info-box">
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
              <Globe className="info-icon" size={18} />
              <a href={`https://${contactContent.website}`} className="info-link" target="_blank" rel="noopener noreferrer">
                {contactContent.website}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-box">
            <h3 className="form-title">Get in Touch</h3>
            
            {submitted && (
              <div className="form-success">
                Thank you for your message. We'll be in touch shortly.
              </div>
            )}
            
            {error && (
              <div className="form-error">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactType">Who is contacting us? *</label>
                  <select
                    id="contactType"
                    name="contactType"
                    value={formData.contactType}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select an option</option>
                    {contactTypeOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project or inquiry..."
                  rows={4}
                  disabled={loading}
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageBackground>
  );
};

export default ContactPage;
