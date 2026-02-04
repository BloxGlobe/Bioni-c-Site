import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayerCount(1);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-split">
        {/* Left side - Content */}
        <div className="hero-left">
          <div className="player-count">
            <span className="player-count-label">Live Players: </span>
            <span className="player-count-number">{playerCount}</span>
          </div>

          <h1 className="hero-title">
            Impossible?<br />
            <span className="hero-subtitle">Possible.</span>
          </h1>
          
          <p className="hero-tagline">
            Bionic Studio - The creative platform for young innovators
          </p>

          <div className="hero-cta">
            <button className="cta-primary">Get Started</button>
            <button className="cta-secondary">Learn More</button>
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hero-right">
          <div className="hero-visual">
            <div className="visual-accent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;