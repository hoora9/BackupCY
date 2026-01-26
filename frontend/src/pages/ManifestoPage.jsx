import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ManifestoPage = () => {
  const containerRef = useRef(null);
  
  // First section - Combined in one bento box with colored parts
  const heroSection = {
    image: "https://static.prod-images.emergentagent.com/jobs/e151b339-d84c-47e4-ae2a-42bd52901c6d/images/c3b032cfaed16cbeeb06910d34e928d08887c448cb244107505e08899e46dd9f.png"
  };
  
  // Remaining sections
  const sections = [
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

      // Cascading shapes animation
      gsap.utils.toArray('.cascade-shape').forEach((shape, i) => {
        gsap.fromTo(shape, 
          { 
            y: -100,
            opacity: 0,
            scale: 0.5,
            rotation: -15
          },
          {
            scrollTrigger: {
              trigger: '.cascade-container',
              start: 'top 80%',
              end: 'center center',
              scrub: 1
            },
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: 'power2.out',
            delay: i * 0.1
          }
        );
      });

      // Hero section image - fade in then fade out
      const heroImage = document.querySelector('.hero-bento-section .manifesto-bento-image');
      if (heroImage) {
        // Fade in
        gsap.fromTo(heroImage,
          { opacity: 0, scale: 1.05 },
          {
            scrollTrigger: {
              trigger: '.hero-bento-section',
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1
            },
            opacity: 1,
            scale: 1,
            ease: 'power2.out'
          }
        );
        // Fade out
        gsap.to(heroImage, {
          scrollTrigger: {
            trigger: '.hero-bento-section',
            start: 'center center',
            end: 'bottom 20%',
            scrub: 1
          },
          opacity: 0,
          scale: 0.95,
          ease: 'power2.inOut'
        });
      }

      // Hero bento box - lines ease in with scroll
      gsap.utils.toArray('.hero-bento-line').forEach((line, i) => {
        gsap.fromTo(line,
          { 
            y: 40,
            opacity: 0
          },
          {
            scrollTrigger: {
              trigger: '.hero-bento-section',
              start: 'top 60%',
              end: 'center center',
              scrub: 0.5
            },
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            delay: i * 0.15
          }
        );
      });

      // Section animations on scroll - images fade in then fade out
      gsap.utils.toArray('.manifesto-bento-section:not(.hero-bento-section):not(.structure-section)').forEach((section) => {
        const image = section.querySelector('.manifesto-bento-image');
        const boxes = section.querySelectorAll('.manifesto-bento-box');
        
        // Image fades IN then OUT as you scroll
        if (image) {
          // Fade in
          gsap.fromTo(image,
            { opacity: 0, scale: 1.05 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 1
              },
              opacity: 1,
              scale: 1,
              ease: 'power2.out'
            }
          );
          // Fade out
          gsap.to(image, {
            scrollTrigger: {
              trigger: section,
              start: 'center center',
              end: 'bottom 20%',
              scrub: 1
            },
            opacity: 0,
            scale: 0.95,
            ease: 'power2.inOut'
          });
        }

        // Bento boxes reveal with ease
        boxes.forEach((box, i) => {
          gsap.fromTo(box,
            { y: 50, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 30%',
                scrub: 0.5
              },
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              delay: i * 0.1
            }
          );
        });
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

      {/* Cascading Objects - Appear before bento boxes */}
      <div className="cascade-container">
        <div className="cascade-shape shape-1"></div>
        <div className="cascade-shape shape-2"></div>
        <div className="cascade-shape shape-3"></div>
        <div className="cascade-shape shape-4"></div>
        <div className="cascade-shape shape-5"></div>
      </div>

      {/* Content Sections - Bento Box Layout */}
      <div className="manifesto-content-flow">
        
        {/* First Section - Single Bento Box with Multi-Colored Text */}
        <div className="manifesto-bento-section hero-bento-section">
          {/* Image */}
          <div className="manifesto-bento-image">
            <img src={heroSection.image} alt="A Decisive Decade" />
          </div>
          
          {/* Single Bento Box with All Content - Different Colors */}
          <div className="manifesto-bento-grid single-box-grid">
            <div className="manifesto-bento-box hero-unified-box">
              <h2 className="hero-bento-line hero-title-line">A Decisive Decade</h2>
              <h3 className="hero-bento-line hero-subtitle-line">Low-carbon infrastructure investment is entering a decisive decade</h3>
              <p className="hero-bento-line hero-content-line">
                Climate transition will be built through real infrastructure. Decisions made this decade will lock in emissions pathways and economic outcomes for decades to come.
              </p>
              <p className="hero-bento-line hero-subcontent-line">
                Climate challenges are now inseparable from economic, industrial, and financial realities. Low-carbon infrastructure sits at the intersection of these forces, shaping how capital, industry, and climate objectives converge over the long term.
              </p>
            </div>
          </div>
        </div>

        {/* Remaining Sections */}
        {sections.map((section, index) => (
          <div 
            key={index} 
            className="manifesto-bento-section"
          >
            {/* Image */}
            <div className="manifesto-bento-image">
              <img src={section.image} alt={section.title} />
            </div>
            
            {/* Bento Boxes for Text */}
            <div className="manifesto-bento-grid">
              <div className="manifesto-bento-box bento-title">
                <h2>{section.title}</h2>
              </div>
              <div className="manifesto-bento-box bento-subtitle">
                <h3>{section.subtitle}</h3>
              </div>
              <div className="manifesto-bento-box bento-content">
                <p>{section.content}</p>
              </div>
              <div className="manifesto-bento-box bento-subcontent">
                <p>{section.subContent}</p>
                {section.source && (
                  <span className="bento-source">— {section.source}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Structure Section */}
        <div className="manifesto-bento-section structure-section">
          <div className="manifesto-bento-grid centered">
            <div className="manifesto-bento-box bento-title">
              <h2>Structure Creates Value</h2>
            </div>
            <div className="manifesto-bento-box bento-subtitle">
              <h3>Structure and integrity create durable value</h3>
            </div>
            <div className="manifesto-bento-box bento-content wide">
              <p>Long-term value is built through rigorous project structuring, regulatory alignment, and institutional governance.</p>
            </div>
            <div className="manifesto-bento-box bento-subcontent wide">
              <p>Climate Yield operates where these tensions fully manifest, on real assets exposed to physical and regulatory constraints, where decisions shape industrial, economic, and environmental trajectories over the long term.</p>
            </div>
          </div>
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

        {/* Closing Section - Same as Homepage Tagline */}
        <div className="manifesto-closing-block">
          <p className="manifesto-tagline">
            Structured for Trust. Built for Results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
