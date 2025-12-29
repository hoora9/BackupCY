import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandAssets, navigationLinks } from '../data/mock';

const Navigation = ({ transparent = false }) => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  
  return (
    <nav className={`navigation ${transparent ? 'nav-transparent' : ''}`}>
      <div className="nav-line-top" />
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          <img src={brandAssets.logo} alt="Climate Yield" className="logo-img" />
        </Link>
        
        <div className="nav-links">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onMouseEnter={() => setHoveredLink(link.path)}
              onMouseLeave={() => setHoveredLink(null)}
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
