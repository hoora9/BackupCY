import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brandAssets, navigationLinks } from '../data/mock';
import { Menu, X } from 'lucide-react';

const Navigation = ({ transparent = false }) => {
  const location = useLocation();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <>
      <nav className={`navigation ${transparent ? 'nav-transparent' : ''}`}>
        <div className="nav-line-top" />
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <img src={brandAssets.logo} alt="Climate Yield" className="logo-img" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="nav-links nav-links-desktop">
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

          {/* Mobile Hamburger Button */}
          <button 
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <div className="nav-line-bottom" />
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
