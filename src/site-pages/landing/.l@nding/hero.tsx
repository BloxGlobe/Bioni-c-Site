import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    // Simulate fetching or updating player count
    const timer = setTimeout(() => {
      setPlayerCount(1);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero">
      {/* YouTube video background */}
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/wNl0kyRgCb0?autoplay=1&mute=1&loop=1&playlist=wNl0kyRgCb0&controls=0&showinfo=0&modestbranding=1"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="player-count">
          <span className="player-count-label">Live Players: </span>
          <span className="player-count-number">{playerCount}</span>
        </div>

        <h1 className="hero-title">Bionic Studio</h1>
        
        <p className="hero-intro">
          Welcome to Bionic Studio - where creativity meets innovation. 
          Build, create, and bring your ideas to life with our cutting-edge platform.
        </p>
      </div>
    </section>
  );
};

export default Hero;