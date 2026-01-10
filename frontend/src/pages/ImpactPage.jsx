import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { pageBackgrounds } from '../data/mock';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import { CardsParallax } from '../components/ui/scroll-cards';

// Impact gallery images - only images, no text overlay
const impactImages = [
  {
    src: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/xbfdsfjo_20130823_11.19.45_DSC_9188.jpg",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/lvjlpl52_station%20in%20the%20morning%20framed%20by%20tree_1.686.1.jpg",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/57pjot59_GPG-39.jpg",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/j2miocs8_IMG_2021.JPG",
  },
  {
    src: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/a6tkeyv3_360%20Thumbnail%20First%20Part_2.164.1.jpg",
  },
];

const ImpactPage = () => {
  const impactHeadingRef = useRef(null);
  const impactSplitRef = useRef(null);

  useEffect(() => {
    // Initialize Splitting on the IMPACT heading (breathing animation)
    if (impactHeadingRef.current && !impactSplitRef.current) {
      impactSplitRef.current = Splitting({
        target: impactHeadingRef.current,
        by: 'chars'
      });
    }
  }, []);

  return (
    <PageBackground imageUrl={pageBackgrounds.expertise} className="impact-page" overlay={false}>
      <Navigation />
      
      <div className="impact-page-content">
        {/* Breathing Animation Title */}
        <div className="impact-header">
          <h1 className="impact-breathing-heading" ref={impactHeadingRef} data-splitting>
            Impact
          </h1>
        </div>
        
        {/* Image Gallery */}
        <div className="impact-gallery-section">
          <CardsParallax items={impactImages} />
        </div>
      </div>
    </PageBackground>
  );
};

export default ImpactPage;
