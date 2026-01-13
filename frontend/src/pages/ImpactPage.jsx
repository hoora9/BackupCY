import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';

const ImpactPage = () => {
  const initialized = useRef(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Wait for layout to complete
    const init = () => {
      const sections = document.querySelectorAll(".scroll-section");
      const comparators = [];

      sections.forEach((section, sectionIndex) => {
        const wrapper = section.querySelector(".comparator-wrapper");
        const comparator = section.querySelector(".comparator");
        const percentage = section.querySelector(".comparison-percentage");
        const layers = section.querySelectorAll(".image-layer");
        const dividers = section.querySelectorAll(".divider-line");
        
        if (comparator && layers.length > 0) {
          // Create stage indicators
          const nav = document.createElement("div");
          nav.className = "stage-nav";
          const indicators = [];
          
          for (let j = 0; j < layers.length; j++) {
            const indicator = document.createElement("button");
            indicator.className = "stage-indicator";
            if (j === 0) indicator.classList.add("active");
            indicator.setAttribute("aria-label", `Go to stage ${j + 1}`);
            indicator.dataset.stage = j;
            indicator.dataset.sectionIndex = sectionIndex;
            indicators.push(indicator);
            nav.appendChild(indicator);
          }
          comparator.appendChild(nav);

          // Calculate initial position - must be done when scroll is at 0
          // Use getBoundingClientRect which gives position relative to viewport
          // Since we're at scroll=0, this is the document position
          const rect = section.getBoundingClientRect();
          const currentScroll = window.scrollY;
          const sectionTop = rect.top + currentScroll;
          
          console.log(`Section ${sectionIndex}: top=${sectionTop}, height=${section.offsetHeight}`);

          comparators.push({
            section,
            wrapper,
            comparator,
            percentage,
            layers: Array.from(layers),
            dividers: Array.from(dividers),
            indicators,
            layerCount: layers.length,
            sectionTop: sectionTop,
            sectionHeight: section.offsetHeight
          });
        }
      });

      function updatePositions() {
        // Recalculate positions - need to scroll to top first for accurate measurement
        // But since this is expensive, we'll use a different approach
        comparators.forEach((comp, idx) => {
          comp.sectionHeight = comp.section.offsetHeight;
        });
      }

      function updateComparators() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        comparators.forEach((comp, compIndex) => {
          const sectionTop = comp.sectionTop;
          const sectionHeight = comp.sectionHeight;
          
          // How far have we scrolled past the start of this section?
          const scrollIntoSection = scrollY - sectionTop;
          
          // Total scrollable distance within this section
          const scrollableRange = sectionHeight - viewportHeight;
          
          // Calculate progress (0 to 1)
          let progress = 0;
          if (scrollableRange > 0 && scrollIntoSection > 0) {
            progress = Math.min(1, scrollIntoSection / scrollableRange);
          }
          
          // Update percentage display
          if (comp.percentage) {
            const pct = Math.round(progress * 100);
            comp.percentage.textContent = String(pct).padStart(2, '0') + '%';
          }

          // Update layer clip-paths
          const layerCount = comp.layerCount;
          comp.layers.forEach((layer, layerIndex) => {
            if (layerIndex < layerCount - 1) {
              const layerStart = layerIndex / (layerCount - 1);
              const layerEnd = (layerIndex + 1) / (layerCount - 1);
              
              let clipProgress = 0;
              if (progress >= layerEnd) {
                clipProgress = 1;
              } else if (progress > layerStart) {
                clipProgress = (progress - layerStart) / (layerEnd - layerStart);
              }
              
              const clipValue = clipProgress * 100;
              layer.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
            }
          });

          // Update divider lines
          comp.dividers.forEach((divider, dividerIndex) => {
            const dividerStart = dividerIndex / (layerCount - 1);
            const dividerEnd = (dividerIndex + 1) / (layerCount - 1);
            
            let dividerProgress = 0;
            let opacity = 0;
            
            if (progress > dividerStart && progress < dividerEnd) {
              dividerProgress = (progress - dividerStart) / (dividerEnd - dividerStart);
              opacity = dividerProgress < 0.02 ? 0 : (dividerProgress > 0.98 ? 0 : 1);
            }
            
            const leftPosition = 100 - (dividerProgress * 100);
            divider.style.left = `${leftPosition}%`;
            divider.style.opacity = opacity;
          });

          // Update stage indicators
          const currentStage = Math.min(
            Math.floor(progress * layerCount),
            layerCount - 1
          );
          comp.indicators.forEach((indicator, idx) => {
            indicator.classList.toggle("active", idx === currentStage);
          });

          // Apply 3D transform
          if (comp.wrapper) {
            const isReverse = comp.wrapper.classList.contains('flip-reverse');
            let transformProgress = progress;

            let rotateX, rotateY, rotateZ, scale, opacity;
            
            if (transformProgress < 0.1) {
              const t = transformProgress / 0.1;
              if (isReverse) {
                rotateX = -8 + (8 * t);
                rotateY = 8 - (8 * t);
                rotateZ = 2 - (2 * t);
              } else {
                rotateX = 8 - (8 * t);
                rotateY = -8 + (8 * t);
                rotateZ = -2 + (2 * t);
              }
              scale = 0.9 + (0.1 * t);
              opacity = 0.8 + (0.2 * t);
            } else if (transformProgress > 0.9) {
              const t = (transformProgress - 0.9) / 0.1;
              if (isReverse) {
                rotateX = 8 * t;
                rotateY = -8 * t;
                rotateZ = -2 * t;
              } else {
                rotateX = -8 * t;
                rotateY = 8 * t;
                rotateZ = 2 * t;
              }
              scale = 1 - (0.1 * t);
              opacity = 1 - (0.2 * t);
            } else {
              rotateX = 0;
              rotateY = 0;
              rotateZ = 0;
              scale = 1;
              opacity = 1;
            }

            comp.wrapper.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
            comp.wrapper.style.opacity = opacity;
          }
        });
      }

      // Handle indicator clicks
      function onIndicatorClick(e) {
        const btn = e.target.closest(".stage-indicator");
        if (!btn) return;

        const stage = parseInt(btn.dataset.stage, 10);
        const sectionIndex = parseInt(btn.dataset.sectionIndex, 10);
        const comp = comparators[sectionIndex];
        
        if (comp) {
          const viewportHeight = window.innerHeight;
          const scrollableRange = comp.sectionHeight - viewportHeight;
          
          const targetProgress = stage / (comp.layerCount - 1);
          const targetScroll = comp.sectionTop + (scrollableRange * targetProgress);
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }

      // Scroll handler
      let ticking = false;
      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateComparators();
            ticking = false;
          });
          ticking = true;
        }
      }

      function onResize() {
        updatePositions();
        updateComparators();
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      document.addEventListener("click", onIndicatorClick);

      // Initial update
      updateComparators();

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("click", onIndicatorClick);
      };
    };

    // Wait for images and layout to settle
    setTimeout(init, 200);
  }, []);

  return (
    <div className="impact-page-wrapper">
      <Navigation />
      <main className="impact-main">
        <article>
          {/* Header Section with branded quote block - same as Mission */}
          <section className="impact-header-section">
            <div className="branded-quote-block">
              <h1 className="impact-heading-branded">DEPLOYMENTS</h1>
            </div>
          </section>
          
          <section className="section-title">
            <p className="scroll-indicator">ACOM ↓</p>
          </section>
          
          <section className="scroll-section">
            <div className="comparator-container">
              <div className="comparator-wrapper">
                <div className="comparator">
                  <div className="comparison-percentage">00%</div>
                  <div className="image-layers">
                    <div className="image-layer">
                      <img src="https://i.postimg.cc/kDcMcW4Q/20121022-DSC-5096.jpg" decoding="async" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/xbfdsfjo_20130823_11.19.45_DSC_9188.jpg" decoding="async" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/57pjot59_GPG-39.jpg" decoding="async" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/lvjlpl52_station%20in%20the%20morning%20framed%20by%20tree_1.686.1.jpg" decoding="async" alt="" />
                    </div>
                  </div>
                  <div className="divider-lines">
                    <div className="divider-line"></div>
                    <div className="divider-line"></div>
                    <div className="divider-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="section-title">
            <p className="scroll-indicator">VASUNDHARA ↓</p>
          </section>
          
          <section className="scroll-section">
            <div className="comparator-container">
              <div className="comparator-wrapper flip-reverse">
                <div className="comparator">
                  <div className="comparison-percentage">00%</div>
                  <div className="image-layers">
                    <div className="image-layer">
                      <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/a6tkeyv3_360%20Thumbnail%20First%20Part_2.164.1.jpg" decoding="async" loading="lazy" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://i.postimg.cc/vDz8z5B9/Boy-with-Headset-at-house-2-3-1.jpg" decoding="async" loading="lazy" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://i.postimg.cc/9zpXpyMt/eaerly-morning-families-3-11-2.jpg" decoding="async" loading="lazy" alt="" />
                    </div>
                    <div className="image-layer">
                      <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/j2miocs8_IMG_2021.JPG" decoding="async" loading="lazy" alt="" />
                    </div>
                  </div>
                  <div className="divider-lines">
                    <div className="divider-line"></div>
                    <div className="divider-line"></div>
                    <div className="divider-line"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="section-title">
            <p className="scroll-indicator">Scroll up ↑</p>
          </section>
          
          <section className="spacer"></section>
        </article>
      </main>
    </div>
  );
};

export default ImpactPage;
