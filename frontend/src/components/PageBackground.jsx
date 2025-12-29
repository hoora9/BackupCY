import React from 'react';

const PageBackground = ({ imageUrl, overlay = true, children, className = '' }) => {
  return (
    <div className={`page-background ${className}`}>
      <div 
        className="bg-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      {overlay && <div className="bg-overlay" />}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
