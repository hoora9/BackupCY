import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import PageBackground from '../components/PageBackground';
import { pageBackgrounds, brandAssets } from '../data/mock';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Emblem URL from brand assets
const emblemUrl = "https://customer-assets.emergentagent.com/job_b30097b0-7b42-4a84-b144-4f0c8388eca4/artifacts/yy9ogq3b_EMB.png";

const ManifestoPage = () => {
  const containerRef = useRef(null);
  
  // Manifesto content sections - using user's uploaded images
  const sections = [
    {
      title: "A Decisive Decade",
      subtitle: "Low-carbon infrastructure investment is entering a decisive decade",
      content: "Climate transition will be built through real infrastructure. Decisions made this decade will lock in emissions pathways and economic outcomes for decades to come.",
      subContent: "Climate challenges are now inseparable from economic, industrial, and financial realities. Low-carbon infrastructure sits at the intersection of these forces, shaping how capital, industry, and climate objectives converge over the long term.",
      image: "https://static.prod-images.emergentagent.com/jobs/e151b339-d84c-47e4-ae2a-42bd52901c6d/images/c3b032cfaed16cbeeb06910d34e928d08887c448cb244107505e08899e46dd9f.png"
    },
    {
      title: "Unprecedented Capital Needs",
      subtitle: "Capital needs are unprecedented and time-bound",
      content: "Clean energy and low-carbon infrastructure investment in emerging and developing economies must reach approximately USD 2 trillion per year by 2030 to meet climate and development goals.",
      subContent: "Despite growing momentum, current investment levels remain far below what is required. Much of the infrastructure that will define the next decades has yet to be built, making this period structurally decisive.",
      source: "IEA, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/9t9vgtv7_Screenshot%202026-01-13%20at%2012.17.48.png"
    },
    {
      title: "Capital Follows Returns",
      subtitle: "Capital only scales where projects deliver attractive, long-term returns",
      content: "Ambition alone does not mobilise capital. Investment flows when risk, governance, and cash-flow visibility are clearly structured to meet investor expectations.",
      subContent: "Closing the gap will require more than USD 1 trillion per year in additional infrastructure investment in the Global South, with private capital playing a critical role alongside public funding. Demonstrating that climate-aligned infrastructure can deliver attractive, long-term returns is essential to unlocking sustained private investment at scale.",
      source: "World Bank, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/cbva806x_Screenshot%202026-01-13%20at%2012.18.11.png"
    },
    {
      title: "Overlooked Opportunities",
      subtitle: "The most critical opportunities are often overlooked",
      content: "Small- and mid-scale low-carbon infrastructure projects are essential to the transition, yet frequently bypassed by large institutions due to complexity, fragmentation, and structuring constraints.",
      subContent: "Private capital currently accounts for a small fraction of climate finance in emerging markets, underscoring the scale of unmet investment needs.",
      source: "IFC, World Bank Group, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/0i8qyepy_Screenshot%202026-01-13%20at%2012.18.25.png"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from('.manifesto-hero-heading', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Section animations on scroll
      gsap.utils.toArray('.manifesto-section').forEach((section, i) => {
        const image = section.querySelector('.manifesto-image-wrapper');
        const title = section.querySelector('.manifesto-section-title');
        const subtitle = section.querySelector('.manifesto-section-subtitle');
        const text = section.querySelector('.manifesto-section-text');
        const subtext = section.querySelector('.manifesto-section-subtext');
        
        // Image parallax and reveal with ease in/out
        gsap.from(image, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1
          },
          y: 80,
          opacity: 0,
          scale: 1.05,
          ease: 'power2.inOut'
        });

        // Content reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        });

        tl.from(title, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        })
        .from(subtitle, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        }, '-=0.4')
        .from(text, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        }, '-=0.4')
        .from(subtext, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut'
        }, '-=0.3');
      });

      // Conviction section animation
      gsap.from('.conviction-content', {
        scrollTrigger: {
          trigger: '.conviction-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      });

      // Closing statement animation
      gsap.from('.closing-statement', {
        scrollTrigger: {
          trigger: '.closing-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="manifesto-page-styled" ref={containerRef}>
      <Navigation />
      
      {/* Hero Section with branded heading */}
      <div className="manifesto-hero-section" data-testid="manifesto-hero">
        {/* Branded Heading - Same style as Mission page */}
        <div className="manifesto-branded-heading">
          <div className="emblem-side">
            <img src={emblemUrl} alt="" className="heading-emblem" />
          </div>
          <h1 className="manifesto-hero-heading">MANIFESTO</h1>
          <div className="emblem-side">
            <img src={emblemUrl} alt="" className="heading-emblem flipped" />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="manifesto-scroll-content">
        {/* Content Sections */}
        {sections.map((section, index) => (
          <section 
            key={index} 
            className={`manifesto-section ${index % 2 === 0 ? 'section-left' : 'section-right'}`}
          >
            <div className="manifesto-section-inner">
              <div className="manifesto-image-wrapper">
                <img src={section.image} alt={section.title} className="manifesto-image" />
                <div className="manifesto-image-overlay"></div>
              </div>
              <div className="manifesto-content-wrapper">
                <h2 className="manifesto-section-title">{section.title}</h2>
                <h3 className="manifesto-section-subtitle">{section.subtitle}</h3>
                <p className="manifesto-section-text">{section.content}</p>
                <p className="manifesto-section-subtext">{section.subContent}</p>
                {section.source && (
                  <span className="manifesto-section-source">— {section.source}</span>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* Structure Section */}
        <section className="manifesto-structure-section">
          <div className="manifesto-structure-inner">
            <h2 className="manifesto-section-title">Structure Creates Value</h2>
            <h3 className="manifesto-section-subtitle">Structure and integrity create durable value</h3>
            <p className="manifesto-section-text">
              Long-term value is built through rigorous project structuring, regulatory alignment, and institutional governance.
            </p>
            <p className="manifesto-section-subtext">
              Climate Yield operates where these tensions fully manifest, on real assets exposed to physical and regulatory constraints, where decisions shape industrial, economic, and environmental trajectories over the long term.
            </p>
          </div>
        </section>

        {/* Conviction Section */}
        <section className="conviction-section">
          <div className="conviction-inner">
            <div className="conviction-content">
              <div className="conviction-emblem">
                <img 
                  src={emblemUrl}
                  alt="Climate Yield Emblem" 
                />
              </div>
              <h2 className="conviction-title">Our conviction is simple.</h2>
              <p className="conviction-text">
                The climate transition becomes investable only when it is grounded in reality — in the constraints of the field, the logic of capital, and a deep understanding of environmental and carbon market systems.
              </p>
              <p className="conviction-text">
                Climate Yield exists to transform complexity into credible, investment-ready low-carbon infrastructure capable of supporting sustained capital deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="closing-section">
          <div className="closing-inner">
            <p className="closing-statement home-tagline">
              Structured for trust. Built for results.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManifestoPage;
