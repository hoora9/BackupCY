import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Emblem image URL (same as conviction section)
const EMBLEM_URL = "https://customer-assets.emergentagent.com/job_b30097b0-7b42-4a84-b144-4f0c8388eca4/artifacts/yy9ogq3b_EMB.png";

const ManifestoPage = () => {
  const containerRef = useRef(null);
  
  // All sections with their content - emblem sizes decrease as you scroll down
  const sections = [
    {
      title: "A Decisive Decade",
      subtitle: "Low-carbon infrastructure investment is entering a decisive decade",
      content: "Climate transition will be built through real infrastructure. Decisions made this decade will lock in emissions pathways and economic outcomes for decades to come.",
      subContent: "Climate challenges are now inseparable from economic, industrial, and financial realities. Low-carbon infrastructure sits at the intersection of these forces, shaping how capital, industry, and climate objectives converge over the long term.",
      image: "https://static.prod-images.emergentagent.com/jobs/e151b339-d84c-47e4-ae2a-42bd52901c6d/images/c3b032cfaed16cbeeb06910d34e928d08887c448cb244107505e08899e46dd9f.png",
      emblemSize: 160
    },
    {
      title: "Unprecedented Capital Needs",
      subtitle: "Capital needs are unprecedented and time-bound",
      content: "Clean energy and low-carbon infrastructure investment in emerging and developing economies must reach approximately USD 2 trillion per year by 2030 to meet climate and development goals.",
      subContent: "Despite growing momentum, current investment levels remain far below what is required. Much of the infrastructure that will define the next decades has yet to be built, making this period structurally decisive.",
      source: "IEA, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/9t9vgtv7_Screenshot%202026-01-13%20at%2012.17.48.png",
      emblemSize: 130
    },
    {
      title: "Capital Follows Returns",
      subtitle: "Capital only scales where projects deliver attractive, long-term returns",
      content: "Ambition alone does not mobilise capital. Investment flows when risk, governance, and cash-flow visibility are clearly structured to meet investor expectations.",
      subContent: "Closing the gap will require more than USD 1 trillion per year in additional infrastructure investment in the Global South, with private capital playing a critical role alongside public funding. Demonstrating that climate-aligned infrastructure can deliver attractive, long-term returns is essential to unlocking sustained private investment at scale.",
      source: "World Bank, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/cbva806x_Screenshot%202026-01-13%20at%2012.18.11.png",
      emblemSize: 100
    },
    {
      title: "Overlooked Opportunities",
      subtitle: "The most critical opportunities are often overlooked",
      content: "Small- and mid-scale low-carbon infrastructure projects are essential to the transition, yet frequently bypassed by large institutions due to complexity, fragmentation, and structuring constraints.",
      subContent: "Private capital currently accounts for a small fraction of climate finance in emerging markets, underscoring the scale of unmet investment needs.",
      source: "IFC, World Bank Group, 2023",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/0i8qyepy_Screenshot%202026-01-13%20at%2012.18.25.png",
      emblemSize: 80
    },
    {
      title: "Structure Creates Value",
      subtitle: "Structure and integrity create durable value",
      content: "Long-term value is built through rigorous project structuring, regulatory alignment, and institutional governance.",
      subContent: "Climate Yield operates where these tensions fully manifest, on real assets exposed to physical and regulatory constraints, where decisions shape industrial, economic, and environmental trajectories over the long term.",
      image: "https://customer-assets.emergentagent.com/job_climate-finance/artifacts/cbva806x_Screenshot%202026-01-13%20at%2012.18.11.png",
      emblemSize: 60
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navigation hide on scroll
      const nav = document.querySelector('.navigation');
      if (nav) {
        ScrollTrigger.create({
          start: 'top -80',
          end: 99999,
          onUpdate: (self) => {
            if (self.direction === 1) {
              // Scrolling down - hide nav
              gsap.to(nav, { 
                opacity: 0, 
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power2.out'
              });
            } else {
              // Scrolling up - show nav
              gsap.to(nav, { 
                opacity: 1, 
                pointerEvents: 'auto',
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          }
        });
        
        // Also show nav when at very top
        ScrollTrigger.create({
          start: 'top top',
          end: 'top -50',
          onEnter: () => {
            gsap.to(nav, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(nav, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
          }
        });
      }

      // Hero heading animation
      gsap.from('.manifesto-heading-branded', {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3
      });

      // Animate each section - SLOWER transitions, images overlap during transition
      gsap.utils.toArray('.cascade-section').forEach((section, index) => {
        const image = section.querySelector('.cascade-image');
        const emblem = section.querySelector('.cascade-emblem');
        const textContent = section.querySelector('.cascade-text-content');
        const textLines = section.querySelectorAll('.cascade-text-line');
        
        // Image fades in VERY early (so it overlaps with previous section's fade out)
        if (image) {
          gsap.fromTo(image,
            { opacity: 0, scale: 1.02 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 130%',  // Start even earlier
                end: 'top 50%',     // Slower fade in
                scrub: 3            // Slower scrub
              },
              opacity: 1,
              scale: 1,
              ease: 'power1.inOut'
            }
          );
          
          // Image fades out VERY late (overlaps with next section's fade in)
          gsap.to(image, {
            scrollTrigger: {
              trigger: section,
              start: 'bottom 100%',  // Start fading much later
              end: 'bottom 20%',     // Slower fade out
              scrub: 3               // Slower scrub
            },
            opacity: 0,
            scale: 0.98,
            ease: 'power1.inOut'
          });
        }

        // Emblem appears and is fully visible BEFORE text
        if (emblem) {
          // Emblem fades IN
          gsap.fromTo(emblem,
            { opacity: 0, scale: 0.8, y: 20 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 120%',
                end: 'top 50%',
                scrub: 3
              },
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'power1.inOut'
            }
          );
          
          // Emblem fades OUT completely BEFORE text appears
          gsap.to(emblem, {
            scrollTrigger: {
              trigger: section,
              start: 'top 40%',
              end: 'top 15%',
              scrub: 3
            },
            opacity: 0,
            scale: 0.85,
            y: -30,
            ease: 'power1.inOut'
          });
        }

        // Text appears AFTER emblem fades out (no overlap)
        if (textContent) {
          gsap.fromTo(textContent,
            { opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 15%',
                end: 'top -15%',
                scrub: 3
              },
              opacity: 1,
              ease: 'power1.inOut'
            }
          );
        }

        // Text lines appear sequentially AFTER emblem is gone
        textLines.forEach((line, i) => {
          gsap.fromTo(line,
            { y: 25, opacity: 0 },
            {
              scrollTrigger: {
                trigger: section,
                start: 'top 10%',
                end: 'top -20%',
                scrub: 3
              },
              y: 0,
              opacity: 1,
              ease: 'power1.out',
              delay: i * 0.03
            }
          );
        });
      });

      // Conviction section animation
      gsap.from('.conviction-block', {
        scrollTrigger: {
          trigger: '.conviction-block',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power1.inOut'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="manifesto-page-navy" ref={containerRef}>
      <Navigation />
      
      {/* Hero Section */}
      <div className="manifesto-header-section">
        <div className="manifesto-header-content">
          <div className="branded-quote-block">
            <h1 className="manifesto-heading-branded">MANIFESTO</h1>
          </div>
        </div>
      </div>

      {/* Content Sections with Cascading Emblems */}
      <div className="manifesto-cascade-flow">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`cascade-section ${isEven ? 'image-left' : 'image-right'}`}
            >
              {/* Image Side */}
              <div className="cascade-image-wrapper">
                <div className="cascade-image">
                  <img src={section.image} alt={section.title} />
                </div>
              </div>
              
              {/* Content Side - Emblem ABOVE Text */}
              <div className="cascade-content-wrapper">
                {/* Emblem - positioned above text area */}
                <img 
                  src={EMBLEM_URL}
                  alt="Climate Yield Emblem"
                  className="cascade-emblem" 
                  style={{
                    width: `${section.emblemSize}px`,
                    height: `${section.emblemSize}px`
                  }}
                />
                
                {/* Text Content - below emblem */}
                <div className="cascade-text-content">
                  <h2 className="cascade-text-line cascade-title">{section.title}</h2>
                  <h3 className="cascade-text-line cascade-subtitle">{section.subtitle}</h3>
                  <p className="cascade-text-line cascade-paragraph">{section.content}</p>
                  <p className="cascade-text-line cascade-paragraph secondary">{section.subContent}</p>
                  {section.source && (
                    <span className="cascade-text-line cascade-source">— {section.source}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Conviction Section */}
        <div className="conviction-block">
          <div className="conviction-emblem-icon">
            <img 
              src={EMBLEM_URL}
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
            Structured for Trust. Built for Results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
