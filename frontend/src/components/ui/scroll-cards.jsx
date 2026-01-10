import React from "react";

// Card component - displays full-screen image only (no text overlay)
const Card = ({ src, i }) => {
  return (
    <div className="scroll-card-container">
      <div className="scroll-card">
        <div className="scroll-card-image-wrapper">
          <img
            className="scroll-card-image"
            src={src}
            alt={`Impact gallery image ${i + 1}`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * CardsParallax component displays a series of image cards in a vertical scroll layout
 * Each card stacks on top of the previous one as you scroll
 */
const CardsParallax = ({ items }) => {
  return (
    <div className="cards-parallax-wrapper">
      {items.map((item, i) => {
        return <Card key={`card_${i}`} src={item.src} i={i} />;
      })}
    </div>
  );
};

export { CardsParallax };
