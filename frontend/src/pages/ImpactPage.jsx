import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';

const ImpactPage = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let velocity = 0;
    const ease = 0.12;
    const friction = 0.92;
    const sections = document.querySelectorAll(".scroll-section");
    const sectionsLen = sections.length;
    const wrappers = [];
    const comparatorData = [];
    let i, s, w, c, p;

    for (i = 0; i < sectionsLen; i++) {
      s = sections[i];
      w = s.querySelector(".comparator-wrapper");
      if (w) wrappers.push({ section: s, wrapper: w });
      c = s.querySelector(".comparator");
      if (!c) continue;
      p = c.querySelector(".comparison-percentage");
      if (p) {
        const layers = c.querySelectorAll(".image-layer");
        comparatorData.push({
          comp: c,
          pct: p,
          section: s,
          layerCount: layers.length,
          wrapper: w
        });
      }
    }

    const wrappersLen = wrappers.length;
    const compLen = comparatorData.length;

    function createStageIndicators() {
      for (let i = 0; i < compLen; i++) {
        const d = comparatorData[i];
        const nav = document.createElement("div");
        nav.className = "stage-nav";

        const indicators = [];
        for (let j = 0; j < d.layerCount; j++) {
          const indicator = document.createElement("button");
          indicator.className = "stage-indicator";
          indicator.setAttribute("aria-label", `Go to stage ${j + 1}`);
          indicator.dataset.stage = j;
          indicator.dataset.comparatorIndex = i;
          indicators.push(indicator);
          nav.appendChild(indicator);
        }

        d.comp.appendChild(nav);
        d.indicators = indicators;
      }
    }

    function getComparatorDuration() {
      const style = getComputedStyle(document.documentElement);
      const duration = style.getPropertyValue("--comparator-duration").trim();
      return (parseFloat(duration) * window.innerHeight) / 100;
    }

    let targetScrollPosition = null;
    const scrollEase = 0.08;

    function scrollToStage(comparatorIndex, stageIndex) {
      const data = comparatorData[comparatorIndex];
      if (!data) return;

      const offset = data.section.offsetTop;
      const duration = getComparatorDuration();
      const stageCount = data.layerCount;

      stageIndex = Math.max(0, Math.min(stageIndex, stageCount - 1));

      const stageDuration = duration / (stageCount - 1);
      targetScrollPosition = offset + stageDuration * stageIndex;
    }

    function onIndicatorClick(e) {
      const btn = e.target.closest(".stage-indicator");
      if (!btn) return;

      const stage = parseInt(btn.dataset.stage, 10);
      const compIndex = parseInt(btn.dataset.comparatorIndex, 10);

      scrollToStage(compIndex, stage);
    }

    function updateOffsets() {
      for (let i = 0; i < wrappersLen; i++) {
        const w = wrappers[i];
        w.wrapper.style.setProperty(
          "--comparator-offset",
          w.section.offsetTop + "px"
        );
      }
    }

    function onWheel(e) {
      e.preventDefault();
      targetScrollPosition = null;
      velocity += e.deltaY;
    }

    let resizeTimeout;

    function onResize() {
      targetScrollPosition = null;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateOffsets();
      }, 150);
    }

    function onMouseDown(e) {
      if (!e.target.closest(".comparator-wrapper")) {
        targetScrollPosition = null;
      }
    }

    function frame() {
      if (targetScrollPosition !== null) {
        const current = window.scrollY;
        const delta = targetScrollPosition - current;

        if (Math.abs(delta) > 1) {
          window.scrollBy(0, delta * scrollEase);
        } else {
          targetScrollPosition = null;
        }
      }

      velocity *= friction;
      if (velocity > 0.2 || velocity < -0.2) {
        window.scrollBy(0, velocity * ease);
      }

      for (let i = 0; i < compLen; i++) {
        const d = comparatorData[i];
        const v =
          parseFloat(
            getComputedStyle(d.comp).getPropertyValue("--scroll-progress")
          ) || 0;
        d.pct.textContent = (Math.round(v) + "").padStart(2, "0") + "%";

        const currentStage = Math.round((v / 100) * (d.layerCount - 1));
        d.indicators.forEach((indicator, idx) => {
          indicator.classList.toggle("active", idx === currentStage);
        });
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("click", onIndicatorClick);

    createStageIndicators();
    updateOffsets();
    requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("click", onIndicatorClick);
    };
  }, []);

  return (
    <div className="impact-page-wrapper">
      <Navigation />
      <main className="impact-main">
        <article>
          <section className="intro">
            <h1>WORK IN ACTION</h1>
          </section>
          
          <section>
            <p className="scroll-indicator">ACOM ↓</p>
          </section>
          
          <section className="scroll-section">
            <div className="comparator-container">
              <div className="comparator-wrapper">
                <div className="comparator">
                  <div className="comparison-percentage"></div>
                  <div className="image-layers">
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://i.postimg.cc/kDcMcW4Q/20121022-DSC-5096.jpg" />
                        <img src="https://i.postimg.cc/kDcMcW4Q/20121022-DSC-5096.jpg" decoding="async" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/xbfdsfjo_20130823_11.19.45_DSC_9188.jpg" />
                        <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/xbfdsfjo_20130823_11.19.45_DSC_9188.jpg" decoding="async" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/57pjot59_GPG-39.jpg" />
                        <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/57pjot59_GPG-39.jpg" decoding="async" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/lvjlpl52_station%20in%20the%20morning%20framed%20by%20tree_1.686.1.jpg" />
                        <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/lvjlpl52_station%20in%20the%20morning%20framed%20by%20tree_1.686.1.jpg" decoding="async" alt="" />
                      </picture>
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
          
          <section>
            <p className="scroll-indicator">VASUNDHARA ↓</p>
          </section>
          
          <section className="scroll-section">
            <div className="comparator-container">
              <div className="comparator-wrapper flip-reverse">
                <div className="comparator">
                  <div className="comparison-percentage"></div>
                  <div className="image-layers">
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/a6tkeyv3_360%20Thumbnail%20First%20Part_2.164.1.jpg" />
                        <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/a6tkeyv3_360%20Thumbnail%20First%20Part_2.164.1.jpg" decoding="async" loading="lazy" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://i.postimg.cc/vDz8z5B9/Boy-with-Headset-at-house-2-3-1.jpg" />
                        <img src="https://i.postimg.cc/vDz8z5B9/Boy-with-Headset-at-house-2-3-1.jpg" decoding="async" loading="lazy" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://i.postimg.cc/9zpXpyMt/eaerly-morning-families-3-11-2.jpg" />
                        <img src="https://i.postimg.cc/9zpXpyMt/eaerly-morning-families-3-11-2.jpg" decoding="async" loading="lazy" alt="" />
                      </picture>
                    </div>
                    <div className="image-layer">
                      <picture>
                        <source media="(max-width: 48em)" srcSet="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/j2miocs8_IMG_2021.JPG" />
                        <img src="https://customer-assets.emergentagent.com/job_climate-finance/artifacts/j2miocs8_IMG_2021.JPG" decoding="async" loading="lazy" alt="" />
                      </picture>
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
          
          <section>
            <p className="scroll-indicator">Scroll up ↑</p>
          </section>
          
          <section className="spacer"></section>
        </article>
      </main>
    </div>
  );
};

export default ImpactPage;
