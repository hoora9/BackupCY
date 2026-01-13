import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ManifestoPage = () => {
  const containerRef = useRef(null);
  
  // Manifesto content sections
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
      gsap.from('.manifesto-heading-branded', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      // Section animations on scroll
      gsap.utils.toArray('.manifesto-content-section').forEach((section) => {
        const image = section.querySelector('.manifesto-img-wrapper');
        const content = section.querySelector('.manifesto-text-content');
        
        // Image ease in/out
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1
            },
            y: 60,
            opacity: 0,
            scale: 1.03,
            ease: 'power2.inOut'
          });
        }

        // Content reveal
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power2.inOut'
          });
        }
      });

      // Conviction section animation
      gsap.from('.conviction-block', {
        scrollTrigger: {
          trigger: '.conviction-block',
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="manifesto-page-navy" ref={containerRef}>
      <Navigation />
      
      {/* Hero Section - Same style as Mission left box */}
      <div className="manifesto-header-section">
        <div className="manifesto-header-content">
          <div className="branded-quote-block">
            <h1 className="manifesto-heading-branded">MANIFESTO</h1>
          </div>
        </div>
      </div>

      {/* Content Sections - No extra spacing */}
      <div className="manifesto-content-flow">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className={`manifesto-content-section ${index % 2 === 0 ? 'img-left' : 'img-right'}`}
          >
            <div className="manifesto-img-wrapper">
              <img src={section.image} alt={section.title} className="manifesto-img" />
            </div>
            <div className="manifesto-text-content">
              <h2 className="manifesto-title">{section.title}</h2>
              <h3 className="manifesto-subtitle">{section.subtitle}</h3>
              <p className="manifesto-text">{section.content}</p>
              <p className="manifesto-subtext">{section.subContent}</p>
              {section.source && (
                <span className="manifesto-source">— {section.source}</span>
              )}
            </div>
          </div>
        ))}

        {/* Structure Section */}
        <div className="manifesto-structure-block">
          <h2 className="manifesto-title">Structure Creates Value</h2>
          <h3 className="manifesto-subtitle">Structure and integrity create durable value</h3>
          <p className="manifesto-text">
            Long-term value is built through rigorous project structuring, regulatory alignment, and institutional governance.
          </p>
          <p className="manifesto-subtext">
            Climate Yield operates where these tensions fully manifest, on real assets exposed to physical and regulatory constraints, where decisions shape industrial, economic, and environmental trajectories over the long term.
          </p>
        </div>

        {/* Conviction Section */}
        <div className="conviction-block">
          <div className="conviction-emblem-icon">
            <img 
              src="https://customer-assets.emergentagent.com/job_b30097b0-7b42-4a84-b144-4f0c8388eca4/artifacts/yy9ogq3b_EMB.png"
              alt="Climate Yield Emblem" 
            />
          </div>
          <h2 className="conviction-heading">Our conviction is simple.</h2>
          <p className="conviction-paragraph">
            The climate transition becomes investable only when it is grounded in reality — in the constraints of the field, the logic of capital, and a deep understanding of environmental and carbon market systems.
          </p>
          <p className="conviction-paragraph">
            Climate Yield exists to transform complexity into credible, investment-ready low-carbon infrastructure capable of supporting sustained capital deployment.
          </p>
        </div>

        {/* Closing Section */}
        <div className="manifesto-closing-block">
          <p className="manifesto-tagline">
            structured for trust. built for results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
