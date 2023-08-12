const MovingBackground = ({ phrases }) => {
  return (
    <div className="moving-background">
      {phrases.map((phrase, index) => {
        const randomTop = Math.floor(Math.random() * 100); // Random percentage for top
        const randomLeft = Math.floor(Math.random() * 100); // Random percentage for left
        return (
          <div
            key={index}
            className="moving-phrase"
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              fontSize: phrase.size,
              opacity: phrase.opacity,
              transform: `translateX(${phrase.depth}px)`,
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
