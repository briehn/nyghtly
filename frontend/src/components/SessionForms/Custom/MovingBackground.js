import React from "react";
import "./MovingBackground.css"; // Create this CSS file

const MovingBackground = ({ phrases, upperLimit, lowerLimit }) => {
  return (
    <div className="moving-background">
      {phrases.map((phrase, index) => {
        const randomTopPercent = Math.random() * 100; // Random percentage for top
        const randomLeftPercent = Math.random() * 100; // Random percentage for left
        return (
          <div
            key={index}
            className="moving-phrase"
            style={{
              top: `${randomTopPercent}%`, // Set top position as percentage
              left: `${randomLeftPercent}%`, // Set left position as percentage
              fontSize: phrase.size,
              opacity: phrase.opacity,
              transform: `translateX(-${phrase.depth}px)`, // Adjust the depth as needed
            }}
          >
            {phrase.text}
          </div>
        );
      })}
    </div>
  );
};

export default MovingBackground;
