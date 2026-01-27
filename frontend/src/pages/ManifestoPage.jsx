import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { gsap } from 'gsap';

const BACKGROUND_IMAGE = "https://customer-assets.emergentagent.com/job_2b80c9d1-92b2-491e-aa63-9ed5489ce9c9/artifacts/fc3qglrk_Manifesto%20background.png";

const ManifestoPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  const sections = [
    {
      number: "01",
      title: "A Decisive Decade",
      subtitle: "Low-carbon infrastructure investment is entering a decisive decade",
      content: [
        "Climate transition will be built through real infrastructure. Decisions made this decade will lock in emissions pathways and economic outcomes for decades to come.",
        "Climate challenges are now inseparable from economic, industrial, and financial realities. Low-carbon infrastructure sits at the intersection of these forces, shaping how capital, industry, and climate objectives converge over the long term."
      ]
    },
    {
      number: "02",
      title: "Unprecedented Capital Needs",
      subtitle: "Capital needs are unprecedented and time-bound",
      content: [
        "Clean energy and low-carbon infrastructure investment in emerging and developing economies must reach approximately USD 2 trillion per year by 2030 to meet climate and development goals.",
        "Despite growing momentum, current investment levels remain far below what is required. Much of the infrastructure that will define the next decades has yet to be built, making this period structurally decisive."
      ],
      source: "IEA, 2023"
    },
    {
      number: "03",
      title: "Capital Follows Returns",
      subtitle: "Capital only scales where projects deliver attractive, long-term returns",
      content: [
        "Ambition alone does not mobilise capital. Investment flows when risk, governance, and cash-flow visibility are clearly structured to meet investor expectations.",
        "Closing the gap will require more than USD 1 trillion per year in additional infrastructure investment in the Global South, with private capital playing a critical role alongside public funding. Demonstrating that climate-aligned infrastructure can deliver attractive, long-term returns is essential to unlocking sustained private investment at scale."
      ],
      source: "World Bank, 2023"
    },
    {
      number: "04",
      title: "Overlooked Opportunities",
      subtitle: "The most critical opportunities are often overlooked",
      content: [
        "Small- and mid-scale low-carbon infrastructure projects are essential to the transition, yet frequently bypassed by large institutions due to complexity, fragmentation, and structuring constraints.",
        "Private capital currently accounts for a small fraction of climate finance in emerging markets, underscoring the scale of unmet investment needs."
      ],
      source: "IFC, World Bank Group, 2023"
    },
    {
      number: "05",
      title: "Structure Creates Value",
      subtitle: "Structure and integrity create durable value",
      content: [
        "Long-term value is built through rigorous project structuring, regulatory alignment, and institutional governance.",
        "Climate Yield operates where these tensions fully manifest, on real assets exposed to physical and regulatory constraints, where decisions shape industrial, economic, and environmental trajectories over the long term."
      ]
    },
    {
      number: "06",
      title: "Our conviction is simple.",
      subtitle: "",
      content: [
        "The climate transition becomes investable only when it is grounded in reality — in the constraints of the field, the logic of capital, and a deep understanding of environmental and carbon market systems.",
        "Climate Yield exists to transform complexity into credible, investment-ready low-carbon infrastructure capable of supporting sustained capital deployment."
      ]
    }
  ];

  useEffect(() => {
    // Animate overlay sliding in from top-left
    if (overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        {
          x: '-50%',
          y: '-50%'
        },
        {
          x: '0%',
          y: '0%',
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        }
      );
    }

    // Animate title
    gsap.fromTo('.manifesto-page-title', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
    );

    // Animate accordion items
    gsap.fromTo('.manifesto-accordion-item', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
    );
  }, []);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div 
      className="manifesto-page-redesign" 
      ref={containerRef}
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    >
      <Navigation />
      
      {/* Overlay that transitions from top-left */}
      <div className="manifesto-overlay" ref={overlayRef}>
        {/* Title Section - Same style as Company page "WHO WE ARE" */}
        <div className="manifesto-title-section">
          <div className="branded-quote-block manifesto-title-block">
            <h1 className="manifesto-page-title">MANIFESTO</h1>
          </div>
        </div>

        {/* Vertical Accordion */}
        <div className="manifesto-accordion">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`manifesto-accordion-item ${activeSection === index ? 'active' : ''}`}
            >
              <button 
                className="manifesto-accordion-header"
                onClick={() => toggleSection(index)}
              >
                <span className="accordion-number">{section.number}</span>
                <span className="accordion-title">{section.title}</span>
                <span className="accordion-icon">{activeSection === index ? '−' : '+'}</span>
              </button>
              
              <div className="manifesto-accordion-content">
                {section.subtitle && (
                  <h3 className="accordion-subtitle">{section.subtitle}</h3>
                )}
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="accordion-paragraph">{paragraph}</p>
                ))}
                {section.source && (
                  <span className="accordion-source">— {section.source}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
