import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandAssets, navigationLinks } from '../data/mock';

const Navigation = ({ light = false }) => {
  const location = useLocation();
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 nav-animate ${light ? 'nav-light' : 'nav-dark'}`}>
      <div className="nav-line-top" />
      <div className="nav-content">
        <div className="nav-links-left">
          {navigationLinks.slice(0, 2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <Link to="/" className="nav-logo">
          <img src={brandAssets.logo} alt="Climate Yield" className="logo-img" />
        </Link>
        
        <div className="nav-links-right">
          {navigationLinks.slice(2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-line-bottom" />
    </nav>
  );
};

export default Navigation;
